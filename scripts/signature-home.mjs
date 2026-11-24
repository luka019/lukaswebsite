import {tr} from './portfolio-templates.mjs';

const practices = [
 {key:'ai',num:'01',ka:'ხელოვნური ინტელექტის რეგულირება და მართვა',en:'AI Law & Governance',
  leadKa:'AI-ის უსაფრთხო და პასუხისმგებლიანი გამოყენებისთვის საჭირო სამართლებრივი წესები და პროცედურები.',leadEn:'Legal advice for accountable development, procurement and use of AI.',
  pointsKa:['AI-ის გამოყენების პოლიტიკა და რისკების შეფასება','ალგორითმული გადაწყვეტილებები და ადამიანური ზედამხედველობა','EU AI Act-ის მოქმედების სფეროს შეფასება'],
  pointsEn:['AI policies and legal risk reviews','Algorithmic decision-making and human oversight','Assessment of EU AI Act scope'],link:'/services/ai/'},
 {key:'data',num:'02',ka:'პერსონალურ მონაცემთა დაცვა',en:'Data Protection & Privacy',
  leadKa:'მონაცემთა დამუშავება, კონფიდენციალურობა და საზღვარგარეთ მონაცემების გადაცემა.',leadEn:'Privacy obligations across processing, suppliers and international transfers.',
  pointsKa:['კანონმდებლობასთან შესაბამისობის შეფასება, DPIA და DPO','კონფიდენციალურობის პოლიტიკა და მონაცემთა დამუშავების ხელშეკრულებები (DPA)','მონაცემთა ინციდენტებზე სამართლებრივი რეაგირება'],
  pointsEn:['Compliance reviews, DPIA and DPO support','Privacy notices and processing agreements','Legal response to data incidents'],link:'/services/data-protection/'},
 {key:'contracts',num:'03',ka:'ტექნოლოგიური და კომერციული ხელშეკრულებები',en:'Technology & Commercial Contracts',
  leadKa:'პროგრამული უზრუნველყოფის, SaaS-ისა და IT მომსახურების ხელშეკრულებების მომზადება და შეფასება.',leadEn:'Commercial terms for software, SaaS, outsourcing and technology procurement.',
  pointsKa:['SaaS, SLA და Cloud ხელშეკრულებები','ლიცენზირება, აუთსორსინგი და IP პირობები','სახელშეკრულებო მოლაპარაკებები და რისკების შეფასება'],
  pointsEn:['SaaS terms, SLAs and cloud agreements','Licensing, outsourcing and IP provisions','Negotiation and contractual risk review'],link:'/services/contracts/'},
 {key:'product',num:'04',ka:'ციფრული პროდუქტები და ელექტრონული კომერცია',en:'Digital Products & E-commerce',
  leadKa:'ციფრული პროდუქტების გაშვებასთან, ონლაინ მომსახურებასა და მომხმარებლებთან ურთიერთობასთან დაკავშირებული სამართლებრივი საკითხები.',leadEn:'Launch, operate and grow online products with appropriate terms and compliance.',
  pointsKa:['Terms of Service, გამოწერები და დაბრუნება','მომხმარებელთა უფლებები და პლატფორმის წესები','ელექტრონული კონტრაქტები და ციფრული რეკლამა'],
  pointsEn:['Terms of Service, subscriptions and refunds','Consumer protection and platform rules','E-contracts and digital advertising'],link:'/services/digital-products/'},
 {key:'ip',num:'05',ka:'პროგრამული უზრუნველყოფა და ინტელექტუალური საკუთრება',en:'Software & Intellectual Property',
  leadKa:'პროგრამულ კოდზე, ციფრულ აქტივებსა და ბრენდზე უფლებების დაცვა.',leadEn:'Clear ownership and licensing of code, software and digital assets.',
  pointsKa:['ინტელექტუალური საკუთრების უფლებების გადაცემისა და ლიცენზირების დოკუმენტები','პროგრამულ კოდზე უფლებები და ღია კოდის პროგრამული უზრუნველყოფა','ბრენდი, სასაქონლო ნიშნები და ტექნოლოგიური აქტივები'],
  pointsEn:['IP assignments and licensing documents','Software ownership and open-source compliance','Brand protection and technology assets'],link:'/services/intellectual-property/'},
 {key:'cyber',num:'06',ka:'კიბერუსაფრთხოების სამართლებრივი საკითხები',en:'Cybersecurity & Digital Risk',
  leadKa:'კიბერინციდენტებთან, ინფორმაციულ უსაფრთხოებასა და მომწოდებლების პასუხისმგებლობასთან დაკავშირებული სამართლებრივი საკითხები.',leadEn:'Legal responsibilities around cyber incidents, information security and suppliers.',
  pointsKa:['სექტორული მოთხოვნები და უსაფრთხოების პოლიტიკები','ინციდენტზე რეაგირების სამართლებრივი გეგმა','ხელშეკრულების პირობები უსაფრთხოებისა და პასუხისმგებლობის შესახებ'],
  pointsEn:['Sectoral requirements and security policies','Legal incident-response planning','Security and liability clauses'],link:'/services/cyber-digital-risk/'},
 {key:'fintech',num:'07',ka:'ფინტექი და ციფრული აქტივები',en:'FinTech & Digital Assets',
  leadKa:'საგადახდო მომსახურებისა და ვირტუალური აქტივების სფეროში ბიზნესმოდელების სამართლებრივი შეფასება.',leadEn:'Regulatory advice for payments and virtual-asset business models.',
  pointsKa:['საგადახდო მომსახურების რეგულირება','VASP-ის რეგისტრაციის საჭიროების შეფასება','ფინანსური პარტნიორობის ხელშეკრულებები'],
  pointsEn:['Payment-services regulation','VASP registration perimeter review','Financial partnership agreements'],link:'/services/fintech/'},
 {key:'startup',num:'08',ka:'სტარტაპები, ინვესტიციები და საერთაშორისო ბიზნესი',en:'Startups, Investment & Cross-border Business',
  leadKa:'ტექნოლოგიური კომპანიის დაფუძნება, დამფუძნებლებს შორის ურთიერთობის მოწესრიგება და ინვესტიციის მოზიდვისთვის მომზადება.',leadEn:'Legal foundations for founders, investment and international expansion.',
  pointsKa:['დამფუძნებლების შეთანხმებები და vesting','ინტელექტუალური საკუთრების უფლებების კუთვნილება და საინვესტიციო დოკუმენტები','საქართველოში ბაზარზე შესვლა და საერთაშორისო კონტრაქტები'],
  pointsEn:['Founder agreements and vesting','IP ownership and investment documentation','Georgia market entry and cross-border contracts'],link:'/services/startups-investment/'}
];

const scenarios = [
  {
    n:'01',titleKa:'ახალი პროდუქტის გაშვება',titleEn:'Launching a digital product',
    bodyKa:'პროდუქტით სარგებლობის პირობები, მონაცემთა დაცვა, პარტნიორებთან ხელშეკრულებები და გაშვებამდე მოსამზადებელი დოკუმენტები.',
    bodyEn:'Customer terms, privacy, commercial partners and legal documents before launch.',
    href:'/services/digital-products/'
  },
  {
    n:'02',titleKa:'მნიშვნელოვანი ხელშეკრულების გაფორმება',titleEn:'Signing an important agreement',
    bodyKa:'რას იღებთ, რა ვალდებულებებს კისრულობთ და რომელი პირობები საჭიროებს ცვლილებას.',
    bodyEn:'Understand your rights, obligations and the clauses that need to change.',
    href:'/services/contracts/'
  },
  {
    n:'03',titleKa:'ბიზნესის გაფართოება',titleEn:'Expanding your business',
    bodyKa:'საქართველოში საქმიანობა, საერთაშორისო თანამშრომლობა და პარტნიორული ურთიერთობების მოწესრიგება.',
    bodyEn:'Operating in Georgia, cross-border cooperation and partnership arrangements.',
    href:'/business/'
  }
];

const atelierMarks={
  ai:'<circle cx="40" cy="40" r="21"/><circle cx="40" cy="40" r="8"/><path d="M40 6v13M40 61v13M6 40h13M61 40h13M16 16l10 10M54 54l10 10M64 16 54 26M26 54 16 64"/><circle cx="40" cy="6" r="2" fill="currentColor"/><circle cx="74" cy="40" r="2" fill="currentColor"/>',
  data:'<path d="M20 32V23c0-11 8-19 20-19s20 8 20 19v9"/><rect x="14" y="32" width="52" height="39" rx="2"/><circle cx="40" cy="50" r="6"/><path d="M40 56v7M22 38h36"/>',
  contracts:'<path d="M21 7h30l10 10v54H21z"/><path d="M51 7v12h10M29 30h24M29 39h24M29 48h15"/><path d="M29 62c7-8 11 4 19-2l5-3"/>',
  product:'<rect x="8" y="14" width="64" height="51" rx="2"/><path d="M8 27h64M20 20h3M29 20h3M36 39h21M36 47h16"/><rect x="18" y="36" width="11" height="15" rx="1"/>',
  ip:'<path d="M14 24h37v39H14zM29 11h37v39H54"/><path d="M25 51h17M25 42h20"/><circle cx="56" cy="22" r="5"/>',
  cyber:'<path d="M40 8 64 18v18c0 16-8 28-24 36-16-8-24-20-24-36V18z"/><path d="m29 40 8 8 16-18"/>',
  fintech:'<circle cx="21" cy="25" r="10"/><circle cx="59" cy="55" r="10"/><path d="M31 25h24l-7-7M49 55H25l7 7M55 25l-7 7M25 55l7-7"/>',
  startup:'<path d="M12 65h56M19 65V49h12v16M36 65V35h12v30M53 65V20h12v45"/><path d="m18 34 18-14 13 4 13-15M54 9h8v8"/>'
};
const mark=key=>'<span class="atelier-service-symbol" aria-hidden="true"><svg viewBox="0 0 80 80" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(atelierMarks[key]||atelierMarks.contracts)+'</svg></span>';
export function signatureAbout(){
 const focus=[
  ['ხელოვნური ინტელექტის რეგულირება და მართვა','Artificial intelligence law and governance'],
  ['პერსონალურ მონაცემთა დაცვა','Data protection and privacy'],
  ['ტექნოლოგიური და კომერციული ხელშეკრულებები','Technology and commercial contracts'],
  ['ციფრული ბიზნესი და საერთაშორისო საქმიანობა','Digital business and cross-border matters']
 ];
 return '<section class="sig-about" id="about" aria-labelledby="about-heading"><div class="container sig-about-grid">'+
  '<div class="sig-about-heading"><p class="sig-kicker">'+tr('ჩვენ შესახებ','ABOUT THE PRACTICE')+'</p>'+
  '<h2 id="about-heading" data-en="Specialist knowledge. Personal attention.">ტექნოლოგიური და კომერციული სამართლის სპეციალიზაცია</h2>'+
  '<figure class="dlg-about-portrait"><img src="/assets/luka-shakhkulashvili.png" width="800" height="800" loading="lazy" decoding="async" alt="ლუკა შახყულაშვილი, Digital Law Georgia-ს დამფუძნებელი" data-en-alt="Luka Shakhkulashvili, founder of Digital Law Georgia"><figcaption><span data-en="FOUNDER & LEGAL COUNSEL">დამფუძნებელი · იურისტი</span><strong data-en="Luka Shakhkulashvili">ლუკა შახყულაშვილი</strong></figcaption></figure>'+
  '</div><div class="sig-about-content">'+
  tr('Digital Law Georgia დამოუკიდებელი იურიდიული ფირმაა. ჩვენი სპეციალიზაცია ტექნოლოგიური და კომერციული სამართალი, ხელოვნური ინტელექტის რეგულირება და პერსონალურ მონაცემთა დაცვაა. ვმუშაობთ ქართულ და უცხოურ კომპანიებთან, სტარტაპებსა და მათ დამფუძნებლებთან.',
    'Digital Law Georgia is an independent boutique legal practice dedicated to legal matters arising from technology, artificial intelligence and digital business. We advise established businesses, startup founders and international companies.','p')+
  tr('კლიენტებს ვთავაზობთ სამართლებრივ შეფასებას, მათ საქმიანობაზე მორგებულ ხელშეკრულებებსა და პრაქტიკულ რეკომენდაციებს. საქმის მიმდინარეობისას უშუალოდ პასუხისმგებელ იურისტთან ექნებათ კომუნიკაცია. მომსახურების მოცულობას, ვადებსა და ანაზღაურებას წინასწარ ვათანხმებთ.',
    'We provide clear legal assessments, tailored contracts and practical solutions. Clients communicate directly with the lawyer responsible for the work. Scope, timing and fees are agreed in advance.','p')+
  '<div class="atelier-founder-bio"><span class="atelier-founder-bio-rule" aria-hidden="true"></span>'+
  tr('ფირმას ხელმძღვანელობს ლუკა შახყულაშვილი, ტექნოლოგიური და კომერციული სამართლის იურისტი. მისი პროფესიული გამოცდილებისა და კვლევების შესახებ ინფორმაცია იხილეთ პროფილზე.',
    'The practice is led by Luka Shakhkulashvili, a technology and commercial lawyer. His professional experience and research are described in his profile.','p')+
  '</div><p class="sig-focus-title" data-en="CORE AREAS OF ADVICE">ძირითადი სპეციალიზაცია</p>'+
  '<ul class="sig-focus-list">'+focus.map(([ka,en])=>'<li>'+tr(ka,en)+'</li>').join('')+'</ul>'+
  '<a class="sig-underlink" href="/about/" data-site-link>'+tr('მეტი დამფუძნებლის შესახებ','Meet the founder')+'<span aria-hidden="true">↗</span></a>'+
  '</div></div></section>';
}
export function signatureServices(){
 const group={ai:'ai',data:'ai',contracts:'digital',product:'digital',ip:'digital',cyber:'digital',fintech:'business',startup:'business'};
 const rows=practices.map(p=>
  '<article class="sig-service-row" id="practice-'+p.key+'" data-dlg-practice-group="'+group[p.key]+'">'+
  '<span class="sig-service-number">'+p.num+' / 08</span>'+
  mark(p.key)+
  '<div class="sig-service-copy">'+tr(p.ka,p.en,'h3')+tr(p.leadKa,p.leadEn,'p')+'</div>'+
  '<div class="sig-service-detail"><a class="sig-underlink" href="'+p.link+'" data-site-link>'+
  tr('მომსახურების დეტალები','View practice details')+'<span aria-hidden="true">↗</span></a></div>'+
  '</article>').join('');
 const filters=[
  ['all','ყველა','All'],
  ['ai','AI და მონაცემები','AI & Data'],
  ['digital','ხელშეკრულებები და პროდუქტები','Contracts & Products'],
  ['business','ფინტექი და სტარტაპები','FinTech & Startups']
 ].map(([key,ka,en])=>
  '<button type="button" data-dlg-practice-filter="'+key+'" aria-pressed="'+(key==='all'?'true':'false')+'" data-en="'+en+'">'+ka+'</button>').join('');
 return '<section class="sig-services" id="services" aria-labelledby="services-heading"><div class="container">'+
  '<div class="sig-section-heading sig-section-heading-split">'+
   '<div><p class="sig-kicker">'+tr('მომსახურება','PRACTICE AREAS')+'</p>'+
   '<h2 id="services-heading" data-en="Our expertise">ჩვენი სპეციალიზაცია</h2></div>'+
   tr('იურიდიული მომსახურება ტექნოლოგიური პროდუქტის შექმნიდან კომპანიის ყოველდღიურ საქმიანობამდე.',
      'Legal support for developing technology products, growing businesses and everyday operations.','p')+
  '</div>'+
  '<div class="dlg-practice-toolbar" data-dlg-practice-tools hidden>'+
   '<div class="dlg-practice-filters" role="group" aria-label="მომსახურების მიმართულებები" data-en-aria="Filter practice areas">'+filters+'</div>'+
   '<label class="dlg-practice-search-wrap"><input type="search" data-dlg-practice-search autocomplete="off" placeholder="მოძებნეთ მომსახურება" data-en-placeholder="Find a service" aria-label="მომსახურების ძიება" data-en-aria="Search practice areas"></label>'+
   '<span class="dlg-practice-count" role="status" aria-live="polite" data-dlg-practice-count data-en="8 areas">8 მიმართულება</span>'+
  '</div>'+
  '<div class="sig-service-list">'+rows+'</div>'+
  '<p class="dlg-practice-empty" data-dlg-practice-empty hidden data-en="No matching practice area. Try another keyword or select All.">ასეთი მომსახურება ვერ მოიძებნა. სცადეთ სხვა სიტყვა ან აირჩიეთ „ყველა“.</p>'+
  '<div class="sig-services-footer"><a href="/services/" class="sig-underlink" data-site-link>'+
   tr('მომსახურების სრული ჩამონათვალი','Explore all services')+'<span aria-hidden="true">↗</span></a>'+
   '<span data-en="Also available: VASP regulatory assessments, ongoing legal support and legal operations.">ასევე გთავაზობთ ვირტუალური აქტივების რეგულირებასთან დაკავშირებულ კონსულტაციას, მუდმივ იურიდიულ მომსახურებასა და იურიდიული პროცესების მოწესრიგებას.</span>'+
  '</div></div></section>';
}
export function signatureAudience() {
 const links=scenarios.map(p=>
  '<a class="sig-audience-item" href="'+p.href+'" data-site-link><span class="sig-audience-num">'+p.n+'</span>'+
   '<span class="sig-audience-copy">'+tr(p.titleKa,p.titleEn,'h3')+tr(p.bodyKa,p.bodyEn,'p')+'</span>'+
   '<span class="sig-audience-arrow" aria-hidden="true">↗</span></a>'
 ).join('');
 return '<section class="sig-audience" id="business" aria-labelledby="business-heading"><div class="container">'+
   '<div class="sig-section-heading"><p class="sig-kicker">'+tr('ბიზნესის საჭიროებები','BUSINESS NEEDS')+'</p>'+
      '<h2 id="business-heading" data-en="The right advice at the right moment.">იურიდიული მხარდაჭერა ბიზნესის განვითარების სხვადასხვა ეტაპზე.</h2></div>'+
   '<div class="sig-audience-list">'+links+'</div>'+
   '<a class="sig-underlink" href="/business/" data-site-link>'+tr('ვის ვეხმარებით','Who we work with')+'<span aria-hidden="true">↗</span></a>'+
  '</div></section>';
}
