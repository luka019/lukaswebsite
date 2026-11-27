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
    "id": 29502375,
    "url": "https://images.pexels.com/photos/29502375/pexels-photo-29502375.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop",
    "credit": "Julio Lopez / Pexels",
    "source": "https://www.pexels.com/photo/modern-online-shopping-and-mobile-payment-concept-29502375/",
    "replaceExisting": true
  },
  {
    "slug": "startups-investors",
    "id": 23496871,
    "url": "https://images.pexels.com/photos/23496871/pexels-photo-23496871.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop",
    "credit": "Vitaly Gariev / Pexels",
    "source": "https://www.pexels.com/photo/businessmen-discussing-investments-over-laptop-and-charts-23496871/",
    "replaceExisting": true
  },
  {
    "slug": "international",
    "id": 1398761,
    "url": "https://images.pexels.com/photos/1398761/pexels-photo-1398761.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop",
    "credit": "Ljupco Dzambazovski / Pexels",
    "source": "https://www.pexels.com/photo/two-glass-building-1398761/",
    "replaceExisting": true
  },
  {
    "slug": "legal-teams",
    "id": 5673489,
    "url": "https://images.pexels.com/photos/5673489/pexels-photo-5673489.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop",
    "credit": "Sora Shimazaki / Pexels",
    "source": "https://www.pexels.com/photo/crop-business-partners-signing-contract-in-office-5673489/",
    "replaceExisting": true
  },
  {
    "slug": "practice-collaboration",
    "id": 7731358,
    "folder": "editorial",
    "credit": "Mikhail Nilov / Pexels",
    "source": "https://www.pexels.com/photo/unrecognizable-coworkers-using-netbook-and-writing-information-on-papers-7731358/",
    "url": "https://images.pexels.com/photos/7731358/pexels-photo-7731358.jpeg?auto=compress&cs=tinysrgb&w=1100&h=700&fit=crop"
  },
  {
    "slug": "legal-technology-review",
    "id": 7972282,
    "folder": "editorial",
    "credit": "George Pak / Pexels",
    "source": "https://www.pexels.com/photo/close-up-shot-of-a-person-holding-a-papers-7972282/",
    "url": "https://images.pexels.com/photos/7972282/pexels-photo-7972282.jpeg?auto=compress&cs=tinysrgb&w=1100&h=700&fit=crop"
  }
];
export async function installSectorPhotos(out){
 const dir=path.join(out,'assets','sectors');await fs.mkdir(dir,{recursive:true});
 await Promise.all(photos.map(async p=>{
  const folder=p.folder?path.join(out,'assets',p.folder):dir;
  await fs.mkdir(folder,{recursive:true});
  const target=path.join(folder,p.slug+'.jpg');
  try{const b=await fs.readFile(target);if(!p.replaceExisting&&b.length>10000&&b[0]===255&&b[1]===216)return;}catch{}
  const response=await fetch(p.url,{signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error('Sector photo download failed: '+p.slug+' '+response.status);
  const b=Buffer.from(await response.arrayBuffer());if(b.length<10000||b.length>2500000||b[0]!==255||b[1]!==216)throw Error('Invalid JPEG: '+p.slug);
  await fs.writeFile(target,b);
 }));
 console.log('Installed six sector photographs and two practice photographs into local deployment assets.');
}
