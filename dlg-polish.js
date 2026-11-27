/* Progressive enhancement only. No network access, no hidden content, no motion required. */
(()=>{'use strict';
 const header=document.querySelector('.masthead,.site-header.law-header');
 if(header){let pending=false;const paint=()=>{header.classList.toggle('dlg-scrolled',window.scrollY>16);pending=false;};paint();window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(paint)}},{passive:true});
 const normalise=p=>p.replace(/^\/en(?=\/|$)/,'').replace(/\/+$/,'')||'/';
 const current=normalise(location.pathname);
 if(current!=='/'){let best=null;for(const link of header.querySelectorAll('nav>a[href]')){try{const u=new URL(link.href,location.href),p=normalise(u.pathname);if(u.origin===location.origin&&p!=='/'&&(current===p||current.startsWith(p+'/'))&&(!best||p.length>best[0].length))best=[p,link]}catch{}}
 if(best)best[1].setAttribute('aria-current','page');}
 }
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const animations=new Set();
 const animate=(element,delay=0)=>{if(preference.matches||element.matches(':focus-within'))return;const effect=element.animate([{opacity:.8,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay,easing:'cubic-bezier(.22,.61,.36,1)',fill:'none'});animations.add(effect);effect.onfinish=effect.oncancel=()=>animations.delete(effect)};
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);animate(entry.target)}},{threshold:.13,rootMargin:'0px 0px -10px 0px'});
 const targets=document.querySelectorAll('main .section-head,main .dlg-home-firm-copy,main .dlg-home-founder-card,main .dlg-home-firm-principles,main .dlg-firm-intro,main .dlg-firm-founder-grid,main .dlg-firm-knowledge-grid,main .digital-heading');
 targets.forEach(el=>observer.observe(el));
 const onChange=()=>{if(preference.matches){observer.disconnect();for(const a of animations)a.cancel();animations.clear();}};
 if(preference.addEventListener)preference.addEventListener('change',onChange);
})();