import {tr} from './portfolio-templates.mjs';

const practices = [
  {
    key:'contracts', num:'01',
    ka:'ტექნოლოგიური და კომერციული ხელშეკრულებები',
    en:'Technology & Commercial Contracts',
    leadKa:'ხელშეკრულების პირობები უნდა იცავდეს თქვენს ინტერესებს და ამავე დროს პრაქტიკული იყოს ბიზნესისთვის.',
    leadEn:'Commercial terms should protect your interests while remaining workable for your business.',
    pointsKa:['SaaS-ისა და პროგრამული უზრუნველყოფის ხელშეკრულებები','მომსახურების, ლიცენზირებისა და პარტნიორობის შეთანხმებები','ხელშეკრულებების შემოწმება და მოლაპარაკების მხარდაჭერა'],
    pointsEn:['SaaS and software agreements','Services, licensing and commercial partnerships','Contract review and negotiation support'],
    link:'/services/contracts/'
  },
  {
    key:'privacy', num:'02',
    ka:'პერსონალურ მონაცემთა დაცვა',
    en:'Data Protection & Privacy',
    leadKa:'მონაცემთა დამუშავებას სჭირდება მკაფიო წესები, პასუხისმგებლობები და რეალურ საქმიანობაზე მორგებული დოკუმენტები.',
    leadEn:'Personal data processing needs clear responsibilities, practical documents and sound procedures.',
    pointsKa:['კანონმდებლობასთან შესაბამისობის შეფასება','მონაცემთა დამუშავების ხელშეკრულებები','კონფიდენციალურობის პოლიტიკა და შიდა პროცესები'],
    pointsEn:['Compliance and gap assessments','Data processing agreements','Privacy notices and internal processes'],
    link:'/services/data-protection/'
  },
  {
    key:'ai', num:'03',
    ka:'AI-ის სამართლებრივი საკითხები',
    en:'AI Regulation & Governance',
    leadKa:'AI-ის გამოყენებისა და დანერგვის დროს მნიშვნელოვანია პასუხისმგებლობის, კონტრაქტებისა და სამართლებრივი რისკების წინასწარ შეფასება.',
    leadEn:'The use and deployment of AI raise questions of responsibility, contracts and legal risk.',
    pointsKa:['AI-ის გამოყენების შიდა წესები','AI პროდუქტებისა და მიმწოდებლების სამართლებრივი შეფასება','რისკების, პასუხისმგებლობისა და რეგულირების ანალიზი'],
    pointsEn:['Internal AI use policies','AI product and supplier legal reviews','Risk, responsibility and regulatory analysis'],
    link:'/services/ai/'
  },
  {
    key:'international', num:'04',
    ka:'კორპორაციული და საერთაშორისო ბიზნესი',
    en:'Corporate & Cross-border Business',
    leadKa:'საქართველოში საქმიანობა და საერთაშორისო პარტნიორებთან ურთიერთობა მოითხოვს ზუსტ დოკუმენტებსა და გამართულ კომერციულ პირობებს.',
    leadEn:'Doing business in Georgia and working with international partners requires clear documentation and commercial terms.',
    pointsKa:['საქართველოში ბიზნესის სამართლებრივი მხარდაჭერა','საერთაშორისო კომერციული შეთანხმებები','კორპორაციული საკითხები და პარტნიორული ურთიერთობები'],
    pointsEn:['Legal support for business in Georgia','Cross-border commercial agreements','Corporate and partnership matters'],
    link:'/business/international/'
  }
];

const scenarios = [
  {
    n:'01',titleKa:'ახალი პროდუქტის გაშვება',titleEn:'Launching a digital product',
    bodyKa:'პროდუქტის პირობები, მონაცემთა დაცვა, პარტნიორები და საჭირო დოკუმენტები — გაშვებამდე.',
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

export function signatureAbout() {
  return '<section class="sig-about" id="about" aria-labelledby="about-heading"><div class="container sig-about-grid">'+
    '<div class="sig-about-heading"><p class="sig-kicker">'+tr('ფირმის შესახებ','ABOUT THE PRACTICE')+'</p>'+
    '<h2 id="about-heading" data-en="Legal advice is personal. So is our approach.">იურიდიული მომსახურება ადამიანური ურთიერთობით იწყება.</h2>'+
    '</div>'+
    '<div class="sig-about-content">'+
      tr('Digital Law Georgia დამოუკიდებელი იურიდიული პრაქტიკაა, რომლის დამფუძნებელია ლუკა შახყულაშვილი. კერძო და საჯარო სექტორში მიღებული 7-წლიანი გამოცდილებით ის კომპანიებს ეხმარება კომერციულ, კორპორაციულ და ტექნოლოგიებთან დაკავშირებულ სამართლებრივ საკითხებში.',
        'Digital Law Georgia is an independent legal practice founded by Luka Shakhkulashvili. With seven years of experience in the private and public sectors, he advises businesses on commercial, corporate and technology-related legal matters.','p')+
      tr('მისი პროფესიული განათლება მოიცავს Queen Mary University of London-ის მაგისტრის ხარისხს წარჩინებით (Distinction). ის Chevening-ის სტიპენდიატი და IAPP-ის AI Governance Professional (AIGP) სერტიფიკატის მფლობელია.',
        'His academic background includes an LLM with Distinction from Queen Mary University of London. He is a Chevening Scholar and holds the IAPP Artificial Intelligence Governance Professional (AIGP) certification.','p','sig-about-extra')+
      '<a class="sig-underlink" href="/about/" data-site-link>'+tr('გაიცანით დამფუძნებელი','Meet the founder')+'<span aria-hidden="true">↗</span></a>'+
    '</div></div></section>';
}

export function signatureServices() {
 const buttons=practices.map((p,i)=>
  '<button class="sig-practice-tab'+(i===0?' is-active':'')+'" type="button" id="sig-tab-'+p.key+'" data-sig-tab="'+p.key+'" role="tab" aria-controls="sig-panel-'+p.key+'" aria-selected="'+(i===0?'true':'false')+'" tabindex="'+(i===0?'0':'-1')+'">'+
    '<span class="sig-practice-num">'+p.num+'</span>'+tr(p.ka,p.en,'span','sig-practice-name')+'<span class="sig-practice-arrow" aria-hidden="true">↗</span></button>'
 ).join('');
 const panels=practices.map((p,i)=>
  '<div class="sig-practice-panel'+(i===0?' is-active':'')+'" id="sig-panel-'+p.key+'" data-sig-panel="'+p.key+'" role="tabpanel" aria-labelledby="sig-tab-'+p.key+'" tabindex="0"'+(i===0?'':' hidden')+'>'+
   '<span class="sig-panel-index">DLG / '+p.num+'</span>'+
   tr(p.ka,p.en,'h3')+
   tr(p.leadKa,p.leadEn,'p','sig-panel-lead')+
   '<div class="sig-panel-list"><p data-en="HOW WE HELP">როგორ გეხმარებით</p><ul>'+
      p.pointsKa.map((x,j)=>'<li>'+tr(x,p.pointsEn[j])+'</li>').join('')+
   '</ul></div>'+
   '<a href="'+p.link+'" class="sig-underlink" data-site-link>'+tr('მომსახურების დეტალები','Explore this service')+'<span aria-hidden="true">↗</span></a>'+
  '</div>'
 ).join('');
 return '<section class="sig-services" id="services" aria-labelledby="services-heading">'+
  '<div class="container">'+
   '<div class="sig-section-heading sig-section-heading-split">'+
     '<div><p class="sig-kicker">'+tr('სპეციალიზაცია','OUR PRACTICE')+'</p>'+
        '<h2 id="services-heading" data-en="Specialist expertise, grounded in business.">სამართლებრივი ცოდნა ბიზნესის რეალური საჭიროებებისთვის.</h2></div>'+
     tr('შეარჩიეთ მიმართულება და გაეცანით, რაში შეგვიძლია დაგეხმაროთ.','Select an area to see how we can help your business.','p')+
   '</div>'+
   '<div class="sig-practices" data-sig-practices>'+
      '<div class="sig-practice-tabs" role="tablist" aria-orientation="vertical" aria-label="სამართლებრივი მომსახურებები" data-en-aria="Legal practice areas">'+buttons+'</div>'+
      '<div class="sig-practice-panels">'+panels+'</div>'+
   '</div>'+
   '<div class="sig-services-footer"><a href="/services/" class="sig-underlink" data-site-link>'+tr('ყველა მომსახურების ნახვა','View all services')+'<span aria-hidden="true">↗</span></a>'+
    '<span data-en="More expertise: software IP, FinTech, cybersecurity and ongoing legal counsel.">სხვა მიმართულებები: პროგრამული უზრუნველყოფის IP, ფინტექი, კიბერუსაფრთხოება და მიმდინარე იურიდიული მომსახურება.</span>'+
   '</div>'+
  '</div></section>';
}

export function signatureAudience() {
 const links=scenarios.map(p=>
  '<a class="sig-audience-item" href="'+p.href+'" data-site-link><span class="sig-audience-num">'+p.n+'</span>'+
   '<span class="sig-audience-copy">'+tr(p.titleKa,p.titleEn,'h3')+tr(p.bodyKa,p.bodyEn,'p')+'</span>'+
   '<span class="sig-audience-arrow" aria-hidden="true">↗</span></a>'
 ).join('');
 return '<section class="sig-audience" id="business" aria-labelledby="business-heading"><div class="container">'+
   '<div class="sig-section-heading"><p class="sig-kicker">'+tr('ბიზნესის საჭიროებები','BUSINESS NEEDS')+'</p>'+
      '<h2 id="business-heading" data-en="The right advice at the right moment.">იურიდიული მხარდაჭერა, როცა ის ყველაზე მეტად გჭირდებათ.</h2></div>'+
   '<div class="sig-audience-list">'+links+'</div>'+
   '<a class="sig-underlink" href="/business/" data-site-link>'+tr('ვის ვეხმარებით','Who we work with')+'<span aria-hidden="true">↗</span></a>'+
  '</div></section>';
}
