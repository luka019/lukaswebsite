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

const practiceExamples = {
  ai: [
    ['AI-ის გამოყენების სამართლებრივი შეფასება','Legal assessment of AI use'],
    ['AI-ის შიდა პოლიტიკა და მართვის წესები','Internal AI policies and governance'],
    ['AI პროდუქტებისა და მიმწოდებლების შეფასება','AI product and supplier assessment']
  ],
  privacy: [
    ['პერსონალურ მონაცემთა დამუშავების სამართლებრივი შეფასება','Legal assessment of personal data processing'],
    ['კონფიდენციალურობის პოლიტიკა და მონაცემთა დამუშავების შეთანხმებები','Privacy policies and data processing agreements'],
    ['უსაფრთხოების ვალდებულებები და ინციდენტებზე რეაგირება','Security obligations and incident response']
  ],
  contracts: [
    ['SaaS, პროგრამული უზრუნველყოფა და ლიცენზირება','SaaS, software and licensing'],
    ['კომერციული ხელშეკრულებების მომზადება და შეფასება','Drafting and review of commercial contracts'],
    ['მოლაპარაკება, პასუხისმგებლობა და ხელშეკრულების შეწყვეტის პირობები','Negotiation, liability and exit terms']
  ],
  products: [
    ['ციფრული პროდუქტის გაშვებამდე სამართლებრივი შეფასება','Pre-launch legal review of digital products'],
    ['პლატფორმის პირობები და ელექტრონული კომერცია','Platform terms and e-commerce'],
    ['პროგრამულ უზრუნველყოფაზე უფლებები და ლიცენზირება','Software rights and licensing']
  ],
  fintech: [
    ['ფინანსური ბიზნესმოდელის სამართლებრივი შეფასება','Legal assessment of financial business models'],
    ['საგადახდო მომსახურება და რეგისტრაციის მოთხოვნები','Payment services and registration requirements'],
    ['ვირტუალური აქტივები და VASP რეგულირება','Virtual assets and VASP regulation']
  ],
  corporate: [
    ['კომპანიის დაფუძნება და კორპორაციული მართვა','Company formation and corporate governance'],
    ['საინვესტიციო და დამფუძნებელთა შეთანხმებები','Investment and founders’ agreements'],
    ['მუდმივი იურიდიული მხარდაჭერა','Ongoing legal counsel']
  ]
};

function featuredAdvisory() {
 const offers=[
 ['/advisory/ai-governance-implementation/','AI-ის მართვის სისტემის დანერგვა','AI governance implementation','AI-ის პოლიტიკა, პასუხისმგებლობები და რისკების შეფასების პროცედურები.','AI policies, accountability and risk assessment procedures.'],
 ['/advisory/external-ai-technology-counsel/','მუდმივი იურიდიული მხარდაჭერა','External technology counsel','ტექნოლოგიური პროექტების, ხელშეკრულებებისა და რეგულაციების საკითხებზე.','Ongoing advice on technology projects, contracts and regulation.'],
 ['/services/georgia-market-entry/','საქართველოში საქმიანობის დაწყება','Georgia market entry','დაფუძნება, მარეგულირებელი მოთხოვნები და კომერციული საკითხები.','Company setup, regulatory requirements and commercial matters.'],
 ['/advisory/legal-ai-automation/','AI იურიდიულ საქმიანობაში','Legal AI transformation','სამუშაო პროცესების შეფასება, ინსტრუმენტების შერჩევა და დანერგვის გეგმა.','Workflow review, tool selection and implementation planning.']
 ];
 return `<section class="section dlg-commercial-offers" id="featured-advisory" aria-labelledby="featured-advisory-title"><div class="wrap"><div class="section-head"><h2 id="featured-advisory-title">${tr('სამართლებრივი მხარდაჭერა თქვენი ბიზნესისთვის','Specialist support for your business')}</h2>${link('/advisory/','AI და სამართალი','AI and law')}</div><div class="dlg-commercial-grid">${offers.map(([url,ka,en,descKa,descEn],i)=>`<article class="dlg-commercial-offer"><span aria-hidden="true" class="dlg-commercial-index">0${i+1}</span>${tr(ka,en,'h3')}${tr(descKa,descEn,'p')}${link(url,'ვრცლად','Explore service')}</article>`).join('')}</div></div></section>`;
}

function homePractices() {
  const entries=practiceGroups.map((group,i)=>`<details class="dlg-practice-entry" name="dlg-practice-areas">
    <summary class="dlg-practice-summary">
      <span class="dlg-practice-number" aria-hidden="true">0${i+1}</span>
      <span class="dlg-practice-title">${tr(group.name.ka,group.name.en,'strong')}${tr(shortPractice[group.key][0],shortPractice[group.key][1],'span','dlg-practice-short')}</span>
      <span class="dlg-disclosure-mark" aria-hidden="true"></span>
    </summary>
    <div class="dlg-practice-expanded">
      ${tr('რა საკითხებზე ვმუშაობთ','How we can help','p','dlg-practice-caption')}
      <ul>${practiceExamples[group.key].map(([ka,en])=>tr(ka,en,'li')).join('')}</ul>
      ${link(groupRoute(group),'ვრცლად მიმართულების შესახებ','Explore this practice area','practice-card')}
    </div>
  </details>`);
  return `<section class="section" id="expertise" aria-labelledby="expertise-title">
    <div class="wrap">
      <div class="section-head">
        <div><h2 id="expertise-title">${tr('ჩვენი სპეციალიზაცია','Our expertise')}</h2>${tr('აირჩიეთ მიმართულება და გაეცანით, რა საკითხებზე ვმუშაობთ.','Select a practice area to see how we can help.','p','dlg-expertise-instruction')}</div>
        ${link('/services/','ყველა მიმართულება','All practice areas')}
      </div>
      <div class="practice-grid dlg-practice-directory">${[entries.slice(0,3),entries.slice(3)].map(col=>`<div class="dlg-practice-column">${col.join('')}</div>`).join('')}</div>
    </div>
  </section>`;
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
