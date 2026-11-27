import {tr} from './portfolio-templates.mjs';
import {practiceGroups, sectors} from './practice-structure.mjs';
import {groupRoute} from './site-architecture.mjs';
import {internationalFeature} from './international.mjs';

const shortPractice = {
  "ai": [
    "AI-ის რეგულირება, რისკები და მართვა",
    "AI regulation, risk and governance"
  ],
  "privacy": [
    "მონაცემთა დამუშავება, უსაფრთხოება და ინციდენტები",
    "Data processing, security and incidents"
  ],
  "contracts": [
    "SaaS, ლიცენზირება, IT შესყიდვები და გარიგებები",
    "SaaS, licensing, IT procurement and transactions"
  ],
  "products": [
    "ციფრული პროდუქტები, ელექტრონული კომერცია და IP",
    "Digital products, e-commerce and IP"
  ],
  "fintech": [
    "ფინანსური ტექნოლოგიები, გადახდები და ვირტუალური აქტივები",
    "Financial technology, payments and virtual assets"
  ],
  "corporate": [
    "კომპანიის დაფუძნება, ინვესტიციები და იურიდიული მხარდაჭერა",
    "Company formation, investment and ongoing counsel"
  ]
};

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
      <h2 class="matter-heading">${tr('სწრაფი ბმულები', 'Explore by need')}</h2>
      <div class="matter-nav-inner">
      ${matters.map(([url,ka,en,descriptionKa,descriptionEn])=>`<a class="matter-link" href="${url}">
        <div>${tr(ka,en,'strong')}</div>${arrow}
      </a>`).join('')}
      </div>
    </div>
  </nav>`;
}

function homePractices() {
  const cards=practiceGroups.map(group=>`<a class="practice-card" href="${groupRoute(group)}"><div>${tr(group.name.ka,group.name.en,'h3')}${tr(shortPractice[group.key][0],shortPractice[group.key][1],'p')}</div>${arrow}</a>`).join('\n');
  return `<section class="section" id="expertise" aria-labelledby="expertise-title"><div class="wrap dlg-legal-editorial">
    <div class="section-head"><div>${tr('მომსახურება','EXPERTISE','p','eyebrow')}<h2 id="expertise-title">${tr('ჩვენი სპეციალიზაცია','Our expertise')}</h2>${tr('იურიდიული კონსულტაცია ბიზნესის, ტექნოლოგიებისა და რეგულირების საკითხებზე.','Legal advice on business, technology and regulation.','p','dlg-section-summary')}${link('/services/','ყველა მიმართულება','All practice areas')}</div></div>
    <div class="practice-grid dlg-practice-directory">${cards}</div>
  </div></section>`;
}

function audience() {
  const cards=sectors.map(sector=>`<a class="home-sector-link" href="/business/sectors/${sector.slug}/"><div class="home-sector-copy">${tr(sector.name.ka,sector.name.en,'h3')}</div>${arrow}</a>`).join('\n');
  return `<section class="section sectors" id="sectors" aria-labelledby="sectors-heading"><div class="wrap dlg-sector-editorial">
    <figure class="dlg-sector-feature"><img src="/assets/sectors/international.jpg" alt="" width="1200" height="760" loading="lazy" decoding="async"></figure>
    <div class="dlg-sector-directory"><div class="section-head"><div>${tr('ბიზნესსექტორები','INDUSTRIES','p','eyebrow')}<h2 id="sectors-heading">${tr('ვის ვუწევთ კონსულტაციას','Who we advise')}</h2></div></div><div class="home-sectors">${cards}</div>${link('/business/','ყველა სექტორი','All sectors')}</div>
  </div></section>`;
}

function about() {
  return `<section class="section practice-introduction" id="about" aria-labelledby="about-heading">
    <div class="wrap home-founder-reference">
      <div class="dlg-home-firm-copy">${tr('ჩვენ შესახებ','THE FIRM','p','eyebrow')}
        <h2 id="about-heading">${tr('სპეციალიზებული იურიდიული პრაქტიკა','A specialist legal practice')}</h2>
        ${tr('Digital Law Georgia ქართულ და საერთაშორისო კომპანიებს უწევს იურიდიულ კონსულტაციას ტექნოლოგიური და კომერციული სამართლის საკითხებზე. სამართლებრივ რისკებს ვაფასებთ კომპანიის საქმიანობის, ტექნოლოგიური გარემოსა და ბიზნესის მიზნების გათვალისწინებით.','Digital Law Georgia advises Georgian and international businesses on technology and commercial law. Our advice takes account of the business model, technology and commercial objectives.','p','dlg-home-firm-lead')}
        ${tr('კლიენტებთან უშუალო თანამშრომლობა და მკაფიო, პრაქტიკული სამართლებრივი რჩევა ჩვენი მიდგომის საფუძველია.','Direct collaboration and clear, practical legal advice underpin our approach.','p','dlg-home-firm-lead')}
        <div class="inline-links">${link('/about/','ფირმის შესახებ','About the firm')}${link('/how-we-work/','თანამშრომლობის პირობები','Engagement terms')}</div>
      </div>
      <div class="dlg-home-founder-card"><figure class="founder-feature"><img src="/assets/profile/founder-portrait.webp" alt="ლუკა შახყულაშვილი" data-en-alt="Luka Shakhkulashvili" width="900" height="900" loading="lazy" decoding="async"></figure>
        <div class="dlg-home-founder-copy">${tr('დამფუძნებელი','FOUNDER','p','eyebrow')}<h3>${tr('ლუკა შახყულაშვილი','Luka Shakhkulashvili')}</h3>${tr('ტექნოლოგიური და კომერციული სამართლის იურისტი','Technology and commercial lawyer','p','founder-role')}<div class="founder-credentials">${tr('შვიდწლიანი იურიდიული გამოცდილება კერძო და საჯარო სექტორში.','Seven years of legal experience in the private and public sectors.','p')}</div>${link('/about/founder/','პროფესიული პროფილი','Professional profile')}</div>
      </div>
    </div>
  </section>`;
}

function insights(rows) {
  const articles = rows.filter(row => row.featured).slice(0, 3).map(row => `<a class="article" href="/resources/${row.slug}/">
    <span class="dlg-article-date" aria-hidden="true">${row.date.slice(0,4)}</span>
    <div class="home-article-copy">
      <p class="article-meta">${tr('პრაქტიკული გზამკვლევი','Practical guide','span')}</p>
      ${tr(row.title, row.title_en, 'h3')}
      
    </div>
    ${arrow}
  </a>`).join('\n');
  if (!articles) return '';
  return `<section class="section" id="insights" aria-labelledby="insights-heading">
    <div class="wrap">
      <div class="section-head">
        <div>${tr('პუბლიკაციები','PUBLICATIONS','p','eyebrow')}<h2 id="insights-heading">${tr('კვლევები და ანალიტიკა', 'Insights and research')}</h2></div>
        ${link('/resources/', 'ყველა სტატია', 'All insights')}
      </div>
      <div class="article-grid">${articles}</div><a class="home-research-note" href="https://arxiv.org/abs/2607.21345" target="_blank" rel="noopener noreferrer"><div>${tr('სამეცნიერო ნაშრომი · 2026', 'Research paper · 2026', 'p', 'eyebrow')}${tr('ავტონომიური და აგენტური AI-ის რეგულირება', 'Regulating Autonomous and Agentic AI', 'strong')}</div><span class="research-link-label">${tr('ნაშრომის ნახვა', 'Read the paper')} ${arrow}</span></a>
    </div>
  </section>`;
}

export function renderHomepage(source, rows) {
  return source.replace('<!-- home-entrances -->', clientEntrances())
    .replace('<!-- home-practices -->', homePractices())
    .replace('<!-- international-feature -->', internationalFeature())
    .replace('<!-- home-sectors -->', audience())
    .replace('<!-- home-founder -->', about())
    .replace('<!-- home-engagement -->', '')
    .replace('<!-- home-insights -->', insights(rows));
}
