-- DLG only. Additive delivery schema; existing requests and events are retained.
begin;
alter table public.dlg_client_requests add column if not exists intake jsonb not null default '{}'::jsonb;
alter table public.dlg_client_requests add column if not exists solution_slug text;
alter table public.dlg_client_requests add column if not exists delivery_stage integer not null default 0 check(delivery_stage between 0 and 6);
alter table public.dlg_client_requests add constraint dlg_intake_size check(octet_length(intake::text)<=30000) not valid;
alter table public.dlg_client_requests add constraint dlg_request_length check(length(title) between 3 and 180 and length(description) between 10 and 12000) not valid;
drop policy if exists "clients can update their own requests" on public.dlg_client_requests;
drop policy if exists "clients can create their own requests" on public.dlg_client_requests;
create policy "clients submit initial requests" on public.dlg_client_requests for insert to authenticated with check(user_id=(select auth.uid()) and status='submitted' and delivery_stage=0 and client_email=(select auth.jwt()->>'email'));
drop policy if exists "clients can create events for their own requests" on public.dlg_client_request_events;
create policy "clients add their messages" on public.dlg_client_request_events for insert to authenticated with check(user_id=(select auth.uid()) and event_type in ('submitted','client_message') and length(message) between 1 and 12000 and exists(select 1 from public.dlg_client_requests r where r.id=request_id and r.user_id=(select auth.uid())));

create table public.dlg_delivery_items(
 id uuid primary key default gen_random_uuid(),request_id uuid not null references public.dlg_client_requests on delete cascade,
 kind text not null check(kind in ('task','risk','question','check','monitoring')), title text not null check(length(title) between 1 and 240),
 requirement text not null default '' check(length(requirement)<=12000), action text not null default '' check(length(action)<=12000),
 owner_label text not null default '' check(length(owner_label)<=180),priority text not null default 'normal' check(priority in ('low','normal','high','urgent')),
 state text not null default 'open' check(state in ('open','in_progress','blocked','done')),
 due_date date,source_url text not null default '' check(source_url='' or source_url ~ '^https://'),
 review_days integer check(review_days between 1 and 730), shared boolean not null default false,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index dlg_delivery_request_idx on public.dlg_delivery_items(request_id);
create table public.dlg_documents(
 id uuid primary key default gen_random_uuid(),request_id uuid not null references public.dlg_client_requests on delete cascade,
 kind text not null check(kind in ('proposal','engagement','analysis','deliverable')),title text not null check(length(title) between 1 and 240),
 body text not null check(length(body) between 1 and 80000),version integer not null default 1,
 published boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index dlg_documents_request_idx on public.dlg_documents(request_id);
create table public.dlg_document_approvals(
 id uuid primary key default gen_random_uuid(),document_id uuid not null references public.dlg_documents on delete cascade,
 user_id uuid not null references auth.users,version integer not null,body_snapshot text not null,approved_at timestamptz not null default now(),
 unique(document_id,version,user_id)
);
create index dlg_approval_user_idx on public.dlg_document_approvals(user_id);
alter table public.dlg_delivery_items enable row level security;
alter table public.dlg_documents enable row level security;
alter table public.dlg_document_approvals enable row level security;
grant select,insert,update,delete on public.dlg_delivery_items,public.dlg_documents to authenticated;
grant select,insert on public.dlg_document_approvals to authenticated;
revoke all on public.dlg_delivery_items,public.dlg_documents,public.dlg_document_approvals from anon;
create policy "admin delivery management" on public.dlg_delivery_items for all to authenticated using(exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email')))) with check(exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email'))));
create policy "client shared delivery" on public.dlg_delivery_items for select to authenticated using(shared and exists(select 1 from public.dlg_client_requests r where r.id=request_id and r.user_id=(select auth.uid())));
create policy "admin documents management" on public.dlg_documents for all to authenticated using(exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email')))) with check(exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email'))));
create policy "client published documents" on public.dlg_documents for select to authenticated using(published and exists(select 1 from public.dlg_client_requests r where r.id=request_id and r.user_id=(select auth.uid())));
create policy "approvals visible with document" on public.dlg_document_approvals for select to authenticated using(exists(select 1 from public.dlg_documents d where d.id=document_id));
create policy "client approves current document" on public.dlg_document_approvals for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.dlg_documents d join public.dlg_client_requests r on r.id=d.request_id where d.id=document_id and d.published and d.kind in ('proposal','engagement','deliverable') and d.version=dlg_document_approvals.version and d.body=body_snapshot and r.user_id=(select auth.uid())));

create function public.dlg_document_version() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if row(new.body,new.title,new.kind) is distinct from row(old.body,old.title,old.kind) then
   new.version=old.version+1;new.published=false;
 else new.version=old.version;end if;
 new.updated_at=now();return new;
end $$;
create trigger dlg_version_document before update on public.dlg_documents for each row execute function public.dlg_document_version();
revoke execute on function public.dlg_document_version() from public,anon,authenticated;

create function public.dlg_submit_request(payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare rid uuid;
begin
 if auth.uid() is null then raise exception 'Sign in required';end if;
 perform pg_advisory_xact_lock(hashtext(auth.uid()::text));
 if (select count(*) from public.dlg_client_requests where user_id=auth.uid() and created_at>now()-interval '1 hour')>=10 then raise exception 'Please wait before submitting more requests';end if;
 insert into public.dlg_client_requests(user_id,title,description,service_slug,service_label,company_name,preferred_language,client_email,client_name,intake,solution_slug)
 values(auth.uid(),trim(payload->>'title'),trim(payload->>'description'),left(payload->>'service_slug',80),left(payload->>'service_label',240),left(payload->>'company_name',240),case when payload->>'preferred_language'='en' then 'en' else 'ka' end,auth.jwt()->>'email',left(payload->>'client_name',240),coalesce(payload->'intake','{}'::jsonb),left(payload->>'solution_slug',100)) returning id into rid;
 insert into public.dlg_client_request_events(request_id,user_id,event_type,message) values(rid,auth.uid(),'submitted','მიმართვა მიღებულია. შემდეგი ნაბიჯია საკითხის გაცნობა და სამუშაოს მოცულობის შეთანხმება.');
 return rid;
end $$;
revoke all on function public.dlg_submit_request(jsonb) from public,anon;
grant execute on function public.dlg_submit_request(jsonb) to authenticated;

create function public.dlg_update_progress(rid uuid,new_status text,new_stage integer) returns void language plpgsql security invoker set search_path='' as $$
begin
 if not exists(select 1 from public.dlg_admin_users where lower(email)=lower(auth.jwt()->>'email')) then raise exception 'Administrator access required';end if;
 update public.dlg_client_requests set status=new_status,delivery_stage=new_stage,updated_at=now() where id=rid;
 if not found then raise exception 'Request unavailable';end if;
 insert into public.dlg_client_request_events(request_id,user_id,event_type,message) values(rid,auth.uid(),'status_changed','განახლდა სამუშაოს ეტაპი და სტატუსი.');
end $$;
revoke all on function public.dlg_update_progress(uuid,text,integer) from public,anon;
grant execute on function public.dlg_update_progress(uuid,text,integer) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('dlg-matter-files','dlg-matter-files',false,10485760,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain','image/png','image/jpeg']);
create policy "DLG matter files read" on storage.objects for select to authenticated using(bucket_id='dlg-matter-files' and exists(select 1 from public.dlg_client_requests r where r.id::text=(storage.foldername(name))[1] and (r.user_id=(select auth.uid()) or exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email'))))));
create policy "DLG matter files upload" on storage.objects for insert to authenticated with check(bucket_id='dlg-matter-files' and owner_id=(select auth.uid())::text and array_length(storage.foldername(name),1)=1 and exists(select 1 from public.dlg_client_requests r where r.id::text=(storage.foldername(name))[1] and (r.user_id=(select auth.uid()) or exists(select 1 from public.dlg_admin_users where lower(email)=lower((select auth.jwt()->>'email'))))));
create policy "DLG matter files delete own" on storage.objects for delete to authenticated using(bucket_id='dlg-matter-files' and owner_id=(select auth.uid())::text and exists(select 1 from public.dlg_client_requests r where r.id::text=(storage.foldername(name))[1]));
commit;
