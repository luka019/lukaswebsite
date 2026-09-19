export const topics = {'contracts':{ka:'ხელშეკრულებები',en:'Contracts'},'ai-data':{ka:'ხელოვნური ინტელექტი და მონაცემები',en:'AI & data'},'business':{ka:'ბიზნესი',en:'Business'},'security':{ka:'უსაფრთხოება',en:'Security'},'fintech':{ka:'ფინანსური ტექნოლოგიები',en:'Fintech'}};
export const formats = {guide:{ka:'გზამკვლევი',en:'Guide'},article:{ka:'სტატია',en:'Article'},tool:{ka:'სამუშაო მასალა',en:'Practical tool'}};
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeURL(value,local=true){
 if(typeof value!=='string'||/[\s<>"'\\]/.test(value))return false;
 if(local&&/^\/assets\/[a-zA-Z0-9_./-]+$/.test(value)&&!value.includes('..'))return true;
 try {const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}
}
export function validateResources(rows){
 if(!Array.isArray(rows)||rows.length>300)throw new Error('რესურსების სია არასწორია ან ზედმეტად დიდია.');
 const slugs=new Set();
 for(const r of rows){
  if(!r||typeof r!=='object'||!/^[-a-z0-9]{3,90}$/.test(r.slug)||slugs.has(r.slug))throw new Error('მისამართი უნდა იყოს უნიკალური: 3–90 ლათინური ასო, ციფრი ან დეფისი.'); slugs.add(r.slug);
  if(!['draft','published','archived'].includes(r.status)||!topics[r.topic]||!formats[r.format])throw new Error('აირჩიეთ სტატუსი, თემა და ფორმატი.');
  for(const [key,max] of Object.entries({title:180,title_en:180,summary:600,summary_en:600,body:50000,body_en:50000,author:150,author_en:150,audience:220,audience_en:220,cover_alt:300,cover_alt_en:300})){
   if(typeof r[key]!=='string'||r[key].length>max)throw new Error('შეამოწმეთ ველი: '+key);
  }
  if(!r.title.trim()||!r.summary.trim()||!r.body.trim()||!r.author.trim()||!r.cover_alt.trim())throw new Error('შეავსეთ ქართული სათაური, აღწერა, შინაარსი, ავტორი და სურათის აღწერა.');
  if(!safeURL(r.cover)||!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||!Number.isFinite(Date.parse(r.date))||new Date(r.date).toISOString().slice(0,10)!==r.date)throw new Error('შეამოწმეთ ყდის ბმული და თარიღი.');
  if(typeof r.featured!=='boolean'||!Array.isArray(r.sources)||r.sources.length>20||r.sources.some(s=>!s||typeof s.title!=='string'||!s.title.trim()||s.title.length>300||!safeURL(s.url,false)))throw new Error('შეამოწმეთ წყაროების სათაურები და HTTPS ბმულები.');
 }
 if(new TextEncoder().encode(JSON.stringify(rows)).length>850000)throw new Error('მასალების საერთო მოცულობა აღემატება 850 KB-ს.');
 return rows;
}
// A deliberately small, escaped text format: headings, paragraphs, bullet lists.
// Raw HTML and embedded script/links are never interpreted.
export function renderBody(text){
 let result='',para=[],list=[];
 const flush=()=>{if(para.length){result+='<p>'+esc(para.join(' '))+'</p>';para=[];}if(list.length){result+='<ul>'+list.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>';list=[];}};
 for(const raw of text.replace(/\r/g,'').split('\n')){const line=raw.trim();if(!line){flush();continue;}if(line.startsWith('## ')){flush();result+='<h2>'+esc(line.slice(3))+'</h2>';}else if(line.startsWith('- ')){if(para.length)flush();list.push(line.slice(2));}else {if(list.length)flush();para.push(line);}}
 flush();return result;
}
