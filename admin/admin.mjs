import {validateResources,renderBody,esc,safeURL} from '/resources/resource-model.mjs';
const $=id=>document.getElementById(id), form=$('editor');
const repo='luka019/lukaswebsite', endpoint=`https://api.github.com/repos/${repo}/contents/_data/resources.json`;
let token='',rows=[],sha='',originalSlug=null,dirty=false,busy=false;
const statusNames={draft:'მონახაზი',published:'გამოქვეყნებული',archived:'არქივი'};
function message(text,error=false){$('status').textContent=text;$('status').dataset.error=String(error);}
function lock(value){busy=value;document.querySelectorAll('button').forEach(b=>b.disabled=value);form.querySelectorAll('input,textarea,select').forEach(e=>e.disabled=value);}
function base64(text){return btoa(Array.from(new TextEncoder().encode(text),b=>String.fromCharCode(b)).join(''));}
function decode(value){return new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g,'')),c=>c.charCodeAt(0)));}
async function api(url,options={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{const response=await fetch(url,{...options,headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${token}`,'X-GitHub-Api-Version':'2022-11-28',...(options.body?{'Content-Type':'application/json'}:{}),...options.headers},signal:controller.signal});
  if(!response.ok){const e=new Error(response.status===409||response.status===422?'მასალა სხვა სესიაში შეიცვალა ან შენახვა ვერ დასრულდა. ჩამოტვირთეთ თქვენი მონახაზი, განაახლეთ სია და სცადეთ თავიდან.':response.status===401?'გასაღები არასწორია ან ვადაგასულია.':response.status===403||response.status===404?'წვდომა ვერ დადასტურდა. გადაამოწმეთ რეპოზიტორია და Contents: Read and write უფლება.':'მოთხოვნა ვერ შესრულდა. თქვენი ტექსტი ფორმაში რჩება.');e.status=response.status;throw e;}
  return response.json();
 }finally{clearTimeout(timer);}
}
async function load(){const result=await api(endpoint+'?ref=main');rows=validateResources(JSON.parse(decode(result.content)));sha=result.sha;renderList();}
function renderList(){
 const filtered=rows.filter(r=>$('filter').value==='all'||r.status===$('filter').value);
 $('resource-list').replaceChildren();
 if(!filtered.length){const p=document.createElement('p');p.textContent='ამ სტატუსით რესურსი არ არის.';$('resource-list').append(p);}
 for(const r of filtered){const el=document.createElement('article');el.className='admin-item';el.innerHTML=`<img src="${esc(r.cover)}" alt=""><div><h3>${esc(r.title)}</h3><p>${statusNames[r.status]} · ${esc(r.date)}</p></div><button type="button">რედაქტირება</button>`;el.querySelector('button').addEventListener('click',()=>openEditor(r));$('resource-list').append(el);}
}
function discard(){return !dirty||window.confirm('შეუნახავი ცვლილებები დაიკარგება. გააგრძელოთ?');}
function openEditor(r){
 if(!discard())return;
 originalSlug=r?.slug||null;
 const value=r||{title:'',title_en:'',slug:'',status:'draft',topic:'contracts',format:'guide',date:new Date().toISOString().slice(0,10),featured:false,author:'ლუკა შახკულაშვილი',author_en:'Luka Shakhkulashvili',audience:'',audience_en:'',summary:'',summary_en:'',cover:'/assets/resources/contracts.webp',cover_alt:'ხელშეკრულების ფურცლები და კალამი',cover_alt_en:'Contract pages and a pen',body:'',body_en:'',sources:[]};
 form.reset();for(const [key,v]of Object.entries(value)){const el=form.elements.namedItem(key);if(!el)continue;if(key==='featured')el.checked=v;else if(key==='sources')el.value=v.map(s=>`${s.title} | ${s.url}`).join('\n');else el.value=v;}
 form.elements.slug.readOnly=!!originalSlug;$('editor-heading').textContent=r?'რესურსის რედაქტირება':'ახალი რესურსი';$('editor-panel').hidden=false;$('preview').hidden=true;dirty=false;form.elements.title.focus();$('editor-panel').scrollIntoView({behavior:'smooth'});
}
function collect(){
 const r={};for(const key of ['title','title_en','slug','status','topic','format','date','author','author_en','audience','audience_en','summary','summary_en','cover','cover_alt','cover_alt_en','body','body_en'])r[key]=form.elements.namedItem(key).value.trim();
 r.featured=form.elements.featured.checked;r.sources=form.elements.sources.value.trim().split('\n').filter(x=>x.trim()).map(line=>{const i=line.indexOf('|');if(i<1)throw new Error('წყაროს ფორმატი: სათაური | https://ბმული');return{title:line.slice(0,i).trim(),url:line.slice(i+1).trim()};});return r;
}
$('login-form').addEventListener('submit',async e=>{e.preventDefault();token=$('token').value.trim();$('token').value='';lock(true);message('წვდომა მოწმდება…');try{const access=await api(`https://api.github.com/repos/${repo}`);if(!access.permissions?.push)throw new Error('ამ ანგარიშს რედაქტირების უფლება არ აქვს.');await load();$('login-panel').hidden=true;$('workspace').hidden=false;$('logout').hidden=false;message('პანელი მზადაა. აირჩიეთ რესურსი ან დაამატეთ ახალი.');}catch(err){token='';message(err.name==='AbortError'?'კავშირი ვერ დასრულდა. სცადეთ ხელახლა.':err.message,true);}finally{lock(false);}});
$('logout').addEventListener('click',()=>{if(!discard())return;token='';sha='';rows=[];dirty=false;form.reset();$('resource-list').replaceChildren();$('workspace').hidden=true;$('editor-panel').hidden=true;$('logout').hidden=true;$('login-panel').hidden=false;message('სესია დასრულდა.');});
$('filter').addEventListener('change',renderList);$('new-resource').addEventListener('click',()=>openEditor());
$('cancel').addEventListener('click',()=>{if(discard()){dirty=false;$('editor-panel').hidden=true;}});
$('refresh').addEventListener('click',async()=>{if(!discard())return;lock(true);try{await load();dirty=false;$('editor-panel').hidden=true;message('რესურსები განახლდა.');}catch(e){message(e.message,true);}finally{lock(false);}});
form.addEventListener('input',()=>{dirty=true;});form.addEventListener('change',()=>{dirty=true;});
form.addEventListener('submit',async e=>{
 e.preventDefault();if(busy)return;
 try{const r=collect();if(originalSlug&&r.slug!==originalSlug)throw new Error('არსებული მისამართის შეცვლა დაუშვებელია.');if(!originalSlug&&rows.some(x=>x.slug===r.slug))throw new Error('ეს მისამართი უკვე გამოიყენება.');
 const next=originalSlug?rows.map(x=>x.slug===originalSlug?r:x):[r,...rows];validateResources(next);
 lock(true);message('რესურსი ინახება…');const result=await api(endpoint,{method:'PUT',body:JSON.stringify({message:`Update resource: ${r.slug} (${r.status})`,content:base64(JSON.stringify(next,null,2)+'\n'),sha,branch:'main'})});
 rows=next;sha=result.content.sha;originalSlug=r.slug;form.elements.slug.readOnly=true;dirty=false;renderList();message('შენახულია. საიტზე განახლება გამოჩნდება გამოქვეყნების პროცესის დასრულების შემდეგ.');
 }catch(err){message(err.name==='AbortError'?'შენახვის შედეგი ჯერ ვერ დადასტურდა. ხელახლა გაგზავნამდე ჩამოტვირთეთ მონახაზი და განაახლეთ სია.':err.message,true);}finally{lock(false);}
});
$('preview-button').addEventListener('click',()=>{try{const r=collect();validateResources([r]);$('preview').innerHTML=`<h2>${esc(r.title)}</h2><p>${esc(r.summary)}</p><img src="${esc(r.cover)}" alt="${esc(r.cover_alt)}">${renderBody(r.body)}${r.body_en?'<h2>English</h2>'+renderBody(r.body_en):''}`;$('preview').hidden=false;$('preview').scrollIntoView({behavior:'smooth'});}catch(e){message(e.message,true);}});
$('download-draft').addEventListener('click',()=>{try{const content=JSON.stringify(collect(),null,2);const url=URL.createObjectURL(new Blob([content],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='resource-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){message(e.message,true);}});
document.querySelectorAll('[data-cover]').forEach(b=>b.addEventListener('click',()=>{form.elements.cover.value='/assets/resources/'+b.dataset.cover+'.webp';dirty=true;}));
$('cover-file').addEventListener('change',async e=>{
 const file=e.target.files[0];if(!file)return;
 try{if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>2*1024*1024)throw new Error('გამოიყენეთ JPG, PNG ან WebP, მაქსიმუმ 2 MB.');const slug=form.elements.slug.value;if(!/^[-a-z0-9]{3,90}$/.test(slug))throw new Error('ჯერ შეავსეთ რესურსის მისამართი.');
 const bytes=new Uint8Array(await file.arrayBuffer());const valid=(file.type==='image/jpeg'&&bytes[0]===255&&bytes[1]===216)||(file.type==='image/png'&&[137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v))||(file.type==='image/webp'&&new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP');if(!valid)throw new Error('სურათის ფორმატი არასწორია.');
 const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type],filename=`assets/resources/${slug}-${crypto.randomUUID()}.${ext}`;
 const encoded=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=reject;reader.readAsDataURL(file);});
 lock(true);message('სურათი იტვირთება…');await api(`https://api.github.com/repos/${repo}/contents/${filename}`,{method:'PUT',body:JSON.stringify({message:`Add cover for ${slug}`,content:encoded,branch:'main'})});form.elements.cover.value='/'+filename;dirty=true;message('სურათი ატვირთულია. რესურსთან დასაკავშირებლად დააჭირეთ „შენახვას“.');
 }catch(err){message(err.name==='AbortError'?'ატვირთვის შედეგი ვერ დადასტურდა. შეამოწმეთ რეპოზიტორია ხელახლა ატვირთვამდე.':err.message,true);}finally{lock(false);e.target.value='';}
});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
