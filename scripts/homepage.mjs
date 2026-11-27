import {escape,tr} from './portfolio-templates.mjs';
import {practiceGroups, sectors} from './practice-structure.mjs';
import {groupRoute} from './site-architecture.mjs';
import {practiceIcon} from './site-icons.mjs';
import {advisoryPackages} from './advisory-content.mjs';
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
    <div class="wrap matter-nav-inner">
      ${matters.map(([url,ka,en,descriptionKa,descriptionEn])=>`<a class="matter-link" href="${url}">
        <div>${tr(ka,en,'strong')}${tr(descriptionKa,descriptionEn,'span','matter-description')}</div>${arrow}
      </a>`).join('')}
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
        <h2 id="expertise-title">${tr('ჩვენი სპეციალიზაცია', 'Our practice areas')}</h2>
        ${link('/services/', 'მომსახურების სრული ჩამონათვალი', 'Explore all services')}
      </div>
      <div class="practice-grid">${cards}</div>
    </div>
  </section>`;
}

const advisoryOptions = [
  ['ai-readiness', 'AI-ის გამოყენების შეფასება', 'AI readiness'],
  ['ai-governance-implementation', 'AI-ის მართვის წესები', 'AI governance'],
  ['legal-ai-automation', 'იურიდიული პროცესების ავტომატიზაცია', 'Legal automation'],
  ['external-ai-technology-counsel', 'მუდმივი იურიდიული მხარდაჭერა', 'Ongoing counsel'],
];

function advisory() {
  const tabs = advisoryOptions.map(([id, ka, en], index) => `<button type="button" role="tab" id="tab-${id}" data-tab="${index}" aria-controls="panel-${id}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}">${tr(ka, en)}</button>`).join('');
  const panels = advisoryOptions.map(([id], index) => {
    const programme = advisoryPackages.find(pkg => pkg.id === id);
    if (!programme) throw new Error('Unknown advisory programme: '+id);
    const output = programme.outputs.ka.slice(0, 3).map((ka, i) => `<li>${tr(ka, programme.outputs.en[i])}</li>`).join('');
    return `<div class="advisory-panel" role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0"${index ? ' hidden' : ''}>
      ${tr(programme.name.ka, programme.name.en, 'h3')}
      ${tr(programme.intro.ka, programme.intro.en, 'p')}
      ${tr('რას მიიღებთ', 'What you receive', 'p', 'outcome-label')}
      <ul>${output}</ul>
      ${link('/advisory/'+id+'/', 'გაეცანით პირობებს და შედეგებს', 'Explore scope and deliverables')}
    </div>`;
  }).join('\n');
  return `<section class="section advisory" id="advisory" aria-labelledby="advisory-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="advisory-heading">${tr('AI კონსულტაცია და ავტომატიზაცია', 'AI advisory and automation')}</h2>
        ${link('/advisory/', 'ყველა მიმართულება', 'Explore AI advisory')}
      </div>
      <div class="advisory-grid">
        <!-- Photo from Pexels 7972285. -->
        <figure class="advisory-photo">
          <img src="/assets/editorial/ai-workflow.webp" width="960" height="800" alt="ლეპტოპთან გახსნილ დოკუმენტზე შენიშვნებს წერენ" data-en-alt="A person making notes on a document beside a laptop" loading="lazy" decoding="async">
        </figure>
        <div class="advisory-work">
          <div class="advisory-tabs" role="tablist" aria-label="AI კონსულტაციის მიმართულებები" data-en-aria="AI advisory options" hidden>${tabs}</div>
          <div data-advisory-panels>${panels}</div>
        </div>
      </div>
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
      <figure class="founder-feature">
        <img src="/assets/profile/london-tech-week-2026.webp" alt="ლუკა შახყულაშვილი London Tech Week-ზე" data-en-alt="Luka Shakhkulashvili at London Tech Week" width="960" height="1280" loading="lazy" decoding="async">
        <figcaption>London Tech Week, 2026</figcaption>
      </figure>
      <div>
        ${tr('დამფუძნებელი', 'Founder', 'p', 'eyebrow')}
        <h2 id="about-heading">${tr('ლუკა შახყულაშვილი', 'Luka Shakhkulashvili')}</h2>
        ${tr('ტექნოლოგიური და კომერციული სამართლის იურისტი', 'Technology and commercial lawyer', 'p', 'founder-role')}
        ${tr('ლუკას პრაქტიკა მოიცავს ტექნოლოგიურ ხელშეკრულებებს, მონაცემთა დაცვასა და ხელოვნური ინტელექტის დანერგვის სამართლებრივ საკითხებს.', 'Luka advises on technology contracts, data protection and the legal questions that arise when businesses adopt AI.', 'p')}
        ${tr('ის ავტონომიური და აგენტური ხელოვნური ინტელექტის რეგულირების შესახებ კვლევის თანაავტორია.', 'He co-authored research on the regulation of autonomous and agentic AI.', 'p')}
        <div class="inline-links">
          <button class="primary founder-open" type="button" data-founder-open aria-haspopup="dialog" hidden><span aria-hidden="true" class="play-mark"></span>${tr('მოუსმინეთ წარდგენას', 'Listen to the introduction')}</button>
          ${link('/about/', 'პროფილი', 'View profile')}
          ${link('https://arxiv.org/abs/2607.21345', 'კვლევა', 'Read the research')}
        </div>
      </div>
    </div>
    <dialog class="founder-dialog" aria-labelledby="founder-dialog-heading">
      <div class="founder-dialog-inner">
        <form method="dialog" class="founder-close">
          <button type="submit" aria-label="დახურვა" data-en-aria="Close">×</button>
        </form>
        <figure class="founder-hologram">
          <img src="/assets/profile/founder-portrait.webp" alt="" width="900" height="900" loading="lazy">
        </figure>
        <h2 id="founder-dialog-heading">${tr('Digital Law Georgia-ს წარდგენა', 'Introducing Digital Law Georgia')}</h2>
        <div class="founder-languages" role="group" aria-label="მოსმენის ენა" data-en-aria="Narration language">
          <button type="button" lang="ka" data-founder-language="ka" aria-pressed="false">ქართული</button>
          <button type="button" lang="en" data-founder-language="en" aria-pressed="false">English</button>
        </div>
        <audio controls preload="none" aria-label="ფირმის აუდიოწარდგენა" data-en-aria="Firm introduction audio"></audio>
        <p class="founder-transcript" lang="ka" data-founder-copy="ka">გამარჯობა. Digital Law Georgia-ში ვეხმარებით ქართულ და უცხოურ კომპანიებს ტექნოლოგიურ ხელშეკრულებებში, ხელოვნური ინტელექტის დანერგვასა და მონაცემთა დაცვაში. კონკრეტული საკითხის განსახილველად დაგვიკავშირდით.</p>
        <p class="founder-transcript" lang="en" data-founder-copy="en" hidden>Welcome to Digital Law Georgia. We advise Georgian and international companies on technology contracts, AI adoption and data protection. Please get in touch to discuss your matter.</p>
        <p class="founder-voice-note">${tr('წარდგენა გახმოვანებულია სინთეზური ხმით.', 'This introduction uses a synthetic voice.')}</p>
      </div>
    </dialog>
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
    <img src="${escape(row.cover)}" alt="" width="1200" height="800" loading="lazy" decoding="async">
    ${tr(row.title, row.title_en, 'h3')}
    ${tr(row.summary, row.summary_en, 'p')}${arrow}
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
    .replace('<!-- home-advisory -->', advisory())
    .replace('<!-- international-feature -->', internationalFeature())
    .replace('<!-- home-sectors -->', audience())
    .replace('<!-- home-founder -->', about())
    .replace('<!-- home-engagement -->', engagement())
    .replace('<!-- home-insights -->', insights(rows));
}
