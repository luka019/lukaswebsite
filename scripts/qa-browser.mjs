/* DLG viewport and functional QA for the approved visual design.
   Runs locally in CI without accessing production or any private service. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const root=path.resolve('dist');
const shots=path.resolve('qa-screenshots');
fs.mkdirSync(shots,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.json':'application/json'};
const server=http.createServer((req,res)=>{
  try {
    const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+requested);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file)&&!path.extname(file))file=path.join(file,'index.html');
    if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
  } catch(err){res.writeHead(500).end('Server error');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port;
let browser,checks=0;
function verify(value,message){checks++;assert.ok(value,message)}
try{
 browser=await chromium.launch({headless:true});
 for(const width of [320,375,390,768,1024,1120,1280,1440,1920]){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url+'/',{waitUntil:'domcontentloaded'});
   await page.locator('.dlg-editorial-hero h1').waitFor();
   const box=await page.evaluate(()=>{
     const rect=s=>{const r=document.querySelector(s)?.getBoundingClientRect();return r?{x:r.x,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}:null};
     const header=document.querySelector('.site-header'),hero=document.querySelector('.dlg-editorial-hero');
     return {
       docWidth:document.documentElement.scrollWidth,screenWidth:innerWidth,
       header:rect('.site-header'),hero:rect('.dlg-editorial-hero'),
       brand:rect('.law-brand'),nav:rect('.law-nav'),cta:rect('.law-header-cta'),visual:rect('.dlg-photo-feature'),
       heading:rect('.dlg-editorial-hero h1'),brandDirection:getComputedStyle(document.querySelector('.site-header .law-brand-text')).flexDirection,
       navVisible:getComputedStyle(document.querySelector('.law-nav')).display!=='none',
       menuVisible:getComputedStyle(document.querySelector('[data-menu-toggle]')).display!=='none',
       headerColour:getComputedStyle(header).backgroundColor,
       heroColour:getComputedStyle(hero).backgroundColor
     };
   });
   verify(box.docWidth<=width+2,'Horizontal overflow at '+width+'px: '+box.docWidth);
   console.log('VIEWPORT geometry',width,JSON.stringify({heading:box.heading,header:box.header,hero:box.hero,nav:box.nav,cta:box.cta}));
   verify(box.heading&&box.heading.width<=width&&box.heading.height<270,'Hero heading disproportionate at '+width+'px: '+JSON.stringify(box.heading));
   verify(box.brandDirection==='column','Brand lock-up is not vertically aligned at '+width);
   verify(box.header&&box.hero&&Math.abs(box.hero.top-box.header.bottom)<6,'Gap between header and hero at '+width);
   verify(box.headerColour!==box.heroColour,'White masthead must contrast with navy hero at '+width);
   if(width<=700){
     verify(!box.navVisible&&box.menuVisible,'Responsive menu visibility incorrect at '+width);
     await page.locator('[data-menu-toggle]').click();
     verify(await page.locator('#site-nav').evaluate(x=>x.classList.contains('open')),'Menu did not open at '+width);
     await page.keyboard.press('Escape');
     verify((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='false','Escape did not close menu at '+width);
   }else{
     verify(box.navVisible&&!box.menuVisible,'Desktop navigation visibility incorrect at '+width);
     verify(box.nav&&box.cta&&(box.nav.right<=box.cta.x+2||box.nav.top>=box.cta.bottom-2),'Navigation overlaps CTA at '+width);
     verify(box.visual&&box.heading&&(box.heading.right<=box.visual.x+2),'Hero text overlaps artwork at '+width);
   }
   verify((await page.locator('.law-services .law-service').count())===6,'Wrong services count at '+width);
   if(width<=700){
     const reasons=await page.locator('.dlg-why-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
     verify(reasons===1,'Four reasons must be one column at '+width+'px, got '+reasons);
     const arrows=await page.evaluate(()=>{
       const a=document.querySelector('.dlg-photo-arrow-prev')?.getBoundingClientRect();
       const title=document.querySelector('.dlg-photo-slide.is-current .dlg-photo-caption strong')?.getBoundingClientRect();
       return {arrowBottom:a?.bottom,titleTop:title?.top};
     });
     verify(arrows.arrowBottom<=arrows.titleTop,'Carousel controls overlap slide title at '+width+'px');
   }
   verify((await page.locator('footer a[href="/how-we-work/"]').count())===1,'Duplicate footer navigation at '+width);
   verify((await page.locator('[data-hero-topic]').count())===4,'Wrong carousel selector count');
   const mainCTA=page.locator('.dlg-editorial-hero .law-button-primary');
   verify((await mainCTA.getAttribute('href'))==='#contact','Hero CTA must lead to contact options');
   await page.locator('[data-hero-pause]').click();
   verify((await page.locator('[data-hero-rotator]').getAttribute('data-motion-paused'))==='true','Pause does not stop decorative motion at '+width);
   await page.locator('[data-hero-topic="privacy"]').click();
   verify(await page.locator('[data-hero-slide="privacy"]').evaluate(x=>x.classList.contains('is-current')),'Carousel privacy tab failed at '+width);
   await page.locator('[data-language="en"]').click();
   verify((await page.locator('h1').innerText()).includes('Legal clarity for'),'English language switch failed at '+width);
   await page.locator('[data-lens-controls]').waitFor({state:'visible'});
   await page.locator('[data-lens-choice="data-protection"]').click();
   verify(await page.locator('[data-lens-panel="data-protection"]').isVisible(),'English legal explorer did not activate at '+width);
   verify((await page.locator('[data-lens-panel]:visible').count())===1,'English explorer must show one panel at '+width);
   verify((await page.locator('[data-lens-panel="data-protection"] a').getAttribute('href'))==='/en/services/data-protection/','English explorer loses localized link at '+width);
   verify((await page.locator('[data-hero-pause]').getAttribute('aria-label')).includes('animations'),'English hero script did not initialize at '+width);
   if(width<=700){
     await page.locator('[data-menu-toggle]').click();
     verify((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='true','English mobile menu does not open at '+width);
     await page.keyboard.press('Escape');
   }
   await page.locator('[data-language="ka"]').click();
   verify((await page.locator('h1').innerText()).includes('იურიდიული მომსახურება'),'Georgian language switch failed at '+width);
   verify(await page.locator('.firm-photo img').evaluate(img=>img.complete&&img.naturalWidth>0),'Architectural photograph missing at '+width);
   verify(await page.locator('[data-lens-controls]').isVisible(),'Legal lens controls missing at '+width);
   await page.locator('[data-lens-choice="ai"]').click();
   verify(await page.locator('[data-lens-panel="ai"]').isVisible(),'AI lens panel did not open at '+width);
   verify((await page.locator('[data-lens-panel]:visible').count())===1,'Lens must show one panel at '+width);
   verify((await page.locator('[data-lens-panel="ai"] a').getAttribute('href'))==='/services/ai/','AI lens links to wrong service at '+width);
   await page.locator('[data-lens-choice="ai"]').press('Home');
   verify((await page.locator('[data-lens-choice="contracts"]').getAttribute('aria-pressed'))==='true','Lens Home keyboard navigation failed at '+width);
   verify(await page.locator('[data-lens-panel="contracts"]').isVisible(),'Keyboard selection did not switch lens content at '+width);
   if((await page.locator('[data-hero-rotator]').getAttribute('data-motion-paused'))!=='true')await page.locator('[data-hero-pause]').click();
   verify((await page.locator('html').getAttribute('data-motion-paused'))==='true','Global motion preference missing at '+width);
   const portrait=page.locator('.law-about-image img');
   await portrait.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>{const img=document.querySelector('.law-about-image img');return img&&img.complete&&img.naturalWidth>0;},null,{timeout:8000});
   for(const img of await page.locator('.resource-cover img').all())await img.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>[...document.querySelectorAll('.resource-cover img')].every(img=>img.complete&&img.naturalWidth>0));
   verify(await page.locator('.resource-cover img').count()===3,'Resource illustrations missing at '+width);
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(80);
   if([320,390,768,1440,1920].includes(width)){
     await page.screenshot({path:path.join(shots,'homepage-'+width+'.png'),fullPage:true,animations:'disabled'});
   }
   await page.evaluate(()=>window.scrollTo({top:700,behavior:'instant'}));
   await page.waitForFunction(()=>document.querySelector('.site-header')?.classList.contains('dlg-scrolled'),null,{timeout:3000});
   verify(await page.locator('.site-header').evaluate(x=>x.classList.contains('dlg-scrolled')),'Sticky header does not transition at '+width);
   verify(errors.length===0,'JavaScript errors at '+width+': '+errors.join('; '));
   await page.close();
   console.log('PASS responsive masthead, carousel, services and language:',width+'px');
 }
 for(const route of ['/services/','/services/contracts/','/services/ai/','/services/digital-products/','/resources/','/scope/','/privacy/','/business/','/business/georgia/','/business/international/','/business/growing-business/','/about/','/services/legal-operations/','/en/business/international/','/en/about/']){
   const page=await browser.newPage({viewport:{width:390,height:844}});
   const response=await page.goto(url+route,{waitUntil:'domcontentloaded'});
   verify(response.status()===200,'HTTP failure on '+route);
   verify((await page.locator('h1').count())>=1,'No H1 on '+route);
   const scroll=await page.evaluate(()=>document.documentElement.scrollWidth);
   verify(scroll<=392,'Mobile horizontal overflow on '+route+': '+scroll);
   verify((await page.locator('.site-header').count())===1,'Missing shared header on '+route);
   await page.close();
 }
 const staticEnglish=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await staticEnglish.goto(url+'/en/business/international/');
 verify((await staticEnglish.locator('h1').innerText()).includes('International Expansion'),'English content requires JavaScript');
 verify((await staticEnglish.locator('html').getAttribute('lang'))==='en','Wrong static document language');
 verify((await staticEnglish.locator('a[href="/en/services/contracts/"]').count())>0,'English internal links lose language');
 await staticEnglish.close();
 const staticHome=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await staticHome.goto(url+'/en/');
 verify((await staticHome.locator('[data-lens-panel]:visible').count())===4,'All lens content must remain readable without JavaScript');
 verify(!(await staticHome.locator('[data-lens-controls]').isVisible()),'Inactive no-JavaScript controls should be hidden');
 verify((await staticHome.locator('[data-lens-panel="product"] a').getAttribute('href'))==='/en/services/digital-products/','Static lens link loses language');
 await staticHome.close();
 const reduced=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});
 await reduced.goto(url+'/');
 verify((await reduced.locator('html').getAttribute('data-motion-paused'))==='true','Reduced motion must pause the hero');
 verify(await reduced.locator('.lens-map>svg').evaluate(svg=>svg.animationsPaused()),'Reduced motion must pause SVG animation');
 verify((await reduced.locator('.lens-panel:visible').evaluate(el=>getComputedStyle(el).animationName))==='none','Reduced motion must stop panel transition');
 verify((await reduced.locator('[data-reveal]').first().evaluate(el=>getComputedStyle(el).opacity))==='1','Reduced motion must keep content visible');
 await reduced.close();
 console.log('DLG browser QA passed:' ,checks,'checks across nine viewports, fifteen internal pages, static English and reduced motion.');
}finally{
 if(browser)await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
