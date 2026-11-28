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
    const errors=[],requests=[];page.on('pageerror',error=>errors.push(error.message));page.on('request',request=>{
      const url=new URL(request.url());
      if(request.method()!=='GET'||!['image','media'].includes(request.resourceType())||!url.pathname.startsWith('/assets/')||url.search){requests.push(request.url());}
    });
    const response=await page.goto(base+'/',{waitUntil:'networkidle'});
    check(response.status()===200,'Homepage HTTP error');
    await overflow(page,width,'/');
    check(await page.locator('.dlg-home-firm-copy').count()===1&&await page.locator('.dlg-home-founder-card').count()===1,'Firm-first homepage introduction missing');
    check(await page.locator('.dlg-home-firm-principles a').count()===3,'Firm approach links missing');
    check((await page.locator('.dlg-home-founder-card').evaluate(el=>el.getBoundingClientRect().width))<=width,'Founder introduction overflows');
    check(await page.locator('.dlg-expertise-grid').count()===1&&await page.locator('.dlg-practice-entry').count()===0,'Editorial expertise grid required');
    check(await page.locator('.dlg-expertise-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)===(width>1000?3:width>600?2:1),'Expertise grid must reflow across desktop, tablet and mobile');
    const practice=page.locator('#expertise .practice-card').nth(2);
    await practice.focus();check(await practice.evaluate(el=>document.activeElement===el),'Practice card keyboard focus missing');
    check(await practice.isVisible(),'Practice card should be directly visible');
    check((await page.locator('.practice-card').count())===6,'Six practice cards missing');
    const serviceRoutes=["/services/ai/","/services/privacy-and-cybersecurity/","/services/contracts/","/services/digital-products-and-ip/","/services/fintech-and-financial-regulation/","/services/corporate-and-commercial/"];
    for(let i=0;i<serviceRoutes.length;i++)check(await page.locator('.practice-card').nth(i).getAttribute('href')===serviceRoutes[i],'Homepage direct route '+i);
    const heroPhoto=page.locator('.hero-photo img');
    check(await heroPhoto.count()===1,'Missing hero photograph');
    const matterLinks=await page.locator('.matter-nav a').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
    check(JSON.stringify(matterLinks)===JSON.stringify(['/advisory/','/services/contracts/','/services/privacy-and-cybersecurity/','/business/georgia/']),'Client entry routes missing');
    check(await page.locator('#engagement,.engagement-steps').count()===0,'Standalone engagement block should be absent');
    await heroPhoto.evaluate(image=>image.decode());
    check(await heroPhoto.evaluate(image=>getComputedStyle(image).objectFit==='cover'),'Hero artwork must fill the seamless composition');
    check(await page.locator('.hero-photo').evaluate(el=>getComputedStyle(el).borderTopWidth==='0px'),'Hero artwork must not have a separate frame');
    check(await page.locator('.hero-content h1').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)<=39),'Homepage Georgian title must remain compact');
    const articleColumns=await page.locator('#insights .article-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
    check(articleColumns===(width>740?3:1),'Publication grid must reflow for mobile');
    check(await heroPhoto.evaluate(image=>image.naturalWidth>0&&image.getBoundingClientRect().width>0),'Hero photograph failed to render');
    check((await heroPhoto.getAttribute('alt')).length>20,'Hero photograph needs descriptive alt text');
    check(await page.locator('.dlg-expertise-icon').count()===6,'Six editorial practice icons required');
    const finder=page.locator('#dlg-legal-finder');await page.locator('.dlg-matter-finder').click();
    check(await finder.isVisible(),'Legal finder must open');
    await finder.locator('input').fill('VASP');check(await finder.locator('.dlg-finder-result:visible').count()===1,'VASP search must resolve to one practice');
    check(await finder.locator('.dlg-finder-result:visible a').getAttribute('href')==='/services/virtual-assets/','VASP finder route incorrect');
    await finder.locator('[data-dlg-filter="sector"]').click();check(await finder.locator('.dlg-finder-empty').isVisible(),'Empty filtered search state missing');
    await page.keyboard.press('Escape');check(!(await finder.isVisible()),'Escape must close legal finder');
    check(await page.locator('.dlg-matter-finder').evaluate(el=>document.activeElement===el),'Finder must restore focus');
    check(await page.locator('.advisory-tabs, #advisory-heading').count()===0,'Retired homepage AI module is still present');
    check(await page.locator('.home-sector-link:visible').count()===6,'Sector links not visible');
    check(await page.locator('.article:visible').count()===3,'Featured articles not visible');
    check(await page.locator('.article h3').count()===3,'Research article titles missing');
    check(await page.locator('.founder-feature img').count()===1,'Founder portrait missing');
    check(await page.locator('.founder-dialog, .founder-hologram, [data-founder-open]').count()===0,'Removed founder presentation is still present');
    if(width<=920){await page.locator('.menu-btn').click();check(await page.locator('.nav').isVisible(),'Mobile navigation failed');await page.locator('.menu-btn').click();}
    check(await page.locator('#enquiry-form').count()===0,'No duplicate homepage enquiry form');
    const order=await page.evaluate(()=>Array.from(document.querySelectorAll('main #expertise,main #about,main #sectors,main #featured-advisory,main #business-tools,main #georgia-business,main #insights,main #contact')).map(x=>x.id));
    check(JSON.stringify(order)===JSON.stringify(['expertise','about','sectors','featured-advisory','business-tools','georgia-business','insights','contact']),'Homepage hierarchy incorrect');
    check(await page.locator('.dlg-home-contact-actions > a.primary').getAttribute('href')==='/contact/','Dedicated contact route missing');
    await page.locator('[data-language-link="en"]').click();await page.waitForURL(base+'/en/');
    check((await page.locator('html').getAttribute('lang'))==='en','English language link failed');
    check((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim()==='Legal services for digital businesses.','English headline missing');
    check(await page.locator('.matter-nav a').first().getAttribute('href')==='/en/advisory/','English advisory route failed');
    await page.locator('.dlg-matter-finder').click();await page.locator('#dlg-finder-input').fill('VASP');check(await page.locator('.dlg-finder-result:visible a').getAttribute('href')==='/en/services/virtual-assets/','English legal search route failed');await page.keyboard.press('Escape');
    await page.locator('[data-language-link="ka"]').click();await page.waitForURL(base+'/');
    await overflow(page,width,'/');check(errors.length===0,'Page script errors '+errors.join('; '));
    if([390,1440].includes(width))await page.screenshot({path:path.join(screenshots,'home-'+width+'.png'),fullPage:true});
    await page.close();
  }
  // Guided assessment and unobtrusive first-visit prompt. Test both languages.
  for(const [prefix,width] of [['',390],['/en',1440]]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];page.on('pageerror',err=>errors.push(err.message));
    await page.goto(base+prefix+'/');
    const prompt=page.locator('#dlg-readiness-prompt');
    await prompt.waitFor({state:'visible',timeout:14000});
    check(await prompt.locator('a').getAttribute('href')===prefix+'/advisory/assessment/','Prompt link language mismatch');
    await prompt.locator('.dlg-prompt-close').click();
    check(await prompt.isHidden(),'Prompt must dismiss');
    await page.reload();
    await page.waitForTimeout(9000);
    check(await prompt.isHidden(),'Prompt must not repeat within a session');
    await page.locator('.dlg-assessment-feature .dlg-tool-cta').click();
    await page.waitForURL(base+prefix+'/advisory/assessment/');
    const wizard=page.locator('#dlg-readiness-form');
    const fields=wizard.locator('fieldset');
    check(await wizard.locator('fieldset:visible').count()===1,'Show exactly one question');
    await page.locator('#dlg-readiness-next').click();
    check(await page.locator('#dlg-readiness-error').isVisible(),'Missing answer feedback required');
    const answers=['yes','partial','no','unknown','yes','partial','no','yes'];
    for(let i=0;i<answers.length;i++){
      const field=fields.nth(i);
      check(await field.isVisible(),'Question '+i+' not visible');
      await field.locator('input[value="'+answers[i]+'"]').check();
      if(i===1){await page.locator('#dlg-readiness-back').click();check(await fields.nth(0).locator('input[value="yes"]').isChecked(),'Previous answer lost');await page.locator('#dlg-readiness-next').click();check(await field.locator('input[value="partial"]').isChecked(),'Answer lost after back');}
      if(i<answers.length-1)await page.locator('#dlg-readiness-next').click();else await page.locator('#dlg-readiness-finish').click();
    }
    check(await page.locator('#dlg-readiness-result').isVisible(),'Assessment result missing');
    for(const [value,count] of Object.entries({yes:3,partial:2,no:2,unknown:1}))check(await page.locator('[data-answer-count="'+value+'"]').textContent()===String(count),'Incorrect result count '+value);
    check(await page.locator('#dlg-readiness-priorities li').count()===5,'Actionable results missing');
    await page.locator('#dlg-readiness-review').click();check(await fields.nth(0).locator('input[value="yes"]').isChecked(),'Review must preserve answers');
    for(let i=0;i<7;i++)await page.locator('#dlg-readiness-next').click();
    await page.locator('#dlg-readiness-finish').click();await page.locator('#dlg-readiness-restart').click();
    check(await fields.nth(0).isVisible()&&!await fields.nth(0).locator('input[value="yes"]').isChecked(),'Restart must clear answers');
    await overflow(page,width,prefix+'/advisory/assessment/');
    check(errors.length===0,'Assessment page errors: '+errors.join('; '));
    await page.close();
  }
  const paths=[];
  for(const [prefix,width] of [['',390],['/en',1440]]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+prefix+'/',{waitUntil:'networkidle'});
    const feature=page.locator('#georgia-business');
    check(await feature.locator('.dlg-georgia-quick-links a').count()===4,'Cross-border service links missing');
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
  check(await reduced.locator('.dlg-home-founder-card').count()===1,'Reduced motion must preserve founder content');
  check(await reduced.evaluate(()=>document.getAnimations().length===0),'Reduced-motion page must not run entrance animations');
  check((await reduced.locator('.hero h1').isVisible()),'Reduced motion hides the hero');
  check((await reduced.locator('.practice-card').count())===6,'Reduced motion hides services');
  check(await reduced.locator('.hero-photo img').isVisible(),'Reduced motion hides the hero photograph');
  await reduced.locator('.matter-nav a').first().click();
  await reduced.waitForURL(base+'/advisory/');
  check(await reduced.locator('.dlg-advisory-card').count()===4,'Advisory overview must render in reduced motion');
  check(await reduced.locator('.dlg-advisory-outcomes li').count()===8,'Advisory deliverables are incomplete');
  await reduced.close();
  console.log('DLG editorial browser QA passed: '+checks+' checks across nine viewports and '+paths.length+' interior pages.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
