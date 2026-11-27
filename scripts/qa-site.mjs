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
assert(!hybridJs.includes('dlg-hero-layer')&&!hybridJs.includes('dlg-hero-controls'),'Signature hero must remain static and unobstructed');
assert(!hybridJs.includes('fetch(')&&!hybridJs.includes('localStorage')&&!hybridJs.includes('sessionStorage'),'Homepage must not send or retain enquiry data');
assert(hybridJs.includes('event.preventDefault()')&&home.includes('href="mailto:digitallawgeorgia@gmail.com" id="enquiry-mailto"'),'User-controlled enquiry composition required');
assert(hybridCss.includes('prefers-reduced-motion')&&hybridCss.includes('#28568c')&&hybridCss.includes('#f3f7fb'),'Modern blue and white design missing');
for(const [page,lang] of [[home,'ka'],[englishHome,'en']]){
 assert(page.includes('<html lang="'+lang+'"'),'Homepage language is not static');
 assert(page.includes('class="masthead"')&&page.includes('class="hero"'),'Approved masthead and hero missing');
 assert((page.match(/<h1\b/g)||[]).length===1,'One H1 required');
 assert((page.match(/class="practice-card"/g)||[]).length===6,'Six expertise cards required');
 assert(!page.includes('class="advisory-tabs"')&&!page.includes('id="advisory-heading"'),'Retired homepage AI module is still present');

 assert((page.match(/class="home-sector-link"/g)||[]).length===6,'Six visible sector routes required');
 assert((page.match(/class="home-sector-media"/g)||[]).length===6,'Six editorial sector images required');
 assert((page.match(/class="home-article-media"/g)||[]).length===3,'Three editorial insight images required');
 assert(page.includes('class="founder-credentials"')&&page.includes('class="dlg-home-firm-copy"')&&page.includes('class="dlg-home-founder-card"'),'Firm and founder must be clearly distinguished');
 assert(page.includes('class="dlg-practice-explorer"')&&page.includes('class="dlg-practice-stage"')&&page.includes('class="hero-content"')&&!page.includes('class="dlg-hero-foot"'),'Signature hero and practice explorer required');
 assert(page.includes('dlg-home-firm-principles')&&page.includes('/dlg-polish.css?v=20261127-v1')&&page.includes('/dlg-polish.js?v=20261127-v1'),'Shared polish layer and firm approach missing');
 assert(page.includes('class="hero-photo"')&&page.includes('src="/assets/editorial/human-machine.webp"')&&page.includes('human-machine-small.webp 640w')&&page.includes('fetchpriority="high"'),'Responsive original technology-law artwork required');
 assert(page.includes(lang==='ka'?'სპეციალიზებული იურიდიული ფირმა':'SPECIALIST LAW FIRM'),'Specialist positioning must be rendered');
 assert((page.match(/class="practice-glyph"[^>]*viewBox="0 0 36 36"/g)||[]).length===6,'Six original practice icons required');
 assert(!/founder-hologram|founder-dialog|data-founder-open/.test(page),'Removed founder presentation is still present');
 assert((page.match(/class="article"/g)||[]).length===3,'Three featured research links required');
 assert(page.includes('class="matter-nav"')&&page.includes('class="engagement-steps"'),'Client entry points and engagement steps required');
 assert(page.includes('class="enquiry-form"')&&page.includes('id="enquiry-mailto"')&&page.includes('<details class="contact-form-disclosure">'),'Progressively disclosed enquiry composer missing');
 assert(!page.includes('/assets/editorial/architectural-interior.webp')&&!page.includes('/assets/editorial/legal-technology-workspace.webp'),'Synthetic office imagery must not appear on homepage');
 assert(page.includes('src="/assets/profile/founder-portrait.webp"'),'Authentic founder portrait required');
 assert(!page.includes('images.pexels.com')&&!page.includes('r0lodtw2w'),'No external preview or stock-image dependency');
 assert(page.includes('href="/" data-language-link="ka"')||page.includes('data-language-link="ka"'),'Georgian language link required');
 assert(page.includes('href="/en/"'),'Static English language link required');
 const ordered=['id="expertise"','id="sectors"','id="georgia-business"','id="about"','id="insights"','id="engagement"','id="contact"'];assert(ordered.every((id,i)=>page.indexOf(id)>=0&&(!i||page.indexOf(ordered[i-1])<page.indexOf(id))),'Approved homepage order missing');
 assert(page.includes('href="https://arxiv.org/abs/2607.21345"'),'Research link missing');
 assert(page.includes('href="mailto:digitallawgeorgia@gmail.com"')&&page.includes('https://wa.me/995598451132'),'Contact links missing');
}
for(const slug of ['practice-collaboration','legal-technology-review']){const photo=fs.readFileSync(path.join(root,'assets/editorial/'+slug+'.jpg'));assert(photo.length>10000&&photo[0]===255&&photo[1]===216,'Invalid editorial photograph '+slug);}
assert(englishHome.includes('Legal services')&&englishHome.includes('for digital businesses.')&&(englishHome.includes('We advise Georgian and international businesses on technology and commercial law.') || englishHome.includes('We help Georgian and international companies negotiate technology contracts, adopt AI, protect data and set up operations in Georgia.')),'English hero must be server rendered');
assert(home.includes('იურიდიული მომსახურება')&&home.includes('ციფრული ბიზნესისთვის.'),'Georgian hero must be server rendered');
assert(home.includes('უსაფრთხო არხის შეთანხმებამდე'),'Default advice and enquiry privacy instructions missing');
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
const businessDirectory=file('business/index.html');
assert((businessDirectory.match(/class="dlg-sector-card"/g)||[]).length===6,'Six sector entry points required');
const directoryEn=file('en/services/index.html');
const topRoutes={"ai":"/services/ai/","privacy":"/services/privacy-and-cybersecurity/","contracts":"/services/contracts/","products":"/services/digital-products-and-ip/","fintech":"/services/fintech-and-financial-regulation/","corporate":"/services/corporate-and-commercial/"};
for(const [key,route] of Object.entries(topRoutes)){
 assert(directory.includes('id="area-'+key+'" href="'+route+'"'),'Directory must link directly to '+key);
 assert(home.includes('href="'+route+'"')&&englishHome.includes('href="/en'+route+'"'),'Direct bilingual homepage route missing '+key);
 assert(!home.includes('/services/#area-'+key)&&!englishHome.includes('/services/#area-'+key),'Homepage anchor detour remains '+key);
 for(const prefix of ['','en/']){const page=file(prefix+route.slice(1)+'index.html');assert(page.includes('class="dlg-breadcrumb container"')&&page.includes('href="mailto:digitallawgeorgia@gmail.com'),'Practice breadcrumb/contact missing '+route);}
}
for(const page of [directory,directoryEn])assert((page.match(/class="dlg-area-card"/g)||[]).length===6&&!page.includes('class="dlg-practice-group"'),'Concise six-card practice directory required');
const specialist=['contracts','data-protection','ai','digital-products','legal-operations','ongoing-legal-support','fintech','virtual-assets','ecommerce','cyber-digital-risk','georgia-market-entry','intellectual-property','startups-investment'];
const hubMap={'data-protection':'privacy-and-cybersecurity','cyber-digital-risk':'privacy-and-cybersecurity','digital-products':'digital-products-and-ip','ecommerce':'digital-products-and-ip','intellectual-property':'digital-products-and-ip','fintech':'fintech-and-financial-regulation','virtual-assets':'fintech-and-financial-regulation','startups-investment':'corporate-and-commercial','georgia-market-entry':'corporate-and-commercial','ongoing-legal-support':'corporate-and-commercial','legal-operations':'corporate-and-commercial'};
for(const slug of specialist){
 for(const prefix of ['','en/']){
  const page=file(prefix+'services/'+slug+'/index.html');
  const parent=file(prefix+'services/'+(hubMap[slug]?hubMap[slug]+'/':'')+'index.html');
  assert(parent.includes('href="/'+prefix+'services/'+slug+'/"'),'Specialist route unreachable '+prefix+slug);
  assert(page.includes('class="dlg-breadcrumb container"')&&page.includes('/contact/?area='),'Missing specialist navigation or tailored contact '+prefix+slug);
 }
}
for(const slug of ['technology','financial-services','commerce','startups-investors','international','legal-teams']){const route='/business/sectors/'+slug+'/';assert(home.includes('href="'+route+'"')&&businessDirectory.includes('href="'+route+'"'),'Sector discoverability missing '+slug);const ka=file(route.slice(1)+'index.html'),en=file('en'+route+'index.html');assert(ka.includes('class="deliverable-card dlg-sector-detail"')&&ka.includes('class="practice-card"'),'Sector content missing '+slug);assert(en.includes('<html lang="en"')&&en.includes('class="practice-card"'),'English sector missing '+slug);assert(en.includes('href="/en/services/'),'English specialist links missing in '+slug);}

const advisoryDirectory=file('advisory/index.html');
const legalAi=file('advisory/legal-ai-automation/index.html'),legalAiEn=file('en/advisory/legal-ai-automation/index.html');
const advisoryDirectoryEn=file('en/advisory/index.html');
for(const page of [advisoryDirectory,file('business/sectors/legal-teams/index.html')])assert(page.includes('href="/advisory/legal-ai-automation/"'),'Legal AI service discoverability missing');
assert(advisoryDirectoryEn.includes('href="/en/advisory/legal-ai-automation/"'),'English legal AI link missing');
assert(advisoryDirectory.includes('AI სისტემების საწყისი რეესტრი')&&advisoryDirectoryEn.includes('Initial AI systems inventory'),'Advisory outcomes should be visible in both languages');
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

assert(directory.includes('ფინტექი')&&file('services/corporate-and-commercial/index.html').includes('სტარტაპ'),'FinTech and startups must be discoverable through the practice hierarchy');
assert((/ქართულ და (?:უცხოურ|საერთაშორისო) კომპანიებს/.test(home)),'Homepage must address Georgian and international businesses');

assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('AI და სამართალი')&&home.includes('href="/advisory/"'),'AI practice must remain discoverable');
assert(file('services/digital-products-and-ip/index.html').includes('href="/services/digital-products/"'),'Digital product support must remain accessible from its own practice page');
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
const firmAbout=file('about/index.html'),firmAboutEn=file('en/about/index.html');
const aboutProfile=file('about/founder/index.html');
const aboutEn=file('en/about/founder/index.html');
for(const [page,prefix] of [[firmAbout,''],[firmAboutEn,'/en']]){assert(page.includes('class="dlg-about-hero"')&&page.includes('class="dlg-firm-principles"')&&page.includes('href="'+prefix+'/about/founder/"'),'Firm-first about page missing');const visible=page.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');assert(!visible.includes('LegalTech Georgia')&&!visible.includes('LegalStepy')&&!visible.includes('Chevening'),'Firm page must not reproduce the founder CV');assert((page.match(/<h1\b/g)||[]).length===1,'One about-page H1 required');}
for(const page of [aboutProfile,aboutEn]){assert(page.includes('LegalTech Georgia')&&page.includes('LegalStepy'),'Founder initiatives missing');assert(page.includes('https://legaltechgeorgia.com/about'),'Public LTG profile reference missing');assert(page.includes('/assets/profile/founder-portrait.webp'),'Authentic founder portrait missing');}
assert(aboutProfile.includes('თანადამფუძნებელი და აღმასრულებელი დირექტორი')&&aboutEn.includes('Co-Founder &amp; Executive Director'),'LTG role missing');
assert(aboutProfile.includes('იურიდიული მიმართულების ხელმძღვანელი')&&aboutEn.includes('Head of Legal'),'LegalStepy role missing');
for(const p of ['founder-portrait','london-tech-week-2026','chevening-conference-2026']){const b=fs.readFileSync(path.join(root,'assets/profile/'+p+'.webp'));assert(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP','Invalid portrait asset '+p);}
assert(!fs.existsSync(path.join(root,'assets/audio/founder-en.mp3'))&&!fs.existsSync(path.join(root,'assets/audio/founder-ka.mp3')),'Removed founder audio is public');
assert(home.includes('class="wrap home-founder-reference"')&&englishHome.includes('class="wrap home-founder-reference"'),'Homepage founder missing');
for(const page of [home,englishHome,file('business/georgia/index.html'),file('en/business/georgia/index.html')]){
 assert(!page.includes('Jan Stępień')&&!page.includes('tbilisi-panorama.webp'),'Retired photo attribution remains visible');
}

assert(directory.includes('id="engagement-fees"')&&directoryEn.includes('id="engagement-fees"'),'Fee arrangements missing');
const fees=file('fees/index.html'),feesEn=file('en/fees/index.html');assert((fees.match(/class="dlg-fee-model"/g)||[]).length===3&&(feesEn.match(/class="dlg-fee-model"/g)||[]).length===3,'Three fee models required on dedicated fee pages');
assert([directory,directoryEn,fees,feesEn].every(p=>!/₾|\bGEL\s*[\d,]+/.test(p)),'No numerical fees until approved');
assert(home.includes('href="/about/founder/"')&&englishHome.includes('href="/en/about/founder/"'),'Selected experience must be discoverable in both languages');
assert(aboutProfile.includes('id="selected-experience"')&&aboutEn.includes('id="selected-experience"'),'Selected experience missing');
assert(home.includes('class="home-research-note"')&&englishHome.includes('class="home-research-note"'),'Published research link missing');
assert(home.includes('id="enquiry-copy"')&&englishHome.includes('id="enquiry-copy"')&&hybridJs.includes('navigator.clipboard.writeText(copyText)'),'Local enquiry copy control missing');
assert(home.includes('href="tel:+995598451132"'),'Direct telephone link missing');
assert(home.includes('href="/fees/"')&&englishHome.includes('href="/en/fees/"'),'Fee information discoverability missing');
for(const prefix of ['','en/']){const contact=file(prefix+'contact/index.html');assert(contact.includes('id="contact-page-form"')&&contact.includes('id="contact-page-mailto"')&&contact.includes('id="contact-page-copy"')&&contact.includes('href="tel:+995598451132"'),'Contact form missing '+prefix);}
assert(aboutProfile.includes('Queen Mary')&&aboutProfile.includes('Chevening')&&aboutProfile.includes('LLM with Distinction')&&!aboutProfile.includes('<strong>IAPP · AIGP</strong>'),'Founder credentials must remain on the profile');

assert(!visibleHome.includes('LLM · Distinction')&&!visibleHome.includes('Queen Mary')&&!visibleHome.includes('Chevening'),'Personal qualifications belong on the profile, not visible homepage content');
assert(aboutProfile.includes('https://arxiv.org/abs/2607.21345'),'Verified research missing from profile');

for(const name of publicHtml){if(name.endsWith('404.html'))continue;const page=fs.readFileSync(name,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');if(!page.includes('<html lang="ka"'))continue;assert(!/მომსახურებ(?:ები|ების|ებს)/.test(page),'Georgian plural service wording in '+name);}
assert(home.includes('სპეციალიზებული იურიდიული ფირმა')&&home.includes('დაგვიკავშირდით'),'Natural Georgian positioning and CTA missing');
assert(!visibleHome.includes('ბუტიკური იურიდიული პრაქტიკა')&&!visibleHome.includes('AI-ის მმართველობა'),'Retired literal translations must not return');
assert(file('services/data-protection/index.html').includes('მონაცემთა დაცვაზე ზეგავლენის შეფასება'),'Statutory data protection terminology missing');
assert(file('services/virtual-assets/index.html').includes('ვირტუალური აქტივის მომსახურების პროვაიდერი'),'Statutory VASP terminology missing');
assert(file('advisory/ai-governance-implementation/index.html').includes('პრობლემის შესახებ პასუხისმგებელი პირის ინფორმირების წესი'),'Localised AI governance procedure missing');
assert(!file('advisory/ai-governance-implementation/index.html').includes('პრობლემების ესკალაცია'),'Retired translation must not return');
for(const [slug,cover] of [['ai-pilot-at-work','dlg-ai-governance.svg'],['technology-contract-review','dlg-contracts.svg'],['supplier-data-review','dlg-data-protection.svg']]){for(const lang of ['','en/']){const article=file(lang+'resources/'+slug+'/index.html');assert(article.includes('/assets/resources/'+cover),'Article editorial image missing: '+lang+slug);}}

assert(file('en/business/international/index.html').includes('International Expansion &amp; Client Readiness'),'English must be pre-rendered');
const pagesByPath=new Map(publicHtml.map(name=>[path.resolve(name),fs.readFileSync(name,'utf8')]));
const missingFragments=[],badAssets=[];
for(const [name,html] of pagesByPath){
 const route='/'+path.relative(root,path.dirname(name)).split(path.sep).filter(Boolean).join('/')+(path.dirname(name)===path.resolve(root)?'':'/');
 for(const m of html.matchAll(/href="([^"]+)"/g)){
  const href=m[1];if(!href.startsWith('/')&&!href.startsWith('#')||href.startsWith('//')||!href.includes('#'))continue;
  const u=new URL(href.replace(/&amp;/g,'&'),'https://audit.invalid'+route);if(!u.hash||u.hash==='#')continue;
  let destination=path.resolve(root,'.'+u.pathname);if(fs.existsSync(destination)&&fs.statSync(destination).isDirectory())destination=path.join(destination,'index.html');
  const target=pagesByPath.get(destination);if(!target)continue;
  const id=decodeURIComponent(u.hash.slice(1));if(!target.includes('id="'+id+'"')&&!target.includes('name="'+id+'"'))missingFragments.push(route+' -> '+href);
 }
 for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)[^"]*"/g)){if(!fs.existsSync(path.join(root,m[1])))badAssets.push(route+' -> '+m[1]);}
 if(!name.endsWith('404.html')&&!['/','/en/'].includes(route)){assert(html.includes('class="dlg-breadcrumb container"'),'Missing visible breadcrumb '+route);assert(html.includes('href="'+(route.startsWith('/en/')?'/en/contact/':'/contact/')+'"'),'Missing contact navigation '+route);}
}
assert(badAssets.length===0,'Missing local assets: '+badAssets.slice(0,10).join('; '));
assert(missingFragments.length===0,'Broken local fragments: '+missingFragments.slice(0,15).join('; '));
console.log('DLG public site smoke checks passed: '+total+' checks across '+publicHtml.length+' public HTML pages.');

for(const slug of ["technology","financial-services","commerce","startups-investors","international","legal-teams"]){const imagePath='/assets/sectors/'+slug+'.jpg';assert(businessDirectory.includes('src="'+imagePath+'"'),'Sector directory photograph missing '+slug);assert(fs.existsSync(root+imagePath),'Local sector photograph missing '+slug);}

for(const p of ['assets/editorial/consultation.webp','assets/editorial/contract-work.webp']){assert(!fs.existsSync(path.join(root,p)),'Superseded human image must not be deployed: '+p);assert(!home.includes(p)&&!englishHome.includes(p),'Superseded image reference');}

new vm.Script(file('dlg-polish.js'),{filename:'dlg-polish.js'});assert(file('dlg-polish.css').includes('prefers-reduced-motion')&&file('dlg-polish.js').includes('prefers-reduced-motion'),'Motion accessibility is required');

new vm.Script(file('dlg-atlas.js'),{filename:'dlg-atlas.js'});assert(file('dlg-atlas.css').includes('prefers-reduced-motion'),'Editorial motion must respect user settings');
