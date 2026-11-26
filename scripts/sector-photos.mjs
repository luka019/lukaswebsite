import fs from 'node:fs/promises';
import path from 'node:path';
const photos=[
  {
    "slug": "technology",
    "id": 36496927,
    "url": "https://images.pexels.com/photos/36496927/pexels-photo-36496927.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  },
  {
    "slug": "financial-services",
    "id": 18111273,
    "url": "https://images.pexels.com/photos/18111273/pexels-photo-18111273.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  },
  {
    "slug": "commerce",
    "id": 5418897,
    "url": "https://images.pexels.com/photos/5418897/pexels-photo-5418897.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  },
  {
    "slug": "startups-investors",
    "id": 7433823,
    "url": "https://images.pexels.com/photos/7433823/pexels-photo-7433823.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  },
  {
    "slug": "international",
    "id": 36539295,
    "url": "https://images.pexels.com/photos/36539295/pexels-photo-36539295.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  },
  {
    "slug": "legal-teams",
    "id": 7109315,
    "url": "https://images.pexels.com/photos/7109315/pexels-photo-7109315.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
  }
,
  {"slug":"practice-collaboration","id":7731358,"folder":"editorial","credit":"Mikhail Nilov / Pexels","source":"https://www.pexels.com/photo/unrecognizable-coworkers-using-netbook-and-writing-information-on-papers-7731358/","url":"https://images.pexels.com/photos/7731358/pexels-photo-7731358.jpeg?auto=compress&cs=tinysrgb&w=1100&h=700&fit=crop"},
  {"slug":"legal-technology-review","id":7972282,"folder":"editorial","credit":"George Pak / Pexels","source":"https://www.pexels.com/photo/close-up-shot-of-a-person-holding-a-papers-7972282/","url":"https://images.pexels.com/photos/7972282/pexels-photo-7972282.jpeg?auto=compress&cs=tinysrgb&w=1100&h=700&fit=crop"}
];
export async function installSectorPhotos(out){
 const dir=path.join(out,'assets','sectors');await fs.mkdir(dir,{recursive:true});
 await Promise.all(photos.map(async p=>{
  const folder=p.folder?path.join(out,'assets',p.folder):dir;
  await fs.mkdir(folder,{recursive:true});
  const target=path.join(folder,p.slug+'.jpg');
  try{const b=await fs.readFile(target);if(b.length>10000&&b[0]===255&&b[1]===216)return;}catch{}
  const response=await fetch(p.url,{signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error('Sector photo download failed: '+p.slug+' '+response.status);
  const b=Buffer.from(await response.arrayBuffer());if(b.length<10000||b.length>2500000||b[0]!==255||b[1]!==216)throw Error('Invalid JPEG: '+p.slug);
  await fs.writeFile(target,b);
 }));
 console.log('Installed six sector photographs and two authentic editorial photographs into local deployment assets.');
}
