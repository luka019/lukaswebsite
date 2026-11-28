(()=>{'use strict';
const en=document.documentElement.lang==='en';
const t=(ka,english)=>en?english:ka;
const form=document.getElementById('dlg-readiness-form');
if(form){
 const result=document.getElementById('dlg-readiness-result'),summary=document.getElementById('dlg-readiness-summary'),list=document.getElementById('dlg-readiness-priorities');
 form.hidden=false;
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const fields=[...form.querySelectorAll('fieldset')],data=new FormData(form);
  let yes=0,partial=0,unknown=0,no=0;list.replaceChildren();
  for(const field of fields){const value=data.get(field.dataset.id),tip=field.querySelector('.dlg-readiness-tip');
   if(value==='yes'){yes++;continue;}if(value==='partial')partial++;else if(value==='unknown')unknown++;else no++;
   const li=document.createElement('li');li.textContent=tip.textContent.trim();list.append(li);
  }
  summary.textContent=t('სრულად დანერგილი: '+yes+' / '+fields.length+'; ნაწილობრივ: '+partial+'; არა: '+no+'; დაუდგენელი: '+unknown+'.','Implemented: '+yes+' / '+fields.length+'; partial: '+partial+'; no: '+no+'; unknown: '+unknown+'.');
  if(yes===fields.length){const li=document.createElement('li');li.textContent=t('შეინარჩუნეთ არსებული მექანიზმები და პერიოდულად გადაამოწმეთ მათი ეფექტიანობა.','Maintain existing measures and periodically review their effectiveness.');list.append(li);}
  result.hidden=false;document.getElementById('dlg-readiness-heading').focus();
 });
 form.addEventListener('change',()=>{result.hidden=true;});form.addEventListener('reset',()=>{result.hidden=true;list.replaceChildren();summary.textContent='';});
}
const consult=document.getElementById('dlg-consultation-form');
if(consult){
 const date=consult.elements.date;const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tbilisi',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));date.min=p.year+'-'+p.month+'-'+p.day;
 const result=document.getElementById('dlg-consultation-result'),draft=document.getElementById('dlg-consultation-draft'),mail=document.getElementById('dlg-consultation-email'),status=document.getElementById('dlg-consultation-status');
 consult.hidden=false;
 consult.addEventListener('submit',e=>{e.preventDefault();if(!consult.reportValidity())return;
 const d=new FormData(consult),matter=consult.elements.matter.selectedOptions[0].textContent.trim();
 const body=[t('გამარჯობა, მსურს კონსულტაციის მოთხოვნა.','Hello, I would like to request a consultation.'),'',t('სახელი: ','Name: ')+d.get('name'),t('ელფოსტა: ','Email: ')+d.get('email'),t('ორგანიზაცია: ','Organisation: ')+(d.get('company')||'-'),t('მიმართულება: ','Matter: ')+matter,t('სასურველი დრო: ','Preferred time: ')+d.get('date')+' '+d.get('time')+' (Asia/Tbilisi)','',t('გთხოვთ, დამიდასტუროთ შეხვედრის შესაძლებლობა.','Please confirm your availability.')].join('\n');
 draft.value=body;mail.href='mailto:digitallawgeorgia@gmail.com?subject='+encodeURIComponent(t('კონსულტაციის მოთხოვნა','Consultation request'))+'&body='+encodeURIComponent(body);status.textContent='';result.hidden=false;document.getElementById('dlg-consultation-heading').focus();
 });
 consult.addEventListener('input',()=>{result.hidden=true;draft.value='';mail.href='mailto:digitallawgeorgia@gmail.com';status.textContent='';});
 document.getElementById('dlg-consultation-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draft.value);status.textContent=t('ტექსტი დაკოპირდა.','Copied.');}catch{draft.focus();draft.select();status.textContent=t('დააკოპირეთ მონიშნული ტექსტი.','Copy the selected text.');}});
}
})();