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
        <h2 id="georgia-business-title">${tr('საქართველოში საქმიანობას იწყებთ?', 'Doing business in Georgia?')}</h2>
        ${tr('უცხოურ კომპანიებს ვეხმარებით საქართველოში საქმიანობის დაწყებასა და გაფართოებაში.', 'Georgian-law advice for international businesses entering or expanding in Georgia.', 'p', 'dlg-international-copy')}
        ${link(georgiaPage.route, 'საქართველოში საქმიანობა', 'Doing business in Georgia', 'primary dlg-international-link')}
      </div>
      ${georgiaServiceLinks()}
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

function georgiaServiceLinks() {
  return `<ul class="dlg-georgia-quick-links">
    ${work.map(([, , , ,url,ka,en]) => `<li>${link(url, ka, en)}</li>`).join('')}
  </ul>`;
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
