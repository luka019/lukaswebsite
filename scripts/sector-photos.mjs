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
];
export async function installSectorPhotos(out){
 const dir=path.join(out,'assets','sectors');await fs.mkdir(dir,{recursive:true});
 await Promise.all(photos.map(async p=>{
  const target=path.join(dir,p.slug+'.jpg');
  try{const b=await fs.readFile(target);if(b.length>10000&&b[0]===255&&b[1]===216)return;}catch{}
  const response=await fetch(p.url,{signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error('Sector photo download failed: '+p.slug+' '+response.status);
  const b=Buffer.from(await response.arrayBuffer());if(b.length<10000||b.length>2500000||b[0]!==255||b[1]!==216)throw Error('Invalid JPEG: '+p.slug);
  await fs.writeFile(target,b);
 }));
 console.log('Installed six distinct sector photographs into local deployment assets.');
}
