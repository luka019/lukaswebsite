/* DLG public-site verification: approved photographic boutique direction.
   Static smoke tests complement, but do not replace, real-browser QA. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=process.env.SITE_OUTPUT||'dist';
let total=0;
function assert(ok,message){total++;if(!ok)throw new Error('DLG smoke check failed: '+message)}
function file(p){const full=path.join(root,p);assert(fs.existsSync(full),'Missing '+p);return fs.readFileSync(full,'utf8')}
const home=file('index.html');
const englishHome=file('en/index.html');
const css=file('firm.css');
const signatureCss=file('dlg-signature.css');
const photoCss=file('dlg-photographic.css');
const refineCss=file('dlg-refinement.css');
const carouselJs=file('dlg-hero-carousel.js');
const interaction=file('dlg-signature.js');
const script=file('firm-interactions.js');
assert(home.includes('class="law-home dlg-signature-home dlg-photographic"'),'Approved photographic homepage missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Shared professional masthead missing');
assert(home.includes('law-brand-tagline') && home.includes('იურიდიული მომსახურება ციფრული ბიზნესისთვის'),'Brand tagline missing');
assert(home.includes('data-en="Legal Support for Digital Business"'),'English brand tagline missing');
assert(home.includes('href="/dlg-signature.css?v=20261112-signature1"'),'Base responsive design system missing');
assert(home.includes('href="/dlg-photographic.css?v=20261118-approved1"'),'Approved photographic stylesheet missing');
assert(home.includes('href="/dlg-refinement.css?v=20261118-editorial2"'),'Editorial refinement stylesheet missing');
assert(home.includes('src="/dlg-hero-carousel.js?v=20261118-editorial2"'),'Accessible hero carousel not loaded');
assert(refineCss.includes('.dlg-carousel-slide') && refineCss.includes('padding-top:clamp(108px'),'Additional spacing and transitions missing');
assert((refineCss.match(/\{/g)||[]).length===(refineCss.match(/\}/g)||[]).length,'Unbalanced refinement CSS');
new vm.Script(carouselJs,{filename:'dlg-hero-carousel.js'});total++;
assert(!carouselJs.includes('fetch('),'Carousel must not request external services');
assert(carouselJs.includes('prefers-reduced-motion') && carouselJs.includes('visibilitychange') && carouselJs.includes('focusin'),'Accessible carousel pause logic missing');
assert((home.match(/data-dlg-slide aria-hidden=/g)||[]).length===4,'Four editorial slides required');
assert((home.match(/data-dlg-slide-to=/g)||[]).length===4,'Four slide indicators required');
assert(home.includes('data-dlg-prev') && home.includes('data-dlg-next') && home.includes('data-dlg-count'),'Manual carousel controls missing');
assert(home.includes('src="/assets/dlg-governance-visual.svg"') && home.includes('src="/assets/dlg-contracts-visual.svg"'),'Original illustrations missing');
assert(home.includes('data-en-aria="Next visual"') && home.includes('data-en-aria="Previous visual"'),'Bilingual carousel accessibility missing');
assert(photoCss.includes('--dlg-navy:#102A48') && photoCss.includes('--dlg-paper:#FFFFFF'),'Photographic navy palette missing');
assert(photoCss.includes('.dlg-building-photo') && photoCss.includes('.dlg-hero-practice-links'),'Building photograph and specialist links missing');
assert((photoCss.match(/\{/g)||[]).length===(photoCss.match(/\}/g)||[]).length,'Unbalanced photographic CSS');
assert(!home.includes('dlg-signature.js') && !home.includes('firm-hero.js'),'Retired interactive hero scripts must stay unloaded');
assert(home.includes('id="hero-title"') && home.includes('იურიდიული მომსახურება') && home.includes('ციფრული ბიზნესისთვის.'),'Approved Georgian headline missing');
assert(home.includes('data-en="Legal counsel"') && home.includes('data-en="for the digital economy."'),'English editorial headline missing');
assert(home.includes('data-en="TECHNOLOGY LAW · AI GOVERNANCE"'),'Technology and AI positioning missing');
assert((home.match(/<h1\b/g)||[]).length===1,'Homepage must contain one H1');
assert((home.match(/<section\b/g)||[]).length===8,'Keep eight purposeful homepage sections');
assert(home.indexOf('id="about"')<home.indexOf('id="services"') &&
       home.indexOf('id="services"')<home.indexOf('id="solutions"') &&
       home.indexOf('id="solutions"')<home.indexOf('id="business"') &&
       home.indexOf('id="business"')<home.indexOf('id="approach"'),
       'Firm, expertise, solutions, clients and delivery must be ordered naturally');
assert((home.match(/class="sig-service-row"/g)||[]).length===8,'Eight specialist practice rows required');
assert((home.match(/class="dlg-solution"/g)||[]).length===4,'Four defined-scope legal solutions required');
assert(!home.includes('role="tablist"') && !home.includes('data-sig-tab'),'App-style service tabs must not return');
assert(home.includes('class="sig-focus-list"'),'Boutique practice focus missing');
assert(home.includes('src="/assets/london-architecture.jpg"'),'Approved building photography must lead');
assert(home.includes('src="/assets/luka-shakhkulashvili.png"'),'Real founder portrait missing');
assert((home.match(/src="\/assets\/luka-shakhkulashvili.png"/g)||[]).length===2,'Founder portrait should appear in carousel and About section only');
assert(home.includes('ლუკა შახყულაშვილი'),'Founder must be identifiable');
assert((home.match(/class="container sig-proofbar"/g)||[]).length===1,'Factual credentials strip required');
assert((home.match(/class="atelier-service-symbol"/g)||[]).length===8,'Eight restrained line illustrations required');
for(const path of ['/services/','/business/','/services/digital-products/','/services/contracts/','/services/data-protection/','/services/ai/','/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/']){
 assert(home.includes('href="'+path+'"'),'Important client offer missing: '+path);
}
assert((home.match(/class="sig-audience-item"/g)||[]).length===3,'Three relevant client scenarios required');
assert((home.match(/class="sig-process-step"/g)||[]).length===3,'Three transparent delivery steps required');
assert((home.match(/class="resource-card visual-resource"/g)||[]).length<=2,'Insights must not crowd homepage');
assert(home.includes('href="mailto:digitallawgeorgia@gmail.com"'),'Email contact required');
assert(home.includes('https://wa.me/995598451132'),'WhatsApp contact required');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Confidentiality instruction missing');
assert(!home.includes('LegalStepy')&&!home.includes('Sopho'),'Independent brand identity required');
assert(!home.includes('class="dlg-illustration"') && !home.includes('law-tech-canvas'),'Do not return to synthetic app-style artwork');
assert(!home.includes('images.unsplash.com'),'Never depend on remote stock imagery');
for(const id of ['services','solutions','approach','about','contact'])assert(home.includes('id="'+id+'"'),'Homepage anchor missing '+id);
for(const hook of ['sig-service-row','data-menu-toggle','dlg-solution'])assert(englishHome.includes(hook),'English version missing '+hook);
assert(englishHome.includes('Legal counsel') && englishHome.includes('for the digital economy.'),'English headline not server rendered');
assert(englishHome.includes('FinTech &amp; Digital Assets') && englishHome.includes('Software &amp; Intellectual Property'),'English specialist practice areas missing');
assert(signatureCss.includes('prefers-reduced-motion'),'Reduced-motion preferences missing');
assert(signatureCss.includes('@media(max-width:700px)') && signatureCss.includes('@media(max-width:480px)'),'Responsive base breakpoints missing');
assert((signatureCss.match(/\{/g)||[]).length===(signatureCss.match(/\}/g)||[]).length,'Unbalanced base CSS');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced shared CSS');
new vm.Script(interaction,{filename:'dlg-signature.js'});total++;
assert(!home.includes('data-sig-practices'),'Retired app-style interaction must remain removed');
assert(!interaction.includes('setInterval'),'Unwanted automatic carousel switching must not return');
new vm.Script(script,{filename:'firm-interactions.js'});total++;
for(const p of [
  'styles.css','firm.css','dlg-signature.css','dlg-photographic.css','dlg-refinement.css','dlg-hero-carousel.js','dlg-signature.js','script.js','favicon.svg','services/index.html',
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
assert((businessDirectory.match(/class="dlg-audience-card"/g)||[]).length===5,'Five client groups must remain available on the business page');
const solutionsDirectory=file('solutions/index.html');
assert(solutionsDirectory.includes('class="solution-card"'),'Dedicated legal solutions catalogue must remain available');
assert(home.includes('href="/services/"'),'Homepage must link to the full services directory');
assert(!home.includes('class="dlg-audience-card"') && !home.includes('class="dlg-offer-card"'),'Full audience and offer catalogues must not clutter the homepage');
assert(directory.includes('ფინტექი') && directory.includes('სტარტაპები'),'FinTech and startups must be discoverable in the full directory');
assert(home.includes('ქართულ და საერთაშორისო კომპანიებს'),'Homepage must address Georgian and international businesses');
assert(home.includes('ციფრული ბიზნესისთვის.'),'Digital business legal positioning missing');
assert((home.match(/class="sig-service-row"/g)||[]).length===8,'Eight distinct editorial service rows required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('ხელოვნური ინტელექტის სამართალი და მმართველობა'),'AI practice must remain discoverable');
assert(home.includes('href="/services/digital-products/"'),'Digital product support must remain one click away');
assert(home.includes('https://wa.me/995598451132'),'WhatsApp channel missing');
assert(home.includes('mailto:digitallawgeorgia@gmail.com'),'Email channel missing');
assert(home.includes('data-en="Email us"'),'Header contact CTA must be bilingual');
assert(!home.includes('<a class="law-client-shortcut"'),'Header navigation must not be crowded');
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
assert(home.includes('LLM · Distinction') && home.includes('Queen Mary') && home.includes('Chevening') && !home.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must be present and accurate');
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
