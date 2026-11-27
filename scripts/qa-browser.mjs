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
    const serviceRoutes=["/services/ai/","/services/privacy-and-cybersecurity/","/services/contracts/","/services/digital-products-and-ip/","/services/fintech-and-financial-regulation/","/services/corporate-and-commercial/"];
    for(let i=0;i<serviceRoutes.length;i++)check(await page.locator('.practice-card').nth(i).getAttribute('href')===serviceRoutes[i],'Homepage direct route '+i);
    const heroPhoto=page.locator('.hero-photo img');
    check(await heroPhoto.count()===1,'Missing hero photograph');
    await heroPhoto.evaluate(image=>image.decode());
    check(await heroPhoto.evaluate(image=>image.naturalWidth>0&&image.getBoundingClientRect().width>0),'Hero photograph failed to render');
    check((await heroPhoto.getAttribute('alt')).length>20,'Hero photograph needs descriptive alt text');
    check((await page.locator('.practice-glyph').count())===6,'Six functional icons required');
    const advisoryPhoto=page.locator('.advisory-photo img');
    await advisoryPhoto.scrollIntoViewIfNeeded();
    await advisoryPhoto.evaluate(img=>img.decode());
    check(await advisoryPhoto.evaluate(img=>img.naturalWidth>0),'Advisory photograph failed');
    const advisorySlugs=['ai-readiness','ai-governance-implementation','legal-ai-automation','external-ai-technology-counsel'];
    for(let i=0;i<advisorySlugs.length;i++){
      const tab=page.locator('[data-tab="'+i+'"]');
      await tab.click();
      const panel=page.locator('[role="tabpanel"]:visible');
      check(await tab.getAttribute('aria-selected')==='true','Advisory tab state incorrect');
      check(await panel.locator('a').getAttribute('href')==='/advisory/'+advisorySlugs[i]+'/','Advisory link incorrect');
      check(await panel.locator('li').count()===3,'Advisory outcomes missing');
    }
    check(await page.locator('.home-sector-link:visible').count()===6,'Sector links not visible');
    check(await page.locator('.article:visible').count()===3,'Featured articles not visible');
    if(width<=920){await page.locator('.menu-btn').click();check(await page.locator('.nav').isVisible(),'Mobile navigation failed');await page.locator('.menu-btn').click();}
    const form=page.locator('#enquiry-form');await form.locator('[name="name"]').fill('Test User');await form.locator('[name="email"]').fill('test@example.invalid');await form.locator('[name="area"]').selectOption({index:1});await form.locator('[name="matter"]').fill('Test enquiry. Do not send.');
    const before=requests.length;await form.locator('button[type="submit"]').click();
    check(await page.locator('#enquiry-result').isVisible(),'Local enquiry draft missing');check((await page.locator('#enquiry-mailto').getAttribute('href')).includes('test%40example.invalid'),'Email draft missing input');check(requests.length===before,'Enquiry form must not initiate a network request');
    await page.locator('[data-language-link="en"]').click();await page.waitForURL(base+'/en/');
    check((await page.locator('html').getAttribute('lang'))==='en','English language link failed');
    check((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim()==='Legal services for digital businesses.','English headline missing');
    await page.locator('[data-tab="2"]').click();check((await page.locator('[role="tabpanel"]:visible a').getAttribute('href'))==='/en/advisory/legal-ai-automation/','English advisory route failed');
    await page.locator('[data-language-link="ka"]').click();await page.waitForURL(base+'/');
    await overflow(page,width,'/');check(errors.length===0,'Page script errors '+errors.join('; '));
    if([390,1440].includes(width))await page.screenshot({path:path.join(screenshots,'home-'+width+'.png'),fullPage:true});
    await page.close();
  }
  const paths=[];
  for(const [prefix,width] of [['',390],['/en',1440]]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+prefix+'/',{waitUntil:'networkidle'});
    const feature=page.locator('#georgia-business');
    const photo=feature.locator('img');
    await photo.scrollIntoViewIfNeeded();
    await photo.evaluate(image=>image.decode());
    check(await photo.evaluate(image=>image.naturalWidth===1400),'Tbilisi photograph failed');
    await feature.locator('.dlg-international-link').click();
    await page.waitForURL(base+prefix+'/business/georgia/');
    await overflow(page,width,prefix+'/business/georgia/');
    check(await page.locator('.dlg-georgia-services article').count()===4,'Georgia service overview incomplete');
    await page.screenshot({path:path.join(screenshots,'georgia-'+width+'.png'),fullPage:true});
    await page.locator('.dlg-georgia-hero .dlg-international-link').click();
    await page.waitForURL(base+prefix+'/contact/?area=georgia-market-entry');
    const form=page.locator('#contact-page-form');
    await form.waitFor({state:'visible'});
    const area=form.locator('[name="area"]');
    check(await area.inputValue()==='georgia-market-entry','Georgia enquiry topic was not selected');
    await form.locator('[name="name"]').fill('Test User');
    await form.locator('[name="email"]').fill('test@example.invalid');
    await form.locator('[name="matter"]').fill('Test enquiry. Do not send.');
    const requests=[];
    page.on('request',request=>requests.push(request.url()));
    await form.locator('button[type="submit"]').click();
    await form.locator('#contact-page-result').waitFor({state:'visible'});
    const draft=decodeURIComponent(await form.locator('#contact-page-mailto').getAttribute('href'));
    check(draft.includes(prefix?'Doing business in Georgia':'საქართველოში საქმიანობა'),'Georgia email draft topic was not localised');
    check(draft.includes('test@example.invalid')&&requests.length===0,'The enquiry must prepare a local draft');
    await form.locator('[name="matter"]').fill('An updated enquiry');
    check(await form.locator('#contact-page-result').isHidden(),'Editing must hide the old email draft');
    await form.locator('button[type="submit"]').click();
    const revisedDraft=decodeURIComponent(await form.locator('#contact-page-mailto').getAttribute('href'));
    check(revisedDraft.includes('An updated enquiry'),'The email draft must reflect the latest edit');
    const alternate=prefix?'':'/en';
    await page.locator('[data-language-link="'+(prefix?'ka':'en')+'"]').click();
    await page.waitForURL(base+alternate+'/contact/?area=georgia-market-entry');
    check(await area.inputValue()==='georgia-market-entry','Contact topic disappeared when switching language');
    check(errors.length===0,'Georgia client journey page errors '+errors.join(', '));
    await page.close();
  }
  function collect(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name==='admin')continue;const file=path.join(dir,e.name);if(e.isDirectory())collect(file);else if(e.name==='index.html'){const route='/'+path.relative(root,dir).split(path.sep).filter(Boolean).join('/')+(dir===root?'':'/');if(route!=='/'&&route!=='/en/')paths.push(route);}}}
  collect(root);
  for(const route of paths){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    check(response.status()===200,'Route HTTP error: '+route);
    check((await page.locator('h1').count())===1,'Missing or multiple H1: '+route);
    check((await page.locator('.site-header').count())===1,'Missing site header: '+route);
    await overflow(page,390,route);
    check((await page.locator('.dlg-breadcrumb').count())===1,'Missing breadcrumb '+route);
    check((await page.locator('.site-nav a[href="'+(route.startsWith('/en/')?'/en/contact/':'/contact/')+'"]').count())===1,'Contact route missing '+route);
    check((await page.locator('meta[name="description"]').getAttribute('content')).length>15,'Missing meta description: '+route);
    if(route.startsWith('/en/'))check((await page.locator('html').getAttribute('lang'))==='en','English route is not pre-rendered: '+route);
    await page.close();
  }
  const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await noJs.goto(base+'/en/',{waitUntil:'networkidle'});
  check((await noJs.locator('html').getAttribute('lang'))==='en','English no-JS HTML language failed');
  check((await noJs.locator('.hero h1').innerText()).replace(/\s+/g,' ').trim()==='Legal services for digital businesses.','English content requires JavaScript');
  check((await noJs.locator('.practice-card').count())===6,'No-JS service directory incomplete');
  await noJs.goto(base+'/en/business/georgia/');
  await noJs.locator('[data-language-link="ka"]').click();
  await noJs.waitForURL(base+'/business/georgia/');
  check(await noJs.locator('html').getAttribute('lang')==='ka','Inner-page language link requires JavaScript');
  await noJs.close();
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto(base+'/',{waitUntil:'networkidle'});
  check((await reduced.locator('.hero h1').isVisible()),'Reduced motion hides the hero');
  check((await reduced.locator('.practice-card').count())===6,'Reduced motion hides services');
  check(await reduced.locator('.hero-photo img').isVisible(),'Reduced motion hides the hero photograph');
  await reduced.locator('[data-tab="2"]').click();
  check(await reduced.locator('[role="tabpanel"]:visible a').getAttribute('href')==='/advisory/legal-ai-automation/','Reduced motion must permit advisory selection');
  await reduced.close();
  console.log('DLG editorial browser QA passed: '+checks+' checks across nine viewports and '+paths.length+' interior pages.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
