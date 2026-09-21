import test from 'node:test';
import assert from 'node:assert/strict';
import {passwordHash,sessionValue,authenticated,verifyPassword} from '../server/security.mjs';
import session from '../api/admin-session.mjs';
import content from '../api/admin-content.mjs';
const origin='https://lukaswebsite.vercel.app';
function response(){return {headers:{},setHeader(k,v){this.headers[k]=v;},status(v){this.code=v;return this;},json(v){this.data=v;return this;}};}
function request(method,body={},headers={}){return {method,body,headers:{origin,'x-forwarded-for':'192.0.2.10',...headers}};}
test('admin authentication rejects unauthorised access and invalidates sessions',async t=>{
 const old={...process.env},fetchOriginal=global.fetch;
 try{
  delete process.env.ADMIN_GITHUB_TOKEN;
  let r=response();await session(request('POST',{email:'test@example.com',password:'fixture'}),r);assert.equal(r.code,503);
  process.env.ADMIN_EMAIL='test@example.com';process.env.ADMIN_GITHUB_TOKEN='test-only-token';process.env.ADMIN_SESSION_SECRET='test-only-secret-'.repeat(4);process.env.ADMIN_PASSWORD_HASH=await passwordHash('test-only-password');
  assert.equal(await verifyPassword('wrong-password'),false);
  r=response();await session(request('POST',{email:'test@example.com',password:'test-only-password'},{origin:'https://untrusted.example'}),r);assert.equal(r.code,403);
  r=response();await session(request('POST',{email:'test@example.com',password:'test-only-password'}),r);assert.equal(r.code,200);assert.match(r.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Strict/);
  const cookie=r.headers['Set-Cookie'];assert.equal(authenticated(request('GET',{}, {cookie})),true);
  assert.equal(authenticated(request('GET',{}, {cookie:cookie.replace('__Host-dla_admin=','__Host-dla_admin=x')})),false);
  process.env.ADMIN_PASSWORD_HASH=await passwordHash('new-test-password');assert.equal(authenticated(request('GET',{}, {cookie})),false);
  r=response();await content(request('PUT'),r);assert.equal(r.code,401);
  r=response();await session(request('DELETE'),r);assert.match(r.headers['Set-Cookie'],/Max-Age=0/);
 }finally{global.fetch=fetchOriginal;for(const k of Object.keys(process.env))if(!(k in old))delete process.env[k];Object.assign(process.env,old);}
});
