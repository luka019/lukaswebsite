/* Atlas: lightweight reading progress; no new dependencies. */
(()=>{'use strict';
 const header=document.querySelector('.masthead,.site-header.law-header');
 if(header){let scheduled=false;const progress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const ratio=max>0?Math.max(0,Math.min(1,scrollY/max)):0;header.style.setProperty('--dlg-reading-progress',String(ratio));scheduled=false};const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress)}};progress();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true})}
})();
