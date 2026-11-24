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
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    const response=await page.goto(base+'/',{waitUntil:'networkidle'});
    check(response.status()===200,'Homepage HTTP error at '+width);
    await page.locator('.ed-hero h1').waitFor();await overflow(page,width,'/');
    check((await page.locator('h1').count())===1,'One headline required');
    check((await page.locator('.ed-main section').count())===6,'Six sections required');
    check((await page.locator('.ed-practice').count())===6,'Six practice links required');
    check((await page.locator('.ed-advisory-row').count())===3,'Three advisory services required');
    check((await page.locator('.ed-resources .resource-card').count())===2,'Two published insights required');
    check(await page.locator('.ed-photo img').evaluate(img=>img.complete&&img.naturalWidth>0),'Hero image did not load');
    await page.locator('.ed-founder img').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const img=document.querySelector('.ed-founder img');return img.complete&&img.naturalWidth>0;});
    check(await page.locator('.ed-founder img').isVisible(),'Founder portrait missing');
    check(await page.locator('.ed-hero').evaluate(el=>getComputedStyle(el).backgroundColor)==='rgb(16, 42, 72)','Navy hero missing');
    check(await page.locator('.ed-hero h1').evaluate(el=>getComputedStyle(el).color)==='rgb(255, 255, 255)','Hero contrast');
    check(await page.locator('.ed-expertise').evaluate(el=>getComputedStyle(el).backgroundColor)==='rgb(244, 242, 237)','Ivory expertise background missing');
    check(await page.locator('.ed-expertise h2').evaluate(el=>getComputedStyle(el).color)==='rgb(24, 50, 76)','Expertise heading contrast');
    check((await page.locator('.ed-hero .ed-button').getAttribute('href'))==='#contact','Contact anchor missing');
    check((await page.locator('.ed-contact a[href="mailto:digitallawgeorgia@gmail.com"]').count())===1,'Email action missing');
    check(!(await page.locator('.ed-main').innerText()).includes('₾'),'No public prices');
    const g=await page.evaluate(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,right:r.right,top:r.top,bottom:r.bottom,height:r.height}};return{hero:box('.ed-hero'),head:box('.ed-hero h1'),image:box('.ed-photo img'),menu:getComputedStyle(document.querySelector('[data-menu-toggle]')).display,nav:getComputedStyle(document.querySelector('.site-nav')).display};});
    if(width>760)check(g.head.right<=g.image.x+3,'Hero heading overlaps photo at '+width);
    else check(g.head.bottom<=g.image.top+3,'Stacked hero overlap at '+width);
    if(width>=1280)check(g.hero.height<800,'Oversized hero');
    if(width<=700){check(g.menu!=='none','Mobile menu missing');await page.locator('[data-menu-toggle]').click();check((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='true','Mobile menu did not open');await page.locator('[data-menu-toggle]').click();check((await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'))==='false','Mobile menu did not close');}
    else check(g.nav!=='none','Desktop navigation missing');
    if([320,390,768,1440,1920].includes(width)){await page.evaluate(()=>{document.activeElement?.blur?.();window.scrollTo(0,0)});await page.screenshot({path:path.join(screenshots,'dlg-editorial-home-'+width+'.png'),fullPage:true,animations:'disabled'});}
    await page.locator('[data-language="en"]').click();await page.waitForURL('**/en/');
    check((await page.locator('html').getAttribute('lang'))==='en','English language code failed');
    check((await page.locator('.ed-hero h1').innerText()).includes('Law for the technology economy.'),'English heading missing');
    check((await page.locator('.ed-practice').count())===6,'English practice links missing');
    check((await page.locator('.ed-advisory-row').count())===3,'English advisory services missing');
    await overflow(page,width,'/en/');
    await page.locator('[data-language="ka"]').click();await page.waitForURL(base+'/');
    check((await page.locator('.ed-hero h1').innerText()).includes('სამართალი ტექნოლოგიური ბიზნესისთვის.'),'Georgian switch failed');
    check(errors.length===0,'JavaScript error at '+width+': '+errors.join('; '));
    await page.close();console.log('PASS editorial bilingual homepage: '+width+'px');
  }
  const paths=[
    '/services/','/services/ai/','/services/data-protection/','/services/contracts/',
    '/services/digital-products/','/services/intellectual-property/','/services/cyber-digital-risk/',
    '/services/fintech/','/services/virtual-assets/','/services/startups-investment/',
    '/services/georgia-market-entry/','/services/legal-operations/',
    '/business/','/business/georgia/','/business/international/','/about/','/resources/','/privacy/',
    '/solutions/','/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/',
    '/en/services/','/en/services/startups-investment/','/en/about/',
    '/advisory/','/advisory/ai-readiness/','/advisory/ai-governance-implementation/','/advisory/external-ai-technology-counsel/','/en/advisory/','/en/advisory/ai-readiness/','/en/advisory/ai-governance-implementation/','/en/advisory/external-ai-technology-counsel/'
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
  check((await noJs.locator('html').getAttribute('lang'))==='en','English no-JS language failed');
  check((await noJs.locator('.ed-hero h1').innerText()).includes('Law for the technology economy.'),'English must work without JavaScript');
  check((await noJs.locator('.ed-practice').count())===6,'No-JS practice links missing');
  check((await noJs.locator('.ed-advisory-row').count())===3,'No-JS advisory links missing');
  await noJs.close();
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto(base+'/',{waitUntil:'networkidle'});
  check(await reduced.locator('.ed-hero h1').isVisible(),'Reduced motion hides hero');
  check((await reduced.locator('.ed-practice').count())===6,'Reduced motion hides practice links');
  await reduced.close();
  console.log('DLG editorial browser QA passed: '+checks+' checks across nine viewports and '+paths.length+' interior pages.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
