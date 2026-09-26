(() => {
  const URL = 'https://luygurjqpfgqnejtoihh.supabase.co';
  const KEY = 'sb_publishable_vAjSddEW_E6gDxQE2E5saQ_opTxJzdD';
  const ADMIN_EMAILS = new Set(['digitallawgeorgia@gmail.com','luka.shakhkulashvili@gmail.com']);
  const statuses = {
    submitted:{en:'SUBMITTED',ka:'გაგზავნილია'},
    reviewing:{en:'IN REVIEW',ka:'მიმდინარეობს შემოწმება'},
    in_progress:{en:'IN PROGRESS',ka:'მიმდინარეობს მუშაობა'},
    waiting_for_client:{en:'YOUR INPUT',ka:'თქვენი პასუხია საჭირო'},
    completed:{en:'COMPLETED',ka:'დასრულებულია'},
    closed:{en:'CLOSED',ka:'დახურულია'}
  };
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v || '').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const date = (v) => new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(v));
  let sb, session, requests = [], selected;

  function show(selector, visible){$(selector).hidden=!visible}
  function setError(message){const e=$('[data-admin-error]');e.textContent=message;e.hidden=!message}
  function isAdmin(user){return Boolean(user?.email && ADMIN_EMAILS.has(user.email.toLowerCase()))}
  function statusLabel(status){return (statuses[status]||statuses.submitted).en}
  function setView(view){
    show('[data-admin-login]',view==='login');
    show('[data-admin-denied]',view==='denied');
    show('[data-admin-dashboard]',view==='dashboard');
  }
  function renderStats(){
    $('[data-admin-stat-all]').textContent=requests.length;
    $('[data-admin-stat-review]').textContent=requests.filter((x)=>x.status==='submitted'||x.status==='reviewing').length;
    $('[data-admin-stat-progress]').textContent=requests.filter((x)=>['in_progress','waiting_for_client'].includes(x.status)).length;
    $('[data-admin-stat-completed]').textContent=requests.filter((x)=>x.status==='completed').length;
    $('[data-admin-count]').textContent=requests.length;
  }
  function renderList(){
    const q=($('[data-admin-search]').value||'').trim().toLowerCase();
    const filter=$('[data-admin-filter]').value;
    const list=requests.filter((x)=>{
      const hay=[x.title,x.description,x.client_email,x.client_name,x.company_name,x.service_label].join(' ').toLowerCase();
      return (!q||hay.includes(q))&&(filter==='all'||x.status===filter);
    });
    $('[data-admin-count]').textContent=list.length;
    if(!list.length){$('[data-admin-list]').innerHTML='<div class="empty-state">No matching requests.</div>';return}
    $('[data-admin-list]').innerHTML=list.map((x)=>{
      const st=statuses[x.status]||statuses.submitted;
      return '<button class="admin-row '+(selected?.id===x.id?'active':'')+'" type="button" data-admin-id="'+esc(x.id)+'"><div class="admin-row-top"><span class="request-status '+esc(x.status)+'">'+esc(st.en)+'</span><span class="request-service">'+esc(x.service_label)+'</span></div><strong>'+esc(x.title)+'</strong><div class="admin-row-bottom"><span>'+esc(x.client_email||'No email recorded')+'</span><span>'+date(x.created_at)+'</span></div></button>';
    }).join('');
    document.querySelectorAll('[data-admin-id]').forEach((b)=>b.onclick=()=>{selected=requests.find((x)=>x.id===b.dataset.adminId);renderList();renderDetail()});
  }
  async function loadEvents(id){
    const r=await sb.from('dlg_client_request_events').select('*').eq('request_id',id).order('created_at',{ascending:true});
    return r.data||[];
  }
  async function renderDetail(){
    const item=selected;
    if(!item){$('[data-admin-detail]').innerHTML='<div class="empty-detail"><span>✳</span><h2>Select a request.</h2><p>The brief, contact details and working history will appear here.</p></div>';return}
    $('[data-admin-detail]').innerHTML='<div class="loading-state">Loading request…</div>';
    const events=await loadEvents(item.id);
    const eventMarkup=events.length?events.map((e)=>'<div class="admin-event"><small>'+esc(e.event_type.replaceAll('_',' ').toUpperCase())+' · '+date(e.created_at)+'</small><p>'+esc(e.message)+'</p></div>').join(''):'<p class="empty-state">No activity yet.</p>';
    $('[data-admin-detail]').innerHTML='<div class="admin-detail-header"><span class="request-status '+esc(item.status)+'">'+esc(statusLabel(item.status))+'</span><h2>'+esc(item.title)+'</h2><div class="detail-meta"><span>'+esc(item.service_label)+'</span><span>'+date(item.created_at)+'</span></div></div><div class="admin-contact"><div><span>Client</span><br>'+esc(item.client_name||'Not provided')+'</div><div><span>Email</span><br>'+(item.client_email?'<a href="mailto:'+esc(item.client_email)+'">'+esc(item.client_email)+'</a>':'Not recorded')+'</div><div><span>Company / project</span><br>'+esc(item.company_name||'Not provided')+'</div></div><p class="admin-request-description">'+esc(item.description)+'</p><div class="admin-controls"><select data-detail-status>'+Object.entries(statuses).map(([key,v])=>'<option value="'+key+'" '+(key===item.status?'selected':'')+'>'+v.en+'</option>').join('')+'</select><button class="button button-dark" type="button" data-save-status>Save status</button></div><div class="admin-status-message" data-admin-status-message></div><div class="admin-note"><label><span>Add an internal/client update</span><textarea data-admin-note placeholder="Write the next update or question…"></textarea></label><button class="button button-dark" type="button" data-add-note>Add update</button></div><div class="admin-timeline">'+eventMarkup+'</div>';
    $('[data-save-status]').onclick=saveStatus;
    $('[data-add-note]').onclick=addNote;
  }
  function feedback(message,error=false){const e=$('[data-admin-status-message]');e.textContent=message;e.classList.toggle('error',error)}
  async function saveStatus(){
    const status=$('[data-detail-status]').value;
    const item=selected;
    const r=await sb.from('dlg_client_requests').update({status,updated_at:new Date().toISOString()}).eq('id',item.id);
    if(r.error){feedback(r.error.message,true);return}
    if(item.status!==status){await sb.from('dlg_client_request_events').insert({request_id:item.id,user_id:session.user.id,event_type:'status_changed',message:'Status changed to '+statusLabel(status)});}
    selected={...item,status};
    requests=requests.map((x)=>x.id===item.id?selected:x);
    renderStats();renderList();await renderDetail();feedback('Status saved.');
  }
  async function addNote(){
    const field=$('[data-admin-note]'),message=field.value.trim();
    if(!message){feedback('Write an update first.',true);return}
    const r=await sb.from('dlg_client_request_events').insert({request_id:selected.id,user_id:session.user.id,event_type:'admin_update',message});
    if(r.error){feedback(r.error.message,true);return}
    field.value='';await renderDetail();feedback('Update added.');
  }
  async function loadRequests(){
    const r=await sb.from('dlg_client_requests').select('*').order('created_at',{ascending:false});
    if(r.error){setError(r.error.message);return}
    requests=r.data||[];renderStats();renderList();if(requests.length){selected=requests[0];renderList();renderDetail()}
  }
  async function applySession(){
    setError('');
    if(!session){setView('login');return}
    if(!isAdmin(session.user)){$('[data-admin-denied-email]').textContent='Signed in as '+(session.user.email||'an unknown account')+'.';setView('denied');return}
    $('[data-admin-email]').textContent=session.user.email||'';setView('dashboard');await loadRequests();
  }
  $('[data-admin-google]').onclick=async()=>{
    if(!sb){setError('Authentication is still loading. Refresh the page and try again.');return}
    const r=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/admin/inbox/'}});
    if(r.error)setError(r.error.message);
  };
  document.querySelectorAll('[data-admin-logout]').forEach((b)=>b.onclick=async()=>{await sb.auth.signOut();session=null;setView('login')});
  $('[data-admin-search]').oninput=renderList;
  $('[data-admin-filter]').onchange=renderList;
  async function boot(){
    if(!window.supabase){setError('The authentication service is still loading. Refresh the page.');return}
    sb=window.supabase.createClient(URL,KEY);
    const r=await sb.auth.getSession();session=r.data.session;await applySession();
    sb.auth.onAuthStateChange(async(_,next)=>{session=next;await applySession()});
  }
  boot();
})();