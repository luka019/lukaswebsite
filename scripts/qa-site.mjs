/* DLG public build and publishing verification.
   Static smoke checks are not a replacement for real-browser visual QA. */
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
const atelierCss=file('dlg-atelier.css');
const interaction=file('dlg-signature.js');
const script=file('firm-interactions.js');
assert(home.includes('class="law-home dlg-signature-home dlg-atelier"'),'Atelier legal practice homepage missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Shared professional masthead missing');
assert(home.includes('law-brand-tagline') && home.includes('იურიდიული მომსახურება ციფრული ბიზნესისთვის'),'Agreed header tagline missing');
assert(home.includes('data-en="Legal Support for Digital Business"'),'English header tagline missing');
assert(home.includes('href="/dlg-signature.css?v=20261112-signature1"'),'Signature design system not loaded');
assert(home.includes('href="/dlg-atelier.css?v=20261118-atelier1"'),'Editorial atelier stylesheet missing');
assert(atelierCss.includes('--atelier-ink:#142E41') && atelierCss.includes('--atelier-paper:#FCFCFA'),'Editorial palette missing');
assert(atelierCss.includes('.atelier-art-panel') && atelierCss.includes('.atelier-service-symbol'),'Illustrated editorial layout missing');
assert(!home.includes('dlg-signature.js'),'Retired app-style service interactions must not load');
assert(!home.includes('firm-hero.js'),'Retired illustrated hero must not be loaded');
assert(home.includes('id="hero-title" data-en="Specialist law for a changing digital world."'),'Specialist bilingual heading missing');
assert(home.includes('ტექნოლოგიებისა და AI-ის სამართალი თანამედროვე ბიზნესისთვის.'),'Georgian specialist heading missing');
assert(home.includes('data-en="INDEPENDENT BOUTIQUE LEGAL PRACTICE"'),'Boutique positioning missing');
assert((home.match(/<h1\b/g)||[]).length===1,'Homepage must contain one H1');
assert((home.match(/<section\b/g)||[]).length===7,'Keep exactly seven purposeful homepage sections');
assert(home.indexOf('id="about"')<home.indexOf('id="services"') &&
       home.indexOf('id="services"')<home.indexOf('id="business"') &&
       home.indexOf('id="business"')<home.indexOf('id="approach"'),
       'Founder, services, business needs and delivery must follow the right order');
assert((home.match(/class="sig-service-row"/g)||[]).length===8,'Eight specialist practice rows required');
assert(!home.includes('role="tablist"') && !home.includes('data-sig-tab'),'App-like tabs must not return');
assert(home.includes('class="sig-focus-list"'),'Boutique focus list missing');
assert(home.includes('src="/assets/luka-shakhkulashvili.png"'),'Founder portrait required');
assert(home.includes('src="/assets/dlg-editorial-hero.svg"'),'Original architectural illustration missing');
assert(home.includes('src="/assets/dlg-editorial-emblem.svg"'),'Original editorial emblem missing');
assert((home.match(/class="atelier-service-symbol"/g)||[]).length===8,'Original service drawings missing');
assert((home.match(/src="\/assets\/luka-shakhkulashvili.png"/g)||[]).length===1,'Do not duplicate the founder portrait');
assert(home.includes('ლუკა შახყულაშვილი'),'Founder must be identifiable');
assert((home.match(/class="container sig-proofbar"/g)||[]).length===1,'Substantiated credentials strip required');
assert(home.includes('href="/services/"') && home.includes('href="/business/"'),'Detailed service and business directory links required');
assert(home.includes('href="/services/digital-products/"'),'Digital product offer must remain accessible');
assert(home.includes('href="/services/contracts/"'),'Contract practice link required');
assert(home.includes('href="/services/data-protection/"'),'Data protection practice link required');
assert(home.includes('href="/services/ai/"'),'AI legal practice link required');
assert((home.match(/class="sig-audience-item"/g)||[]).length===3,'Three practical client situations required');
assert((home.match(/class="sig-process-step"/g)||[]).length===3,'Three transparent delivery steps required');
assert((home.match(/class="resource-card visual-resource"/g)||[]).length<=2,'Insights must not crowd the homepage');
assert(home.includes('href="mailto:digitallawgeorgia@gmail.com"'),'Email contact required');
assert(home.includes('https://wa.me/995598451132'),'WhatsApp contact required');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Confidentiality instruction missing');
assert(!home.includes('LegalStepy') && !home.includes('Sopho'),'Distinct brand identity required');
assert(!home.includes('class="dlg-illustration"'),'Remove artificial hero illustrations');
assert(!home.includes('images.unsplash.com'),'Do not depend on remote synthetic hero imagery');
assert(!home.includes('law-tech-canvas'),'Retired technology canvas must not return');
for(const id of ['services','approach','about','contact']){
 assert(home.includes('id="'+id+'"'),'Homepage anchor missing: '+id);
}
for(const hook of ['sig-service-row','data-menu-toggle']){
 assert(englishHome.includes(hook),'English version lost interaction hook '+hook);
}
assert(englishHome.includes('Specialist law for a changing digital world.'),'English heading must be pre-rendered');
assert(englishHome.includes('FinTech &amp; Digital Assets') && englishHome.includes('Software &amp; Intellectual Property'),'English practice areas missing');
assert(signatureCss.includes('prefers-reduced-motion'),'Respect reduced-motion preferences');
assert(signatureCss.includes('@media(max-width:700px)') && signatureCss.includes('@media(max-width:480px)'),'Responsive mobile breakpoints missing');
assert(signatureCss.includes('#F6F2EC') && signatureCss.includes('#1B2B37'),'Signature visual palette missing');
assert((signatureCss.match(/\{/g)||[]).length===(signatureCss.match(/\}/g)||[]).length,'Unbalanced signature CSS');
assert((atelierCss.match(/\{/g)||[]).length===(atelierCss.match(/\}/g)||[]).length,'Unbalanced atelier CSS');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced shared CSS');
new vm.Script(interaction,{filename:'dlg-signature.js'});total++;
assert(!home.includes('data-sig-practices'),'No interactive practice-tab dependency');
assert(!interaction.includes('setInterval'),'Unwanted automatic content switching must not return');
new vm.Script(script,{filename:'firm-interactions.js'});total++;
for(const p of [
  'styles.css','firm.css','dlg-signature.css','dlg-atelier.css','dlg-signature.js','script.js','favicon.svg','services/index.html',
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
assert(home.includes('ტექნოლოგიებისა და AI-ის სამართალი თანამედროვე ბიზნესისთვის.'),'Technology and AI law positioning missing');
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
assert(home.includes('LLM Distinction') && home.includes('Queen Mary') && home.includes('Chevening') && !home.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must be present and accurate');
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
