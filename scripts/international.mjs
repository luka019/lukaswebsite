import {tr} from './portfolio-templates.mjs';

export const georgiaPage = {
  route: '/business/georgia/',
  title: {ka: 'იურიდიული მხარდაჭერა უცხოური კომპანიებისთვის საქართველოში', en: 'Georgian legal counsel for international businesses'},
  summary: {
    ka: 'საქართველოში ბიზნესის დაწყების, გაფართოებისა და ადგილობრივ პარტნიორებთან მუშაობისას დაგეხმარებით კორპორაციულ, კომერციულ და მარეგულირებელ საკითხებში. ვმუშაობთ ქართულად და ინგლისურად.',
    en: 'Georgian-law advice in English for international companies setting up, expanding or working with local partners. We help with corporate, commercial and regulatory matters.',
  },
};

const link = (url, ka, en, className = 'text-link') => `<a class="${className}" href="${url}" data-site-link>${tr(ka, en)} <span aria-hidden="true">↗</span></a>`;

export function internationalFeature() {
  return `<section class="dlg-international-feature" id="georgia-business" aria-labelledby="georgia-business-title">
    <div class="wrap dlg-international-grid">
      <div>
        ${tr('უცხოური კომპანიებისთვის', 'For international businesses', 'p', 'eyebrow')}
        <h2 id="georgia-business-title">${tr('საქართველოში ბიზნესის დაწყება და გაფართოება', 'Establishing and growing your business in Georgia')}</h2>
        ${tr('უცხოურ კომპანიებს ვეხმარებით საქართველოში ბიზნესის დაწყების, გაფართოებისა და ყოველდღიური საქმიანობის სამართლებრივ საკითხებში.', 'Georgian-law advice for international companies establishing, expanding or operating a business in Georgia.', 'p', 'dlg-international-copy')}
        ${link(georgiaPage.route, 'იურიდიული მომსახურება საქართველოში', 'Explore our Georgian-law services', 'primary dlg-international-link')}
      </div>
      ${georgiaServiceLinks(true)}
    </div>
  </section>`;
}

const work = [
  ['კომპანიის დაფუძნება და ადგილობრივი გუნდი', 'Company setup and local teams',
    'საქმიანობის ფორმის შერჩევა, რეგისტრაციის დოკუმენტები, ხელმოწერის უფლებამოსილება და შეთანხმებები თანამშრომლებთან თუ კონტრაქტორებთან.',
    'Choice of structure, incorporation documents, signing authority and agreements with employees and contractors.',
    '/services/georgia-market-entry/', 'დაფუძნება და საქმიანობის დაწყება', 'Market entry and company setup'],
  ['კომერციული გარიგებები და მომწოდებლები', 'Commercial deals and suppliers',
    'კომერციული პარტნიორის სამართლებრივი შემოწმება და ხელშეკრულებების მომზადება, შეფასება და შეთანხმება, მათ შორის დისტრიბუციის, მომსახურებისა და პროგრამული უზრუნველყოფის საკითხებზე.',
    'Legal due diligence on commercial partners, and drafting, review and negotiation of service, software and distribution agreements.',
    '/services/contracts/', 'კომერციული ხელშეკრულებები', 'Commercial contracts'],
  ['რეგულაციები, მონაცემები და AI', 'Regulation, data and AI',
    'ლიცენზირებისა და რეგისტრაციის მოთხოვნების წინასწარი შეფასება. პერსონალურ მონაცემთა დამუშავების, საერთაშორისო გადაცემისა და AI-ის გამოყენების სამართლებრივი საკითხების ანალიზი.',
    'Initial assessment of licensing and registration requirements, plus legal review of personal data processing, international transfers and AI use.',
    '/services/privacy-and-cybersecurity/', 'მონაცემთა დაცვა და ციფრული რისკები', 'Data protection and digital risk'],
  ['ადგილობრივი იურიდიული მხარდაჭერა', 'Ongoing local counsel',
    'იურიდიული დახმარება კონკრეტულ პროექტზე ან შეთანხმებული მოცულობით. საჭიროების შემთხვევაში კოორდინაცია საგადასახადო, საბუღალტრო და სხვა სპეციალისტებთან.',
    'Support on a defined project or on an ongoing basis, with coordination of tax, accounting and other specialist input where needed.',
    '/services/ongoing-legal-support/', 'მუდმივი იურიდიული მომსახურება', 'Ongoing legal counsel'],
];

const georgiaIcons=[
 '<path d="M4 21h16M6 21V8l6-4 6 4v13M9 12h2m2 0h2m-6 4h2m2 0h2"/>',
 '<path d="M6 3h8l4 4v14H6Zm8 0v5h4M9 12h6m-6 4h6"/>',
 '<path d="M12 3 20 7v6c0 4-4 7-8 9-4-2-8-5-8-9V7Z"/><path d="m8 12 3 3 5-6"/>',
 '<path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3M4 12v4h4v-5H4m16 1h-4v5h4M11 20h4"/>'
];
const homeGeorgia=[
 ['კომპანიის დაფუძნება','Company establishment','რეგისტრაცია, კორპორაციული დოკუმენტები და ადგილობრივი გუნდი.','Registration, corporate documents and local teams.'],
 ['კომერციული ხელშეკრულებები','Commercial contracts','ადგილობრივ პარტნიორებთან და მომწოდებლებთან ურთიერთობა.','Agreements with local partners and suppliers.'],
 ['მონაცემთა დაცვა და ციფრული რისკები','Data protection and digital risk','მონაცემთა დამუშავება, უსაფრთხოება და AI-ის გამოყენება.','Data processing, security and AI use.'],
 ['მუდმივი იურიდიული მომსახურება','Ongoing legal counsel','ყოველდღიური კორპორაციული და კომერციული საკითხები.','Day-to-day corporate and commercial matters.']
];
function georgiaServiceLinks(home=false){
 if(!home)return `<ul class="dlg-georgia-quick-links">${work.map(([, , , ,url,ka,en])=>`<li>${link(url,ka,en)}</li>`).join('')}</ul>`;
 return `<ul class="dlg-georgia-quick-links dlg-georgia-home-cards">${work.map(([, , , ,url],i)=>{const [ka,en,desc,descEn]=homeGeorgia[i];return `<li><a class="dlg-georgia-card" href="${url}" data-site-link><svg class="dlg-georgia-icon" viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${georgiaIcons[i]}</svg><span class="dlg-georgia-card-copy">${tr(ka,en,'strong','dlg-georgia-card-title')}${tr(desc,descEn,'span','dlg-georgia-card-description')}</span><span class="dlg-georgia-arrow" aria-hidden="true">↗</span></a></li>`;}).join('')}</ul>`;
}

export function georgiaEntryPage() {
  const title = georgiaPage.title;
  const summary = georgiaPage.summary;
  return `<section class="digital-page-hero dlg-georgia-hero">
    <div class="container dlg-international-grid">
      <div>
        ${tr('საქართველოში საქმიანობა', 'Doing business in Georgia', 'p', 'eyebrow')}
        ${tr(title.ka, title.en, 'h1')}
        ${tr(summary.ka, summary.en, 'p', 'digital-lead')}
        ${link('/contact/?area=georgia-market-entry', 'განვიხილოთ თქვენი პროექტი', 'Discuss your Georgia project', 'button button-primary dlg-international-link')}
      </div>
      ${georgiaServiceLinks()}
    </div>
  </section>
  <section class="digital-section dlg-georgia-scope" aria-labelledby="georgia-scope-heading">
    <div class="container">
      <h2 id="georgia-scope-heading">${tr('რაში დაგეხმარებით', 'How we can help')}</h2>
      <div class="dlg-georgia-services">
        ${work.map(([ka,en,copyKa,copyEn,route,linkKa,linkEn])=>`<article>
          ${tr(ka, en, 'h3')}${tr(copyKa, copyEn, 'p')}${link(route, linkKa, linkEn)}
        </article>`).join('')}
      </div>
    </div>
  </section>
  <section class="digital-section digital-wash dlg-georgia-engagement" aria-labelledby="georgia-engagement-heading">
    <div class="container dlg-international-grid">
      <div>
        <h2 id="georgia-engagement-heading">${tr('როგორ დავიწყოთ თანამშრომლობა', 'How we work with your team')}</h2>
        ${tr('მოკლედ მოგვწერეთ, რა საქმიანობას გეგმავთ საქართველოში, რა ეტაპზე ხართ და როდის გჭირდებათ პასუხი. წინასწარ შევათანხმებთ სამუშაოს ფარგლებს, ვადასა და ანაზღაურებას.', 'Tell us what you plan to do in Georgia, where the project stands and when you need advice. We agree scope, timing and fees before work begins.', 'p')}
        ${link('/about/', 'გაიცანით დამფუძნებელი', 'Meet the founder')}
      </div>
      <div class="dlg-georgia-output">
        ${tr('რა შეგიძლიათ მიიღოთ', 'What we can deliver', 'h3')}
        <ul>
          <li>${tr('წერილობითი შეფასება ინგლისურად, ძირითადი რისკებითა და შემდეგი ნაბიჯებით', 'An English-language briefing with key risks and next steps')}</li>
          <li>${tr('შეთანხმებული კორპორაციული და კომერციული დოკუმენტები', 'Agreed corporate and commercial documents')}</li>
          <li>${tr('გეგმა თქვენი იურიდიული, ფინანსური და საოპერაციო გუნდებისთვის', 'A work plan for your legal, finance and operations teams')}</li>
        </ul>
      </div>
    </div>
  </section>`;
}
