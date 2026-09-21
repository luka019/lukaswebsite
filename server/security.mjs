import {createHmac,createHash,timingSafeEqual,scrypt as scryptCallback,randomBytes} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(scryptCallback);
const cookieName='__Host-dla_admin';
const ttl=8*60*60;
const attempts=new Map();
export function json(res,status,value){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');return res.status(status).json(value);}
export function body(req,max=1000000){const v=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!v||typeof v!=='object'||Array.isArray(v)||Buffer.byteLength(JSON.stringify(v))>max)throw new Error('Invalid body');return v;}
export function sameOrigin(req){const allowed=(process.env.SITE_ORIGIN||'https://lukaswebsite.vercel.app').split(',').map(v=>v.trim());return allowed.includes(req.headers.origin);}
export function limited(req,bucket,max){const key=bucket+':'+String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0];const now=Date.now();for(const[k,v]of attempts)if(v.until<now)attempts.delete(k);if(attempts.size>10000)return true;const v=attempts.get(key)||{count:0,until:now+900000};v.count++;attempts.set(key,v);return v.count>max;}
export function configured(){return !!(process.env.ADMIN_EMAIL&&process.env.ADMIN_PASSWORD_HASH&&process.env.ADMIN_SESSION_SECRET?.length>=40&&process.env.ADMIN_GITHUB_TOKEN);}
export async function passwordHash(password,salt=randomBytes(16).toString('hex')){const key=await scrypt(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024});return `scrypt:${salt}:${key.toString('hex')}`;}
export async function verifyPassword(password){if(typeof password!=='string'||password.length>256)return false;const stored=process.env.ADMIN_PASSWORD_HASH||'';const [kind,salt,hash]=stored.split(':');if(kind!=='scrypt'||!/^[0-9a-f]{32}$/.test(salt)||!/^[0-9a-f]{128}$/.test(hash||''))return false;const got=(await passwordHash(password,salt)).split(':')[2];return timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(got,'hex'));}
const version=()=>createHash('sha256').update(process.env.ADMIN_PASSWORD_HASH||'').digest('hex').slice(0,24);
const sign=value=>createHmac('sha256',process.env.ADMIN_SESSION_SECRET||'').update(value).digest('base64url');
export function sessionValue(){const value=Buffer.from(JSON.stringify({email:process.env.ADMIN_EMAIL.toLowerCase(),exp:Math.floor(Date.now()/1000)+ttl,v:version()})).toString('base64url');return value+'.'+sign(value);}
export function authenticated(req){if(!configured())return false;try{const token=String(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1);if(!token||token.length>2000)return false;const[value,signature,...rest]=token.split('.');if(rest.length||!signature)return false;const expected=sign(value);if(expected.length!==signature.length||!timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return false;const data=JSON.parse(Buffer.from(value,'base64url').toString());return data.email===process.env.ADMIN_EMAIL.toLowerCase()&&data.exp>Math.floor(Date.now()/1000)&&data.v===version();}catch{return false;}}
export function setSession(res,value){res.setHeader('Set-Cookie',`${cookieName}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${value?ttl:0}`);}
export function gate(req,res){if(!sameOrigin(req)&&!['GET','HEAD'].includes(req.method)){json(res,403,{error:'Request not allowed'});return false;}if(!authenticated(req)){json(res,401,{error:'შესვლა საჭიროა.'});return false;}return true;}
