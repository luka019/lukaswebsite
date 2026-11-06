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
assert(home.includes('class="law-hero-media law-tech-canvas"'),'Legal-tech hero missing');
assert(home.includes('firm-premium.css'),'Premium stylesheet not linked');
assert(home.includes('firm-interactions.js'),'Interactions script not linked');
assert((home.match(/<h1\b/g)||[]).length===1,'Home must have one h1');
assert((home.match(/data-showcase-slide/g)||[]).length===3,'Three spotlight slides required');
assert((home.match(/data-showcase-tab="/g)||[]).length===3,'Three working slide selectors required');
assert((home.match(/law-service-glyph/g)||[]).length===6,'Six differentiated service cards required');
assert(home.includes('data-back-to-top'),'Back-to-top control missing');
assert(home.includes('law-client-shortcut'),'Client shortcut missing');
assert(home.includes('href="/client/?consultation=1"'),'Consultation action missing');
for(const id of ['services','approach','about','contact']){
  assert(home.includes('id="'+id+'"'),'Missing homepage anchor: '+id);
}
assert(css.includes('@media(max-width:390px)'),'Small mobile breakpoint missing');
assert(css.includes('prefers-reduced-motion'),'Reduced motion fallback missing');
assert((css.match(/\{/g)||[]).length===(css.match(/\}/g)||[]).length,'Unbalanced premium CSS');
new vm.Script(script,{filename:'firm-interactions.js'});total++;
for(const p of [
  'styles.css','firm.css','script.js','favicon.svg','services/index.html',
  'services/contracts/index.html','services/data-protection/index.html',
  'services/ai/index.html','services/intellectual-property/index.html',
  'resources/index.html','client/index.html','privacy/index.html'
])file(p);
for(const p of ['services/index.html','services/contracts/index.html','resources/index.html']){
  const h=fs.readFileSync(path.join(root,p),'utf8');
  assert(h.includes('firm-premium.css'),'Premium branding not applied to '+p);
  assert(h.includes('law-client-shortcut'),'Client-space navigation absent on '+p);
}
console.log('DLG public site smoke checks passed: '+total+' checks.');
