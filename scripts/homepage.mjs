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
    ['/advisory/', 'AI-ის დანერგვა', 'Adopting AI', 'AI-ის გამოყენების წესები და სამართლებრივი რისკები', 'AI policies and legal risk assessment'],
    ['/services/contracts/', 'ტექნოლოგიური ხელშეკრულებები', 'Technology contracts', 'SaaS, პროგრამული უზრუნველყოფა და კომერციული გარიგებები', 'SaaS, software and commercial transactions'],
    ['/services/privacy-and-cybersecurity/', 'მონაცემთა დაცვა', 'Data protection', 'მონაცემთა დამუშავება, მიმწოდებლები და უსაფრთხოება', 'Data processing, vendors and security'],
    ['/business/georgia/', 'საქმიანობა საქართველოში', 'Doing business in Georgia', 'კომპანიის დაფუძნება, რეგულაციები და ადგილობრივი მხარდაჭერა', 'Company setup, regulation and local counsel'],
  ];
  return `<nav class="matter-nav" id="client-matters" aria-label="თქვენი საკითხი" data-en-aria="Find advice for your matter">
    <div class="wrap">
      <h2>${tr('რა საკითხზე გჭირდებათ დახმარება?', 'What do you need advice on?')}</h2>
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
        <div><h2 id="expertise-title">${tr('მომსახურების მიმართულებები', 'Our expertise')}</h2><p class="section-intro">${tr('ტექნოლოგიური და კომერციული სამართლის საკითხებზე ვმუშაობთ ბიზნესის განვითარების სხვადასხვა ეტაპზე.', 'Specialist technology and commercial law advice at every stage of business growth.')}</p></div>
        ${link('/services/', 'ყველა მომსახურება', 'All services')}
      </div>
      <div class="practice-grid">${cards}</div>
    </div>
  </section>`;
}

function audience() {
  const cards = sectors.map(sector => `<a class="home-sector-link" href="/business/sectors/${sector.slug}/">
    <figure class="home-sector-media"><img src="${sector.image}" alt="" width="1200" height="760" loading="lazy" decoding="async"></figure><div class="home-sector-copy">${tr(sector.name.ka, sector.name.en, 'h3')}${tr(sector.short.ka, sector.short.en, 'p')}</div>${arrow}
  </a>`).join('\n');
  return `<section class="section sectors" id="sectors" aria-labelledby="sectors-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="sectors-heading">${tr('ვის ვუწევთ კონსულტაციას', 'Who we advise')}</h2>
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
        ${tr('ჩვენ შესახებ', 'About the firm', 'p', 'eyebrow')}
        <h2 id="about-heading">${tr('ლუკა შახყულაშვილი', 'Luka Shakhkulashvili')}</h2>
        ${tr('ტექნოლოგიური და კომერციული სამართლის იურისტი', 'Technology and commercial lawyer', 'p', 'founder-role')}
        ${tr('ფირმის დამფუძნებელი ლუკა შახყულაშვილი სპეციალიზებულია ტექნოლოგიურ და კომერციულ სამართალში. მას სამართლებრივი საქმიანობის გამოცდილება აქვს როგორც კერძო, ისე საჯარო სექტორში.', 'Founder Luka Shakhkulashvili specialises in technology and commercial law, with legal experience in both the private and public sectors.', 'p')}
        <div class="founder-credentials"><div>${tr('Queen Mary University of London', 'Queen Mary University of London', 'strong')}${tr('ტექნოლოგიების, მედიისა და ტელეკომუნიკაციების სამართლის მაგისტრი', 'LLM in Technology, Media and Telecommunications Law', 'span')}</div><div>${tr('AI-ის რეგულირების კვლევა', 'AI regulation research', 'strong')}${tr('ავტონომიური და აგენტური AI-ის რეგულირების შესახებ კვლევის თანაავტორი', 'Co-author of research on autonomous and agentic AI regulation', 'span')}</div></div>
        <div class="inline-links">
          ${link('/about/', 'პროფესიული გამოცდილება', 'Professional background')}
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
    ['საკითხის დაზუსტება', 'Understand the matter', 'ვესაუბრებით თქვენს გუნდს, ვეცნობით საკითხსა და ბიზნესის მიზნებს.', 'We understand your matter, your business objectives and the context.'],
    ['სამუშაოს ფარგლები', 'Agree the scope', 'წინასწარ ვათანხმებთ სამუშაოს ფარგლებს, ვადასა და ანაზღაურებას.', 'We agree the scope, timing and fees before work begins.'],
    ['სამართლებრივი მხარდაჭერა', 'Advice and delivery', 'ვამზადებთ შეთანხმებულ დოკუმენტებს, განვმარტავთ რისკებს და გთავაზობთ პრაქტიკულ ნაბიჯებს.', 'We deliver the agreed documents, explain the risks and recommend practical next steps.'],
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
    <figure class="home-article-media"><img src="${row.cover}" alt="" width="1200" height="800" loading="lazy" decoding="async"></figure>
    <div class="home-article-copy">
      <p class="article-meta">${tr('პრაქტიკული გზამკვლევი', 'Practical guide', 'span')} <span aria-hidden="true">·</span> <time datetime="${row.date}">${row.date.slice(0,4)}</time></p>
      ${tr(row.title, row.title_en, 'h3')}
      ${tr(row.summary, row.summary_en, 'p')}
    </div>
    ${arrow}
  </a>`).join('\n');
  if (!articles) return '';
  return `<section class="section" id="insights" aria-labelledby="insights-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="insights-heading">${tr('კვლევები და ანალიტიკა', 'Insights and research')}</h2>
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
