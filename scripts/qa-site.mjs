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
const referenceCss=file('dlg-reference-home.css');
assert(home.includes('class="law-home dlg-reference-home"'),'Screenshot-led homepage missing');
assert(home.includes('class="site-header law-header dlg-integrated-header"'),'Shared masthead missing');
assert(home.includes('href="/dlg-reference-home.css?v=20261125-reference1"'),'Reference CSS missing');
for(const palette of ['#102a48','#f4f2ed','#eaeef1'])assert(referenceCss.includes(palette),'Reference palette missing: '+palette);
assert(referenceCss.includes('aspect-ratio:3/4')&&referenceCss.includes('aspect-ratio:16/9')&&referenceCss.includes('prefers-reduced-motion'),'Reference photo proportions or responsive safeguards missing');
assert((referenceCss.match(/\{/g)||[]).length===(referenceCss.match(/\}/g)||[]).length,'Unbalanced reference CSS');
assert(home.includes('id="hero-title"')&&home.includes('სამართალი ტექნოლოგიური ბიზნესისთვის.'),'Reference Georgian headline missing');
assert(englishHome.includes('Law for the technology economy.'),'Reference English headline missing');
assert((home.match(/<section\b/g)||[]).length===6,'Exactly six reference sections required');
let last=-1;for(const id of ['services','advisory-packages','about','insights','contact']){const position=home.indexOf('id="'+id+'"');assert(position>last,'Incorrect section order: '+id);last=position;}
for(const page of [home,englishHome]){
 assert((page.match(/class="ref-expertise-row"/g)||[]).length===6,'Six compact expertise links required');
 assert((page.match(/class="ref-advisory-row"/g)||[]).length===3,'Three compact advisory links required');
 assert((page.match(/class="ref-business-item"/g)||[]).length===3,'Three business services required');
 assert((page.match(/class="ref-insight"/g)||[]).length===2,'Two visual insights required');
 assert(!page.includes('data-dlg-slide')&&!page.includes('data-dlg-practice-filter')&&!page.includes('dlg-credentials')&&!page.includes('sig-proofbar')&&!page.includes('dlg-service-strip'),'Old homepage clutter must not return');
}
for(const path of ['/assets/london-architecture.jpg','/assets/illustrations/law-technology-sculpture.webp','/assets/resources/suppliers.webp']){assert(home.includes('src="'+path+'"'),'Local editorial image missing: '+path);assert(fs.existsSync(root+path),'Editorial image asset absent: '+path);}
assert((home.match(/class="ref-hero-photo"/g)||[]).length===1,'Single portrait-ratio architecture image required');
assert(home.includes('href="/resources/ai-pilot-at-work/"')&&home.includes('href="/resources/technology-contract-review/"'),'Actual published insights missing');
assert(home.includes('https://arxiv.org/abs/2607.21345'),'Research link missing');
for(const route of ['/services/','/services/ai/','/services/data-protection/','/services/contracts/','/services/digital-products/','/services/fintech/','/services/ongoing-legal-support/','/advisory/','/business/','/solutions/enter-georgia/','/solutions/contract-review/','/solutions/privacy-review/','/resources/'])assert(home.includes('href="'+route+'"'),'Reference client journey missing: '+route);
assert(englishHome.includes('href="/en/services/ai/"')&&englishHome.includes('href="/en/advisory/ai-readiness/"'),'English routes missing');
assert(home.includes('href="#contact"')&&home.includes('href="mailto:digitallawgeorgia@gmail.com"')&&home.includes('https://wa.me/995598451132'),'Contact journey missing');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Confidentiality instruction missing');
assert(!home.includes('images.openai.com')&&!home.includes('images.unsplash.com'),'External reference images must not be hotlinked');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced shared CSS');
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
assert((home.match(/class="ref-advisory-row"/g)||[]).length===3,'Three AI advisory services required on home');
assert((advisoryDirectory.match(/class="dlg-advisory-card"/g)||[]).length===3,'Advisory directory must contain three packages');
assert(home.includes('href="/advisory/"'),'Advisory navigation missing');
for(const slug of ['ai-readiness','ai-governance-implementation','external-ai-technology-counsel']){const ka=file('advisory/'+slug+'/index.html'),en=file('en/advisory/'+slug+'/index.html');assert(ka.includes('mailto:digitallawgeorgia@gmail.com?subject='),'Service-specific enquiry missing: '+slug);assert(en.includes('<html lang="en"'),'English advisory page missing: '+slug);}
for(const route of ['index.html','en/index.html','advisory/index.html','en/advisory/index.html',...['ai-readiness','ai-governance-implementation','external-ai-technology-counsel'].flatMap(slug=>['advisory/'+slug+'/index.html','en/advisory/'+slug+'/index.html'])]){const page=file(route);assert(!/dlg-advisory-price|₾|\bGEL\s*[\d,]+|Indicative starting fee/i.test(page),'Public advisory fee leaked: '+route);}
const solutionsDirectory=file('solutions/index.html');
assert(solutionsDirectory.includes('class="solution-card"'),'Dedicated legal solutions catalogue must remain available');
assert(home.includes('href="/services/"'),'Homepage must link to the full services directory');
assert(!home.includes('class="dlg-audience-card"') && !home.includes('class="dlg-offer-card"'),'Full audience and offer catalogues must not clutter the homepage');
assert(directory.includes('ფინტექი') && directory.includes('სტარტაპები'),'FinTech and startups must be discoverable in the full directory');
assert(home.includes('href="/solutions/enter-georgia/"'),'International businesses must remain supported');
assert(home.includes('ტექნოლოგიური ბიზნესისთვის.'),'Technology business positioning missing');
assert((home.match(/class="ref-expertise-row"/g)||[]).length===6,'Six distinct reference expertise links required');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('AI-ის სამართალი და მართვა'),'AI practice must remain discoverable');
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
const aboutProfile=file('about/index.html');
assert(aboutProfile.includes('Queen Mary')&&aboutProfile.includes('Chevening')&&aboutProfile.includes('LLM with Distinction')&&!aboutProfile.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must remain on the profile');
const visibleHome=home.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
assert(!visibleHome.includes('LLM · Distinction')&&!visibleHome.includes('Queen Mary')&&!visibleHome.includes('Chevening'),'Personal qualifications belong on the profile, not visible homepage content');
assert(aboutProfile.includes('https://arxiv.org/abs/2607.21345'),'Verified research missing from profile');
for(const [slug,cover] of [['ai-pilot-at-work','ai-pilot.webp'],['technology-contract-review','contracts.webp'],['supplier-data-review','suppliers.webp']]){for(const lang of ['','en/']){const article=file(lang+'resources/'+slug+'/index.html');assert(article.includes('/assets/resources/'+cover),'Article editorial image missing: '+lang+slug);}}
assert(!home.includes('LegalStepy')&&!home.includes('6+'),'Unsupported profile copy');
assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');
