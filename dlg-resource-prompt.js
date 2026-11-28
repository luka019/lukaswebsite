(()=>{'use strict';
const panel=document.getElementById('dlg-readiness-prompt');if(!panel)return;
const key='dlg-readiness-prompt-shown-v1';let shown=false;
try{if(sessionStorage.getItem(key)==='1')return;}catch{}
const remember=()=>{shown=true;try{sessionStorage.setItem(key,'1');}catch{}};
const close=()=>{remember();panel.hidden=true;};
panel.querySelector('.dlg-prompt-close').addEventListener('click',close);
panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',remember));
panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();close();document.querySelector('.dlg-advisory-nav-root')?.focus();}});
function display(){
 if(shown||document.visibilityState!=='visible')return;
 if(document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]:not([hidden]), .nav.open, .law-nav.open, [data-dlg-advisory-toggle][aria-expanded="true"]')||document.activeElement?.matches('input, textarea, select, button[aria-expanded="true"]'))return;
 panel.hidden=false;remember();
}
setTimeout(display,8000);
})();
