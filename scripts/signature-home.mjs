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

export function signatureAbout(){
 const focus=[
 ['AI-ის სამართლებრივი რეგულირება და მმართველობა','AI regulation and governance'],
 ['პერსონალურ მონაცემთა დაცვა','Data protection and privacy'],
 ['ტექნოლოგიური და კომერციული ხელშეკრულებები','Technology and commercial contracts'],
 ['ციფრული პროდუქტები და საერთაშორისო ბიზნესი','Digital products and cross-border business']];
 return '<section class="sig-about" id="about" aria-labelledby="about-heading"><div class="container sig-about-grid">'+
 '<div class="sig-about-heading"><p class="sig-kicker">'+tr('ჩვენ შესახებ','ABOUT THE PRACTICE')+'</p>'+
 '<h2 id="about-heading" data-en="Specialist focus. Direct, personal legal advice.">სპეციალიზებული პრაქტიკა. უშუალო ურთიერთობა კლიენტთან.</h2></div>'+
 '<div class="sig-about-content">'+
 tr('Digital Law Georgia ლუკა შახყულაშვილის მიერ დაფუძნებული დამოუკიდებელი ბუტიკური იურიდიული პრაქტიკაა. ჩვენი საქმიანობა მთლიანად კონცენტრირებულია ტექნოლოგიებთან, ხელოვნურ ინტელექტთან და ციფრულ ბიზნესთან დაკავშირებულ სამართლებრივ საკითხებზე, მათ შორის შესაბამის კომერციულ ურთიერთობებზე.',
 'Founded by Luka Shakhkulashvili, Digital Law Georgia is an independent boutique legal practice dedicated exclusively to legal matters arising from technology, artificial intelligence and digital business, including the commercial relationships that support them.','p')+
 tr('ჩვენი მიზანია, კომპანიებმა მიიღონ ზუსტი, გასაგები და მათ საქმიანობაზე მორგებული იურიდიული დახმარება. ჯერ ვეცნობით კონკრეტულ საკითხს, შემდეგ ვათანხმებთ სამუშაოს ფარგლებსა და პირობებს. კლიენტი უშუალოდ ურთიერთობს იმ იურისტთან, რომელიც მის საქმეზე მუშაობს.',
 'Our purpose is to make specialist legal advice clear, practical and closely aligned with each client’s business. We understand the matter first, agree the scope and terms, and provide direct access to the lawyer responsible for the work.','p')+
 tr('პრაქტიკას ხელმძღვანელობს ლუკა შახყულაშვილი, ტექნოლოგიური და კომერციული სამართლის იურისტი 7-წლიანი გამოცდილებით. მან Queen Mary University of London-ში მიიღო სამართლის მაგისტრის ხარისხი წარჩინებით (Distinction) და არის Chevening-ის სტიპენდიატი.',
 'The practice is led by Luka Shakhkulashvili, a technology and commercial lawyer with seven years of experience. He holds an LLM with Distinction from Queen Mary University of London and is a Chevening Scholar.','p','sig-about-extra')+
 '<div class="sig-focus"><p class="sig-focus-title" data-en="OUR SPECIALISATION">ჩვენი სპეციალიზაცია</p><ul class="sig-focus-list">'+
 focus.map(([ka,en])=>'<li>'+tr(ka,en)+'</li>').join('')+
 '</ul></div><a class="sig-underlink" href="/about/" data-site-link>'+
 tr('გაიცანით დამფუძნებელი','Meet the founder')+'<span aria-hidden="true">↗</span></a>'+
 '</div></div></section>';
}
export function signatureServices(){
 const rows=practices.map(p=>
 '<article class="sig-service-row" id="practice-'+p.key+'">'+
 '<span class="sig-service-number">'+p.num+'</span>'+
 '<div class="sig-service-copy">'+tr(p.ka,p.en,'h3')+tr(p.leadKa,p.leadEn,'p')+'</div>'+
 '<div class="sig-service-detail"><ul class="sig-service-points">'+
 p.pointsKa.map((point,i)=>'<li>'+tr(point,p.pointsEn[i])+'</li>').join('')+
 '</ul><a class="sig-underlink" href="'+p.link+'" data-site-link>'+
 tr('მომსახურების შესახებ','Read about this practice')+'<span aria-hidden="true">↗</span></a></div>'+
 '</article>').join('');
 return '<section class="sig-services" id="services" aria-labelledby="services-heading"><div class="container">'+
 '<div class="sig-section-heading sig-section-heading-split">'+
 '<div><p class="sig-kicker">'+tr('ჩვენი საქმიანობა','OUR PRACTICE')+'</p>'+
 '<h2 id="services-heading" data-en="Legal expertise for technology-led businesses.">იურიდიული მომსახურება ტექნოლოგიურ ბიზნესთან დაკავშირებულ საკითხებზე.</h2></div>'+
 tr('ვმუშაობთ იმ სამართლებრივ საკითხებზე, რომლებიც გავლენას ახდენს ტექნოლოგიური პროდუქტების განვითარებაზე, კომერციულ შეთანხმებებსა და პასუხისმგებლობის მართვაზე.',
 'We advise on the legal questions behind technology products, commercial arrangements and responsible business operations.','p')+
 '</div><div class="sig-service-list">'+rows+'</div>'+
 '<div class="sig-services-footer"><a href="/services/" class="sig-underlink" data-site-link>'+
 tr('ყველა მომსახურების ნახვა','View all practice areas')+'<span aria-hidden="true">↗</span></a>'+
 '<span data-en="Related expertise includes software IP, FinTech, cybersecurity and ongoing legal counsel.">დაკავშირებული მიმართულებებია პროგრამული უზრუნველყოფის ინტელექტუალური საკუთრება, ფინტექი, კიბერუსაფრთხოების სამართალი და მიმდინარე იურიდიული მხარდაჭერა.</span>'+
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
      '<h2 id="business-heading" data-en="The right advice at the right moment.">იურიდიული მხარდაჭერა, როცა ის ყველაზე მეტად გჭირდებათ.</h2></div>'+
   '<div class="sig-audience-list">'+links+'</div>'+
   '<a class="sig-underlink" href="/business/" data-site-link>'+tr('ვის ვეხმარებით','Who we work with')+'<span aria-hidden="true">↗</span></a>'+
  '</div></section>';
}
