-- Recorded as Supabase migration dlg_delivery_initialisation.
alter table public.dlg_documents add constraint dlg_no_placeholder_publication check(not published or position('[დასაზუსტებელია]' in body)=0);
create function public.dlg_seed_delivery(rid uuid,items jsonb,documents jsonb) returns void language plpgsql security invoker set search_path='' as $$
begin
 if not exists(select 1 from public.dlg_admin_users where lower(email)=lower(auth.jwt()->>'email')) then raise exception 'Administrator access required';end if;
 perform id from public.dlg_client_requests where id=rid for update;
 if not found then raise exception 'Request unavailable';end if;
 if exists(select 1 from public.dlg_delivery_items where request_id=rid) or exists(select 1 from public.dlg_documents where request_id=rid) then raise exception 'Delivery already initialised';end if;
 insert into public.dlg_delivery_items(request_id,kind,title,action,owner_label,shared) select rid,x->>'kind',x->>'title',coalesce(x->>'action',''),coalesce(x->>'owner_label',''),coalesce((x->>'shared')::boolean,false) from jsonb_array_elements(items) x;
 insert into public.dlg_documents(request_id,kind,title,body) select rid,x->>'kind',x->>'title',x->>'body' from jsonb_array_elements(documents) x;
end $$;
revoke all on function public.dlg_seed_delivery(uuid,jsonb,jsonb) from public,anon;
grant execute on function public.dlg_seed_delivery(uuid,jsonb,jsonb) to authenticated;
