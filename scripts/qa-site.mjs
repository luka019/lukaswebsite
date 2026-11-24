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
const editorialCss=file('dlg-editorial-home.css');
assert(home.includes('class="law-home dlg-editorial-home"'),'Editorial redesign missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Shared masthead missing');
assert(home.includes('law-brand-tagline')&&home.includes('data-en="Legal Support for Digital Business"'),'Bilingual tagline missing');
assert(home.includes('href="/dlg-editorial-home.css?v=20261125-editorial"'),'Editorial stylesheet missing');
assert(editorialCss.includes('--ed-navy:#102a48')&&editorialCss.includes('--ed-cream:#f4f2ed')&&editorialCss.includes('--ed-mist:#eaeef1'),'Editorial palette missing');
assert((editorialCss.match(/\{/g)||[]).length===(editorialCss.match(/\}/g)||[]).length,'Unbalanced editorial CSS');
assert(editorialCss.includes('grid-template-columns:repeat(2,minmax(0,1fr))')&&editorialCss.includes('@media(max-width:480px)')&&editorialCss.includes('prefers-reduced-motion'),'Responsive layouts missing');
assert(home.includes('id="hero-title"')&&home.includes('სამართალი ტექნოლოგიური ბიზნესისთვის.'),'Georgian headline missing');
assert(englishHome.includes('Law for the technology economy.'),'English headline missing');
assert((home.match(/<h1\b/g)||[]).length===1,'One H1 required');
assert((home.match(/<section\b/g)||[]).length===6,'Six focused sections required');
let last=-1;for(const id of ['services','advisory-packages','about','insights','contact']){const pos=home.indexOf('id="'+id+'"');assert(pos>last,'Editorial section order: '+id);last=pos;}
assert((home.match(/class="ed-practice"/g)||[]).length===6,'Six practice links required');
assert((home.match(/class="ed-advisory-row"/g)||[]).length===3,'Three advisory services required');
assert((home.match(/class="ed-photo"/g)||[]).length===1&&home.includes('src="/assets/london-architecture.jpg"'),'Static architecture photograph missing');
assert(!home.includes('data-dlg-slide')&&!home.includes('data-dlg-practice-search')&&!home.includes('dlg-hero-carousel.js'),'Old carousel and filter should stay off homepage');
assert((home.match(/src="\/assets\/luka-shakhkulashvili.png"/g)||[]).length===1,'One founder portrait required');
assert(home.includes('ლუკა შახყულაშვილი')&&home.includes('https://arxiv.org/abs/2607.21345')&&home.includes('Regulating autonomous and agentic AI'),'Founder and research evidence missing');
assert(home.includes('class="ed-proof"'),'Experience strip missing');
assert((home.match(/class="resource-card visual-resource"/g)||[]).length===2,'Two published insights required');
assert(home.includes('href="/resources/ai-pilot-at-work/"')&&home.includes('href="/resources/technology-contract-review/"'),'Relevant published insights missing');
for(const route of ['/services/','/services/ai/','/services/data-protection/','/services/contracts/','/services/digital-products/','/services/fintech/','/services/ongoing-legal-support/','/business/international/','/advisory/','/about/','/resources/','/solutions/','/how-we-work/'])assert(home.includes('href="'+route+'"'),'Discoverability regression: '+route);
assert(home.includes('href="#contact"')&&home.includes('href="mailto:digitallawgeorgia@gmail.com"')&&home.includes('https://wa.me/995598451132'),'Contact links missing');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Confidentiality instruction missing');
assert(!home.includes('LegalStepy')&&!home.includes('Sopho')&&!home.includes('images.unsplash.com'),'Independent brand and local imagery required');
for(const hook of ['ed-practice','ed-advisory-row','ed-founder','ed-resources','data-menu-toggle'])assert(englishHome.includes(hook),'English structure missing: '+hook);
assert(englishHome.includes('href="/en/advisory/ai-readiness/"')&&englishHome.includes('href="/en/services/ai/"'),'English routes missing');
assert((signatureCss.match(/\{/g)||[]).length===(signatureCss.match(/\}/g)||[]).length,'Unbalanced base CSS');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced shared CSS');
new vm.Script(interaction,{filename:'dlg-signature.js'});total++;
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
assert((businessDirectory.match(/class="dlg-audience-card"/g)||[]).length===5,'Five client groups must remain available on the business page');
const advisoryDirectory=file('advisory/index.html');
assert((home.match(/class="ed-advisory-row"/g)||[]).length===3,'Three AI advisory packages required on home');
assert((advisoryDirectory.match(/class="dlg-advisory-card"/g)||[]).length===3,'Advisory directory must contain three packages');
assert(home.includes('href="/advisory/"'),'Advisory navigation missing');
for(const slug of ['ai-readiness','ai-governance-implementation','external-ai-technology-counsel']){const ka=file('advisory/'+slug+'/index.html'),en=file('en/advisory/'+slug+'/index.html');assert(ka.includes('mailto:digitallawgeorgia@gmail.com?subject='),'Service-specific enquiry missing: '+slug);assert(en.includes('<html lang="en"'),'English advisory page missing: '+slug);}
for(const route of ['index.html','en/index.html','advisory/index.html','en/advisory/index.html',...['ai-readiness','ai-governance-implementation','external-ai-technology-counsel'].flatMap(slug=>['advisory/'+slug+'/index.html','en/advisory/'+slug+'/index.html'])]){const page=file(route);assert(!/dlg-advisory-price|₾|\bGEL\s*[\d,]+|Indicative starting fee/i.test(page),'Public advisory fee leaked: '+route);}
const solutionsDirectory=file('solutions/index.html');
assert(solutionsDirectory.includes('class="solution-card"'),'Dedicated legal solutions catalogue must remain available');
assert(home.includes('href="/services/"'),'Homepage must link to the full services directory');
assert(!home.includes('class="dlg-audience-card"') && !home.includes('class="dlg-offer-card"'),'Full audience and offer catalogues must not clutter the homepage');
assert(directory.includes('ფინტექი') && directory.includes('სტარტაპები'),'FinTech and startups must be discoverable in the full directory');
assert(home.includes('ქართული და საერთაშორისო კომპანიებისთვის'),'Homepage must address Georgian and international businesses');
assert(home.includes('ტექნოლოგიური ბიზნესისთვის.'),'Digital business legal positioning missing');
assert((home.match(/class="ed-practice"/g)||[]).length===6,'Eight distinct editorial service rows required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('ხელოვნური ინტელექტის სამართალი და მართვა'),'AI practice must remain discoverable');
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
assert(home.includes('LLM (Distinction)') && home.includes('Queen Mary') && home.includes('Chevening') && !home.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must be present and accurate');
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
