import {tr,arrow} from './portfolio-templates.mjs';

const coreServices = [
  {
    href:'/services/contracts/',
    ka:'ტექნოლოგიური და კომერციული ხელშეკრულებები',
    en:'Technology & Commercial Contracts',
    descKa:'პროგრამული უზრუნველყოფა, SaaS, IT მომსახურება, ლიცენზირება და კომერციული გარიგებები.',
    descEn:'Software, SaaS, IT services, licensing and commercial transactions.'
  },
  {
    href:'/services/data-protection/',
    ka:'პერსონალურ მონაცემთა დაცვა',
    en:'Data Protection & Privacy',
    descKa:'მონაცემთა დამუშავების წესები, ხელშეკრულებები, შიდა პროცესები და სამართლებრივ მოთხოვნებთან შესაბამისობა.',
    descEn:'Data processing, contracts, internal processes and compliance with applicable legal requirements.'
  },
  {
    href:'/services/ai/',
    ka:'AI-ის სამართლებრივი რეგულირება და რისკების მართვა',
    en:'AI Regulation & Risk Management',
    descKa:'AI-ის გამოყენება, შესყიდვა და დანერგვა — პასუხისმგებლობა, კონტრაქტები და სამართლებრივი რისკები.',
    descEn:'AI use, procurement and deployment — responsibilities, contracts and legal risks.'
  },
  {
    href:'/business/',
    ka:'კორპორაციული და საერთაშორისო ბიზნესი',
    en:'Corporate & Cross-border Business',
    descKa:'საქართველოში საქმიანობა, პარტნიორული ურთიერთობები და საერთაშორისო კომერციული თანამშრომლობა.',
    descEn:'Doing business in Georgia, commercial partnerships and international transactions.'
  }
];

const situations = [
  {
    href:'/services/digital-products/',
    titleKa:'ციფრულ პროდუქტს ქმნით ან უშვებთ?',
    titleEn:'Building or launching a digital product?',
    bodyKa:'დოკუმენტების, მომხმარებელთან ურთიერთობისა და სამართლებრივი რისკების მოწესრიგება.',
    bodyEn:'Structure the contracts, customer terms and legal risks around your product.'
  },
  {
    href:'/services/contracts/',
    titleKa:'ხელშეკრულებას აფორმებთ ან მოლაპარაკებას აწარმოებთ?',
    titleEn:'Negotiating or signing an agreement?',
    bodyKa:'გარიგების პირობების შემოწმება, მოლაპარაკების მხარდაჭერა და პასუხისმგებლობის გამიჯვნა.',
    bodyEn:'Review commercial terms, support negotiations and clarify risk allocation.'
  },
  {
    href:'/business/',
    titleKa:'ბიზნესს აფართოებთ საქართველოში ან მის ფარგლებს გარეთ?',
    titleEn:'Expanding in Georgia or across borders?',
    bodyKa:'კორპორაციული საკითხები, პარტნიორული შეთანხმებები და საერთაშორისო თანამშრომლობა.',
    bodyEn:'Corporate matters, partner arrangements and cross-border transactions.'
  }
];


export function founderEditorial(){
  return '<section class="law-section dlg-quiet-about" id="about" aria-labelledby="about-heading"><div class="container dlg-quiet-about-grid">'+
    '<div><p class="dlg-quiet-kicker">'+tr('ჩვენ შესახებ','ABOUT THE PRACTICE')+'</p>'+
      '<h2 id="about-heading" data-en="Experience you can speak to directly.">გამოცდილება და უშუალო თანამშრომლობა.</h2></div>'+
    '<div class="dlg-quiet-about-content">'+
      tr('Digital Law Georgia-ს დამფუძნებელია ლუკა შახყულაშვილი. საჯარო და კერძო სექტორში 7-წლიანი გამოცდილებით ის კომპანიებს ეხმარება კომერციულ და ტექნოლოგიურ სამართლებრივ საკითხებში.','Digital Law Georgia was founded by Luka Shakhkulashvili. With seven years of experience across the public and private sectors, he advises businesses on commercial and technology-related legal matters.','p')+
      tr('Queen Mary University of London-ის სამართლის მაგისტრი (Distinction), Chevening-ის სტიპენდიატი და IAPP-ის AIGP სერტიფიკატის მფლობელი.','LLM with Distinction from Queen Mary University of London, Chevening Scholar and IAPP AIGP certified.','p','dlg-quiet-credentials')+
      '<a class="dlg-quiet-text-link" href="/about/" data-site-link>'+tr('პროფესიული გამოცდილების ნახვა','Explore professional experience')+'<span aria-hidden="true">↗</span></a>'+
    '</div></div></section>';
}

export function editorialServices(){
  const topics=['contracts','privacy','ai','international'];
  const items=coreServices.map((item,i)=>({
    ...item,
    topic:topics[i],
    num:String(i+1).padStart(2,'0')
  }));
  const tabs=items.map((item,i)=>
    '<button class="dlg-photo-tab dlg-quiet-service-tab'+(i===0?' is-current':'')+'" type="button" data-hero-topic="'+item.topic+'" aria-pressed="'+(i===0?'true':'false')+'" aria-controls="dlg-photo-stage">'+
      '<span class="dlg-quiet-tab-num">'+item.num+'</span>'+
      tr(item.ka,item.en,'span','dlg-quiet-tab-name')+
    '</button>'
  ).join('');
  const slides=items.map((item,i)=>
    '<figure class="dlg-photo-slide dlg-quiet-service-slide'+(i===0?' is-current':'')+'" role="group" aria-roledescription="slide" aria-label="'+item.num+' / 04" data-hero-slide="'+item.topic+'"'+(i===0?'':' hidden')+'>'+
      '<figcaption class="dlg-quiet-service-copy">'+
        '<span class="dlg-quiet-slide-index">'+item.num+' / 04</span>'+
        tr(item.ka,item.en,'strong')+
        tr(item.descKa,item.descEn,'p')+
        '<a class="dlg-quiet-text-link" href="'+item.href+'" data-site-link>'+tr('მომსახურების დეტალები','Explore the service')+'<span aria-hidden="true">↗</span></a>'+
      '</figcaption>'+
    '</figure>'
  ).join('');
  return '<section class="law-section dlg-quiet-services" id="services" aria-labelledby="services-heading">'+
    '<div class="container"><div class="dlg-quiet-section-heading">'+
      '<p class="dlg-quiet-kicker">'+tr('მომსახურებები','SERVICES')+'</p>'+
      '<h2 id="services-heading" data-en="Focused legal support.">ძირითადი მიმართულებები</h2>'+
      tr('ჩვენი საქმიანობის ოთხი მთავარი მიმართულება. სხვა მომსახურებები და კონკრეტული შეთავაზებები წარმოდგენილია ცალკე გვერდებზე.','Four core areas of our practice. Other services and specific engagements are available on their dedicated pages.','p')+
    '</div>'+
    '<div class="dlg-quiet-selector" data-hero-rotator aria-roledescription="carousel" aria-label="სამართლებრივი მომსახურებების არჩევა" data-en-aria="Explore legal practice areas">'+
      '<div class="dlg-photo-tabs dlg-quiet-service-tabs" role="group" aria-label="აირჩიეთ სამართლებრივი მიმართულება" data-en-aria="Select a legal service">'+tabs+'</div>'+
      '<div class="dlg-quiet-service-main">'+
        '<div class="dlg-photo-stage" id="dlg-photo-stage" aria-live="off">'+slides+'</div>'+
        '<div class="dlg-quiet-service-controls">'+
          '<button class="dlg-quiet-arrow" type="button" data-hero-prev aria-label="წინა მიმართულება" data-en-aria="Previous service">←</button>'+
          '<button class="dlg-quiet-arrow" type="button" data-hero-next aria-label="შემდეგი მიმართულება" data-en-aria="Next service">→</button>'+
          '<div class="dlg-slider-dots" aria-hidden="true">'+items.map((x,i)=>'<span class="dlg-slider-dot'+(i===0?' is-current':'')+'" data-hero-dot="'+i+'"></span>').join('')+'</div>'+
          '<span class="dlg-photo-counter" data-hero-count aria-hidden="true">01 / 04</span>'+
          '<button class="dlg-photo-pause dlg-quiet-pause" type="button" data-hero-pause aria-pressed="false" aria-label="ავტომატური გადართვის შეჩერება"><span data-hero-pause-icon aria-hidden="true">Ⅱ</span></button>'+
        '</div>'+
      '</div>'+
      '<p class="law-visually-hidden" data-hero-announcement aria-live="polite" aria-atomic="true"></p>'+
    '</div>'+
    '<a class="dlg-quiet-text-link dlg-quiet-all-services" href="/services/" data-site-link>'+tr('ყველა მომსახურების ნახვა','View all services')+'<span aria-hidden="true">↗</span></a>'+
  '</div></section>';
}

export function editorialAudiences(){
  const items=situations.map((item,i)=>
    '<a class="dlg-editorial-situation" href="'+item.href+'" data-site-link>'+
      '<span class="dlg-editorial-index">0'+(i+1)+'</span>'+
      tr(item.titleKa,item.titleEn,'h3')+
      tr(item.bodyKa,item.bodyEn,'p')+
      '<span class="dlg-editorial-action">'+tr('გაიგეთ მეტი','Explore your options')+arrow+'</span>'+
    '</a>'
  ).join('');
  return '<section class="law-section dlg-editorial-audiences" id="business" aria-labelledby="business-heading">'+
    '<div class="container">'+
      '<div class="dlg-editorial-section-head"><div>'+
        '<p class="law-eyebrow">'+tr('თქვენი საჭიროებები','YOUR BUSINESS NEEDS')+'</p>'+
        '<h2 id="business-heading" data-en="Legal support when your business needs it">როცა ბიზნესს იურიდიული მხარდაჭერა სჭირდება</h2>'+
      '</div></div>'+
      '<div class="dlg-editorial-situations">'+items+'</div>'+
    '</div></section>';
}
