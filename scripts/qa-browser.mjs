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
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.json':'application/json'};
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
       brand:rect('.law-brand'),nav:rect('.law-nav'),cta:rect('.law-header-cta'),
       heading:rect('.dlg-editorial-hero h1'),brandDirection:getComputedStyle(document.querySelector('.site-header .law-brand-text')).flexDirection,
       navVisible:getComputedStyle(document.querySelector('.law-nav')).display!=='none',
       menuVisible:getComputedStyle(document.querySelector('[data-menu-toggle]')).display!=='none',
       headerColour:getComputedStyle(header).backgroundColor,
       heroColour:getComputedStyle(hero).backgroundColor
     };
   });
   verify(box.docWidth<=width+2,'Horizontal overflow at '+width+'px: '+box.docWidth);
   verify(box.heading&&box.heading.width<=width&&box.heading.height<250,'Hero heading disproportionate at '+width+'px');
   verify(box.brandDirection==='column','Brand lock-up is not vertically aligned at '+width);
   verify(box.header&&box.hero&&Math.abs(box.hero.top-box.header.bottom)<6,'Gap between header and hero at '+width);
   verify(box.headerColour===box.heroColour,'Masthead and hero surfaces do not match at '+width);
   if(width<=1120){
     verify(!box.navVisible&&box.menuVisible,'Responsive menu visibility incorrect at '+width);
     await page.locator('[data-menu-toggle]').click();
     verify(await page.locator('#site-nav').evaluate(x=>x.classList.contains('open')),'Menu did not open at '+width);
     await page.keyboard.press('Escape');
     verify((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='false','Escape did not close menu at '+width);
   }else{
     verify(box.navVisible&&!box.menuVisible,'Desktop navigation visibility incorrect at '+width);
     verify(box.nav&&box.cta&&box.nav.right<box.cta.x+2,'Navigation overlaps CTA at '+width);
   }
   verify((await page.locator('.law-services .law-service').count())===6,'Wrong services count at '+width);
   verify((await page.locator('footer a[href="/#approach"]').count())===1,'Duplicate footer navigation at '+width);
   verify((await page.locator('[data-hero-topic]').count())===4,'Wrong carousel selector count');
   const mainCTA=page.locator('.dlg-editorial-hero .law-button-primary');
   verify((await mainCTA.getAttribute('href'))?.startsWith('mailto:'),'Hero CTA not linked to email');
   await page.locator('[data-hero-topic="privacy"]').click();
   verify(await page.locator('[data-hero-slide="privacy"]').evaluate(x=>x.classList.contains('is-current')),'Carousel privacy tab failed at '+width);
   await page.locator('[data-language="en"]').click();
   verify((await page.locator('h1').innerText()).includes('Legal support for technology businesses'),'English language switch failed at '+width);
   await page.locator('[data-language="ka"]').click();
   verify((await page.locator('h1').innerText()).includes('იურიდიული მხარდაჭერა'),'Georgian language switch failed at '+width);
   const portrait=page.locator('.law-about-image img');
   await portrait.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>{const img=document.querySelector('.law-about-image img');return img&&img.complete&&img.naturalWidth>0;},null,{timeout:8000});
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
 for(const route of ['/services/','/services/contracts/','/services/ai/','/services/digital-products/','/resources/','/scope/','/privacy/']){
   const page=await browser.newPage({viewport:{width:390,height:844}});
   const response=await page.goto(url+route,{waitUntil:'domcontentloaded'});
   verify(response.status()===200,'HTTP failure on '+route);
   verify((await page.locator('h1').count())>=1,'No H1 on '+route);
   const scroll=await page.evaluate(()=>document.documentElement.scrollWidth);
   verify(scroll<=392,'Mobile horizontal overflow on '+route+': '+scroll);
   verify((await page.locator('.site-header').count())===1,'Missing shared header on '+route);
   await page.close();
 }
 console.log('DLG browser QA passed:',checks,'checks across nine viewports and seven internal pages.');
}finally{
 if(browser)await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
