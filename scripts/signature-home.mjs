import {tr} from './portfolio-templates.mjs';

import {practiceGroups,sectors,sectorCards} from './practice-structure.mjs';

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
 const rows=practiceGroups.map((p,i)=>
  '<article class="sig-service-row" id="practice-'+p.key+'">'+
  '<span class="sig-service-number">0'+(i+1)+' / 06</span>'+
  mark(p.icon)+
  '<div class="sig-service-copy">'+tr(p.name.ka,p.name.en,'h3')+tr(p.summary.ka,p.summary.en,'p')+'</div>'+
  '<div class="sig-service-detail"><a class="sig-underlink" href="/services/#area-'+p.key+'" data-site-link>'+
  tr('მიმართულების შესახებ','Explore this area')+'<span aria-hidden="true">↗</span></a></div>'+
  '</article>').join('');
 return '<section class="sig-services" id="services" aria-labelledby="services-heading"><div class="container">'+
  '<div class="sig-section-heading sig-section-heading-split">'+
  '<div><p class="sig-kicker">'+tr('მომსახურება','PRACTICE AREAS')+'</p>'+
  '<h2 id="services-heading" data-en="Our expertise">ჩვენი სპეციალიზაცია</h2></div>'+
  tr('ტექნოლოგიური და კომერციული სამართლის ექვსი ძირითადი მიმართულება.','Six core areas of technology and commercial law.','p')+'</div>'+
  '<div class="sig-service-list">'+rows+'</div>'+
  '<div class="sig-services-footer"><a href="/services/" class="sig-underlink" data-site-link>'+
   tr('მომსახურების სრული ჩამონათვალი','Explore all services')+'<span aria-hidden="true">↗</span></a>'+
   '<a href="/solutions/" class="sig-underlink" data-site-link>'+tr('მომსახურება კონკრეტული საკითხებისთვის','Focused legal services')+'<span aria-hidden="true">↗</span></a></div></div></section>';
}
export function signatureAudience(){
 return '<section class="sig-audience dlg-sector-section" id="business" aria-labelledby="business-heading"><div class="container">'+
 '<div class="sig-section-heading sig-section-heading-split"><div><p class="sig-kicker">'+tr('ბიზნესსექტორები','SECTORS')+'</p>'+
 '<h2 id="business-heading" data-en="Legal advice for your sector">იურიდიული მომსახურება თქვენი ბიზნესისთვის</h2></div>'+
 tr('გაეცანით თქვენი საქმიანობისთვის შესაბამის სამართლებრივ მიმართულებებს.','Explore the legal issues relevant to your business.','p')+'</div>'+
 '<div class="dlg-sector-grid">'+sectorCards()+'</div>'+
 '<a class="sig-underlink" href="/business/" data-site-link>'+tr('ყველა ბიზნესსექტორი','Explore all sectors')+'<span aria-hidden="true">↗</span></a></div></section>';
}
