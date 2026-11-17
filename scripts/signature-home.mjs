import {tr} from './portfolio-templates.mjs';

const practices = [
 {key:'ai',num:'01',ka:'ხელოვნური ინტელექტის სამართალი და მმართველობა',en:'AI Law & Governance',
  leadKa:'AI-ის უსაფრთხოდ და პასუხისმგებლობით გამოყენებისთვის საჭირო სამართლებრივი წესები.',leadEn:'Legal advice for accountable development, procurement and use of AI.',
  pointsKa:['AI-ის გამოყენების პოლიტიკა და რისკების შეფასება','ალგორითმული გადაწყვეტილებები და ადამიანური ზედამხედველობა','EU AI Act-ის გავრცელების შეფასება'],
  pointsEn:['AI policies and legal risk reviews','Algorithmic decision-making and human oversight','Assessment of EU AI Act scope'],link:'/services/ai/'},
 {key:'data',num:'02',ka:'პერსონალურ მონაცემთა დაცვა',en:'Data Protection & Privacy',
  leadKa:'მონაცემთა დამუშავება, კონფიდენციალურობა და საზღვარგარეთ მონაცემების გადაცემა.',leadEn:'Privacy obligations across processing, suppliers and international transfers.',
  pointsKa:['შესაბამისობის შეფასება, DPIA და DPO','კონფიდენციალურობის დოკუმენტები და DPA','მონაცემთა ინციდენტებზე სამართლებრივი რეაგირება'],
  pointsEn:['Compliance reviews, DPIA and DPO support','Privacy notices and processing agreements','Legal response to data incidents'],link:'/services/data-protection/'},
 {key:'contracts',num:'03',ka:'ტექნოლოგიური და კომერციული ხელშეკრულებები',en:'Technology & Commercial Contracts',
  leadKa:'კომერციულად გამართული პირობები პროგრამული უზრუნველყოფის, SaaS-ისა და IT მომსახურებისთვის.',leadEn:'Commercial terms for software, SaaS, outsourcing and technology procurement.',
  pointsKa:['SaaS, SaaS Terms, SLA და Cloud agreements','ლიცენზირება, აუთსორსინგი და IP პირობები','ხელშეკრულების მოლაპარაკება და რისკების შეფასება'],
  pointsEn:['SaaS terms, SLAs and cloud agreements','Licensing, outsourcing and IP provisions','Negotiation and contractual risk review'],link:'/services/contracts/'},
 {key:'product',num:'04',ka:'ციფრული პროდუქტები და ელექტრონული კომერცია',en:'Digital Products & E-commerce',
  leadKa:'პროდუქტის გაშვების, ონლაინ მომსახურებისა და პლატფორმის მომხმარებლებთან ურთიერთობის სამართალი.',leadEn:'Launch, operate and grow online products with appropriate terms and compliance.',
  pointsKa:['Terms of Service, გამოწერები და დაბრუნება','მომხმარებელთა უფლებები და პლატფორმის წესები','ელექტრონული კონტრაქტები და ციფრული რეკლამა'],
  pointsEn:['Terms of Service, subscriptions and refunds','Consumer protection and platform rules','E-contracts and digital advertising'],link:'/services/digital-products/'},
 {key:'ip',num:'05',ka:'პროგრამული უზრუნველყოფა და ინტელექტუალური საკუთრება',en:'Software & Intellectual Property',
  leadKa:'პროგრამულ კოდზე, ციფრულ აქტივებსა და ბრენდზე უფლებების დაცვა.',leadEn:'Clear ownership and licensing of code, software and digital assets.',
  pointsKa:['IP assignment და ლიცენზირებისა დოკუმენტები','პროგრამულ კოდზე უფლებები და Open Source','ბრენდი, სასაქონლო ნიშნები და ტექნოლოგიური აქტივები'],
  pointsEn:['IP assignments and licensing documents','Software ownership and open-source compliance','Brand protection and technology assets'],link:'/services/intellectual-property/'},
 {key:'cyber',num:'06',ka:'კიბერუსაფრთხოების სამართლებრივი საკითხები',en:'Cybersecurity & Digital Risk',
  leadKa:'ციფრული ინციდენტების, ინფორმაციული უსაფრთხოებისა და მიმწოდებლების პასუხისმგებლობის სამართლებრივი მართვა.',leadEn:'Legal responsibilities around cyber incidents, information security and suppliers.',
  pointsKa:['სექტორული მოთხოვნები და უსაფრთხოების პოლიტიკები','ინციდენტზე რეაგირების სამართლებრივი გეგმა','კონტრაქტებში უსაფრთხოებისა და პასუხისმგებლობის პირობები'],
  pointsEn:['Sectoral requirements and security policies','Legal incident-response planning','Security and liability clauses'],link:'/services/cyber-digital-risk/'},
 {key:'fintech',num:'07',ka:'ფინტექი და ციფრული აქტივები',en:'FinTech & Digital Assets',
  leadKa:'საგადახდო მომსახურებებისა და ვირტუალური აქტივების ბიზნესმოდელების სამართლებრივი შეფასება.',leadEn:'Regulatory advice for payments and virtual-asset business models.',
  pointsKa:['საგადახდო მომსახურების რეგულირება','VASP-ის რეგისტრაციის საჭიროების შეფასება','ფინანსური პარტნიორობის ხელშეკრულებები'],
  pointsEn:['Payment-services regulation','VASP registration perimeter review','Financial partnership agreements'],link:'/services/fintech/'},
 {key:'startup',num:'08',ka:'სტარტაპები, ინვესტიციები და საერთაშორისო ბიზნესი',en:'Startups, Investment & Cross-border Business',
  leadKa:'ტექნოლოგიური კომპანიის დაფუძნება, დამფუძნებლების ურთიერთობა და ინვესტიციისთვის მზადყოფნა.',leadEn:'Legal foundations for founders, investment and international expansion.',
  pointsKa:['დამფუძნებლების შეთანხმებები და vesting','IP-ის კუთვნილება და საინვესტიციო დოკუმენტები','საქართველოში ბაზარზე შესვლა და საერთაშორისო კონტრაქტები'],
  pointsEn:['Founder agreements and vesting','IP ownership and investment documentation','Georgia market entry and cross-border contracts'],link:'/services/startups-investment/'}
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
 '<h2 id="services-heading" data-en="Focused legal advice across the digital economy.">სამართლებრივი მომსახურება ციფრული ეკონომიკისთვის.</h2></div>'+
 tr('AI-ის რეგულირებიდან ტექნოლოგიურ ხელშეკრულებებამდე: სპეციალიზებული მომსახურება კომპანიებისთვის, სტარტაპებისა და საერთაშორისო ბიზნესისთვის.',
 'From AI regulation to technology contracts: specialist advice for companies, founders and international businesses.','p')+
 '</div><div class="sig-service-list">'+rows+'</div>'+
 '<div class="sig-services-footer"><a href="/services/" class="sig-underlink" data-site-link>'+
 tr('ყველა მომსახურების ნახვა','View all practice areas')+'<span aria-hidden="true">↗</span></a>'+
 '<span data-en="Additional services include VASP regulation, Legal Operations and ongoing technology legal counsel.">დამატებითი მიმართულებებია VASP-ის რეგულირება, იურიდიული პროცესების მართვა და მუდმივი იურიდიული მხარდაჭერა.</span>'+
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
