import fs from 'node:fs';
import path from 'node:path';
const root=process.env.SITE_OUTPUT||'dist';
const required=['index.html','styles.css','digital.css','script.js','digital.mjs','favicon.svg','robots.txt','sitemap.xml','services/index.html','resources/index.html','privacy/index.html'];
const errors=[];
for(const p of required)if(!fs.existsSync(path.join(root,p)))errors.push('Missing: '+p);
const html=[];
function scan(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())scan(p);else if(p.endsWith('.html'))html.push(p);}}
if(fs.existsSync(root))scan(root);
for(const file of html){
  const content=fs.readFileSync(file,'utf8');
  if(content.includes('/client/')||content.includes('კლიენტის სივრცე'))errors.push('Legacy client link/text: '+file);
  if(!content.includes('lang="ka"'))errors.push('Missing document language: '+file);
  if(!content.includes('name="viewport"'))errors.push('Missing viewport: '+file);
  if(!file.startsWith(path.join(root,'admin')+path.sep) && !content.includes('data-en='))errors.push('Missing English support: '+file);
  for(const m of content.matchAll(/(?:href|src)="([^"]+)"/g)){
    const href=m[1];
    if(!href.startsWith('/')||href.startsWith('//'))continue;
    const pathname=href.split(/[?#]/)[0];
    if(!pathname)continue;
    let target=path.join(root,pathname);
    if(pathname.endsWith('/'))target=path.join(root,pathname,'index.html');
    else if(!fs.existsSync(target)&&!path.extname(pathname))target=path.join(root,pathname,'index.html');
    if(!fs.existsSync(target))errors.push('Broken internal link: '+file+' -> '+pathname);
  }
}
if(fs.existsSync(path.join(root,'client')))errors.push('Client workspace remains in public output');
if(fs.existsSync(path.join(root,'admin','inbox')))errors.push('Retired inbox remains in public output');
if(html.length<12)errors.push('Unexpectedly few generated HTML pages: '+html.length);
if(errors.length){console.error('Site QA failed:\n'+errors.slice(0,100).join('\n'));process.exit(1);}
console.log('Site QA passed. Verified '+html.length+' HTML pages, direct-contact routing, bilingual attributes, viewport and local links.');
