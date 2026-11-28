/* Native dialog and local catalogue search. No analytics, network requests or stored query. */
(()=>{'use strict';
 const dialog=document.getElementById('dlg-legal-finder');
 if(!dialog||typeof dialog.showModal!=='function')return;
 const triggers=[...document.querySelectorAll('[data-dlg-finder-open]')];
 const input=dialog.querySelector('#dlg-finder-input'),filters=[...dialog.querySelectorAll('[data-dlg-filter]')],items=[...dialog.querySelectorAll('.dlg-finder-result')],status=dialog.querySelector('.dlg-finder-status'),empty=dialog.querySelector('.dlg-finder-empty'),scroller=dialog.querySelector('.dlg-finder-scroll');
 if(!input||!status||!empty||!scroller||!filters.length||!items.length)return;
 const english=document.documentElement.lang==='en';
 const normalise=value=>String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\s\p{P}]+/gu,' ').trim();
 const words=items.map(item=>normalise(item.dataset.dlgSearch));
 let category='all',opener=null;
 function update(){
  const query=normalise(input.value).split(' ').filter(Boolean);
  let count=0;
  items.forEach((item,i)=>{const visible=(category==='all'||item.dataset.dlgKind===category)&&query.every(word=>words[i].includes(word));item.hidden=!visible;if(visible)count++;});
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.dlgFilter===category)));
  empty.hidden=count!==0;
  status.textContent=english?count+' matching '+(count===1?'result':'results'):'ნაპოვნია '+count+' მიმართულება';
  scroller.scrollTop=0;
 }
 function openFinder(button){if(dialog.open)return;opener=button;input.value='';category='all';update();dialog.showModal();input.focus();}
 triggers.forEach(button=>{button.hidden=false;button.addEventListener('click',()=>openFinder(button));});
 dialog.querySelectorAll('[data-dlg-finder-suggestion]').forEach(button=>button.addEventListener('click',()=>{category='all';input.value=button.dataset.dlgFinderSuggestion;update();input.focus();}));
 document.addEventListener('keydown',event=>{if(!(event.ctrlKey||event.metaKey)||event.altKey||event.shiftKey||event.key.toLowerCase()!=='k'||dialog.open||document.querySelector('dialog[open]')||document.activeElement?.matches('input, textarea, [contenteditable=true]'))return;const trigger=triggers.find(button=>button.getClientRects().length);if(trigger){event.preventDefault();openFinder(trigger);}});
 input.addEventListener('input',update);
 filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.dlgFilter;update();}));
 const close=dialog.querySelector('[data-dlg-finder-close]');
 if(close)close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{input.value='';category='all';update();if(opener&&opener.isConnected)opener.focus();opener=null;});
 update();
})();