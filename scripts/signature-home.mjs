import {tr} from './portfolio-templates.mjs';

import {practiceGroups,sectorCards} from './practice-structure.mjs';

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
  '<span class="sig-service-number">0'+(i+1)+'</span>'+
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
