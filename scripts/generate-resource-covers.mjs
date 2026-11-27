import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const W=1200,H=675;
const clamp=v=>Math.max(0,Math.min(255,Math.round(v)));
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const blend=(base,over,a)=>base.map((v,i)=>v*(1-a)+over[i]*a);
const insideRect=(x,y,cx,cy,w,h)=>Math.abs(x-cx)<=w/2&&Math.abs(y-cy)<=h/2;
const insideCircle=(x,y,cx,cy,r)=>(x-cx)*(x-cx)+(y-cy)*(y-cy)<=r*r;
const line=(x,y,x1,y1,x2,y2,width)=>{
 const vx=x2-x1,vy=y2-y1,wx=x-x1,wy=y-y1,l2=vx*vx+vy*vy;
 const t=Math.max(0,Math.min(1,(wx*vx+wy*vy)/(l2||1))),dx=x-(x1+t*vx),dy=y-(y1+t*vy);
 return dx*dx+dy*dy<=width*width;
};
function pixelContracts(x,y){
 let c=mix([16,30,67],[22,66,129],(x/W*.55+y/H*.45));
 if(x%120<1||y%90<1)c=blend(c,[190,214,238],.12);
 if(insideCircle(x,y,1020,100,235)&&!insideCircle(x,y,1020,100,231))c=blend(c,[2,120,220],.55);
 if(insideCircle(x,y,1020,100,155)&&!insideCircle(x,y,1020,100,151))c=blend(c,[70,167,227],.45);
 if(insideRect(x,y,465,330,480,365))c=[247,250,255];
 if(insideRect(x,y,495,350,480,365))c=blend(c,[16,30,67],.08);
 for(const [yy,ww] of [[210,165],[245,340],[272,290],[395,340],[425,275]])if(insideRect(x,y,390+ww/2,yy,ww,8))c=[170,195,221];
 if(insideRect(x,y,350,335,115,38))c=[233,245,255];
 if(insideCircle(x,y,315,335,9))c=[2,120,220];
 const nodes=[[825,405],[930,337],[1030,415]];
 for(const [cx,cy] of nodes)if(insideCircle(x,y,cx,cy,11))c=[70,167,227];
 if(line(x,y,825,405,930,337,3)||line(x,y,930,337,1030,415,3)||line(x,y,930,337,930,240,3))c=[103,166,217];
 if(insideRect(x,y,930,220,72,72))c=[2,120,220];
 if(line(x,y,913,220,925,232,5)||line(x,y,925,232,949,204,5))c=[255,255,255];
 return c;
}
function pixelVendor(x,y){
 let c=mix([248,251,255],[223,239,253],x/W*.65+y/H*.2);
 if(x%150<1||y%110<1)c=blend(c,[107,150,205],.18);
 if(insideRect(x,y,600,337,380,485))c=[255,255,255];
 if(insideRect(x,y,600,337,250,355))c=[16,30,67];
 if(insideCircle(x,y,600,385,78))c=[233,245,255];
 if(insideRect(x,y,600,410,164,105))c=[233,245,255];
 if(insideRect(x,y,600,315,70,60))c=[2,120,220];
 if(insideCircle(x,y,600,385,14)||insideRect(x,y,600,410,12,26))c=[2,120,220];
 const left=[[125,205,16],[190,325,12],[120,470,10]],right=[[1080,205,16],[1010,330,12],[1085,470,10]];
 for(const [cx,cy,r] of left)if(insideCircle(x,y,cx,cy,r))c=[2,120,220];
 for(const [cx,cy,r] of right)if(insideCircle(x,y,cx,cy,r))c=[74,105,145];
 if(line(x,y,141,205,410,260,3)||line(x,y,202,325,410,350,3)||line(x,y,130,470,410,445,3))c=[2,120,220];
 if(line(x,y,790,260,1064,205,3)||line(x,y,790,350,998,330,3)||line(x,y,790,445,1075,470,3))c=[74,105,145];
 return c;
}
function pixelAI(x,y){
 let c=mix([17,18,33],[44,38,82],x/W*.45+y/H*.45);
 const dg=Math.hypot(x-735,y-335); if(dg<330)c=blend(c,[2,120,220],.20*(1-dg/330));
 if(x%200<1||y%135<1)c=blend(c,[195,217,242],.12);
 const boxes=[[220,338,140,140],[450,338,120,140],[715,338,130,140],[990,338,140,140]];
 for(const [cx,cy,w,h] of boxes)if(insideRect(x,y,cx,cy,w,h))c=[242,249,255];
 if(line(x,y,290,338,390,338,4)||line(x,y,510,338,650,338,4)||line(x,y,780,338,920,338,4))c=[124,190,232];
 if(insideCircle(x,y,220,338,25)||insideRect(x,y,450,338,52,16)||insideCircle(x,y,715,318,22)||insideCircle(x,y,715,360,22))c=[2,120,220];
 if(insideCircle(x,y,585,338,52))c=[70,167,227];
 if(insideCircle(x,y,585,338,20))c=[16,30,67];
 if(line(x,y,585,285,585,225,6)||line(x,y,585,390,585,450,6)||line(x,y,533,338,465,338,6)||line(x,y,637,338,705,338,6))c=[70,167,227];
 if(line(x,y,955,337,982,365,9)||line(x,y,982,365,1030,305,9))c=[16,30,67];
 return c;
}
const crcTable=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t})();
const crc32=buf=>{let c=0xffffffff;for(const b of buf)c=crcTable[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0};
const chunk=(type,data)=>{const t=Buffer.from(type);const out=Buffer.alloc(12+data.length);out.writeUInt32BE(data.length,0);t.copy(out,4);data.copy(out,8);out.writeUInt32BE(crc32(Buffer.concat([t,data])),8+data.length);return out};
function png(pixel,outW=W,outH=H,offsetX=0){
 const raw=Buffer.alloc((outW*3+1)*outH);let p=0;
 for(let y=0;y<outH;y++){raw[p++]=0;for(let x=0;x<outW;x++){const c=pixel(x+offsetX,y);raw[p++]=clamp(c[0]);raw[p++]=clamp(c[1]);raw[p++]=clamp(c[2]);}}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(outW,0);ihdr.writeUInt32BE(outH,4);ihdr[8]=8;ihdr[9]=2;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);
}
export function generateResourceCovers(outDir){
 const dir=path.join(outDir,'assets','resources');fs.mkdirSync(dir,{recursive:true});
 writeEditorialIllustrations(dir);
 const files=[['technology-contract-review',pixelContracts],['vendor-data-review',pixelVendor],['ai-governance-pilot',pixelAI]];
 for(const [base,pixel] of files){
  fs.writeFileSync(path.join(dir,base+'.png'),png(pixel,1200,675,0));
  fs.writeFileSync(path.join(dir,base+'-4x3.png'),png(pixel,900,675,150));
  fs.writeFileSync(path.join(dir,base+'-1x1.png'),png(pixel,675,675,262));
 }
}


/* Original, locally served editorial illustrations for the DLG research series. */
const editorialDefs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf3f6"/><stop offset=".55" stop-color="#c3d4e0"/><stop offset="1" stop-color="#7895ad"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#ffffff" stop-opacity=".92"/><stop offset=".46" stop-color="#e6eff4" stop-opacity=".78"/><stop offset="1" stop-color="#8ba9bd" stop-opacity=".75"/></linearGradient>
  <linearGradient id="navy" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#416d90"/><stop offset="1" stop-color="#102b40"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="#f7fbfd"/><stop offset=".24" stop-color="#92acbe"/><stop offset=".55" stop-color="#ecf4f8"/><stop offset="1" stop-color="#5e7d94"/></linearGradient>
  <linearGradient id="bronze" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eadac0"/><stop offset=".5" stop-color="#b7a079"/><stop offset="1" stop-color="#88745a"/></linearGradient>
  <radialGradient id="light" cx=".27" cy=".16" r=".9"><stop stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0v60" fill="none" stroke="#315f85" stroke-opacity=".13" stroke-width="1"/></pattern>
  <filter id="shadow" x="-.45" y="-.45" width="1.9" height="1.9"><feDropShadow dx="13" dy="19" stdDeviation="19" flood-color="#102b40" flood-opacity=".25"/></filter>
</defs>`;
const traces=`<g fill="none" stroke="#315f85" stroke-opacity=".35" stroke-width="2"><path d="M0 150h135l58 58h143m-336 50h96l95 95h124M1200 170h-170l-90 90H820m380 222h-130l-78-78H880M115 800V665l120-120h180m690 255V665L966 526"/><circle cx="336" cy="208" r="5" fill="#315f85"/><circle cx="315" cy="353" r="5" fill="#315f85"/><circle cx="820" cy="260" r="5" fill="#315f85"/><circle cx="880" cy="404" r="5" fill="#315f85"/></g>`;
const wrapArt=(art)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">${editorialDefs}<rect width="1200" height="800" fill="url(#bg)"/><rect width="1200" height="800" fill="url(#grid)"/><rect width="1200" height="800" fill="url(#light)"/>${traces}${art}<path d="M38 38h43m-43 0v43m1124 681h-43m43 0v-43" fill="none" stroke="#315f85" stroke-opacity=".6" stroke-width="2"/></svg>`;
const illustrations={
"dlg-contracts":`<g transform="translate(270 100) rotate(-10 300 280)" filter="url(#shadow)">
 <rect x="80" y="55" width="500" height="540" fill="url(#navy)" rx="6"/>
 <rect x="47" y="25" width="500" height="540" fill="url(#metal)" stroke="#dbe7ee" stroke-width="2" rx="6"/>
 <path d="M12 0h382l108 108v432H12z" fill="url(#glass)" stroke="#fff" stroke-opacity=".9" stroke-width="3"/>
 <path d="M394 0v108h108" fill="none" stroke="#829fb4" stroke-width="3"/>
 <g stroke="#315f85" stroke-linecap="round"><path d="M68 105h230" stroke-width="10"/><path d="M68 160h325m-325 32h285m-285 32h350m-350 32h300m-300 32h325m-325 32h230" opacity=".5" stroke-width="6"/><path d="M68 450h180" opacity=".55" stroke-width="2"/><path d="M80 430c43-60 57 15 94-28s41 38 79-8" fill="none" stroke-width="4"/></g>
 <circle cx="410" cy="430" r="39" fill="url(#navy)" stroke="#f2f7fa" stroke-width="3"/><path d="m392 430 13 13 25-30" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
 </g><g transform="translate(760 570) rotate(-49)" filter="url(#shadow)"><rect x="0" y="-12" width="255" height="24" rx="12" fill="url(#bronze)"/><rect x="58" y="-12" width="160" height="24" rx="7" fill="url(#navy)"/><path d="M0-12 0 12-38 0z" fill="url(#metal)"/></g>`,
"dlg-data-protection":`<g filter="url(#shadow)" transform="translate(170 140) rotate(-8 180 245)"><rect x="0" y="0" width="370" height="510" rx="7" fill="url(#glass)" stroke="#fff" stroke-width="3"/><g stroke="#315f85" stroke-width="6" stroke-linecap="round" opacity=".48"><path d="M45 70h190" stroke-width="10"/><path d="M45 132h275m-275 32h240m-240 32h270m-270 32h215m-215 32h270m-270 32h185m-185 32h255"/></g><path d="M45 420h125" stroke="#315f85" stroke-width="3" opacity=".6"/></g>
 <g transform="translate(615 143)" filter="url(#shadow)"><path d="M180 0 350 67v177c0 101-76 170-170 216C87 414 10 345 10 244V67z" fill="url(#navy)" stroke="#dce9ef" stroke-width="3"/><path d="M180 18 332 79v165c0 88-65 151-152 195C93 395 28 332 28 244V79z" fill="url(#glass)" stroke="#eaf2f7" stroke-width="3"/><rect x="105" y="197" width="150" height="130" rx="13" fill="url(#navy)" stroke="#dce8f0" stroke-width="3"/><path d="M131 197v-38a49 49 0 0 1 98 0v38" fill="none" stroke="#315f85" stroke-width="17"/><circle cx="180" cy="247" r="13" fill="#eaf2f7"/><path d="M180 250v31" stroke="#eaf2f7" stroke-width="8" stroke-linecap="round"/></g>`,
"dlg-ai-governance":`<g transform="translate(250 93)" filter="url(#shadow)"><rect x="40" y="40" width="620" height="620" rx="32" fill="url(#navy)" stroke="#d9e8f1" stroke-width="3"/><g fill="url(#metal)">${Array.from({length:9},(_,i)=>'<rect x="'+(91+i*62)+'" y="7" width="17" height="39" rx="2"/><rect x="'+(91+i*62)+'" y="654" width="17" height="39" rx="2"/><rect x="7" y="'+(91+i*62)+'" width="39" height="17" rx="2"/><rect x="654" y="'+(91+i*62)+'" width="39" height="17" rx="2"/>').join('')}</g><rect x="100" y="100" width="500" height="500" rx="20" fill="url(#glass)" stroke="#f0f6fa" stroke-width="3"/><g fill="none" stroke="#315f85" stroke-width="2" opacity=".5"><rect x="132" y="132" width="436" height="436" rx="8"/><path d="M132 180h50l56 56m330-56h-50l-56 56M132 520h50l56-56m330 56h-50l-56-56M132 350h70m296 0h70"/></g>
 <g transform="translate(350 335)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0-156V150M-155 150h310M-170-82h340" stroke="url(#bronze)" stroke-width="16"/><circle cx="0" cy="-82" r="20" fill="url(#navy)" stroke="#f8f7f2" stroke-width="3"/><path d="m-128-82-75 134h150zm256 0-75 134h150z" stroke="#315f85" stroke-width="7"/><path d="M-203 52q75 81 150 0zm256 0q75 81 150 0z" fill="url(#navy)" stroke="#315f85" stroke-width="4"/></g></g>`
};
function writeEditorialIllustrations(dir){for(const [name,art] of Object.entries(illustrations))fs.writeFileSync(path.join(dir,name+'.svg'),wrapArt(art));}
