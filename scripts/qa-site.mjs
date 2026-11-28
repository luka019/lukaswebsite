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
const css=file('boutique.css');
const englishHome=file('en/index.html');
for (const [document, prefix] of [[home, ''], [englishHome, '/en']]) {
  for (const marker of ['id="hero-title"', 'class="dl-hero-image"', 'data-menu-toggle', 'id="consultation-draft"', 'id="services"', 'id="approach"', 'id="about"', 'id="contact"']) {
    assert(document.includes(marker), 'Missing home section or action: ' + marker);
  }
  for (const route of ['services/', 'services/contracts/', 'services/data-protection/', 'services/ai/', 'services/digital-products/', 'about/', 'resources/', 'business/']) {
    assert(document.includes('href="' + prefix + '/' + route + '"'), 'Missing localized destination: ' + prefix + '/' + route);
  }
  assert(document.includes('href="tel:+995598451132"'), 'Direct phone missing');
  assert(document.includes('href="mailto:digitallawgeorgia@gmail.com"'), 'Direct email missing');
  assert(document.includes('href="https://wa.me/995598451132"'), 'WhatsApp missing');
  assert(document.includes('aria-controls="site-nav"'), 'Mobile navigation control not associated');
  assert(document.includes('data-language="ka"') && document.includes('data-language="en"'), 'Language switch missing');
  assert((document.match(/class="dl-practice"/g) || []).length === 4, 'Expected four featured specialisms');
  assert((document.match(/data-resource-card/g) || []).length === 3, 'Authored resource previews missing');
}
assert(home.includes('ლუკა შახყულაშვილი') && englishHome.includes('Luka Shakhkulashvili'), 'Localized founder profile missing');
assert(englishHome.includes('Legal counsel') && englishHome.includes('for a digital world.'), 'English hero must be rendered at build time');
assert(css.includes('prefers-reduced-motion'), 'Reduced motion support missing');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced public stylesheet');
for (const asset of ['assets/column.webp', 'assets/serif-georgian.woff', 'assets/luka-shakhkulashvili.png']) {
  assert(fs.statSync(path.join(root,asset)).size>0,'Missing or empty asset: '+asset);
}

for(const p of [
  'styles.css','firm.css','script.js','favicon.svg','services/index.html',
  'services/contracts/index.html','services/data-protection/index.html',
  'services/ai/index.html','services/fintech/index.html','services/ongoing-legal-support/index.html','services/georgia-market-entry/index.html','services/intellectual-property/index.html',
  'resources/index.html','privacy/index.html'
])file(p);
for(const p of ['services/index.html','services/contracts/index.html','resources/index.html']){
  const h=fs.readFileSync(path.join(root,p),'utf8');
  assert(h.includes('boutique.css'),'Shared public design missing on '+p);
  assert(!h.includes('law-client-shortcut'),'Redundant desktop header shortcut on '+p);
}
const directory=fs.readFileSync(path.join(root,'services/index.html'),'utf8');
assert(directory.includes('law-directory-feature'),'Ongoing legal counsel needs a featured directory entry');
assert(directory.indexOf('/services/contracts/')<directory.indexOf('/services/fintech/'),'Contract advice should precede FinTech in the directory');
assert(directory.includes('/services/ongoing-legal-support/'),'Ongoing legal support route must be linked');
assert(!fs.existsSync(path.join(root,'client')),'Retired client portal must not be deployed');
assert(!fs.existsSync(path.join(root,'admin','inbox')),'Retired inbox must not be deployed');
new vm.Script(file('script.js'),{filename:'script.js'});total++;
assert(file('script.js').includes('setMenuState'),'Accessible header menu state missing');
const publicHtml=[];
function visit(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){if(x.name==='admin')continue;const location=path.join(dir,x.name);if(x.isDirectory())visit(location);else if(location.endsWith('.html'))publicHtml.push(location)}}
visit(root);
for(const name of publicHtml){const content=fs.readFileSync(name,'utf8');assert(!content.includes('/client/'),'Legacy client route in '+name);assert(!content.includes('კლიენტის სივრცე'),'Legacy client copy in '+name)}
assert(home.includes('https://wa.me/995598451132'),'WhatsApp channel missing');
assert(home.includes('mailto:digitallawgeorgia@gmail.com'),'Email channel missing');
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
