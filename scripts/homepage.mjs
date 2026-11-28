import {tr} from './portfolio-templates.mjs';
import {practiceGroups, sectors} from './practice-structure.mjs';
import {groupRoute} from './site-architecture.mjs';
import {finderTrigger} from './legal-finder.mjs';
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
      <div class="dlg-matter-intro"><h2 class="matter-heading">${tr('თქვენი სამართლებრივი საკითხი','Your legal matter')}</h2>${finderTrigger('dlg-matter-finder','მომსახურების მოძიება','Find legal advice')}</div>
      <div class="matter-nav-inner">
      ${matters.map(([url,ka,en,descriptionKa,descriptionEn])=>`<a class="matter-link" href="${url}">
        <div>${tr(ka,en,'strong')}</div>${arrow}
      </a>`).join('')}
      </div>
    </div>
  </nav>`;
}


// A signature law-and-technology illustration: a classical portico connected to a circuit.
const advisoryArtwork=`<svg class="dlg-advisory-art" viewBox="0 0 430 230" fill="none" aria-hidden="true" focusable="false">
 <g class="dlg-art-grid" stroke="#789aae" stroke-width=".65" opacity=".28"><path d="M20 45H410M20 80H410M20 115H410M20 150H410M20 185H410M60 20V210M95 20V210M130 20V210M165 20V210M200 20V210M235 20V210M270 20V210M305 20V210M340 20V210M375 20V210"/><circle cx="215" cy="115" r="89"/><circle cx="215" cy="115" r="108" stroke-dasharray="2 8"/></g>
 <g class="dlg-art-circuit" stroke="#8ebbc8" stroke-width="1.3"><path d="M140 101H103L79 77H35M140 143H105L78 170H35M290 101H327L351 77H395M290 143H325L352 170H395M215 62V22M215 178V208"/><g fill="#143347"><circle cx="35" cy="77" r="4"/><circle cx="35" cy="170" r="4"/><circle cx="395" cy="77" r="4"/><circle cx="395" cy="170" r="4"/><circle cx="215" cy="22" r="4"/><circle cx="215" cy="208" r="4"/></g></g>
 <g class="dlg-art-portico" stroke="#e1d1af" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m146 92 69-39 69 39H146Zm10 8h118M154 166h122M147 177h136M168 103v60m31-60v60m32-60v60m31-60v60"/><path d="M163 105h10m-10 56h10m21-56h10m-10 56h10m22-56h10m-10 56h10m21-56h10m-10 56h10"/><circle cx="215" cy="77" r="6"/></g>
 <g class="dlg-art-signal" fill="#b1d9dd"><circle cx="103" cy="101" r="3"/><circle cx="325" cy="143" r="3"/><circle cx="215" cy="22" r="2"/></g>
 </svg>`;
function featuredAdvisory() {
 const offers=[
 ['/advisory/ai-governance-implementation/','AI-ის მართვის სისტემის დანერგვა','AI governance implementation','AI-ის პოლიტიკა, პასუხისმგებლობები და რისკების შეფასების პროცედურები.','AI policies, accountability and risk assessment procedures.','ai'],
 ['/advisory/external-ai-technology-counsel/','მუდმივი იურიდიული მხარდაჭერა','External technology counsel','ტექნოლოგიური პროექტების, ხელშეკრულებებისა და რეგულაციების საკითხებზე.','Ongoing advice on technology projects, contracts and regulation.','contracts'],
 ['/services/georgia-market-entry/','საქართველოში საქმიანობის დაწყება','Georgia market entry','დაფუძნება, მარეგულირებელი მოთხოვნები და კომერციული საკითხები.','Company setup, regulatory requirements and commercial matters.','fintech'],
 ['/advisory/legal-ai-automation/','AI იურიდიულ საქმიანობაში','Legal AI transformation','სამუშაო პროცესების შეფასება, ინსტრუმენტების შერჩევა და დანერგვის გეგმა.','Workflow review, tool selection and implementation planning.','corporate']
 ];
 return `<section class="section dlg-commercial-offers" id="featured-advisory" aria-labelledby="featured-advisory-title">
  <div class="wrap dlg-advisory-layout">
    <div class="dlg-advisory-intro">
      ${tr('კონსულტაცია და სტრატეგიული მხარდაჭერა','ADVISORY & STRATEGIC SUPPORT','p','dlg-advisory-kicker')}
      <h2 id="featured-advisory-title">${tr('სამართლებრივი მხარდაჭერა თქვენი ბიზნესისთვის','Specialist support for your business')}</h2>
      ${tr('დაგეხმარებით ტექნოლოგიური და კომერციული გადაწყვეტილებების მიღებაში, პროექტის დაგეგმვიდან ყოველდღიურ საქმიანობამდე.','We support technology and commercial decisions, from project planning to day-to-day operations.','p','dlg-advisory-lead')}
      ${advisoryArtwork}
      ${link('/advisory/','გაეცანით საკონსულტაციო მიმართულებებს','Explore our advisory work','dlg-advisory-all')}
    </div>
    <div class="dlg-advisory-options">
      ${offers.map(([url,ka,en,descKa,descEn,key])=>`<a class="dlg-commercial-offer" href="${url}"><div class="dlg-advisory-option-top"><svg class="dlg-advisory-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${expertiseIcons[key]}</svg><span class="dlg-advisory-option-arrow" aria-hidden="true">↗</span></div>${tr(ka,en,'h3')}${tr(descKa,descEn,'p')}<span class="dlg-advisory-option-more">${tr('ვრცლად','Explore')}</span></a>`).join('')}
    </div>
  </div>
 </section>`;
}

// Purpose-built, consistent editorial line illustrations for the six practices.
const expertiseIcons={
 ai:'<rect x="12" y="12" width="24" height="24" rx="3"/><path d="M18 4v8m12-8v8M18 36v8m12-8v8M4 18h8M4 30h8m24-12h8m-8 12h8M18 27l6-11 6 11m-10-4h8"/><circle cx="24" cy="32" r="1" fill="currentColor" stroke="none"/>',
 privacy:'<path d="M24 4 40 11v12c0 9-6 16-16 21C14 39 8 32 8 23V11Z"/><rect x="17" y="22" width="14" height="10" rx="2"/><path d="M20 22v-4a4 4 0 0 1 8 0v4m-4 4v2"/>',
 contracts:'<path d="M11 5h18l9 9v29H11Z"/><path d="M29 5v10h9M17 21h15m-15 6h9m-9 6h7m4 4 4 4 9-11"/>',
 products:'<path d="m24 5 19 10v18L24 43 5 33V15Zm0 19v19M5 15l19 9 19-9M14 10l19 10v8"/><path d="m24 12 5 3-5 3-5-3Z"/>',
 fintech:'<path d="M6 14 24 5l18 9H6Zm4 23h28M6 43h36M12 17v17m12-17v17m12-17v17"/><circle cx="24" cy="10" r="1" fill="currentColor" stroke="none"/>',
 corporate:'<rect x="19" y="4" width="10" height="10" rx="1"/><path d="M24 14v9M8 30v-7h32v7"/><rect x="3" y="30" width="10" height="10" rx="1"/><rect x="19" y="30" width="10" height="10" rx="1"/><rect x="35" y="30" width="10" height="10" rx="1"/><path d="M24 23v7"/>'
};
function homePractices() {
  const cards=practiceGroups.map(group=>`<a class="practice-card" data-practice="${group.key}" href="${groupRoute(group)}">
    <div class="dlg-expertise-card-top"><svg class="dlg-expertise-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${expertiseIcons[group.key]}</svg><span class="dlg-expertise-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg></span></div>
    <div class="dlg-expertise-card-body"><h3>${tr(group.name.ka,group.name.en)}</h3>${tr(shortPractice[group.key][0],shortPractice[group.key][1],'p')}</div>
    <div class="dlg-expertise-card-foot">${tr('ვრცლად','Explore practice')}</div>
  </a>`).join('');
  return `<section class="section" id="expertise" aria-labelledby="expertise-title"><div class="wrap"><div class="section-head dlg-expertise-head"><div>${tr('სამართალი და ბიზნესი','LAW & BUSINESS','p','dlg-expertise-kicker')}<h2 id="expertise-title">${tr('ჩვენი სპეციალიზაცია','Our expertise')}</h2>${tr('სამართლებრივი მხარდაჭერა ტექნოლოგიების, ბიზნესისა და რეგულირების საკითხებზე.','Specialist legal advice across technology, business and regulation.','p','dlg-expertise-instruction')}</div>${link('/services/','ყველა მიმართულება','All practice areas')}</div><div class="dlg-expertise-grid">${cards}</div></div></section>`;
}

function audience() {
  const cards = sectors.map(sector => `<a class="home-sector-link" href="/business/sectors/${sector.slug}/">
    <figure class="home-sector-media"><img src="${sector.image}" alt="" width="1200" height="760" loading="lazy" decoding="async"></figure><div class="home-sector-copy">${tr(sector.name.ka, sector.name.en, 'h3')}</div>${arrow}
  </a>`).join('\n');
  return `<section class="section sectors" id="sectors" aria-labelledby="sectors-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="sectors-heading">${tr('ბიზნესსექტორები','Sectors we advise')}</h2>
        ${link('/business/', 'ყველა სექტორი', 'All sectors')}
      </div>
      <div class="home-sectors">${cards}</div>
    </div>
  </section>`;
}

function about() {
  return `<section class="section practice-introduction" id="about" aria-labelledby="about-heading">
    <div class="wrap home-founder-reference">
      <div class="dlg-home-firm-copy">
        ${tr('ჩვენ შესახებ','ABOUT THE FIRM','p','eyebrow')}
        <h2 id="about-heading">${tr('Digital Law Georgia','Digital Law Georgia')}</h2>
        ${tr('ტექნოლოგიურ და კომერციულ სამართალში სპეციალიზებული იურიდიული ფირმა. ბიზნესს ვეხმარებით ტექნოლოგიური პროექტების განხორციელებაში, კომერციული ხელშეკრულებების მომზადებასა და რეგულაციებთან დაკავშირებული სამართლებრივი რისკების მართვაში.','A specialist technology and commercial law firm. We support businesses with technology projects, commercial contracts and the management of regulatory risk.','p','dlg-home-firm-lead')}
        ${tr('სამართლებრივ საკითხებს ვაფასებთ თქვენი კომპანიის საქმიანობისა და კომერციული მიზნების გათვალისწინებით.','We consider each legal matter in the context of your business and commercial objectives.','p','dlg-home-firm-lead')}
        <div class="inline-links">${link('/about/','ვრცლად ფირმის შესახებ','About the firm')}</div>
        <div class="dlg-home-firm-principles" aria-label="ჩვენი მიდგომა" data-en-aria="Our approach">
          <a href="/services/"><span class="dlg-firm-principle-index" aria-hidden="true">01</span>${tr('სპეციალიზებული ცოდნა','Specialist expertise','strong')}${arrow}</a>
          <a href="/how-we-work/"><span class="dlg-firm-principle-index" aria-hidden="true">02</span>${tr('უშუალო თანამშრომლობა','Direct collaboration','strong')}${arrow}</a>
          <a href="/business/georgia/"><span class="dlg-firm-principle-index" aria-hidden="true">03</span>${tr('საერთაშორისო საქმიანობა','International business','strong')}${arrow}</a>
        </div>
      </div>
      <div class="dlg-home-founder-card">
        <figure class="founder-feature"><img src="/assets/profile/founder-portrait.webp" alt="ლუკა შახყულაშვილი" data-en-alt="Luka Shakhkulashvili" width="900" height="900" loading="lazy" decoding="async"></figure>
        <div class="dlg-home-founder-copy">${tr('დამფუძნებელი','Founder','p','eyebrow')}<h3>${tr('ლუკა შახყულაშვილი','Luka Shakhkulashvili')}</h3>${tr('ტექნოლოგიური და კომერციული სამართლის იურისტი','Technology and commercial lawyer','p','founder-role')}<div class="founder-credentials">${tr('შვიდწლიანი იურიდიული გამოცდილება კერძო და საჯარო სექტორში.','Seven years of legal experience in the private and public sectors.','p')}</div>${link('/about/founder/','პროფესიული პროფილი','Professional profile')}</div>
      </div>
    </div>
  </section>`;
}

function insights(rows) {
  const articles = rows.filter(row => row.featured).slice(0, 3).map(row => `<a class="article" href="/resources/${row.slug}/">
    <figure class="home-article-media"><img src="${row.cover}" alt="" width="1200" height="800" loading="lazy" decoding="async"></figure>
    <div class="home-article-copy">
      <p class="article-meta">${tr('პრაქტიკული გზამკვლევი', 'Practical guide', 'span')} <span aria-hidden="true">·</span> <time datetime="${row.date}">${row.date.slice(0,4)}</time></p>
      ${tr(row.title, row.title_en, 'h3')}
      
    </div>
    ${arrow}
  </a>`).join('\n');
  if (!articles) return '';
  return `<section class="section" id="insights" aria-labelledby="insights-heading">
    <div class="wrap">
      <div class="section-head">
        <h2 id="insights-heading">${tr('კვლევები და ანალიტიკა','Insights and research')}</h2>
        ${link('/resources/', 'ყველა სტატია', 'All insights')}
      </div>
      <div class="article-grid">${articles}</div><a class="home-research-note" href="https://arxiv.org/abs/2607.21345" target="_blank" rel="noopener noreferrer"><div>${tr('სამეცნიერო ნაშრომი · 2026', 'Research paper · 2026', 'p', 'eyebrow')}${tr('ავტონომიური და აგენტური AI-ის რეგულირება', 'Regulating Autonomous and Agentic AI', 'strong')}</div><span class="research-link-label">${tr('ნაშრომის ნახვა', 'Read the paper')} ${arrow}</span></a>
    </div>
  </section>`;
}

export function renderHomepage(source, rows) {
  return source.replace('<!-- home-entrances -->', clientEntrances())
    .replace('<!-- home-practices -->', homePractices()+featuredAdvisory())
    .replace('<!-- international-feature -->', internationalFeature())
    .replace('<!-- home-sectors -->', audience())
    .replace('<!-- home-founder -->', about())
    .replace('<!-- home-engagement -->', '')
    .replace('<!-- home-insights -->', insights(rows));
}
