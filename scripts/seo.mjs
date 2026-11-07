import fs from 'node:fs';
import path from 'node:path';
import {practices} from '../catalogue.mjs';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const decode=s=>String(s??'').replace(/&(?:amp|lt|gt|quot|apos|#39|#x[\da-f]+|#\d+);/gi,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&#39;':"'"}[m]??String.fromCodePoint(m[2].toLowerCase()==='x'?parseInt(m.slice(3,-1),16):parseInt(m.slice(2,-1),10))));
const attrs=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const plain=nodes=>nodes.map(n=>n.children?plain(n.children):n.raw?.startsWith('<')?'':decode(n.raw)).join('');

// A small build-time HTML tree preserves semantic markup and translates authored
// text before delivery. English pages remain readable and indexable without JS.
function englishHtml(source,knownPaths){
 const root={children:[]},stack=[root];
 for(const raw of source.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+/g)||[]){
  const close=raw.match(/^<\/([\w:-]+)/);
  if(close){if(stack.length>1&&stack.at(-1).tag===close[1].toLowerCase())stack.pop();else stack.at(-1).children.push({raw});continue;}
  const open=raw.match(/^<([\w:-]+)([\s\S]*?)>$/);
  if(!open||raw.startsWith('<!')){stack.at(-1).children.push({raw});continue;}
  const tag=open[1].toLowerCase(),node={tag,displayTag:open[1],attributes:attrs(raw),raw,children:[],void:voids.has(tag)||raw.endsWith('/>')};
  stack.at(-1).children.push(node);if(!node.void)stack.push(node);
 }
 function render(node){
  if(!node.tag)return node.children?node.children.map(render).join(''):node.raw;
  const a={...node.attributes};
  let inner=node.children.map(render).join('');
  if('data-en' in a){a['data-ka']=plain(node.children);inner=esc(a['data-en']);}
  for(const [from,to,ka] of [['data-en-alt','alt','data-ka-alt'],['data-en-aria','aria-label','data-ka-aria'],['data-en-placeholder','placeholder','data-ka-placeholder']])if(from in a){a[ka]=a[to]||'';a[to]=a[from];}
  if(node.tag==='html')a.lang='en';
  if(node.tag==='body')a['data-default-language']='en';
  if(a['data-language'])a['aria-pressed']=String(a['data-language']==='en');
  if(a['data-content-language']==='ka')a.hidden='';
  if(a['data-content-language']==='en')delete a.hidden;
  if(a.href?.startsWith('/')&&!a.href.startsWith('//')){
   const route=a.href.split(/[?#]/)[0];
   if(knownPaths.has(route))a.href='/en'+a.href;
  }
  // Keep boolean attributes from the authored element, including hidden slides.
  const booleans=[...node.raw.matchAll(/\s(hidden|defer|async|disabled|required|checked|selected|multiple|novalidate|crossorigin)(?=\s|\/?>)/g)].map(m=>m[1]);
  for(const b of booleans)if(!(b in a)&&!(b==='hidden'&&a['data-content-language']==='en'))a[b]='';
  const start='<'+node.displayTag+Object.entries(a).map(([key,value])=>' '+key+'="'+esc(value)+'"').join('')+(node.raw.endsWith('/>')?'/>':'>');
  return start+(node.void?'':inner+'</'+node.displayTag+'>');
 }
 return render(root);
}

export function finalizeSeo({out,siteUrl}){
 const files=[];
 function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(['admin','en'].includes(entry.name))continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name==='index.html')files.push(full);}}
 walk(out);
 const routeOf=file=>'/'+path.relative(out,path.dirname(file)).split(path.sep).filter(Boolean).join('/')+(path.dirname(file)===out?'':'/');
 const knownPaths=new Set(files.map(routeOf));knownPaths.add('/');
 const graph=(route,lang,title,description,old)=>{
  const prefix=lang==='en'?'/en':'',url=siteUrl+prefix+route;
  const person={'@type':'Person','@id':siteUrl+'/#luka',name:'Luka Shakhkulashvili',alternateName:'ლუკა შახყულაშვილი',url:siteUrl+prefix+'/about/',image:siteUrl+'/assets/luka-shakhkulashvili.png',jobTitle:'Technology & Commercial Lawyer',sameAs:['https://www.linkedin.com/in/luka-shakhkulashvili/'],hasCredential:[{'@type':'EducationalOccupationalCredential',name:'LLM with Distinction, Technology, Media and Telecommunications Law',recognizedBy:{'@type':'CollegeOrUniversity',name:'Queen Mary University of London'}},{'@type':'EducationalOccupationalCredential',name:'Artificial Intelligence Governance Professional (AIGP)',recognizedBy:{'@type':'Organization',name:'International Association of Privacy Professionals'}}]};
  const provider={'@type':'LegalService','@id':siteUrl+'/#practice',name:'Digital Law Georgia',url:siteUrl+'/',email:'digitallawgeorgia@gmail.com',telephone:'+995598451132',founder:{'@id':person['@id']},areaServed:{'@type':'Country',name:'Georgia'},availableLanguage:['Georgian','English']};
  const page={'@type':route==='/about/'?'ProfilePage':'WebPage','@id':url+'#page',url,name:title,description,inLanguage:lang,isPartOf:{'@id':siteUrl+'/#website'}};
  if(route==='/about/')page.mainEntity={'@id':person['@id']};
  const nodes=[{'@type':'WebSite','@id':siteUrl+'/#website',name:'Digital Law Georgia',url:siteUrl+'/',inLanguage:['ka','en']},provider,person,page];
  if(route!=='/')nodes.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:lang==='en'?'Home':'მთავარი',item:siteUrl+prefix+'/'},{'@type':'ListItem',position:2,name:title.split(' — Digital Law')[0],item:url}]});
  const practice=practices.find(p=>route===`/services/${p.slug}/`);
  if(practice)nodes.push({'@type':'Service',name:practice.name[lang],description:practice.summary[lang],url,provider:{'@id':provider['@id']}});
  for(const value of old){if(value['@type']==='BlogPosting')nodes.push({...value,headline:title.split(' — Digital Law')[0],description,inLanguage:lang,url,mainEntityOfPage:url,author:{'@id':person['@id']}});}
  return {'@context':'https://schema.org','@graph':nodes};
 };
 for(const file of files){
  const route=routeOf(file),source=fs.readFileSync(file,'utf8'),body=attrs(source.match(/<body\b[^>]*>/)?.[0]||'');
  const old=[...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{try{return [JSON.parse(m[1])];}catch{return [];}});
  const existingTitle=decode(source.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'Digital Law Georgia');
  const existingDescription=attrs(source.match(/<meta name="description"[^>]*>/)?.[0]||'').content||'';
  for(const lang of ['ka','en']){
   const prefix=lang==='en'?'/en':'',url=siteUrl+prefix+route,title=body[lang==='en'?'data-title-en':'data-title-ka']||existingTitle,description=body[lang==='en'?'data-description-en':'data-description-ka']||existingDescription;
   let html=lang==='en'?englishHtml(source,knownPaths):source;
   html=html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace(/<link rel="(?:canonical|alternate)"[^>]*>/g,'');
   html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+esc(title)+'</title>');
   html=html.replace(/<meta (?:name="(?:description|twitter:title|twitter:description)"|property="(?:og:title|og:description|og:url|og:locale|og:locale:alternate)")[^>]*>/g,m=>{
    const a=attrs(m),key=a.name||a.property;
    if(key==='og:locale:alternate')return '';
    const value=key==='og:url'?url:key==='og:locale'?(lang==='en'?'en_GB':'ka_GE'):key.endsWith('title')?title:description;
    return '<meta '+(a.name?'name':'property')+'="'+key+'" content="'+esc(value)+'">';
   });
   const json=JSON.stringify(graph(route,lang,title,description,old)).replace(/</g,'\\u003c');
   html=html.replace(/<meta name="twitter:(?:title|description)"[^>]*>/g,'');
   html=html.replace('</head>',`<link rel="canonical" href="${url}"><link rel="alternate" hreflang="ka" href="${siteUrl}${route}"><link rel="alternate" hreflang="en" href="${siteUrl}/en${route}"><link rel="alternate" hreflang="x-default" href="${siteUrl}${route}"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><script type="application/ld+json">${json}</script></head>`);
   const destination=lang==='en'?path.join(out,'en',route,'index.html'):file;
   fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,html);
  }
 }
 const urls=[...knownPaths].flatMap(route=>['ka','en'].map(lang=>{const url=siteUrl+(lang==='en'?'/en':'')+route;return `<url><loc>${esc(url)}</loc><xhtml:link rel="alternate" hreflang="ka" href="${siteUrl}${route}"/><xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en${route}"/></url>`;}));
 fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+urls.join('')+'</urlset>');
 console.log(`Generated ${files.length} Georgian and ${files.length} English pages with canonical URLs, hreflang and structured data.`);
}
