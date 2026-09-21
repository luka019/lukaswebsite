import {json,body,sameOrigin,limited,configured,verifyPassword,sessionValue,authenticated,setSession} from '../server/security.mjs';
export default async function handler(req,res){
 if(req.method==='GET')return json(res,200,{authenticated:authenticated(req),configured:configured()});
 if(!['POST','DELETE'].includes(req.method)){res.setHeader('Allow','GET, POST, DELETE');return json(res,405,{error:'Method not allowed'});}
 if(!sameOrigin(req))return json(res,403,{error:'Request not allowed'});
 if(req.method==='DELETE'){setSession(res,'');return json(res,200,{success:true});}
 if(!configured())return json(res,503,{error:'ადმინპანელის გამართვა ჯერ არ დასრულებულა.'});
 if(limited(req,'login',8))return json(res,429,{error:'ძალიან ბევრი მცდელობაა. სცადეთ მოგვიანებით.'});
 try{const data=body(req,4096);const valid=await verifyPassword(data.password);if(typeof data.email!=='string'||data.email.trim().toLowerCase()!==process.env.ADMIN_EMAIL.toLowerCase()||!valid)return json(res,401,{error:'ელფოსტა ან პაროლი არასწორია.'});setSession(res,sessionValue());return json(res,200,{authenticated:true});}catch{return json(res,400,{error:'შეამოწმეთ შეყვანილი მონაცემები.'});}
}
