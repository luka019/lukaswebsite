(()=>{'use strict';
const en=document.documentElement.lang==='en';
const t=(ka,english)=>en?english:ka;
const form=document.getElementById('dlg-readiness-form');
if(form){
 const result=document.getElementById('dlg-readiness-result'),summary=document.getElementById('dlg-readiness-summary'),list=document.getElementById('dlg-readiness-priorities');
 const questions=[...form.querySelectorAll('fieldset')],back=document.getElementById('dlg-readiness-back'),next=document.getElementById('dlg-readiness-next'),finish=document.getElementById('dlg-readiness-finish'),error=document.getElementById('dlg-readiness-error');
 const progress=document.getElementById('dlg-readiness-progress'),stepLabel=document.getElementById('dlg-readiness-step'),answeredLabel=document.getElementById('dlg-readiness-answered');
 let step=0;
 const selection=q=>q.querySelector('input:checked')?.value||'';
 function updateProgress(){
  const answered=questions.filter(q=>selection(q)).length;
  progress.value=answered;
  stepLabel.textContent=t('კითხვა '+(step+1)+' / '+questions.length,'Question '+(step+1)+' / '+questions.length);
  answeredLabel.textContent=t('პასუხები: '+answered+' / '+questions.length,'Answered: '+answered+' / '+questions.length);
 }
 function showStep(index,focus=true){
  step=Math.max(0,Math.min(index,questions.length-1));
  questions.forEach((q,i)=>{q.hidden=i!==step;});
  back.disabled=step===0;next.hidden=step===questions.length-1;finish.hidden=step!==questions.length-1;
  error.textContent='';updateProgress();form.hidden=false;result.hidden=true;
  if(focus)questions[step].querySelector('legend').focus();
 }
 function requireAnswer(){
  if(selection(questions[step]))return true;
  error.textContent=t('გასაგრძელებლად აირჩიეთ ერთი პასუხი.','Choose one answer to continue.');
  questions[step].querySelector('input').focus();return false;
 }
 form.noValidate=true;
 showStep(0,false);
 next.addEventListener('click',()=>{if(requireAnswer())showStep(step+1);});
 back.addEventListener('click',()=>showStep(step-1));
 form.addEventListener('change',()=>{error.textContent='';updateProgress();});
 form.addEventListener('submit',e=>{
  e.preventDefault();
  if(step<questions.length-1){if(requireAnswer())showStep(step+1);return;}
  const missing=questions.findIndex(q=>!selection(q));if(missing!==-1){showStep(missing);requireAnswer();return;}
  const counts={yes:0,partial:0,no:0,unknown:0};list.replaceChildren();
  for(const field of questions){const value=selection(field);counts[value]++;
   if(value==='yes')continue;
   const li=document.createElement('li'),title=document.createElement('strong'),tip=document.createElement('span');
   title.textContent=field.querySelector('.dlg-readiness-category').textContent.trim();
   tip.textContent=field.querySelector('.dlg-readiness-tip').textContent.trim();
   li.append(title,tip);list.append(li);
  }
  summary.textContent=t('თქვენი პასუხების მიხედვით, 8 საკითხიდან '+counts.yes+' სრულად გაქვთ მოწესრიგებული. ქვემოთ იხილავთ შედეგების შეჯამებას და რეკომენდაციებს.','Based on your answers, '+counts.yes+' of eight areas are fully implemented. See the remaining areas below.');
  Object.keys(counts).forEach(key=>{result.querySelector('[data-answer-count="'+key+'"]').textContent=counts[key];});
  if(counts.yes===questions.length){const li=document.createElement('li');li.textContent=t('შეინარჩუნეთ არსებული მექანიზმები და პერიოდულად გადაამოწმეთ მათი ეფექტიანობა.','Maintain existing measures and periodically review their effectiveness.');list.append(li);}
  form.hidden=true;result.hidden=false;document.getElementById('dlg-readiness-heading').focus();
 });
 const save=document.getElementById('dlg-readiness-save'),saveStatus=document.getElementById('dlg-readiness-save-status');
 save.addEventListener('click',()=>{
  if(result.hidden)return;
  const heading=t('Digital Law Georgia | კომპანიის მზადყოფნა AI-ის გამოსაყენებლად','Digital Law Georgia | AI readiness assessment');
  const date=new Date().toISOString().slice(0,10);
  const lines=[heading,date,'',summary.textContent,'',t('პასუხები','Answers'),...questions.map(q=>q.querySelector('.dlg-readiness-category').textContent.trim()+': '+(q.querySelector('input:checked')?.closest('label')?.querySelector('strong')?.textContent.trim()||'')),'',t('რეკომენდაციები','Recommendations'),...Array.from(list.children).map(li=>li.innerText.trim()),'',document.querySelector('.dlg-readiness-disclaimer')?.innerText.trim()||''];
  const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='DLG-AI-readiness-'+date+'.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  saveStatus.textContent=t('შედეგების ფაილი მომზადებულია.','Your results file is ready.');
 });
 document.getElementById('dlg-readiness-review').addEventListener('click',()=>{saveStatus.textContent='';showStep(0);});
 document.getElementById('dlg-readiness-restart').addEventListener('click',()=>{form.reset();list.replaceChildren();summary.textContent='';saveStatus.textContent='';showStep(0);});
}
for(const field of document.querySelectorAll('[data-feed-path]')){
 const address=new URL(field.dataset.feedPath,window.location.origin).href;
 field.value=address;
}
for(const button of document.querySelectorAll('[data-dlg-copy-feed]')){
 button.addEventListener('click',async()=>{
  const field=document.getElementById(button.dataset.dlgCopyFeed),status=button.closest('.dlg-rss-feed')?.querySelector('.dlg-rss-status');
  if(!field||!status)return;
  try{await navigator.clipboard.writeText(field.value);status.textContent=t('ბმული დაკოპირდა.','Feed address copied.');}
  catch{field.focus();field.select();status.textContent=t('დააკოპირეთ მონიშნული ბმული.','Copy the selected address.');}
 });
}
const consult=document.getElementById('dlg-consultation-form');
if(consult){
 const date=consult.elements.date;const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tbilisi',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));date.min=p.year+'-'+p.month+'-'+p.day;
 const result=document.getElementById('dlg-consultation-result'),draft=document.getElementById('dlg-consultation-draft'),mail=document.getElementById('dlg-consultation-email'),status=document.getElementById('dlg-consultation-status');
 consult.hidden=false;
 consult.addEventListener('submit',e=>{e.preventDefault();if(!consult.reportValidity())return;
 const d=new FormData(consult),matter=consult.elements.matter.selectedOptions[0].textContent.trim();
 const body=[t('გამარჯობა, მსურს კონსულტაციაზე შეხვედრა.','Hello, I would like to request a consultation.'),'',t('სახელი: ','Name: ')+d.get('name'),t('ელფოსტა: ','Email: ')+d.get('email'),t('ორგანიზაცია: ','Organisation: ')+(d.get('company')||'-'),t('მიმართულება: ','Matter: ')+matter,t('სასურველი დრო: ','Preferred time: ')+d.get('date')+' '+d.get('time')+' (Asia/Tbilisi)','',t('გთხოვთ, დამიდასტუროთ, შესაძლებელია თუ არა შეხვედრა აღნიშნულ დროს.','Please confirm your availability.')].join('\n');
 draft.value=body;mail.href='mailto:digitallawgeorgia@gmail.com?subject='+encodeURIComponent(t('კონსულტაციის მოთხოვნა','Consultation request'))+'&body='+encodeURIComponent(body);status.textContent='';result.hidden=false;document.getElementById('dlg-consultation-heading').focus();
 });
 consult.addEventListener('input',()=>{result.hidden=true;draft.value='';mail.href='mailto:digitallawgeorgia@gmail.com';status.textContent='';});
 document.getElementById('dlg-consultation-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draft.value);status.textContent=t('ტექსტი დაკოპირდა.','Copied.');}catch{draft.focus();draft.select();status.textContent=t('დააკოპირეთ მონიშნული ტექსტი.','Copy the selected text.');}});
}
})();