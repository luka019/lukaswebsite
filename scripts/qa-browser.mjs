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
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[],requests=[];page.on('pageerror',error=>errors.push(error.message));page.on('request',r=>requests.push(r.url()));
    const response=await page.goto(base+'/',{waitUntil:'networkidle'});
    check(response.status()===200,'Homepage HTTP error');
    await overflow(page,width,'/');
    check((await page.locator('.practice-card').count())===6,'Six practice cards missing');
    check(await page.locator('.hero-photo img').evaluate(i=>i.complete&&i.naturalWidth>0),'Architecture image failed');
    check((await page.locator('.practice-glyph').count())===6,'Six functional icons required');
    check((await page.locator('#stage-deliverables li').count())===3,'Advisory deliverables missing');
    check((await page.locator('#sector-matters li').count())===3,'Sector matters missing');
    const advisorySlugs=['ai-readiness','ai-governance-implementation','legal-ai-automation','external-ai-technology-counsel'];
    for(let i=0;i<4;i++){await page.locator('[data-tab="'+i+'"]').click();check((await page.locator('#stage-link').getAttribute('href'))==='/advisory/'+advisorySlugs[i]+'/','Advisory link incorrect');check((await page.locator('#stage-deliverables li').count())===3,'Advisory deliverables missing on tab '+i);}
    const sectorSlugs=['technology','financial-services','commerce','legal-teams','startups-investors'];
    for(let i=0;i<5;i++){await page.locator('[data-sector="'+i+'"]').click();check((await page.locator('.sector-link').getAttribute('href'))==='/business/sectors/'+sectorSlugs[i]+'/','Sector link incorrect');check((await page.locator('#sector-matters li').count())===3,'Sector matters missing on tab '+i);}
    await page.locator('[data-filter="ai"]').click();check((await page.locator('.article:visible').count())===1,'Topic filter failed');
    await page.locator('[data-filter="all"]').click();check((await page.locator('.article:visible').count())===3,'Article reset failed');
    if(width<=920){await page.locator('.menu-btn').click();check(await page.locator('.nav').isVisible(),'Mobile navigation failed');await page.locator('.menu-btn').click();}
    const form=page.locator('#enquiry-form');await form.locator('[name="name"]').fill('Test User');await form.locator('[name="email"]').fill('test@example.invalid');await form.locator('[name="area"]').selectOption({index:1});await form.locator('[name="matter"]').fill('Test enquiry. Do not send.');
    const before=requests.length;await form.locator('button[type="submit"]').click();
    check(await page.locator('#enquiry-result').isVisible(),'Local enquiry draft missing');check((await page.locator('#enquiry-mailto').getAttribute('href')).includes('test%40example.invalid'),'Email draft missing input');check(requests.length===before,'Enquiry form must not initiate a network request');
    await page.locator('[data-language-link="en"]').click();await page.waitForURL(base+'/en/');
    check((await page.locator('html').getAttribute('lang'))==='en','English language link failed');
    check((await page.locator('h1').innerText()).includes('Legal counsel'),'English headline missing');
    await page.locator('[data-tab="2"]').click();check((await page.locator('#stage-link').getAttribute('href'))==='/en/advisory/legal-ai-automation/','English advisory route failed');
    await page.locator('[data-language-link="ka"]').click();await page.waitForURL(base+'/');
    await overflow(page,width,'/');check(errors.length===0,'Page script errors '+errors.join('; '));
    if([390,1440].includes(width))await page.screenshot({path:path.join(screenshots,'home-'+width+'.png'),fullPage:true});
    await page.close();
  }
  const paths=[
    '/services/','/services/ai/','/services/data-protection/','/services/contracts/',
    '/services/digital-products/','/services/intellectual-property/','/services/cyber-digital-risk/',
    '/services/fintech/','/services/virtual-assets/','/services/startups-investment/',
    '/services/georgia-market-entry/','/services/legal-operations/',
    '/business/','/business/georgia/','/business/international/','/about/','/resources/','/privacy/',
    ...['technology','financial-services','commerce','startups-investors','international','legal-teams'].flatMap(slug=>['/business/sectors/'+slug+'/','/en/business/sectors/'+slug+'/']),
    '/solutions/','/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/',
    '/en/services/','/en/services/startups-investment/','/en/about/',
    '/advisory/','/advisory/ai-readiness/','/advisory/ai-governance-implementation/','/advisory/external-ai-technology-counsel/','/en/advisory/','/en/advisory/ai-readiness/','/en/advisory/ai-governance-implementation/','/en/advisory/external-ai-technology-counsel/','/advisory/legal-ai-automation/','/en/advisory/legal-ai-automation/'
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
  check((await noJs.locator('.hero h1').innerText()).includes('Legal counsel'),'English content requires JavaScript');
  check((await noJs.locator('.practice-card').count())===6,'No-JS service directory incomplete');
  await noJs.close();
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto(base+'/',{waitUntil:'networkidle'});
  check((await reduced.locator('.hero h1').isVisible()),'Reduced motion hides the hero');
  check((await reduced.locator('.practice-card').count())===6,'Reduced motion hides services');
  await reduced.locator('[data-tab="2"]').click();
  check((await reduced.locator('#stage-title').innerText()).includes('საპილოტე'),'Reduced motion must permit advisory selection');
  await reduced.close();
  console.log('DLG editorial browser QA passed: '+checks+' checks across nine viewports and '+paths.length+' interior pages.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
