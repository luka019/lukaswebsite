(()=>{'use strict';
const panel=document.getElementById('dlg-readiness-prompt');if(!panel)return;
const key='dlg-readiness-prompt-shown-v1';let shown=false;
try{if(sessionStorage.getItem(key)==='1')return;}catch{}
const remember=()=>{shown=true;try{sessionStorage.setItem(key,'1');}catch{}};
const close=()=>{remember();panel.hidden=true;};
panel.querySelector('.dlg-prompt-close').addEventListener('click',close);
panel.querySelector('a').addEventListener('click',remember);
panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();close();document.querySelector('#business-tools a')?.focus();}});
function display(){
 if(shown||document.visibilityState!=='visible')return;
 if(document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]:not([hidden])')||document.activeElement?.matches('input, textarea, select, button[aria-expanded="true"]'))return;
 panel.hidden=false;remember();
}
setTimeout(display,6500);
})();
