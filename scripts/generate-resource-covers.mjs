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
 let c=mix([16,30,53],[25,63,57],(x/W*.55+y/H*.45));
 if(x%120<1||y%90<1)c=blend(c,[190,220,210],.12);
 if(insideCircle(x,y,1020,100,235)&&!insideCircle(x,y,1020,100,231))c=blend(c,[65,105,216],.55);
 if(insideCircle(x,y,1020,100,155)&&!insideCircle(x,y,1020,100,151))c=blend(c,[199,241,121],.45);
 if(insideRect(x,y,465,330,480,365))c=[244,249,247];
 if(insideRect(x,y,495,350,480,365))c=blend(c,[10,25,32],.08);
 for(const [yy,ww] of [[210,165],[245,340],[272,290],[395,340],[425,275]])if(insideRect(x,y,390+ww/2,yy,ww,8))c=[180,201,193];
 if(insideRect(x,y,350,335,115,38))c=[235,240,255];
 if(insideCircle(x,y,315,335,9))c=[65,105,216];
 const nodes=[[825,405],[930,337],[1030,415]];
 for(const [cx,cy] of nodes)if(insideCircle(x,y,cx,cy,11))c=[199,241,121];
 if(line(x,y,825,405,930,337,3)||line(x,y,930,337,1030,415,3)||line(x,y,930,337,930,240,3))c=[133,178,163];
 if(insideRect(x,y,930,220,72,72))c=[65,105,216];
 if(line(x,y,913,220,925,232,5)||line(x,y,925,232,949,204,5))c=[255,255,255];
 return c;
}
function pixelVendor(x,y){
 let c=mix([246,249,247],[224,233,255],x/W*.65+y/H*.2);
 if(x%150<1||y%110<1)c=blend(c,[120,145,205],.18);
 if(insideRect(x,y,600,337,380,485))c=[255,255,255];
 if(insideRect(x,y,600,337,250,355))c=[23,63,56];
 if(insideCircle(x,y,600,385,78))c=[235,244,239];
 if(insideRect(x,y,600,410,164,105))c=[235,244,239];
 if(insideRect(x,y,600,315,70,60))c=[65,105,216];
 if(insideCircle(x,y,600,385,14)||insideRect(x,y,600,410,12,26))c=[65,105,216];
 const left=[[125,205,16],[190,325,12],[120,470,10]],right=[[1080,205,16],[1010,330,12],[1085,470,10]];
 for(const [cx,cy,r] of left)if(insideCircle(x,y,cx,cy,r))c=[65,105,216];
 for(const [cx,cy,r] of right)if(insideCircle(x,y,cx,cy,r))c=[94,137,122];
 if(line(x,y,141,205,410,260,3)||line(x,y,202,325,410,350,3)||line(x,y,130,470,410,445,3))c=[65,105,216];
 if(line(x,y,790,260,1064,205,3)||line(x,y,790,350,998,330,3)||line(x,y,790,445,1075,470,3))c=[94,137,122];
 return c;
}
function pixelAI(x,y){
 let c=mix([15,29,54],[24,64,57],x/W*.45+y/H*.45);
 const dg=Math.hypot(x-735,y-335); if(dg<330)c=blend(c,[65,105,216],.20*(1-dg/330));
 if(x%200<1||y%135<1)c=blend(c,[215,235,228],.12);
 const boxes=[[220,338,140,140],[450,338,120,140],[715,338,130,140],[990,338,140,140]];
 for(const [cx,cy,w,h] of boxes)if(insideRect(x,y,cx,cy,w,h))c=[239,244,255];
 if(line(x,y,290,338,390,338,4)||line(x,y,510,338,650,338,4)||line(x,y,780,338,920,338,4))c=[143,167,237];
 if(insideCircle(x,y,220,338,25)||insideRect(x,y,450,338,52,16)||insideCircle(x,y,715,318,22)||insideCircle(x,y,715,360,22))c=[65,105,216];
 if(insideCircle(x,y,585,338,52))c=[199,241,121];
 if(insideCircle(x,y,585,338,20))c=[23,63,56];
 if(line(x,y,585,285,585,225,6)||line(x,y,585,390,585,450,6)||line(x,y,533,338,465,338,6)||line(x,y,637,338,705,338,6))c=[199,241,121];
 if(line(x,y,955,337,982,365,9)||line(x,y,982,365,1030,305,9))c=[23,63,56];
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
 const files=[['technology-contract-review',pixelContracts],['vendor-data-review',pixelVendor],['ai-governance-pilot',pixelAI]];
 for(const [base,pixel] of files){
  fs.writeFileSync(path.join(dir,base+'.png'),png(pixel,1200,675,0));
  fs.writeFileSync(path.join(dir,base+'-4x3.png'),png(pixel,900,675,150));
  fs.writeFileSync(path.join(dir,base+'-1x1.png'),png(pixel,675,675,262));
 }
}
