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
const boutiqueCss=file('dlg-boutique-ui.css');
const finderJs=file('dlg-service-discovery.js');
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
assert(home.includes('href="/dlg-boutique-ui.css?v=20261118-compact3"'),'Compact boutique design not loaded');
assert(!home.includes('src="/dlg-service-discovery.js'),'Six core areas do not need redundant homepage filters');
assert(boutiqueCss.includes('grid-template-columns:repeat(3,minmax(0,1fr))') && boutiqueCss.includes('padding-top:clamp(57px'),'Compact professional rhythm missing');
assert((boutiqueCss.match(/\{/g)||[]).length===(boutiqueCss.match(/\}/g)||[]).length,'Unbalanced boutique CSS');
assert(boutiqueCss.includes('.dlg-signature-home.dlg-photographic .sig-services .sig-section-heading h2'),'Service heading contrast guard missing');
assert(boutiqueCss.includes('@media(min-width:1500px)'),'Large-desktop layout cap missing');
new vm.Script(finderJs,{filename:'dlg-service-discovery.js'});total++;
assert(finderJs.includes('toolbar.hidden = false') && !finderJs.includes('fetch('),'Practice finder must be local and progressive');
assert(!home.includes('data-dlg-practice-filter')&&!home.includes('data-dlg-practice-search'),'Keep six practice areas simple and directly accessible');
assert(home.includes('src="/dlg-hero-carousel.js?v=20261118-editorial2"'),'Accessible hero carousel not loaded');
assert(refineCss.includes('.dlg-carousel-slide') && refineCss.includes('padding-top:clamp(108px'),'Additional spacing and transitions missing');
assert((refineCss.match(/\{/g)||[]).length===(refineCss.match(/\}/g)||[]).length,'Unbalanced refinement CSS');
new vm.Script(carouselJs,{filename:'dlg-hero-carousel.js'});total++;
assert(!carouselJs.includes('fetch('),'Carousel must not request external services');
assert(carouselJs.includes('prefers-reduced-motion') && carouselJs.includes('visibilitychange') && carouselJs.includes('focusin'),'Accessible carousel pause logic missing');
assert((home.match(/data-dlg-slide aria-hidden=/g)||[]).length===4,'Four editorial slides required');
assert((home.match(/data-dlg-slide-to=/g)||[]).length===4,'Four slide indicators required');
assert(home.includes('data-dlg-prev') && home.includes('data-dlg-next') && home.includes('data-dlg-count'),'Manual carousel controls missing');
for(const cover of ['ai-pilot.webp','suppliers.webp','contracts.webp']){assert(home.includes('src="/assets/resources/'+cover+'"'),'Editorial carousel visual missing: '+cover);assert(fs.existsSync(path.join(root,'assets','resources',cover)),'Missing local editorial image: '+cover);}
assert(!home.includes('src="/assets/dlg-governance-visual.svg"')&&!home.includes('src="/assets/dlg-contracts-visual.svg"'),'Old synthetic carousel graphics must not return');
assert(home.includes('data-en-aria="Next visual"') && home.includes('data-en-aria="Previous visual"'),'Bilingual carousel accessibility missing');
assert(photoCss.includes('--dlg-navy:#102A48') && photoCss.includes('--dlg-paper:#FFFFFF'),'Photographic navy palette missing');
assert(photoCss.includes('.dlg-building-photo') && photoCss.includes('.dlg-hero-practice-links'),'Building photograph and specialist links missing');
assert((photoCss.match(/\{/g)||[]).length===(photoCss.match(/\}/g)||[]).length,'Unbalanced photographic CSS');
assert(!home.includes('dlg-signature.js') && !home.includes('firm-hero.js'),'Retired interactive hero scripts must stay unloaded');
assert(home.includes('id="hero-title"') && home.includes('იურიდიული მომსახურება') && home.includes('ციფრული ბიზნესისთვის.'),'Approved Georgian headline missing');
assert(home.includes('data-en="Legal counsel"') && home.includes('data-en="for the digital economy."'),'English editorial headline missing');
assert(home.includes('data-en="TECHNOLOGY LAW · AI GOVERNANCE"'),'Technology and AI positioning missing');
assert((home.match(/<h1\b/g)||[]).length===1,'Homepage must contain one H1');
assert((home.match(/<section\b/g)||[]).length===7,'Seven focused homepage sections required');
assert(home.indexOf('class="dlg-service-strip"')<home.indexOf('id="services"') &&
       home.indexOf('id="services"')<home.indexOf('id="advisory-packages"') &&
       home.indexOf('id="advisory-packages"')<home.indexOf('id="business"') &&
       home.indexOf('id="business"')<home.indexOf('id="about"') &&
       home.indexOf('id="about"')<home.indexOf('id="approach"'),
       'Services must precede professional profile; keep other sections ordered');
assert((home.match(/class="sig-service-row"/g)||[]).length===6,'Six grouped practice areas required');
assert(!home.includes('class="dlg-solution"'),'Avoid duplicating focused service cards below the quick links');
assert(!home.includes('role="tablist"') && !home.includes('data-sig-tab'),'App-style service tabs must not return');
assert(home.includes('class="sig-focus-list"'),'Boutique practice focus missing');
assert(home.includes('src="/assets/london-architecture.jpg"'),'Approved building photography must lead');
assert(home.includes('src="/assets/luka-shakhkulashvili.png"'),'Real founder portrait missing');
assert((home.match(/src="\/assets\/luka-shakhkulashvili.png"/g)||[]).length===1,'Founder portrait should appear in the About section only');
assert(home.includes('ლუკა შახყულაშვილი'),'Founder must be identifiable');
assert(!home.includes('class="container sig-proofbar"')&&!home.includes('class="dlg-credentials"'),'Personal credential strip must not return');
const serviceStrip=home.match(/<div class="dlg-service-strip"([\s\S]*?)<!--|<div class="dlg-service-strip"([\s\S]*?)<section class="sig-services"/);
assert(home.includes('class="dlg-hero-practice-links dlg-service-strip-grid"'),'Business service strip required');
const stripStart=home.indexOf('class="dlg-service-strip"'),stripEnd=home.indexOf('id="services"');
assert(stripStart>=0&&stripEnd>stripStart,'Service strip positioning invalid');
const stripHtml=home.slice(stripStart,stripEnd);
for(const route of ['/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/'])assert(stripHtml.includes('href="'+route+'"'),'Focused service strip destination missing: '+route);
assert(!/Queen Mary|Chevening|7 წელი|LLM · Distinction/.test(stripHtml),'Personal credentials must not be in service strip');
assert(englishHome.includes('class="dlg-service-strip"')&&englishHome.includes('Contract review'),'English focused service strip required');
assert(!home.includes('class="atelier-service-symbol"')&&!englishHome.includes('class="atelier-service-symbol"'),'Decorative practice icons must stay removed');
assert(boutiqueCss.includes('grid-template-columns:32px minmax(0,1fr);grid-template-rows:auto auto;gap:8px 15px'),'Icon-free layout must reclaim the empty column');
for(const path of ['/services/','/business/','/solutions/','/solutions/ai-governance/','/solutions/privacy-review/','/solutions/contract-review/','/solutions/enter-georgia/']){
 assert(home.includes('href="'+path+'"'),'Important client offer missing: '+path);
}
assert((home.match(/class="dlg-sector-card"/g)||[]).length===6,'Six sector cards required on homepage');
assert((home.match(/class="sig-process-step"/g)||[]).length===3,'Three transparent delivery steps required');
assert((home.match(/class="resource-card visual-resource"/g)||[]).length===2,'Two published editorial insights required');
assert(home.includes('href="/resources/ai-pilot-at-work/"')&&home.includes('href="/resources/technology-contract-review/"'),'Relevant published insights missing');
assert(home.includes('href="https://arxiv.org/abs/2607.21345"'),'Verified research link missing');
assert(boutiqueCss.includes('background:#f4f2ed')&&boutiqueCss.includes('.dlg-service-strip-grid')&&boutiqueCss.includes('aspect-ratio:16/9'),'Editorial section design missing');
assert(home.includes('href="mailto:digitallawgeorgia@gmail.com"'),'Email contact required');
assert(home.includes('https://wa.me/995598451132'),'WhatsApp contact required');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Confidentiality instruction missing');
assert(!home.includes('LegalStepy')&&!home.includes('Sopho'),'Independent brand identity required');
assert(!home.includes('class="dlg-illustration"') && !home.includes('law-tech-canvas'),'Do not return to synthetic app-style artwork');
assert(!home.includes('images.unsplash.com'),'Never depend on remote stock imagery');
for(const id of ['services','business','approach','about','contact'])assert(home.includes('id="'+id+'"'),'Homepage anchor missing '+id);
for(const hook of ['sig-service-row','data-menu-toggle','dlg-sector-card'])assert(englishHome.includes(hook),'English version missing '+hook);
assert(englishHome.includes('Legal counsel') && englishHome.includes('for the digital economy.'),'English headline not server rendered');
assert(englishHome.includes('FinTech &amp; Financial Regulation') && englishHome.includes('Digital Products &amp; Intellectual Property'),'English grouped practice areas missing');
assert(signatureCss.includes('prefers-reduced-motion'),'Reduced-motion preferences missing');
assert(signatureCss.includes('@media(max-width:700px)') && signatureCss.includes('@media(max-width:480px)'),'Responsive base breakpoints missing');
assert((signatureCss.match(/\{/g)||[]).length===(signatureCss.match(/\}/g)||[]).length,'Unbalanced base CSS');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced shared CSS');
new vm.Script(interaction,{filename:'dlg-signature.js'});total++;
assert(!home.includes('data-sig-practices'),'Retired app-style interaction must remain removed');
assert(!interaction.includes('setInterval'),'Unwanted automatic carousel switching must not return');
new vm.Script(script,{filename:'firm-interactions.js'});total++;
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
assert(home.includes('data-en="Sectors">ბიზნესსექტორები</a>'),'Sector menu item missing');
const advisoryDirectory=file('advisory/index.html');
assert((home.match(/class="dlg-advisory-card"/g)||[]).length===3,'Three AI advisory packages required on home');
assert((advisoryDirectory.match(/class="dlg-advisory-card"/g)||[]).length===3,'Advisory directory must contain three packages');
assert(home.includes('href="/advisory/"'),'Advisory navigation missing');
for(const slug of ['ai-readiness','ai-governance-implementation','external-ai-technology-counsel']){const ka=file('advisory/'+slug+'/index.html'),en=file('en/advisory/'+slug+'/index.html');assert(ka.includes('mailto:digitallawgeorgia@gmail.com?subject='),'Service-specific enquiry missing: '+slug);assert(en.includes('<html lang="en"'),'English advisory page missing: '+slug);}
for(const route of ['index.html','en/index.html','advisory/index.html','en/advisory/index.html',...['ai-readiness','ai-governance-implementation','external-ai-technology-counsel'].flatMap(slug=>['advisory/'+slug+'/index.html','en/advisory/'+slug+'/index.html'])]){const page=file(route);assert(!/dlg-advisory-price|₾|\bGEL\s*[\d,]+|Indicative starting fee/i.test(page),'Public advisory fee leaked: '+route);}
const solutionsDirectory=file('solutions/index.html');
assert(solutionsDirectory.includes('class="solution-card"'),'Dedicated legal solutions catalogue must remain available');
assert(home.includes('href="/services/"'),'Homepage must link to the full services directory');
assert(!home.includes('class="dlg-audience-card"') && !home.includes('class="dlg-offer-card"'),'Full audience and offer catalogues must not clutter the homepage');
assert(directory.includes('ფინტექი') && directory.includes('სტარტაპები'),'FinTech and startups must be discoverable in the full directory');
assert(home.includes('ქართულ და უცხოურ კომპანიებს'),'Homepage must address Georgian and international businesses');
assert(home.includes('ციფრული ბიზნესისთვის.'),'Digital business legal positioning missing');
assert((home.match(/class="sig-service-row"/g)||[]).length===6,'Six core editorial service rows required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('ხელოვნური ინტელექტის რეგულირება და მართვა'),'AI practice must remain discoverable');
assert(directory.includes('href="/services/digital-products/"'),'Digital product support must remain accessible from the grouped directory');
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
const aboutProfile=file('about/index.html');
assert(aboutProfile.includes('Queen Mary')&&aboutProfile.includes('Chevening')&&aboutProfile.includes('LLM with Distinction')&&!aboutProfile.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must remain on the profile');
const visibleHome=home.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
assert(!visibleHome.includes('LLM · Distinction')&&!visibleHome.includes('Queen Mary')&&!visibleHome.includes('Chevening'),'Personal qualifications belong on the profile, not visible homepage content');
assert(aboutProfile.includes('https://arxiv.org/abs/2607.21345'),'Verified research missing from profile');
assert(/data-en="Practice Areas">მომსახურება<\/a>/.test(home),'Georgian service navigation must use singular');
for(const name of publicHtml){if(name.endsWith('404.html'))continue;const page=fs.readFileSync(name,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');if(!page.includes('<html lang="ka"'))continue;assert(!/მომსახურებ(?:ები|ების|ებს)/.test(page),'Georgian plural service wording in '+name);}
assert(home.includes('დამოუკიდებელი იურიდიული ფირმა')&&home.includes('დაგვიკავშირდით'),'Natural Georgian positioning and CTA missing');
assert(!visibleHome.includes('ბუტიკური იურიდიული პრაქტიკა')&&!visibleHome.includes('AI-ის მმართველობა'),'Retired literal translations must not return');
assert(file('services/data-protection/index.html').includes('მონაცემთა დაცვაზე ზეგავლენის შეფასება'),'Statutory data protection terminology missing');
assert(file('services/virtual-assets/index.html').includes('ვირტუალური აქტივის მომსახურების პროვაიდერი'),'Statutory VASP terminology missing');
assert(file('advisory/ai-governance-implementation/index.html').includes('პრობლემის შესახებ პასუხისმგებელი პირის ინფორმირების წესი'),'Localised AI governance procedure missing');
assert(!file('advisory/ai-governance-implementation/index.html').includes('პრობლემების ესკალაცია'),'Retired translation must not return');
for(const [slug,cover] of [['ai-pilot-at-work','ai-pilot.webp'],['technology-contract-review','contracts.webp'],['supplier-data-review','suppliers.webp']]){for(const lang of ['','en/']){const article=file(lang+'resources/'+slug+'/index.html');assert(article.includes('/assets/resources/'+cover),'Article editorial image missing: '+lang+slug);}}
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');

for(const slug of ["technology","financial-services","commerce","startups-investors","international","legal-teams"]){const imagePath='/assets/sectors/'+slug+'.jpg';assert(home.includes('src="'+imagePath+'"'),'New sector photograph missing '+slug);assert(fs.existsSync(root+imagePath),'Local sector photograph missing '+slug);}
