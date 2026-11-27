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
    "id": 7433823,
    "url": "https://images.pexels.com/photos/7433823/pexels-photo-7433823.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop"
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
    "id": 4427553,
    "url": "https://images.pexels.com/photos/4427553/pexels-photo-4427553.jpeg?auto=compress&cs=tinysrgb&w=1200&h=760&fit=crop",
    "credit": "August de Richelieu / Pexels",
    "source": "https://www.pexels.com/photo/female-lawyers-in-an-office-looking-at-a-computer-4427553/",
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
  },
  {
    "slug": "contracts-editorial",
    "id": 955390,
    "credit": "Cytonn Photography / Pexels",
    "source": "https://www.pexels.com/photo/person-wearing-white-dress-shirt-signing-contract-955390/",
    "folder": "resources",
    "url": "https://images.pexels.com/photos/955390/pexels-photo-955390.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
  },
  {
    "slug": "suppliers-editorial",
    "id": 7731374,
    "credit": "Mikhail Nilov / Pexels",
    "source": "https://www.pexels.com/photo/documents-and-a-laptop-on-a-table-7731374/",
    "folder": "resources",
    "url": "https://images.pexels.com/photos/7731374/pexels-photo-7731374.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
  },
  {
    "slug": "ai-governance-editorial",
    "id": 7876093,
    "credit": "Kaboompics / Pexels",
    "source": "https://www.pexels.com/photo/a-lawyer-behind-his-desk-7876093/",
    "folder": "resources",
    "url": "https://images.pexels.com/photos/7876093/pexels-photo-7876093.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
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
 console.log('Installed six sector photographs, two practice photographs and three technology-law research photographs into local deployment assets.');
}
