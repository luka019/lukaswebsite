/* DLG public-site checks: approved editorial technology-law homepage and complete specialist pages. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=process.env.SITE_OUTPUT||'dist';
let total=0;
function assert(ok,message){total++;if(!ok)throw new Error('DLG smoke check failed: '+message)}
function file(p){const full=path.join(root,p);assert(fs.existsSync(full),'Missing '+p);return fs.readFileSync(full,'utf8')}
const home=file('index.html'),englishHome=file('en/index.html'),visibleHome=home.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
const hybridCss=file('dlg-hybrid.css'),hybridJs=file('dlg-hybrid.js');
new vm.Script(hybridJs,{filename:'dlg-hybrid.js'});total++;
assert(!hybridJs.includes('fetch(')&&!hybridJs.includes('localStorage')&&!hybridJs.includes('sessionStorage'),'Homepage must not send or retain enquiry data');
assert(hybridJs.includes('e.preventDefault()')&&hybridJs.includes('mailto:digitallawgeorgia@gmail.com'),'User-controlled enquiry composition required');
assert(hybridCss.includes('prefers-reduced-motion')&&hybridCss.includes('#17334c')&&hybridCss.includes('#f2f7fc'),'Approved accessible blue and white design missing');
for(const [page,lang] of [[home,'ka'],[englishHome,'en']]){
 assert(page.includes('<html lang="'+lang+'"'),'Homepage language is not static');
 assert(page.includes('class="masthead"')&&page.includes('class="hero"'),'Approved masthead and hero missing');
 assert((page.match(/<h1\b/g)||[]).length===1,'One H1 required');
 assert((page.match(/class="practice-card"/g)||[]).length===6,'Six expertise cards required');
 assert((page.match(/data-tab="\d+"/g)||[]).length===4,'Four advisory tabs required');
 assert((page.match(/data-sector="\d+"/g)||[]).length===5,'Five interactive sector tabs required');
 assert((page.match(/data-hero-scene="\d+"/g)||[]).length===3,'Three manually controlled hero scenes required');
 assert((page.match(/data-filter="(?:all|ai|data|contracts)"/g)||[]).length===4,'Four article filters required');
 assert(page.includes('class="enquiry-form"')&&page.includes('id="enquiry-mailto"'),'Enquiry composer missing');
 assert(page.includes('src="/assets/editorial/consultation.webp"')&&page.includes('src="/assets/editorial/contract-work.webp"'),'Human editorial imagery missing');
 assert(!page.includes('images.pexels.com')&&!page.includes('r0lodtw2w'),'No external preview or stock-image dependency');
 assert(page.includes('href="/" data-language-link="ka"')||page.includes('data-language-link="ka"'),'Georgian language link required');
 assert(page.includes('href="/en/"'),'Static English language link required');
 const ordered=['id="about"','id="expertise"','id="advisory"','id="sectors"','id="insights"','id="contact"'];assert(ordered.every((id,i)=>page.indexOf(id)>=0&&(!i||page.indexOf(ordered[i-1])<page.indexOf(id))),'Approved homepage order missing');
 assert(page.includes('href="https://arxiv.org/abs/2607.21345"'),'Research link missing');
 assert(page.includes('href="mailto:digitallawgeorgia@gmail.com"')&&page.includes('https://wa.me/995598451132'),'Contact links missing');
}
for(const p of ['assets/editorial/consultation.webp','assets/editorial/contract-work.webp']){const b=fs.readFileSync(path.join(root,p));assert(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'&&b.length>10000,'Invalid local image '+p)}
assert(englishHome.includes('Legal counsel')&&englishHome.includes('for the digital economy.'),'English hero must be server rendered');
assert(englishHome.includes('Risk assessment and action plan'),'English advisory default must be static');
assert(home.includes('რისკების შეფასება და სამოქმედო გეგმა')&&home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Default advice and enquiry privacy instructions missing');
assert(!home.includes('LegalStepy')&&!home.includes('Sopho'),'Independent brand required');
for(const p of [
  'styles.css','firm.css','dlg-signature.css','dlg-photographic.css','dlg-refinement.css','dlg-boutique-ui.css','dlg-hero-carousel.js','dlg-service-discovery.js','dlg-signature.js','script.js','favicon.svg','services/index.html',
  'services/contracts/index.html','services/data-protection/index.html',
  'services/ai/index.html','services/fintech/index.html','services/ongoing-legal-support/index.html','services/georgia-market-entry/index.html','services/intellectual-property/index.html',
  'resources/index.html','privacy/index.html'
])file(p);
for(const p of ['services/index.html','services/contracts/index.html','resources/index.html']){
  const h=fs.readFileSync(path.join(root,p),'utf8');
  assert(h.includes('firm.css'),'Shared public design missing on '+p);
  assert(!h.includes('law-client-shortcut'),'Redundant desktop header shortcut on '+p);
}
const directory=fs.readFileSync(path.join(root,'services/index.html'),'utf8');
assert(directory.includes('law-directory-feature'),'Ongoing legal counsel needs a featured directory entry');
assert(directory.indexOf('/services/contracts/')<directory.indexOf('/services/fintech/'),'Contract advice should precede FinTech in the directory');
assert(directory.includes('/services/ongoing-legal-support/'),'Ongoing legal support route must be linked');
const businessDirectory=file('business/index.html');
assert((businessDirectory.match(/class="dlg-sector-card"/g)||[]).length===6,'Six sector entry points required');
const directoryEn=file('en/services/index.html');
assert((directory.match(/class="dlg-practice-group"/g)||[]).length===6,'Six groups in services directory required');
assert((directory.match(/class="dlg-specialist-link"/g)||[]).length===13,'All thirteen specialist pages must remain linked');
assert((directoryEn.match(/class="dlg-specialist-link"/g)||[]).length===13,'All specialist pages must remain linked in English');
for(const area of ['ai','privacy','contracts','products','fintech','corporate']){assert(directory.includes('id="area-'+area+'"'),'Missing group '+area);assert(home.includes('href="/services/#area-'+area+'"'),'Homepage group route missing: '+area);assert(englishHome.includes('href="/en/services/#area-'+area+'"'),'English homepage group route missing: '+area);}
const specialist=['contracts','data-protection','ai','digital-products','legal-operations','ongoing-legal-support','fintech','virtual-assets','ecommerce','cyber-digital-risk','georgia-market-entry','intellectual-property','startups-investment'];
for(const slug of specialist){assert(directory.includes('href="/services/'+slug+'/"'),'Missing specialist '+slug);file('services/'+slug+'/index.html');file('en/services/'+slug+'/index.html');}
for(const slug of ['technology','financial-services','commerce','startups-investors','international','legal-teams']){const route='/business/sectors/'+slug+'/';assert(home.includes('href="'+route+'"')&&businessDirectory.includes('href="'+route+'"'),'Sector discoverability missing '+slug);const ka=file(route.slice(1)+'index.html'),en=file('en'+route+'index.html');assert(ka.includes('class="deliverable-card dlg-sector-detail"')&&ka.includes('class="practice-card"'),'Sector content missing '+slug);assert(en.includes('<html lang="en"')&&en.includes('class="practice-card"'),'English sector missing '+slug);assert(en.includes('href="/en/services/'),'English specialist links missing in '+slug);}

const advisoryDirectory=file('advisory/index.html');
const legalAi=file('advisory/legal-ai-automation/index.html'),legalAiEn=file('en/advisory/legal-ai-automation/index.html');
for(const page of [home,advisoryDirectory,file('business/sectors/legal-teams/index.html')])assert(page.includes('href="/advisory/legal-ai-automation/"'),'Legal AI service discoverability missing');
assert(englishHome.includes('href="/en/advisory/legal-ai-automation/"'),'English legal AI link missing');
for(const page of [legalAi,legalAiEn]){assert((page.match(/class="dlg-legal-ai-row"/g)||[]).length===10,'Six illustrative use cases and four steps required');assert(page.includes('class="digital-section digital-wash dlg-legal-ai-safeguards"'),'Safeguards required');}
assert(legalAi.includes('სამართლებრივი გადაწყვეტილების მიღება იურისტის მიერ'),'Human legal review required');
assert(legalAiEn.includes('AI use does not guarantee error-free output or full regulatory compliance'),'Service limitations required');

assert((advisoryDirectory.match(/class="dlg-advisory-card"/g)||[]).length===4,'Advisory directory must contain four directions');
assert(home.includes('href="/advisory/"'),'Advisory navigation missing');
for(const slug of ['ai-readiness','ai-governance-implementation','external-ai-technology-counsel','legal-ai-automation']){const ka=file('advisory/'+slug+'/index.html'),en=file('en/advisory/'+slug+'/index.html');assert(ka.includes('mailto:digitallawgeorgia@gmail.com?subject='),'Service-specific enquiry missing: '+slug);assert(en.includes('<html lang="en"'),'English advisory page missing: '+slug);}
for(const route of ['index.html','en/index.html','advisory/index.html','en/advisory/index.html',...['ai-readiness','ai-governance-implementation','external-ai-technology-counsel','legal-ai-automation'].flatMap(slug=>['advisory/'+slug+'/index.html','en/advisory/'+slug+'/index.html'])]){const page=file(route);assert(!/dlg-advisory-price|₾|\bGEL\s*[\d,]+|Indicative starting fee/i.test(page),'Public advisory fee leaked: '+route);}
const solutionsDirectory=file('solutions/index.html');
assert(solutionsDirectory.includes('class="solution-card"'),'Dedicated legal solutions catalogue must remain available');
assert(home.includes('href="/services/"'),'Homepage must link to the full services directory');

assert(directory.includes('ფინტექი') && directory.includes('სტარტაპები'),'FinTech and startups must be discoverable in the full directory');
assert(home.includes('ქართულ და უცხოურ კომპანიებს'),'Homepage must address Georgian and international businesses');
assert(home.includes('ციფრული ბიზნესისთვის.'),'Digital business legal positioning missing');

assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('ხელოვნური ინტელექტი')&&home.includes('AI კონსულტაცია და ავტომატიზაცია'),'AI practice must remain discoverable');
assert(directory.includes('href="/services/digital-products/"'),'Digital product support must remain accessible from the grouped directory');
assert(home.includes('https://wa.me/995598451132'),'WhatsApp channel missing');
assert(home.includes('mailto:digitallawgeorgia@gmail.com'),'Email channel missing');
assert(home.includes('data-en="Email us"'),'Contact CTA must be bilingual');

const broken=[];
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');for(const m of content.matchAll(/href="(\/[^"]*)"/g)){
 const href=m[1];if(href.startsWith('//'))continue;const pathname=href.split(/[?#]/)[0];if(!pathname||pathname==='/')continue;
 let destination=path.join(root,pathname);
 if(pathname.endsWith('/'))destination=path.join(root,pathname,'index.html');
 else if(!fs.existsSync(destination)&&!path.extname(pathname))destination=path.join(root,pathname,'index.html');
 if(!fs.existsSync(destination))broken.push(name+' -> '+pathname);
}}
assert(broken.length===0,'Broken local links: '+broken.slice(0,12).join('; '));
for(const name of publicHtml){
 if(name.endsWith('404.html'))continue;
 const content=fs.readFileSync(name,'utf8');
 assert((content.match(/<h1\b/g)||[]).length===1,'One h1 required: '+name);
 assert((content.match(/rel="canonical"/g)||[]).length===1,'One canonical required: '+name);
 assert(content.includes('hreflang="ka"')&&content.includes('hreflang="en"'),'Language alternates missing: '+name);
 const ids=[...content.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert(new Set(ids).size===ids.length,'Duplicate element IDs: '+name);
 for(const m of content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
 if(name.includes(path.sep+'en'+path.sep))assert(content.includes('<html lang="en"'),'English document language missing: '+name);
}
for(const p of ['business/','business/georgia/','business/international/','business/growing-business/','about/','services/legal-operations/'])file(p+'index.html');
const aboutProfile=file('about/index.html');
assert(aboutProfile.includes('Queen Mary')&&aboutProfile.includes('Chevening')&&aboutProfile.includes('LLM with Distinction')&&!aboutProfile.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must remain on the profile');

assert(!visibleHome.includes('LLM · Distinction')&&!visibleHome.includes('Queen Mary')&&!visibleHome.includes('Chevening'),'Personal qualifications belong on the profile, not visible homepage content');
assert(aboutProfile.includes('https://arxiv.org/abs/2607.21345'),'Verified research missing from profile');

for(const name of publicHtml){if(name.endsWith('404.html'))continue;const page=fs.readFileSync(name,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');if(!page.includes('<html lang="ka"'))continue;assert(!/მომსახურებ(?:ები|ების|ებს)/.test(page),'Georgian plural service wording in '+name);}
assert(home.includes('დამოუკიდებელი იურიდიული ფირმა')&&home.includes('დაგვიკავშირდით'),'Natural Georgian positioning and CTA missing');
assert(!visibleHome.includes('ბუტიკური იურიდიული პრაქტიკა')&&!visibleHome.includes('AI-ის მმართველობა'),'Retired literal translations must not return');
assert(file('services/data-protection/index.html').includes('მონაცემთა დაცვაზე ზეგავლენის შეფასება'),'Statutory data protection terminology missing');
assert(file('services/virtual-assets/index.html').includes('ვირტუალური აქტივის მომსახურების პროვაიდერი'),'Statutory VASP terminology missing');
assert(file('advisory/ai-governance-implementation/index.html').includes('პრობლემის შესახებ პასუხისმგებელი პირის ინფორმირების წესი'),'Localised AI governance procedure missing');
assert(!file('advisory/ai-governance-implementation/index.html').includes('პრობლემების ესკალაცია'),'Retired translation must not return');
for(const [slug,cover] of [['ai-pilot-at-work','ai-pilot.webp'],['technology-contract-review','contracts.webp'],['supplier-data-review','suppliers.webp']]){for(const lang of ['','en/']){const article=file(lang+'resources/'+slug+'/index.html');assert(article.includes('/assets/resources/'+cover),'Article editorial image missing: '+lang+slug);}}

assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');

for(const slug of ["technology","financial-services","commerce","startups-investors","international","legal-teams"]){const imagePath='/assets/sectors/'+slug+'.jpg';assert(businessDirectory.includes('src="'+imagePath+'"'),'Sector directory photograph missing '+slug);assert(fs.existsSync(root+imagePath),'Local sector photograph missing '+slug);}
