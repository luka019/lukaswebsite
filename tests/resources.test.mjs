import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {validateResources,renderBody,safeURL} from '../resources/resource-model.mjs';
const rows=JSON.parse(fs.readFileSync('_data/resources.json','utf8'));
test('catalogue rejects executable cover/source URLs and duplicate slugs',()=>{
 assert.equal(safeURL('javascript:alert(1)'),false);assert.equal(safeURL('//evil.example'),false);assert.equal(safeURL('/assets/../secret'),false);assert.equal(safeURL('https://user:secret@example.com'),false);
 assert.throws(()=>validateResources([...rows,rows[0]]));assert.throws(()=>validateResources([{...rows[0],cover:'javascript:alert(1)'}]));assert.throws(()=>validateResources([{...rows[0],date:'2026-02-31'}]));
});
test('author text remains escaped, including HTML and script payloads',()=>{
 const html=renderBody('## <script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n- safe item');
 assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('<li>safe item</li>'));
});
test('production output contains authored resources, not raw templates or source data',()=>{
 execFileSync(process.execPath,['scripts/build.mjs']);
 const home=fs.readFileSync('dist/index.html','utf8');assert.equal((home.match(/data-resource-card/g)||[]).length,3);assert.ok(!home.includes('matsne.gov.ge'));assert.ok(!home.includes('OFFICIAL SOURCE'));
 for(const p of ['dist/resources/index.html','dist/services/ai/index.html',...rows.map(r=>`dist/resources/${r.slug}/index.html`)]){const html=fs.readFileSync(p,'utf8');assert.ok(!html.includes('{%'));assert.ok(!html.includes('{{'));}
 assert.ok(!fs.existsSync('dist/_data'));assert.ok(!fs.existsSync('dist/PUBLISHING.md'));
});
test('unpublished resource content never enters deployment output',()=>{
 const original=fs.readFileSync('_data/resources.json','utf8');
 try{fs.writeFileSync('_data/resources.json',JSON.stringify([...rows,{...rows[0],slug:'private-draft-test',title:'PRIVATE_DRAFT_SENTINEL',status:'draft'},{...rows[0],slug:'archived-test',title:'ARCHIVED_SENTINEL',status:'archived'},{...rows[0],slug:'future-test',title:'FUTURE_SENTINEL',date:'2099-01-01'}]));execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,SITE_OUTPUT:'test-dist'}});for(const p of ['private-draft-test','archived-test','future-test'])assert.ok(!fs.existsSync(`test-dist/resources/${p}`));const hub=fs.readFileSync('test-dist/resources/index.html','utf8');assert.ok(!/PRIVATE_DRAFT_SENTINEL|ARCHIVED_SENTINEL|FUTURE_SENTINEL/.test(hub));}
 finally{fs.writeFileSync('_data/resources.json',original);fs.rmSync('test-dist',{recursive:true,force:true});}
});
