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

export function editorialServices(){
  const items=coreServices.map((item,i)=>
    '<a class="dlg-editorial-practice" href="'+item.href+'" data-site-link>'+
      '<span class="dlg-editorial-index">'+String(i+1).padStart(2,'0')+'</span>'+
      '<span class="dlg-editorial-practice-copy">'+tr(item.ka,item.en,'h3')+tr(item.descKa,item.descEn,'p')+'</span>'+
      '<span class="dlg-editorial-practice-arrow" aria-hidden="true">'+arrow+'</span>'+
    '</a>'
  ).join('');
  return '<section class="law-section dlg-editorial-services" id="services" aria-labelledby="services-heading">'+
    '<div class="container">'+
      '<div class="dlg-editorial-section-head">'+
        '<div><p class="law-eyebrow">'+tr('რას ვაკეთებთ','WHAT WE DO')+'</p>'+
          '<h2 id="services-heading" data-en="Focused legal advice for modern business">კონკრეტული სამართლებრივი დახმარება თქვენი ბიზნესისთვის</h2></div>'+
        tr('ხელშეკრულებიდან მონაცემთა დაცვამდე — ვმუშაობთ იმ საკითხებზე, რომლებიც ბიზნესის ყოველდღიურ გადაწყვეტილებებს განსაზღვრავს.','From contracts to data protection, we advise on legal questions that shape everyday business decisions.','p','dlg-editorial-section-intro')+
      '</div>'+
      '<div class="dlg-editorial-practices">'+items+'</div>'+
      '<a class="dlg-editorial-more" href="/services/" data-site-link>'+tr('ყველა მომსახურების ნახვა','Explore all services')+arrow+'</a>'+
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
        '<p class="law-eyebrow">'+tr('როდის დაგეხმარებით','WHEN TO CONTACT US')+'</p>'+
        '<h2 id="business-heading" data-en="Legal advice at the decisions that matter">როცა საქმეს სამართლებრივი გადაწყვეტა სჭირდება</h2>'+
      '</div></div>'+
      '<div class="dlg-editorial-situations">'+items+'</div>'+
    '</div></section>';
}
