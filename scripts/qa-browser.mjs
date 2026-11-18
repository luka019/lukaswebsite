/* Digital Law Georgia — boutique technology law browser QA.
   Responsive, bilingual and client-contact checks for the current design.
   Tests the locally built site only, never production or an email service. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const root=path.resolve('dist');
const screenshots=path.resolve('qa-screenshots');
fs.mkdirSync(screenshots,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.json':'application/json'};
const server=http.createServer((req,res)=>{
  try{
    const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+requested);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file)&&!path.extname(file))file=path.join(file,'index.html');
    if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
  }catch(error){res.writeHead(500).end('Server error');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port;
let browser,checks=0;
function check(value,message){checks++;assert.ok(value,message)}
async function overflow(page,width,route){
  const extent=await page.evaluate(()=>document.documentElement.scrollWidth);
  check(extent<=width+2,'Horizontal overflow at '+width+'px on '+route+': '+extent);
}
try{
  browser=await chromium.launch({headless:true});
  for(const width of [320,375,390,768,1024,1120,1280,1440,1920]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    const response=await page.goto(base+'/',{waitUntil:'networkidle'});
    check(response.status()===200,'Homepage HTTP error at '+width);
    await page.locator('.sig-hero h1').waitFor();
    await overflow(page,width,'/');
    const geometry=await page.evaluate(()=>{
      const rect=selector=>{const el=document.querySelector(selector);if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
      return {
        header:rect('.site-header'),hero:rect('.sig-hero'),heading:rect('.sig-hero h1'),
        image:rect('.dlg-building-photo'),brand:rect('.law-brand'),nav:rect('.law-nav'),
        cta:rect('.law-header-cta'),
        navVisible:getComputedStyle(document.querySelector('.law-nav')).display!=='none',
        menuVisible:getComputedStyle(document.querySelector('[data-menu-toggle]')).display!=='none',
        paper:getComputedStyle(document.querySelector('.sig-hero')).backgroundColor,
        bodyColour:getComputedStyle(document.querySelector('.sig-hero h1')).color
      };
    });
    check(geometry.header&&geometry.hero&&Math.abs(geometry.hero.top-geometry.header.bottom)<6,'Header-to-hero gap at '+width);
    check(geometry.heading&&geometry.heading.width<=width&&geometry.heading.height<380,'Heading overflow at '+width);
    check(geometry.image&&geometry.image.width>100,'Approved building photograph invisible at '+width);
    check(geometry.paper==='rgb(16, 42, 72)','Approved navy hero not applied at '+width+': '+geometry.paper);
    check(geometry.bodyColour==='rgb(255, 255, 255)','Hero headline contrast against navy failed at '+width+': '+geometry.bodyColour);
    check((await page.locator('.sig-service-row').count())===8,'Expected eight legal practice rows at '+width);
    check((await page.locator('.sig-service-row a[href^="/services/"]').count())>=8,'Service destination links missing at '+width);
    check((await page.locator('.atelier-service-symbol svg').count())===8,'Subtle practice-area drawings missing at '+width);
    check((await page.locator('.dlg-solution').count())===4,'Four defined legal solutions missing at '+width);
    check((await page.locator('.dlg-hero-practice-links a').count())===4,'Hero specialist links missing at '+width);
    check((await page.locator('[data-dlg-slide]').count())===4,'Four carousel visuals missing at '+width);
    check((await page.locator('[data-dlg-slide-to]').count())===4,'Four manual slide controls missing at '+width);
    check((await page.locator('[data-dlg-slide].is-active').count())===1,'Exactly one active visual expected at '+width);
    check((await page.locator('[data-dlg-count]').innerText()).trim()==='01 / 04','Initial carousel slide indicator wrong at '+width);
    check((await page.locator('.sig-process-step').count())===3,'Client process missing at '+width);
    check((await page.locator('a[href="mailto:digitallawgeorgia@gmail.com"]').count())>=1,'Contact email missing at '+width);
    check((await page.locator('a[href^="https://wa.me/995598451132"]').count())>=1,'WhatsApp contact missing at '+width);
    check((await page.locator('.sig-hero .sig-button-primary').getAttribute('href'))==='#contact','Hero CTA does not lead to contact at '+width);
    check(await page.locator('.dlg-building-photo').evaluate(img=>img.complete&&img.naturalWidth>0),'Original architectural photograph did not load at '+width);
    check(await page.locator('[data-dlg-slide=""] img').count()===0 || (await page.locator('[data-dlg-slide] img').count())===4,'All four local slide images required at '+width);
    if(width===1440){
      await page.locator('[data-dlg-next]').click();
      check((await page.locator('[data-dlg-count]').innerText()).trim()==='02 / 04','Next slide control failed');
      check((await page.locator('[data-dlg-slide-to="1"]').getAttribute('aria-pressed'))==='true','Next slide indicator not selected');
      await page.locator('[data-dlg-slide-to="3"]').click();
      check((await page.locator('[data-dlg-count]').innerText()).trim()==='04 / 04','Direct slide selection failed');
      await page.locator('[data-dlg-prev]').click();
      check((await page.locator('[data-dlg-count]').innerText()).trim()==='03 / 04','Previous slide control failed');
      await page.locator('[data-dlg-slide-to="0"]').click();
      check((await page.locator('[data-dlg-count]').innerText()).trim()==='01 / 04','Restoring architecture slide failed');
    }
    check(await page.locator('.dlg-about-portrait img').evaluate(img=>img.complete&&img.naturalWidth>0),'Founder portrait did not load at '+width);
    if(width<=700){
      check(!geometry.navVisible&&geometry.menuVisible,'Mobile navigation visibility failed at '+width);
      await page.locator('[data-menu-toggle]').click();
      check((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='true','Mobile menu did not open at '+width);
      await page.keyboard.press('Escape');
      check((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='false','Escape did not close menu at '+width);
    }else{
      check(geometry.navVisible&&!geometry.menuVisible,'Desktop navigation visibility failed at '+width);
      check(geometry.nav&&geometry.cta&&(geometry.nav.right<=geometry.cta.x+3||geometry.nav.top>=geometry.cta.bottom-2),'Desktop navigation overlaps contact CTA at '+width);
      check(geometry.heading.right<=geometry.image.x+5,'Building photograph overlaps hero heading at '+width);
    }
    if([320,390,768,1440,1920].includes(width)){
      await page.screenshot({path:path.join(screenshots,'dlg-photographic-home-'+width+'.png'),fullPage:true,animations:'disabled'});
    }
    await page.locator('[data-language="en"]').click();
    await page.waitForURL('**/en/');
    await page.locator('.sig-hero h1').waitFor();
    check((await page.locator('html').getAttribute('lang'))==='en','English language code failed at '+width);
    check((await page.locator('.sig-hero h1').innerText()).includes('Legal counsel'),'English hero missing at '+width);
    check((await page.locator('.sig-service-row').count())===8,'English legal services missing at '+width);
    await overflow(page,width,'/en/');
    await page.locator('[data-language="ka"]').click();
    await page.waitForURL(base+'/');
    check((await page.locator('.sig-hero h1').innerText()).includes('იურიდიული მომსახურება'),'Georgian language switch failed at '+width);
    check(errors.length===0,'JavaScript error at '+width+': '+errors.join('; '));
    await page.close();
    console.log('PASS boutique homepage and bilingual navigation: '+width+'px');
  }
  const paths=[
    '/services/','/services/ai/','/services/data-protection/','/services/contracts/',
    '/services/digital-products/','/services/intellectual-property/','/services/cyber-digital-risk/',
    '/services/fintech/','/services/virtual-assets/','/services/startups-investment/',
    '/services/georgia-market-entry/','/services/legal-operations/',
    '/business/','/business/georgia/','/business/international/','/about/','/resources/','/privacy/',
    '/solutions/','/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/',
    '/en/services/','/en/services/startups-investment/','/en/about/'
  ];
  for(const route of paths){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    check(response.status()===200,'Route HTTP error: '+route);
    check((await page.locator('h1').count())===1,'Missing or multiple H1: '+route);
    check((await page.locator('.site-header').count())===1,'Missing site header: '+route);
    await overflow(page,390,route);
    check((await page.locator('meta[name="description"]').getAttribute('content')).length>15,'Missing meta description: '+route);
    if(route.startsWith('/en/'))check((await page.locator('html').getAttribute('lang'))==='en','English route is not pre-rendered: '+route);
    await page.close();
  }
  const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await noJs.goto(base+'/en/',{waitUntil:'networkidle'});
  check((await noJs.locator('html').getAttribute('lang'))==='en','English no-JS HTML language failed');
  check((await noJs.locator('.sig-hero h1').innerText()).includes('Legal counsel'),'English content requires JavaScript');
  check((await noJs.locator('.sig-service-row').count())===8,'No-JS service directory incomplete');
  await noJs.close();
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto(base+'/',{waitUntil:'networkidle'});
  check((await reduced.locator('.sig-hero h1').isVisible()),'Reduced motion hides the hero');
  check((await reduced.locator('.sig-service-row').count())===8,'Reduced motion hides services');
  check((await reduced.locator('[data-dlg-count]').innerText()).trim()==='01 / 04','Reduced motion should retain initial slide');
  await reduced.locator('[data-dlg-next]').click();
  check((await reduced.locator('[data-dlg-count]').innerText()).trim()==='02 / 04','Reduced motion must permit manual slide changes');
  await reduced.close();
  console.log('DLG photographic boutique browser QA passed: '+checks+' checks across nine viewports and '+paths.length+' interior pages.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
