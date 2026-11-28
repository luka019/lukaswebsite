import {escape,tr} from './portfolio-templates.mjs';
import {practices} from '../catalogue.mjs';
import {sectors} from './practice-structure.mjs';
const searchIcon='<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m15.5 15.5 4.5 4.5"/></svg>';
const keywords={
 'contracts':'SaaS IT NDA SLA ხელშეკრულება კონტრაქტი ლიცენზია შესყიდვა software licensing',
 'data-protection':'GDPR privacy DPA DPIA მონაცემები კონფიდენციალურობა',
 'ai':'AI Act governance LLM ხელოვნური ინტელექტი რისკები პოლიტიკა',
 'product':'ecommerce პლატფორმა აპლიკაცია ციფრული პროდუქტი consumer',
 'legal-operations':'CLM legaltech automation ხელშეკრულებების მართვა ავტომატიზაცია',
 'ongoing':'external counsel retainer იურისტი მუდმივი კონსულტაცია',
 'fintech':'payments bank NBG ბანკი ფინანსური საგადახდო',
 'crypto':'VASP crypto blockchain კრიპტო ვირტუალური აქტივები',
 'commerce':'ecommerce retailer online shop მომხმარებელი გაყიდვები',
 'cyber':'cybersecurity incident უსაფრთხოება კიბერუსაფრთხოება ინციდენტი',
 'georgia':'Georgia incorporation registration რეგისტრაცია დაფუძნება საქართველო',
 'ip':'IP software copyright საავტორო ლიცენზია ინტელექტუალური საკუთრება',
 'startup':'investment founders equity venture სტარტაპი ინვესტიცია წილი'
};
export function finderTrigger(cls,ka='',en=''){
 return `<button type="button" class="dlg-finder-trigger ${cls}" data-dlg-finder-open aria-haspopup="dialog" aria-controls="dlg-legal-finder" aria-label="მომსახურების მოძიება" data-en-aria="Find legal advice" aria-keyshortcuts="Control+k Meta+k" hidden>${searchIcon}${ka?tr(ka,en):''}</button>`;
}
export function renderLegalFinder(){
 const entries=[
  ...practices.map(p=>({route:'/services/'+p.slug+'/',name:p.name,kind:'practice',terms:keywords[p.id]||''})),
  ...sectors.map(s=>({route:'/business/sectors/'+s.slug+'/',name:s.name,kind:'sector',terms:[s.short.ka,s.short.en].join(' ')})),
  {route:'/advisory/',name:{ka:'AI და ციფრული ტრანსფორმაცია',en:'AI and digital transformation'},kind:'practice',terms:'AI policy EU AI Act risk training LegalTech'},
  {route:'/advisory/contract-lifecycle-management/',name:{ka:'ხელშეკრულებების მართვის სისტემის დანერგვა (CLM)',en:'Contract Lifecycle Management (CLM) implementation'},kind:'practice',terms:'CLM LegalStepy contract management software contract repository contract lifecycle ხელშეკრულებების მართვის პლატფორმა დოკუმენტების მართვა ვადები რეესტრი'},
  {route:'/advisory/legal-ai-automation/',name:{ka:'იურიდიული პროცესების გაციფრულება და ავტომატიზაცია',en:'Legal operations and digital transformation'},kind:'practice',terms:'LegalTech legal process automation legal operations AI agents legal digital transformation workflow იურიდიული პროცესების ავტომატიზაცია იურიდიული დეპარტამენტის გაციფრულება'},
  {route:'/advisory/ai-governance-implementation/',name:{ka:'AI-ის დანერგვა და მართვა',en:'AI implementation and governance'},kind:'practice',terms:'AI adoption AI implementation AI policy AI Act governance ხელოვნური ინტელექტის დანერგვა AI პოლიტიკა'},
  {route:'/advisory/digital-compliance/',name:{ka:'ციფრული ბიზნესის სამართლებრივი შესაბამისობა',en:'Digital business compliance and policies'},kind:'practice',terms:'compliance legal compliance regulatory compliance policies GDPR data protection digital governance სამართლებრივი შესაბამისობა შიდა პოლიტიკა პროცედურები'} ,
  {route:'/business/georgia/',name:{ka:'საქართველოში საქმიანობა',en:'Doing business in Georgia'},kind:'sector',terms:'market entry company registration დაფუძნება უცხოური'}
 ];
 return `<dialog class="dlg-legal-finder" id="dlg-legal-finder" aria-labelledby="dlg-finder-title"><div class="dlg-finder-head"><div>${tr('Digital Law Georgia','Digital Law Georgia','p','dlg-finder-brand')}<h2 id="dlg-finder-title" class="dlg-finder-title">${tr('იპოვეთ საჭირო იურიდიული მიმართულება','Find the right legal expertise')}</h2></div><button type="button" class="dlg-finder-close" data-dlg-finder-close aria-label="დახურვა" data-en-aria="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>
 <div class="dlg-finder-controls"><label for="dlg-finder-input">${tr('სამართლებრივი საკითხი ან საკვანძო სიტყვა','Legal matter or keyword')}</label><div class="dlg-finder-input-wrap">${searchIcon}<input id="dlg-finder-input" type="search" maxlength="100" autocomplete="off" placeholder="მაგ.: AI, SaaS, VASP" data-en-placeholder="e.g. AI, SaaS, VASP"></div>
 <div class="dlg-finder-suggestions"><p>${tr('პოპულარული საკითხები','Suggested searches')}</p><div>${[['AI Act','AI Act','AI Act'],['SaaS','ტექნოლოგიური ხელშეკრულებები','Technology contracts'],['GDPR','მონაცემთა დაცვა','Data protection'],['VASP','ვირტუალური აქტივები','Virtual assets']].map(([value,ka,en])=>`<button type="button" data-dlg-finder-suggestion="${value}">${tr(ka,en)}</button>`).join('')}</div></div>
 <div class="dlg-finder-filters" role="group" aria-label="ძებნის კატეგორია" data-en-aria="Filter by category">${[['all','ყველა','All'],['practice','მომსახურება','Practice areas'],['sector','სექტორები','Sectors']].map(([k,ka,en])=>`<button type="button" data-dlg-filter="${k}" aria-pressed="${k==='all'}">${tr(ka,en)}</button>`).join('')}</div>
 <p class="dlg-finder-status" role="status" aria-live="polite" aria-atomic="true"></p></div>
 <div class="dlg-finder-scroll"><ul class="dlg-finder-results">${entries.map(e=>`<li class="dlg-finder-result" data-dlg-kind="${e.kind}" data-dlg-search="${escape([e.name.ka,e.name.en,e.terms].join(' '))}"><a href="${e.route}"><span class="dlg-finder-result-text">${tr(e.name.ka,e.name.en,'strong')}${e.kind==='practice'?tr('იურიდიული მიმართულება','Practice area','span'):tr('სექტორი','Sector','span')}</span><span aria-hidden="true">↗</span></a></li>`).join('')}</ul>
 <div class="dlg-finder-empty" hidden>${tr('შესაბამისი მიმართულება ვერ მოიძებნა. სცადეთ სხვა სიტყვა ან დაგვიკავშირდით.','No matching expertise found. Try another keyword or contact us.','p')}<a href="/contact/">${tr('დაგვიკავშირდით','Contact us')} <span aria-hidden="true">↗</span></a></div></div>
 <div class="dlg-finder-foot"><p>${tr('ძებნა მხოლოდ ვებგვერდის კატალოგში მიმდინარეობს. არ მიუთითოთ კონფიდენციალური ინფორმაცია.','Search is limited to this website’s catalogue. Do not enter confidential information.')}</p><a href="/services/">${tr('ყველა მიმართულება','All practice areas')} <span aria-hidden="true">↗</span></a></div></dialog>`;
}
