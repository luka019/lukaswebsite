/* Atlas: ordinary links with an optional visual preview; no new dependencies. */
(()=>{'use strict';
 const header=document.querySelector('.masthead,.site-header.law-header');
 if(header){let scheduled=false;const progress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const ratio=max>0?Math.max(0,Math.min(1,scrollY/max)):0;header.style.setProperty('--dlg-reading-progress',String(ratio));scheduled=false};const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress)}};progress();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true})}
 const stage=document.querySelector('.dlg-practice-stage');
 const links=Array.from(document.querySelectorAll('.dlg-practice-explorer .practice-card'));
 if(!stage||!links.length)return;
 const img=stage.querySelector('img'),title=stage.querySelector('.dlg-stage-title'),summary=stage.querySelector('.dlg-stage-summary'),index=stage.querySelector('.dlg-stage-index');
 if(!img||!title||!summary||!index)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let active=-1;
 function select(i){if(i===active||!links[i])return;active=i;const link=links[i];links.forEach((el,j)=>el.classList.toggle('dlg-preview-active',j===i));index.textContent=String(i+1).padStart(2,'0')+' / '+String(links.length).padStart(2,'0');title.textContent=link.querySelector('h3').textContent.trim();summary.textContent=link.querySelector('p').textContent.trim();const src=link.dataset.practicePreview;if(src&&img.getAttribute('src')!==src){img.classList.remove('dlg-stage-change');img.src=src;if(!reduce.matches){requestAnimationFrame(()=>{if(active===i)img.classList.add('dlg-stage-change')})}}}
 const large=matchMedia('(min-width: 960px)');
 function sync(){if(large.matches){active=-1;select(0)}else{active=-1;links.forEach(el=>el.classList.remove('dlg-preview-active'))}}
 links.forEach((link,i)=>{link.addEventListener('pointerenter',()=>{if(large.matches)select(i)});link.addEventListener('focus',()=>{if(large.matches)select(i)})});
 if(large.addEventListener)large.addEventListener('change',sync);sync();
})();