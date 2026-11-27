import {tr} from './portfolio-templates.mjs';
import {practiceGroups, sectors} from './practice-structure.mjs';
import {groupRoute} from './site-architecture.mjs';
import {practiceIcon} from './site-icons.mjs';
import {advisoryPackages} from './advisory-content.mjs';
import {internationalFeature} from './international.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const link = (url, ka, en, cls = 'text-link') =>
  `<a class="${cls}" href="${url}">${tr(ka, en)} ${arrow}</a>`;

function homePractices() {
  const cards = practiceGroups.map(group => `<a class="practice-card" href="${groupRoute(group)}">
    <span class="practice-mark">${practiceIcon(group.key)}${arrow}</span>
    ${tr(group.name.ka, group.name.en, 'h3')}
    ${tr(group.summary.ka, group.summary.en, 'p')}
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
        <!-- Photo by Pavel Danilyuk. Pexels 7518956. -->
        <figure class="advisory-photo">
          <img src="/assets/editorial/ai-advisory-review.webp" width="1050" height="701" alt="ორი პროფესიონალი სამუშაო მაგიდასთან დოკუმენტებსა და ლეპტოპს განიხილავს" data-en-alt="Two professionals reviewing documents and a laptop at a meeting table" loading="lazy" decoding="async">
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
      <img src="/assets/profile/founder-portrait.webp" alt="ლუკა შახყულაშვილი" data-en-alt="Luka Shakhkulashvili" width="900" height="900" loading="lazy" decoding="async">
      <div>
        ${tr('დამოუკიდებელი იურიდიული ფირმა', 'Independent law firm', 'p', 'eyebrow')}
        <h2 id="about-heading">${tr('ლუკა შახყულაშვილი', 'Luka Shakhkulashvili')}</h2>
        ${tr('დამფუძნებელი · ტექნოლოგიური და კომერციული სამართლის იურისტი', 'Founder · Technology and commercial lawyer', 'p', 'founder-role')}
        ${tr('იურიდიულ რჩევას ბიზნესის კონტექსტს ვარგებთ. სამუშაოს დასაწყისშივე ვათანხმებთ, რა უნდა შეფასდეს, რა დოკუმენტები მომზადდება და როგორ გამოგადგებათ ისინი გადაწყვეტილების მიღებისას.', 'We advise in the context of your business. We agree what we need to assess, which documents you need and how the work will inform your decision.', 'p')}
        ${tr('ლუკა ავტონომიური და აგენტური ხელოვნური ინტელექტის რეგულირების შესახებ კვლევის თანაავტორია.', 'Luka co-authored research on the regulation of autonomous and agentic AI.', 'p')}
        <div class="inline-links">
          ${link('/about/', 'გაიცანით დამფუძნებელი', 'Meet the founder')}
          ${link('https://arxiv.org/abs/2607.21345', 'გაეცანით კვლევას', 'Read the research')}
        </div>
      </div>
    </div>
  </section>`;
}

function insights(rows) {
  const articles = rows.filter(row => row.featured).slice(0, 3).map(row => `<a class="article" href="/resources/${row.slug}/">
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
  return source.replace('<!-- home-practices -->', homePractices())
    .replace('<!-- home-advisory -->', advisory())
    .replace('<!-- international-feature -->', internationalFeature())
    .replace('<!-- home-sectors -->', audience())
    .replace('<!-- home-founder -->', about())
    .replace('<!-- home-insights -->', insights(rows));
}
