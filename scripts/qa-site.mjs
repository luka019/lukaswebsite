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
const css=file('firm-premium.css');
const script=file('firm-interactions.js');

assert(home.includes('class="law-home"'),'New homepage not active');
assert(home.includes('class="dlg-photo-feature"'),'Editorial photo carousel missing');
assert(home.includes('firm-premium.css'),'Premium stylesheet not linked');
assert(home.includes('firm-interactions.js'),'Interactions script not linked');
assert((home.match(/<h1\b/g)||[]).length===1,'Home must have one h1');
assert(!home.includes('data-showcase-slide'),'Duplicated secondary showcase must be absent');
assert(home.includes('dlg-feature-section'),'Prominent wide hero feature required');
assert((home.match(/law-service-glyph/g)||[]).length===6,'Six differentiated service cards required');
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
const uiCss=file('firm-upgrade.css');
const visualCss=file('firm-reference.css');
assert(home.includes('data-hero-rotator'),'Accessible hero carousel missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Unified masthead wrapper missing');
assert(home.includes('data-en="Legal support for technology businesses"'),'Professional homepage headline missing');
assert(!home.includes('data-en="Home">მთავარი'),'Redundant homepage navigation');
const finalCss=file('firm-reference.css');
assert(finalCss.includes('--dlg-intro-surface:#F5F9FF'),'Integrated intro palette missing');
assert(finalCss.includes('.law-home .site-header.dlg-integrated-header.dlg-scrolled'),'Scrolled header treatment missing');
const interactions=file('firm-interactions.js');
assert(interactions.includes('dlg-scrolled'),'Header must react to scrolling');
new vm.Script(interactions,{filename:'firm-interactions.js'});total++;
assert(home.includes('href="/services/digital-products/"'),'Digital products must have a primary card');

assert((home.match(/data-hero-topic="/g)||[]).length===4,'Four clickable hero choices required');
assert(home.includes('firm-hero.js'),'Hero interaction script must load');
assert(home.includes('firm-upgrade.css'),'Refinement stylesheet must load');
assert(home.includes('law-about-image'),'Founder profile and portrait missing');
assert(home.includes('ლუკა შახყულაშვილი'),'Luka team profile missing');
assert(!home.includes('dlg-team-member') && !home.includes('dlg-team-monogram'),'Retired team card markup must be absent');
assert(home.includes('ბიზნესის იურიდიული მხარდაჭერა'),'Ongoing legal support should remain available');
assert(home.includes('ფინტექი და ფინანსური რეგულირება'),'FinTech practice missing');
assert(home.includes('law-more-services'),'Additional services directory missing');
assert((home.match(/class="law-service(?: law-service-featured)?"/g)||[]).length===6,'Six core service cards required');
assert(uiCss.includes('prefers-reduced-motion'),'New animations must honour reduced motion');
assert(home.includes('dlg-photo-tabs'),'Dark blue topical tabs are required');
assert((home.match(/data-hero-topic="/g)||[]).length===4,'Four accessible manual selectors required');
assert((home.match(/class="dlg-benefit"/g)||[]).length===4,'Four concise benefit items required');
assert(home.includes('data-hero-pause'),'Carousel pause control missing');
assert(home.includes('data-hero-prev') && home.includes('data-hero-next'),'Carousel arrow controls missing');
assert((home.match(/data-hero-dot=/g)||[]).length===4,'Four progress indicators required');
assert((home.match(/class="dlg-why-icon"/g)||[]).length===4,'Four clearly explained reasons are required');
assert(home.indexOf('dlg-photo-tabs')<home.indexOf('dlg-photo-stage'),'Carousel tabs must appear above the photo');
assert(home.includes('law-service-featured'),'Featured service card should remain prominent');
assert(home.includes('data-en="Email us"'),'Clear consultation CTA must be bilingual');
assert(home.includes('ლუკა შახყულაშვილი'),'Real founder profile required');
assert(!home.includes('data-hero-slide="architecture"'),'Generic architecture service slide must not return');
assert(visualCss.includes('grid-template-columns:repeat(3,minmax(0,1fr))'),'Services must use three-column desktop layout');
assert(visualCss.includes('.dlg-editorial-hero h1'),'Editorial headline typography must be styled');
assert(visualCss.includes('.dlg-photo-tab.is-current'),'Active tab styling missing');
assert((visualCss.match(/\{/g)||[]).length===(visualCss.match(/\}/g)||[]).length,'Unbalanced final design CSS');
assert(heroScript.includes('dots.forEach'),'Progress indicators must respond to slide selection');
assert(heroScript.includes('intervalMs = 8000'),'Autoplay pacing must be readable');
assert(heroScript.includes('setInterval'),'Automatic rotation must be implemented');
assert(heroScript.includes('visibilitychange') && heroScript.includes('focusin'),'Automatic rotation must pause on inattention/accessibility');
assert(heroScript.includes('prefers-reduced-motion'),'Reduced motion support required');
assert(heroScript.includes('/assets/london-architecture.jpg'),'Image fallback required');
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
  assert(h.includes('firm-premium.css'),'Premium branding not applied to '+p);
  assert(!h.includes('law-client-shortcut'),'Redundant desktop header shortcut on '+p);
}
const directory=fs.readFileSync(path.join(root,'services/index.html'),'utf8');
assert(directory.includes('law-directory-feature'),'Ongoing legal counsel needs a featured directory entry');
assert(directory.indexOf('/services/contracts/')<directory.indexOf('/services/fintech/'),'Contract advice should precede FinTech in the directory');
assert(directory.includes('/services/ongoing-legal-support/'),'Ongoing legal support route must be linked');
assert(home.includes('ბიზნესისთვის.'),'Homepage should remain directly business-focused');
assert(home.includes('იურიდიული მხარდაჭერა ტექნოლოგიური ბიზნესისთვის'),'Technology-law positioning missing');
assert((home.match(/data-hero-slide=/g)||[]).length===4,'Four photographic slides required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('AI-ის სამართლებრივი საკითხები'),'AI service not prominent');
assert(home.includes('ციფრული პროდუქტები და პლატფორმები'),'Digital product service link missing');
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
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
