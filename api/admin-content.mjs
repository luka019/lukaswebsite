import {json,body,gate} from '../server/security.mjs';
import {validateResources} from '../resources/resource-model.mjs';
import {randomUUID} from 'node:crypto';
const root='https://api.github.com/repos/luka019/lukaswebsite/contents/';
async function github(path,options={}){return fetch(root+path,{...options,headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${process.env.ADMIN_GITHUB_TOKEN}`,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},signal:AbortSignal.timeout(18000)});}
function validImage(bytes,type){return type==='image/png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):type==='image/jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:type==='image/webp'?bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP':false;}
export default async function handler(req,res){
 if(!gate(req,res))return;
 if(!['GET','PUT','POST'].includes(req.method))return json(res,405,{error:'Method not allowed'});
 try{
  let response;
  if(req.method==='GET'){response=await github('_data/resources.json?ref=main');if(response.ok){const r=await response.json();return json(res,200,{rows:validateResources(JSON.parse(Buffer.from(r.content,'base64').toString('utf8'))),sha:r.sha});}}
  if(req.method==='PUT'){const data=body(req,1500000);if(!/^[a-f0-9]{40}$/.test(data.sha||''))return json(res,400,{error:'მასალის ვერსია არასწორია.'});const rows=validateResources(data.rows);response=await github('_data/resources.json',{method:'PUT',body:JSON.stringify({message:'Update practical resources from admin',sha:data.sha,branch:'main',content:Buffer.from(JSON.stringify(rows,null,2)+'\n').toString('base64')})});if(response.ok){const r=await response.json();return json(res,200,{sha:r.content.sha});}}
  if(req.method==='POST'){const data=body(req,2900000);const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[data.type];if(!ext||!/^[-a-z0-9]{3,90}$/.test(data.slug||'')||typeof data.content!=='string'||!/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data.content))return json(res,400,{error:'სურათის ფორმატი არასწორია.'});const bytes=Buffer.from(data.content,'base64');if(bytes.length>2*1024*1024||!validImage(bytes,data.type))return json(res,400,{error:'ატვირთეთ JPG, PNG ან WebP სურათი, მაქსიმუმ 2 MB.'});const path=`assets/resources/${data.slug}-${randomUUID()}.${ext}`;response=await github(path,{method:'PUT',body:JSON.stringify({message:`Add resource cover: ${data.slug}`,content:data.content,branch:'main'})});if(response.ok)return json(res,200,{path:'/'+path});}
  if(response?.status===409||response?.status===422)return json(res,409,{error:'მასალა შეიცვალა. ჩამოტვირთეთ მონახაზი და განაახლეთ სია.'});
  return json(res,502,{error:'რესურსების სერვისთან დაკავშირება ვერ მოხერხდა. თქვენი ტექსტი შენარჩუნებულია.'});
 }catch{return json(res,400,{error:'მოთხოვნა ვერ შესრულდა. გადაამოწმეთ მონაცემები და სცადეთ ხელახლა.'});}
}
