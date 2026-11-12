/* DLG build verification: protects the public technology-law experience.
   Static smoke checks only; does not exercise authenticated client workflows. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.env.SITE_OUTPUT||'dist';
let total=0;
function assert(ok,message){total++;if(!ok)throw new Error('DLG smoke check failed: '+message)}
function file(p){const full=path.join(root,p);assert(fs.existsSync(full),'Missing '+p);return fs.readFileSync(full,'utf8')}
const home=file('index.html');
const css=file('firm.css');
const script=file('firm-interactions.js');
const englishHome=file('en/index.html');
for(const hook of ['data-hero-rotator','data-hero-pause','data-lens-controls','data-lens-choice','data-menu-toggle','data-reveal']){
 assert(new RegExp('\\s'+hook+'(?:[=\\s>])').test(englishHome),'English generation lost interaction hook: '+hook);
}

assert(home.includes('class="law-home"'),'New homepage not active');
assert(home.includes('class="dlg-photo-feature"'),'Editorial photo carousel missing');
assert(home.includes('firm.css'),'Shared public stylesheet not linked');
assert(home.includes('law-brand-tagline') && home.includes('იურიდიული მომსახურება ციფრული ბიზნესისთვის'),'Georgian header tagline must be present');
assert(home.includes('data-en="Legal Support for Digital Business"'),'English header tagline must be available');
assert(home.includes('data-en="TECHNOLOGY & COMMERCIAL LAW"'),'Practice positioning must remain distinct from the brand tagline');
assert(home.includes('firm-interactions.js'),'Interactions script not linked');
assert((home.match(/<h1\b/g)||[]).length===1,'Home must have one h1');
assert(!home.includes('data-showcase-slide'),'Duplicated secondary showcase must be absent');
assert(home.includes('dlg-feature-section'),'Prominent wide hero feature required');
assert((home.match(/<section\\b/g)||[]).length===7,'Homepage must contain seven distinct purposeful sections');
assert(home.indexOf('id="about"')<home.indexOf('id="services"') && home.indexOf('id="services"')<home.indexOf('id="business"') && home.indexOf('id="business"')<home.indexOf('id="approach"'),'Editorial section order must introduce the lawyer before catalogues');
assert((home.match(/class="dlg-editorial-practice"/g)||[]).length===4,'Four concise editorial practice links required');
assert(home.includes('data-back-to-top'),'Back-to-top control missing');
assert(!home.includes('law-client-shortcut'),'Remove redundant desktop WhatsApp shortcut');
assert(home.includes('href="mailto:digitallawgeorgia@gmail.com"'),'Direct consultation contact missing');
for(const id of ['services','approach','about','contact']){
  assert(home.includes('id="'+id+'"'),'Missing homepage anchor: '+id);
}
assert(css.includes('@media(max-width:390px)'),'Small mobile breakpoint missing');
assert(home.includes('dlg-editorial-hero'),'High contrast editorial hero required');
assert(home.includes('class="dlg-photo-stage"'),'Landscape slide stage required');
assert(css.includes('prefers-reduced-motion'),'Reduced motion fallback missing');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced premium CSS');
new vm.Script(script,{filename:'firm-interactions.js'});total++;
const heroScript=file('firm-hero.js');
const uiCss=css;
const visualCss=css;
assert(home.includes('data-hero-rotator'),'Accessible hero carousel missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Unified masthead wrapper missing');
assert(home.includes('id="hero-title" data-en="Legal counsel for your business."') && home.includes('თქვენი ბიზნესის სამართლებრივი პარტნიორი.'),'Human-centred Georgian homepage headline missing');
assert(home.includes('data-en="Legal counsel for your business."'),'English legal practice homepage headline missing');
assert(home.includes('data-en="TECHNOLOGY & COMMERCIAL LAW"'),'Technology and commercial law positioning must remain in hero eyebrow');
assert(!home.includes('data-en="Home">მთავარი'),'Redundant homepage navigation');
const finalCss=css;
assert(finalCss.includes('--dlg-intro-surface:#F3F6FB'),'Integrated blue intro palette missing');
assert(finalCss.includes('.law-home .site-header.dlg-integrated-header.dlg-scrolled'),'Scrolled header treatment missing');
const interactions=file('firm-interactions.js');
assert(interactions.includes('dlg-scrolled'),'Header must react to scrolling');
new vm.Script(interactions,{filename:'firm-interactions.js'});total++;
assert(home.includes('href="/services/digital-products/"'),'Digital products must have a primary card');

assert((home.match(/data-hero-topic="/g)||[]).length===4,'Four clickable hero choices required');
assert(home.includes('firm-hero.js'),'Hero interaction script must load');
assert(!home.includes('firm-upgrade.css')&&!home.includes('firm-reference.css')&&!home.includes('firm-premium.css'),'Retired visual patch layers must not load');
assert(home.includes('law-about-image'),'Founder profile and portrait missing');
assert(home.includes('class="law-about-image"') && home.includes('src="/assets/luka-shakhkulashvili.png"'),'Genuine founder portrait and biography must appear after the hero');
assert(css.includes('background:#f8f7f3'),'Warm editorial law-firm hero surface missing');
assert(!home.includes('<h1 id="hero-title"><span data-en="Legal support"'),'Old generic digital-business hero headline must not return');
assert(home.includes('ლუკა შახყულაშვილი'),'Luka team profile missing');
assert(!home.includes('dlg-team-member') && !home.includes('dlg-team-monogram'),'Retired team card markup must be absent');
assert(!home.includes('class="dlg-offer-card"'),'Commercial offers must not flood the homepage');
assert(!home.includes('class="portfolio-path"'),'Duplicate business-path cards must not return');
assert((home.match(/class="dlg-editorial-situation"/g)||[]).length===3,'Three real client situations required');
assert(uiCss.includes('prefers-reduced-motion'),'New animations must honour reduced motion');
assert(home.includes('dlg-photo-tabs'),'Accessible topical selectors are required');
assert((home.match(/data-hero-topic="/g)||[]).length===4,'Four accessible manual selectors required');
assert(!home.includes('class="dlg-benefit"'),'Redundant value-proposition cards must not return');
assert(home.includes('data-hero-pause'),'Carousel pause control missing');
assert(home.includes('data-hero-prev') && home.includes('data-hero-next'),'Carousel arrow controls missing');
assert((home.match(/data-hero-dot=/g)||[]).length===4,'Four progress indicators required');
assert(!home.includes('class="dlg-why-icon"'),'Duplicative why-us icon grid must not return');
assert(home.indexOf('dlg-photo-stage')<home.indexOf('dlg-photo-tabs'),'Topic selectors should follow the illustrated service');
assert(home.includes('dlg-editorial-services'),'Editorial services must be prominent');
assert(home.includes('data-en="Email us"'),'Clear consultation CTA must be bilingual');
assert(home.includes('ლუკა შახყულაშვილი'),'Real founder profile required');
assert(!home.includes('data-hero-slide="architecture"'),'Generic architecture service slide must not return');
assert((home.match(/class="dlg-illustration"/g)||[]).length===4,'Four service-specific illustrations required');
assert(!home.includes('class="firm-photo"'),'One static photograph must not replace the service visuals');
assert(home.includes('class="dlg-sheet"') && home.includes('class="dlg-orbit"'),'Original animated illustration elements required');
assert(visualCss.includes('.dlg-editorial-hero h1'),'Editorial headline typography must be styled');
assert(visualCss.includes('.dlg-photo-tab.is-current'),'Active tab styling missing');
assert((visualCss.match(/\{/g)||[]).length===(visualCss.match(/\}/g)||[]).length,'Unbalanced final design CSS');
assert(heroScript.includes('dots.forEach'),'Progress indicators must respond to slide selection');
assert(heroScript.includes('intervalMs = 8000'),'Autoplay pacing must be readable');
assert(heroScript.includes('setInterval'),'Automatic rotation must be implemented');
assert(heroScript.includes('visibilitychange') && heroScript.includes('focusin'),'Automatic rotation must pause on inattention/accessibility');
assert(heroScript.includes('prefers-reduced-motion'),'Reduced motion support required');
assert(!home.includes('images.unsplash.com'),'Hero artwork must work without third-party image requests');
assert(heroScript.includes('motionPaused'),'Pause control must stop decorative motion as well as rotation');
assert(!home.includes('Bakhbakhashvili') && !home.includes('Sopho'),'Additional biography must be absent');
assert(!home.includes('law-tech-canvas'),'Old oversized abstract hero illustration must be absent');
new vm.Script(heroScript,{filename:'firm-hero.js'});total++;

for(const p of [
  'styles.css','firm.css','script.js','favicon.svg','services/index.html',
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
assert(directory.includes('ფინტექი') || directory.includes('FinTech'),'Specialist financial technology work must remain discoverable in the full directory');
assert(home.includes('ქართულ და საერთაშორისო კომპანიებს ვეხმარებით'),'Homepage must address Georgian and international business clients');
assert(home.includes('ტექნოლოგიური და კომერციული სამართალი'),'Technology-law positioning missing');
assert((home.match(/data-hero-slide=/g)||[]).length===4,'Four illustrated service slides required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('AI-ის სამართლებრივი რეგულირება და რისკების მართვა'),'AI practice must remain discoverable');
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
assert(home.includes('LLM, Distinction')&&home.includes('IAPP · AIGP'),'Confirmed founder credentials missing');
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
