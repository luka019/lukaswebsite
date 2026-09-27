import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scopeAreas,practices,solutions} from '../catalogue.mjs';
import {createDeliveryPack,feeEstimate,documentHTML} from '../delivery-templates.mjs';
test('scope explorer combines product, features and markets without losing specialist areas',()=>{
 const ids=scopeAreas({product:'crypto',features:['data','payments','ai','critical','consumer'],market:'eu-uk'}).map(x=>x.id);
 assert.deepEqual(new Set(ids),new Set(practices.map(x=>x.id)));
 assert.equal(new Set(ids).size,ids.length);
 assert.ok(!scopeAreas({product:'product',market:'georgia'}).some(x=>x.id==='crypto'));
});
test('each offered solution has delivery artefacts and uncompleted documents stay explicit drafts',()=>{
 for(const s of solutions){const pack=createDeliveryPack({title:'Test product',description:'A scoped business enquiry',solution_slug:s.id});assert.ok(pack.items.some(x=>x.kind==='question'));assert.ok(pack.items.some(x=>x.kind==='check'));assert.equal(pack.documents.length,4);assert.ok(pack.documents.every(d=>d.body.includes('[დასაზუსტებელია]')));assert.ok(pack.items.filter(x=>x.kind==='check').every(x=>!x.shared));}
});
test('pricing handles contingency and costs without presets or silent invalid inputs',()=>{
 assert.equal(feeEstimate({hours:10,rate:100,external:50,contingency:10}),1150);
 assert.throws(()=>feeEstimate({hours:-1}));assert.throws(()=>feeEstimate({rate:'no'}));assert.throws(()=>feeEstimate({contingency:101}));
});
test('exported documents escape client and administrator text',()=>{
 const html=documentHTML({title:'<script>alert(1)</script>',body:'<img src=x onerror=alert(1)>',version:2,published:true});
 assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));assert.ok(html.includes('v2'));
});
