import {tr} from './portfolio-templates.mjs';
import {practiceGroups, sectors} from './practice-structure.mjs';
import {groupRoute} from './site-architecture.mjs';
import {practiceIcon} from './site-icons.mjs';
import {internationalFeature} from './international.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const link = (url, ka, en, cls = 'text-link') =>
  `<a class="${cls}" href="${url}">${tr(ka, en)} ${arrow}</a>`;

function clientEntrances() {
  const matters = [
    ['/advisory/', 'AI-ის დანერგვა', 'Adopting AI', 'რისკების შეფასება, შიდა წესები და საცდელი პროექტი', 'Risk assessment, internal policies and pilots'],
    ['/services/contracts/', 'ტექნოლოგიური ხელშეკრულებები', 'Technology contracts', 'SaaS, ლიცენზირება და მოლაპარაკება', 'SaaS, licensing and negotiation'],
    ['/services/privacy-and-cybersecurity/', 'მონაცემთა დაცვა', 'Data protection', 'კონფიდენციალურობა, მიმწოდებლები და მონაცემთა გადაცემა', 'Privacy, suppliers and data transfers'],
    ['/business/georgia/', 'საქმიანობა საქართველოში', 'Doing business in Georgia', 'დაფუძნება, ადგილობრივი გუნდი და რეგულაციები', 'Company setup, teams and local regulation'],
  ];
  return `<nav class="matter-nav" id="client-matters" aria-label="თქვენი საკითხი" data-en-aria="Find advice for your matter">
    <div class="wrap">
      <h2>${tr('რაში შეგვიძლია დაგეხმაროთ?', 'How can we help?')}</h2>
      <div class="matter-nav-inner">
      ${matters.map(([url,ka,en,descriptionKa,descriptionEn])=>`<a class="matter-link" href="${url}">
        <div>${tr(ka,en,'strong')}${tr(descriptionKa,descriptionEn,'span','matter-description')}</div>${arrow}
      </a>`).join('')}
      </div>
    </div>
  </nav>`;
}

function homePractices() {
  const cards = practiceGroups.map(group => `<a class="practice-card" href="${groupRoute(group)}">
    ${practiceIcon(group.key)}
    <div>
      ${tr(group.name.ka, group.name.en, 'h3')}
      ${tr(group.summary.ka, group.summary.en, 'p')}
    </div>
    ${arrow}
  </a>`).join('\n');
  return `<section class="section" id="expertise" aria-labelledby="expertise-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="expertise-title">${tr('მომსახურების მიმართულებები', 'Our practice areas')}</h2>
        ${link('/services/', 'ყველა მომსახურება', 'All services')}
      </div>
      <div class="practice-grid">${cards}</div>
    </div>
  </section>`;
}

function audience() {
  const cards = sectors.map(sector => `<a class="home-sector-link" href="/business/sectors/${sector.slug}/">
    <div>${tr(sector.name.ka, sector.name.en, 'h3')}${tr(sector.short.ka, sector.short.en, 'p')}</div>${arrow}
  </a>`).join('\n');
  return `<section class="section sectors" id="sectors" aria-labelledby="sectors-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="sectors-heading">${tr('ვის ვეხმარებით', 'Who we advise')}</h2>
        ${link('/business/', 'ყველა სექტორი', 'All sectors')}
      </div>
      <div class="home-sectors">${cards}</div>
    </div>
  </section>`;
}

function about() {
  return `<section class="section practice-introduction" id="about" aria-labelledby="about-heading">
    <div class="wrap home-founder-reference">
      <div>
        ${tr('დამფუძნებელი', 'Founder', 'p', 'eyebrow')}
        <h2 id="about-heading">${tr('ლუკა შახყულაშვილი', 'Luka Shakhkulashvili')}</h2>
        ${tr('ტექნოლოგიური და კომერციული სამართლის იურისტი', 'Technology and commercial lawyer', 'p', 'founder-role')}
        ${tr('ლუკას პრაქტიკა მოიცავს ტექნოლოგიურ ხელშეკრულებებს, მონაცემთა დაცვასა და ხელოვნური ინტელექტის დანერგვის სამართლებრივ საკითხებს.', 'Luka advises on technology contracts, data protection and the legal questions that arise when businesses adopt AI.', 'p')}
        ${tr('ის ავტონომიური და აგენტური ხელოვნური ინტელექტის რეგულირების შესახებ კვლევის თანაავტორია.', 'He co-authored research on the regulation of autonomous and agentic AI.', 'p')}
        <div class="inline-links">
          ${link('/about/', 'პროფილი', 'View profile')}
          ${link('https://arxiv.org/abs/2607.21345', 'კვლევა', 'Read the research')}
        </div>
      </div>
      <figure class="founder-feature">
        <img src="/assets/profile/founder-portrait.webp" alt="ლუკა შახყულაშვილი" data-en-alt="Luka Shakhkulashvili" width="900" height="900" loading="lazy" decoding="async">
      </figure>
    </div>
  </section>`;
}

function engagement() {
  const steps = [
    ['საკითხის დაზუსტება', 'Understand the matter', 'ვარკვევთ, რა გადაწყვეტილება გაქვთ მისაღები და რა ინფორმაცია გვჭირდება შეფასებისთვის.', 'We clarify the decision you need to make and the information needed to advise you.'],
    ['სამუშაოს ფარგლები', 'Agree the scope', 'წინასწარ ვათანხმებთ სამუშაოს ფარგლებს, ვადასა და ანაზღაურებას.', 'We agree the scope, timing and fees before work begins.'],
    ['რჩევა და შემდგომი ნაბიჯები', 'Advice and next steps', 'იღებთ შეთანხმებულ დოკუმენტს ან წერილობით შეფასებას ძირითადი რისკებითა და შემდგომი ნაბიჯებით.', 'You receive the agreed document or written advice with the key risks and next steps.'],
  ];
  return `<section class="section engagement" id="engagement" aria-labelledby="engagement-title">
    <div class="wrap">
      <div class="section-head">
        <h2 id="engagement-title">${tr('როგორ ვმუშაობთ', 'How we work')}</h2>
        ${link('/how-we-work/', 'თანამშრომლობის პირობები', 'How engagements work')}
      </div>
      <ol class="engagement-steps">${steps.map(([ka,en,copyKa,copyEn])=>`<li>${tr(ka,en,'h3')}${tr(copyKa,copyEn,'p')}</li>`).join('')}</ol>
    </div>
  </section>`;
}

function insights(rows) {
  const articles = rows.filter(row => row.featured).slice(0, 3).map(row => `<a class="article" href="/resources/${row.slug}/">
    <div>
      ${tr(row.title, row.title_en, 'h3')}
      ${tr(row.summary, row.summary_en, 'p')}
    </div>
    ${arrow}
  </a>`).join('\n');
  if (!articles) return '';
  return `<section class="section" id="insights" aria-labelledby="insights-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="insights-heading">${tr('კვლევები და ანალიტიკა', 'Research and insights')}</h2>
        ${link('/resources/', 'ყველა სტატია', 'All insights')}
      </div>
      <div class="article-grid">${articles}</div>
    </div>
  </section>`;
}

export function renderHomepage(source, rows) {
  return source.replace('<!-- home-entrances -->', clientEntrances())
    .replace('<!-- home-practices -->', homePractices())
    .replace('<!-- international-feature -->', internationalFeature())
    .replace('<!-- home-sectors -->', audience())
    .replace('<!-- home-founder -->', about())
    .replace('<!-- home-engagement -->', engagement())
    .replace('<!-- home-insights -->', insights(rows));
}
