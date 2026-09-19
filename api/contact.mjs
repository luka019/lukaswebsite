import {json,body,sameOrigin,limited} from '../server/security.mjs';
import {randomUUID} from 'node:crypto';
export default async function handler(req,res){
 if(req.method!=='POST')return json(res,405,{success:false});
 if(!sameOrigin(req))return json(res,403,{success:false});
 if(limited(req,'contact',12))return json(res,429,{success:false});
 try{
  const d=body(req,18000);const clean=k=>typeof d[k]==='string'?d[k].trim():'';
  const name=clean('name'),email=clean('email'),message=clean('message'),company=clean('company'),service=clean('service');
  if(name.length<2||name.length>100||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||message.length<20||message.length>3000||company.length>200||service.length>300||d.consent!==true||clean('_honey'))return json(res,400,{success:false});
  if(!process.env.RESEND_API_KEY||!process.env.CONTACT_FROM_EMAIL)return json(res,503,{success:false,code:'mail_unavailable'});
  const id=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(d.request_id||'')?d.request_id:randomUUID();
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':'contact-'+id},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:['legaladvocating@gmail.com'],reply_to:email,subject:'Digital Law & Advisory — ახალი მოთხოვნა',text:`სახელი: ${name}\nელფოსტა: ${email}\nკომპანია: ${company||'—'}\nმომსახურება: ${service||'—'}\n\n${message}\n\nთანხმობა მონაცემების გამოყენებაზე: დადასტურებულია\nკონფიდენციალურობის შეტყობინება: 2026-09-19`}),signal:AbortSignal.timeout(15000)});
  const result=await response.json().catch(()=>({}));
  if(!response.ok||typeof result.id!=='string')return json(res,502,{success:false});
  return json(res,200,{success:true});
 }catch{return json(res,502,{success:false});}
}
