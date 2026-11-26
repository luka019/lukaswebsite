import {scopeAreas} from './catalogue.mjs';
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lang=document.documentElement.lang==='en'?'en':'ka',product='product',last=null;
const say=(ka,en)=>lang==='en'?en:ka;
const localRoute=route=>(lang==='en'?'/en':'')+route;

function preview(){const box=$('[data-scope-preview]');if(!box)return;box.innerHTML=scopeAreas({product}).map(p=>`<span>${esc(p.name[lang])}</span>`).join('');$('[data-scope-link]').href=localRoute('/scope/?product='+product);}
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>{product=b.dataset.product;document.querySelectorAll('[data-product]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));preview();}));
preview();
function renderResult(){if(!last)return;const box=$('#scope-results'),areas=scopeAreas(last);box.innerHTML=`<div class="deliverable-card"><p class="eyebrow">${say('პროდუქტის სამართლებრივი საკითხები','YOUR PRODUCT / LEGAL MAP')}</p><h2>${say('შესაფასებელი მიმართულებები','Areas to review')}</h2>${areas.map(p=>`<div class="scope-result-card"><h3><a href="${localRoute('/services/'+p.slug+'/')}">${esc(p.name[lang])} ↗</a></h3><p>${esc(p.questions[lang][0])}</p></div>`).join('')}<p class="scope-disclaimer">${say('ეს არის თქვენი პასუხების მიხედვით შედგენილი საწყისი სია და არა სამართლებრივი დასკვნა ან გაშვების ნებართვა. მოთხოვნების გავრცელება, მოქმედი წესები და სხვა შესაძლო საკითხები იურისტმა უნდა შეაფასოს.','This is an initial list based on your answers, not legal advice or permission to launch. A lawyer needs to assess applicability, current rules and any further issues.')}</p><a class="button button-primary" id="scope-intake" href="mailto:digitallawgeorgia@gmail.com">${say('იურიდიული კონსულტაციის მოთხოვნა','Request a legal assessment')} ↗</a><p class="small">${say('იურიდიული შეფასებისთვის პირდაპირ დაგვიკავშირდით. პირველ შეტყობინებაში ნუ გამოგვიგზავნით კონფიდენციალურ დოკუმენტებს.','Contact us directly for a legal assessment. Please do not send confidential documents in your first message.')}</p></div>`;}
const form=$('#scope-form');if(form){const value=new URLSearchParams(location.search).get('product');if([...form.elements.product.options].some(o=>o.value===value))form.elements.product.value=value;form.onsubmit=e=>{e.preventDefault();const d=new FormData(form);last={product:d.get('product'),features:d.getAll('features'),market:d.get('market')};renderResult();$('#scope-results').setAttribute('tabindex','-1');$('#scope-results').focus();};}
document.addEventListener('site:language',e=>{lang=e.detail.language;preview();renderResult();});

const enquiry=$('#contact-page-form');
if(enquiry){
 const area=enquiry.elements.area;
 const requested=new URLSearchParams(location.search).get('area');
 if(requested&&requested.length<150){
  const existing=[...area.options].find(option=>option.value===requested||option.dataset.en===requested);
  if(existing){
   existing.selected=true;
  }else{
   const option=new Option(requested,requested,true,true);
   area.add(option);
  }
 }
 enquiry.addEventListener('submit',e=>{
  e.preventDefault();
  if(!enquiry.reportValidity())return;
  const data=new FormData(enquiry);
  const topic=area.selectedOptions[0].textContent;
  const fields=['name','email','company','area','matter'];
  const labels=lang==='en'?['Name','Email','Company','Area','Matter']:['სახელი და გვარი','ელფოსტა','ორგანიზაცია','მიმართულება','საკითხი'];
  const body=labels.map((label,i)=>label+': '+(fields[i]==='area'?topic:String(data.get(fields[i])||''))).join('\n');
  $('#contact-page-mailto').href='mailto:digitallawgeorgia@gmail.com?subject='+encodeURIComponent('Digital Law Georgia | '+topic)+'&body='+encodeURIComponent(body);
  $('#contact-page-result').hidden=false;
 });
 enquiry.hidden=false;
}
