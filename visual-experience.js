/* Progressive enhancements: the content and every service link work without JS. */
(() => {
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 const paused=()=>reduced.matches||document.documentElement.dataset.motionPaused==='true';
 const items=[...document.querySelectorAll('[data-reveal]')];
 if('IntersectionObserver' in window&&!reduced.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}
  }),{threshold:.07,rootMargin:'0px 0px -20px 0px'});
  document.documentElement.classList.add('visual-ready');
  items.forEach(item=>observer.observe(item));
 }
 const lens=document.querySelector('[data-legal-lens]');
 if(lens){
  const controls=lens.querySelector('[data-lens-controls]');
  const choices=[...lens.querySelectorAll('[data-lens-choice]')];
  const panels=[...lens.querySelectorAll('[data-lens-panel]')];
  const signal=lens.querySelector('animateMotion');
  const routes={contracts:'M100 80C194 80 165 220 260 220','data-protection':'M420 80C335 80 340 220 260 220',product:'M100 360C194 360 165 220 260 220',ai:'M420 360C335 360 340 220 260 220'};
  function choose(id){
   lens.dataset.active=id;
   choices.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lensChoice===id)));
   panels.forEach(panel=>{panel.hidden=panel.dataset.lensPanel!==id;});
   signal?.setAttribute('path',routes[id]);
  }
  controls.hidden=false;choose('contracts');
  choices.forEach((button,i)=>{
   button.addEventListener('click',()=>choose(button.dataset.lensChoice));
   button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%choices.length;
    if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i+choices.length-1)%choices.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=choices.length-1;
    if(next!==undefined){event.preventDefault();choices[next].focus();choose(choices[next].dataset.lensChoice);}
   });
  });
 }
 const sculpture=document.querySelector('[data-fine-tilt]');
 if(sculpture){
  let frame=0,point=null;
  const reset=()=>{point=null;sculpture.style.removeProperty('--tilt-x');sculpture.style.removeProperty('--tilt-y');};
  sculpture.addEventListener('pointermove',event=>{
   if(!fine.matches||paused())return;
   point={x:event.clientX,y:event.clientY};
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    if(point&&!paused()){
     const rect=sculpture.getBoundingClientRect();
     sculpture.style.setProperty('--tilt-x',((point.y-rect.top)/rect.height-.5)*-4+'deg');
     sculpture.style.setProperty('--tilt-y',((point.x-rect.left)/rect.width-.5)*5+'deg');
    }
    frame=0;
   });
  },{passive:true});
  sculpture.addEventListener('pointerleave',reset);
  reduced.addEventListener('change',reset);
 }
 // SVG SMIL follows the same pause preference as decorative CSS motion.
 const syncMotion=()=>document.querySelectorAll('.lens-map svg').forEach(svg=>{
  if(paused())svg.pauseAnimations?.();else svg.unpauseAnimations?.();
 });
 syncMotion();reduced.addEventListener('change',syncMotion);
 new MutationObserver(syncMotion).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion-paused']});
})();
