import fs from 'node:fs';
import path from 'node:path';
import {tr,escape} from './portfolio-templates.mjs';

const text=(ka,en,tag='p',cls='')=>tr(ka,en,tag,cls);
const link=(url,ka,en,cls='button button-secondary')=>`<a class="${cls}" href="${url}">${tr(ka,en)} <span aria-hidden="true">↗</span></a>`;
const fields=[
  [
    "inventory",
    "სისტემების აღრიცხვა",
    "AI inventory",
    "აღრიცხავთ, რომელ AI სისტემებს იყენებენ თქვენს კომპანიაში და რა მიზნით?",
    "Do you know which AI systems your organisation uses and why?",
    "მაგალითად, გაქვთ AI ინსტრუმენტების სია და იცით, რომელი გუნდი რა მიზნით იყენებს თითოეულ მათგანს?",
    "For example, you maintain a list of tools and know which teams use them and why.",
    "შეადგინეთ კომპანიაში გამოყენებული AI სისტემების სია და მიუთითეთ მათი დანიშნულება და პასუხისმგებელი პირები.",
    "Create an inventory of AI systems, their purposes and responsible owners."
  ],
  [
    "policy",
    "გამოყენების წესები",
    "AI use policy",
    "განსაზღვრული გაქვთ, რა მიზნით და რა პირობებით შეუძლიათ თანამშრომლებს AI-ის გამოყენება?",
    "Have you defined permitted employee uses of AI and applicable restrictions?",
    "მაგალითად, იციან თანამშრომლებმა, რა სახის ინფორმაციის შეყვანა ეკრძალებათ საჯაროდ ხელმისაწვდომ AI სისტემებში?",
    "For example, do employees know which information must not be entered into public AI tools?",
    "შეიმუშავეთ AI-ის გამოყენების შიდა წესები და გააცანით თანამშრომლებს.",
    "Develop and communicate internal rules for AI use."
  ],
  [
    "risk",
    "რისკების შეფასება",
    "Risk assessment",
    "აფასებთ AI-ის გამოყენებასთან დაკავშირებულ რისკებს ახალი სისტემის დანერგვამდე?",
    "Do you assess AI-related risks before deploying a new system?",
    "მაგალითად, აფასებთ შეცდომის, დისკრიმინაციისა და ადამიანებისთვის ან ბიზნესისთვის ზიანის მიყენების რისკს?",
    "Consider errors, discrimination, business impact and potential harm.",
    "განსაზღვრეთ AI სისტემის დანერგვამდე რისკების შეფასებისა და შემდგომ მათი პერიოდული გადახედვის წესი.",
    "Establish a pre-deployment risk assessment and periodic review process."
  ],
  [
    "data",
    "მონაცემთა დაცვა",
    "Data protection",
    "ამოწმებთ, კანონიერად და უსაფრთხოდ მუშავდება თუ არა მონაცემები AI სისტემებში?",
    "Do you review whether data in AI systems is processed lawfully and securely?",
    "მაგალითად, იცით, რა პერსონალური და კონფიდენციალური ინფორმაცია მუშავდება და ვის აქვს მასზე წვდომა?",
    "Consider personal data, confidential information and access controls.",
    "შეამოწმეთ მონაცემთა დამუშავების სამართლებრივი საფუძვლები და მონაცემთა დაცვისა და უსაფრთხოების ზომები.",
    "Review legal bases, security and confidentiality of data processing."
  ],
  [
    "supplier",
    "მომწოდებლების შეფასება",
    "Supplier review",
    "AI ინსტრუმენტის შერჩევისას ამოწმებთ მომწოდებლის ხელშეკრულებასა და მონაცემთა გამოყენების პირობებს?",
    "When selecting AI tools, do you review supplier contracts and data use terms?",
    "მაგალითად, იცით, ვინ ინახავს მონაცემებს და იყენებს თუ არა მათ AI მოდელის წვრთნისთვის?",
    "For example, who stores the data and may it be used for model training?",
    "შეამოწმეთ მომწოდებლის სახელშეკრულებო პირობები, მათ შორის მონაცემთა გამოყენებისა და პასუხისმგებლობის განაწილების შესახებ.",
    "Review supplier terms, data use and allocation of liability."
  ],
  [
    "oversight",
    "ადამიანის ზედამხედველობა",
    "Human oversight",
    "განსაზღვრული გაქვთ, ვინ ამოწმებს AI-ის შედეგებს და როგორ უნდა გამოსწორდეს შეცდომა?",
    "Have you defined who reviews AI outputs and how errors are corrected?",
    "მაგალითად, ვინ ამოწმებს AI-ის შედეგებს, როდესაც მათ ადამიანებზე ან მნიშვნელოვან გადაწყვეტილებებზე შეიძლება გავლენა მოახდინონ?",
    "Especially when AI outputs affect people or significant decisions.",
    "განსაზღვრეთ ადამიანის ზედამხედველობის, შედეგების გადამოწმებისა და შეცდომების გასწორების წესები.",
    "Define human oversight, output verification and error correction procedures."
  ],
  [
    "training",
    "თანამშრომელთა სწავლება",
    "Staff training",
    "ასწავლით თანამშრომლებს AI-ის უსაფრთხოდ და პასუხისმგებლობით გამოყენებას მათი სამუშაოს სპეციფიკის გათვალისწინებით?",
    "Do staff receive training on safe, responsible AI use relevant to their roles?",
    "მაგალითად, როგორ გადაამოწმონ AI-ის პასუხები, დაიცვან მონაცემები და გაითვალისწინონ სისტემის შეზღუდვები.",
    "For example, how to verify outputs, protect data and recognise system limitations.",
    "დაგეგმეთ თანამშრომელთა ფუნქციებზე მორგებული პრაქტიკული სწავლება.",
    "Plan practical, role-specific AI training."
  ],
  [
    "monitoring",
    "ინციდენტები და მონიტორინგი",
    "Incidents and monitoring",
    "განსაზღვრული გაქვთ, როგორ უნდა აღირიცხოს AI-ის გამოყენებისას გამოვლენილი პრობლემა და ვინ უნდა იმოქმედოს მის მოსაგვარებლად?",
    "Do you have a process for recording AI-related issues and assigning responsibility for response?",
    "მაგალითად, რა უნდა გააკეთოს თანამშრომელმა, თუ აღმოაჩენს AI-ის შეცდომას ან მონაცემთა გაჟონვას?",
    "For example, when errors, data leaks or problematic outputs are identified.",
    "განსაზღვრეთ ინციდენტების აღრიცხვისა და მათზე რეაგირების წესი. პერიოდულად შეაფასეთ AI სისტემების მუშაობა.",
    "Establish incident reporting, response and periodic review procedures."
  ]
];
const page=(headingKa,headingEn,introKa,introEn,inner)=>`<main id="main" class="container article-page dlg-client-page"><header class="dlg-client-head">${text('Digital Law Georgia','Digital Law Georgia','p','eyebrow')}<h1>${tr(headingKa,headingEn)}</h1>${text(introKa,introEn,'p','dlg-client-lead')}</header>${inner}</main>`;
const actions=(items)=>`<div class="dlg-client-actions">${items.join('')}</div>`;
const toolIcon=(name)=>`<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${name==='calendar'?'<rect x="4" y="7" width="24" height="21" rx="2"/><path d="M4 13h24M10 4v6m12-6v6m-11 10 3 3 7-7"/>':name==='news'?'<rect x="5" y="5" width="22" height="22" rx="2"/><path d="M10 11h12m-12 5h12m-12 5h8"/>':'<rect x="7" y="7" width="18" height="18" rx="3"/><path d="M12 2v5m8-5v5m-8 18v5m8-5v5M2 12h5m-5 8h5m18-8h5m-5 8h5m-13-3 3 3 5-6"/>'}</svg>`;
export function clientToolsHome(){
 return `<section class="section dlg-client-home" id="business-tools" aria-labelledby="dlg-client-tools-heading"><div class="wrap"><div class="section-head dlg-tools-head"><div>${tr('პრაქტიკული ინსტრუმენტები','PRACTICAL TOOLS','p','dlg-tools-kicker')}<h2 id="dlg-client-tools-heading">${tr('რესურსები თქვენი ბიზნესისთვის','Resources for your business')}</h2></div>${tr('შეაფასეთ თქვენი კომპანიის საჭიროებები და გაეცანით პრაქტიკულ რეკომენდაციებს.','Assess your needs and plan the next step.','p','dlg-tools-intro')}</div><div class="dlg-tools-layout"><article class="dlg-assessment-feature"><div class="dlg-assessment-feature-copy"><span class="dlg-tool-eyebrow">${toolIcon('assessment')}${tr('უფასო შეფასება','FREE SELF-ASSESSMENT')}</span><h3>${tr('რამდენად მზად არის თქვენი კომპანია ხელოვნური ინტელექტის გამოსაყენებლად?','How prepared is your business for responsible AI use?')}</h3>${tr('უპასუხეთ 8 კითხვას, შეაფასეთ თქვენს კომპანიაში AI-ის გამოყენების პრაქტიკა და მიიღეთ რეკომენდაციები.','Answer eight questions and identify areas of AI governance that need attention.','p')}<div class="dlg-feature-meta"><span>${tr('8 კითხვა','8 questions')}</span><span>${tr('დაახლოებით 3 წუთი','Approx. 3 minutes')}</span><span>${tr('რეგისტრაციის გარეშე','No registration')}</span></div><a class="dlg-tool-cta" href="/advisory/assessment/">${tr('დაიწყეთ შეფასება','Start self-assessment')} <span aria-hidden="true">↗</span></a></div><div class="dlg-assessment-visual" aria-hidden="true"><svg viewBox="0 0 200 200" fill="none" focusable="false"><circle cx="100" cy="100" r="77" stroke="#90afc0" stroke-opacity=".35"/><circle cx="100" cy="100" r="58" stroke="#c5d9e2" stroke-opacity=".5" stroke-dasharray="2 6"/><g stroke="#b4d2de" stroke-width="3" stroke-linecap="round"><path d="M100 18v19m0 126v19M18 100h19m126 0h19M42 42l13 13m90 90 13 13M42 158l13-13m90-90 13-13"/></g><g fill="#d7c29c">${Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<circle cx="${100+77*Math.sin(a)}" cy="${100-77*Math.cos(a)}" r="3.5"/>`;}).join('')}</g><rect x="65" y="65" width="70" height="70" rx="8" stroke="#c4dce6" stroke-width="1.5"/><path d="m82 100 13 13 24-28" stroke="#e4d4b5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div></article><article class="dlg-tool-consult"><div class="dlg-tool-icon">${toolIcon('calendar')}</div><h3>${tr('განვიხილოთ თქვენი საკითხი','Discuss your matter')}</h3>${tr('აირჩიეთ საკონსულტაციო საკითხი და შეხვედრის სასურველი დრო.','Request a meeting and select your preferred time.','p')}<a class="dlg-tool-link" href="/contact/consultation/">${tr('კონსულტაციის მოთხოვნა','Request a consultation')} <span aria-hidden="true">↗</span></a></article></div></div></section>`;
}
export function clientToolsUpdates(){
 return `<aside class="dlg-insight-subscribe"><div class="dlg-tool-icon">${toolIcon('news')}</div><div><h3>${tr('სამართლებრივი სიახლეები','Legal updates')}</h3>${tr('გაეცანით ახალ პუბლიკაციებსა და პრაქტიკულ გზამკვლევებს ერთ სივრცეში.','Explore new publications and practical guides in one place.','p')}</div><a class="dlg-tool-link" href="/resources/legal-updates/">${tr('სიახლეების ნახვა','Explore legal updates')} <span aria-hidden="true">↗</span></a></aside>`;
}
export function clientToolsPrompt(){
 return `<aside id="dlg-readiness-prompt" class="dlg-readiness-prompt" hidden aria-labelledby="dlg-prompt-heading"><button class="dlg-prompt-close" type="button" aria-label="შეთავაზების დახურვა" data-en-aria="Dismiss suggestion"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div class="dlg-prompt-label">${toolIcon('assessment')}${tr('უფასო ინსტრუმენტი','FREE TOOL')}</div><h2 id="dlg-prompt-heading">${tr('მზად არის თქვენი კომპანია AI-ის გამოსაყენებლად?','Assess your company’s AI readiness')}</h2>${tr('8 კითხვა, დაახლოებით 3 წუთი. რეგისტრაცია არ გჭირდებათ.','8 questions, approximately 3 minutes. No registration required.','p')}<a class="dlg-tool-cta" href="/advisory/assessment/">${tr('დაიწყეთ შეფასება','Start self-assessment')} <span aria-hidden="true">↗</span></a></aside><script src="/dlg-resource-prompt.js?v=20261128-tools2" defer></script>`;
}
export function buildClientTools({out,shell,rows,siteUrl}){
 const assessment=page('AI-ის გამოყენებისთვის მზადყოფნის შეფასება','AI readiness self-assessment','შეაფასეთ, რამდენად მზად არის თქვენი კომპანია ხელოვნური ინტელექტის (AI) უსაფრთხოდ და პასუხისმგებლობით გამოსაყენებლად.','Identify how well your organisation has established core arrangements for responsible AI use.',`
 <div class="dlg-readiness-intro"><div class="dlg-readiness-intro-icon">${toolIcon('assessment')}</div><div><h2>${tr('როგორ მიმდინარეობს შეფასება?','How does the assessment work?')}</h2>${text('უპასუხეთ 8 კითხვას იმის მიხედვით, თუ რა წესები და პროცედურები მოქმედებს თქვენს კომპანიაში. თუ AI-ს ჯერ არ იყენებთ, გაითვალისწინეთ, როგორ ხართ მომზადებული მისი დანერგვისთვის. პასუხების საფუძველზე მიიღებთ შედეგებსა და რეკომენდაციებს.','Answer eight questions based on your organisation’s actual arrangements. If you do not yet use AI, assess your current preparedness. At the end, receive a summary and practical recommendations.')}</div><div class="dlg-feature-meta"><span>${tr('უფასო','Free')}</span><span>${tr('დაახლოებით 3 წუთი','Approx. 3 minutes')}</span><span>${tr('პასუხები არ ინახება','Answers are not stored')}</span></div></div>
 <form id="dlg-readiness-form" class="dlg-client-form" hidden>
 <div class="dlg-readiness-progress"><div class="dlg-readiness-progress-top"><p id="dlg-readiness-step" aria-live="polite">${tr('კითხვა 1 / 8','Question 1 / 8')}</p><span id="dlg-readiness-answered">${tr('პასუხები: 0 / 8','Answered: 0 / 8')}</span></div><progress id="dlg-readiness-progress" max="8" value="0" aria-label="შეფასების პროგრესი" data-en-aria="Assessment progress"></progress></div>
 ${fields.map(([id,category,categoryEn,ka,en,hintKa,hintEn,tipKa,tipEn],i)=>`<fieldset class="dlg-readiness-question" data-id="${id}"${i?' hidden':''}><legend tabindex="-1"><span class="dlg-readiness-category">${tr(category,categoryEn)}</span><span class="dlg-readiness-question-text">${tr(ka,en)}</span></legend>${text(hintKa,hintEn,'p','dlg-readiness-hint')}<div class="dlg-choice-group">${[['yes','დიახ, სრულად','Yes, fully','საჭირო წესები და პროცედურები მოქმედებს.','Fully defined and implemented.'],['partial','ნაწილობრივ','Partly','ეს საკითხი ნაწილობრივ გვაქვს მოწესრიგებული.','Some measures exist, but are not fully in place.'],['no','არა','Not yet','ეს საკითხი ჯერ არ გვაქვს მოწესრიგებული.','No measures in place yet.'],['unknown','არ ვიცი','Not sure','არ მაქვს საკმარისი ინფორმაცია.','I do not have enough information.']].map(([value,k,e,desc,descEn])=>`<label class="dlg-readiness-choice"><input type="radio" name="${id}" value="${value}" required><span class="dlg-choice-copy">${tr(k,e,'strong')}${tr(desc,descEn,'small')}</span></label>`).join('')}</div><p class="dlg-readiness-tip" hidden>${tr(tipKa,tipEn)}</p></fieldset>`).join('')}
 <p id="dlg-readiness-error" class="dlg-readiness-error" role="status"></p>
 <div class="dlg-client-actions dlg-readiness-navigation"><button type="button" id="dlg-readiness-back" class="button button-secondary" disabled>${tr('← წინა კითხვა','← Previous')}</button><button type="button" id="dlg-readiness-next" class="button button-primary">${tr('შემდეგი კითხვა →','Next question →')}</button><button type="submit" id="dlg-readiness-finish" class="button button-primary" hidden>${tr('შედეგების ნახვა →','View results →')}</button></div>
 </form><noscript>${text('შეფასების გასავლელად ჩართეთ JavaScript.','Enable JavaScript to use the self-assessment.')}</noscript>
 <section id="dlg-readiness-result" class="dlg-client-result dlg-readiness-result" hidden aria-labelledby="dlg-readiness-heading"><h2 id="dlg-readiness-heading" tabindex="-1">${tr('შეფასების შედეგები','Your self-assessment results')}</h2><p id="dlg-readiness-summary" role="status"></p><div class="dlg-readiness-counts">${[['yes','მოწესრიგებული','Implemented'],['partial','ნაწილობრივ','Partial'],['no','მოსაწესრიგებელი','Not in place'],['unknown','დასაზუსტებელი','To clarify']].map(([id,ka,en])=>`<div class="dlg-readiness-count" data-state="${id}"><strong data-answer-count="${id}">0</strong>${tr(ka,en)}</div>`).join('')}</div><h3>${tr('რეკომენდაციები','Recommended next steps')}</h3><ul id="dlg-readiness-priorities" class="dlg-readiness-priorities"></ul><div class="dlg-readiness-result-cta"><h3>${tr('გსურთ უფრო დეტალური შეფასება?','Would you like a more detailed assessment?')}</h3>${text('დაგეხმარებით AI-ის გამოყენებასთან დაკავშირებული სამართლებრივი და ორგანიზაციული საკითხების შეფასებაში, თქვენი ბიზნესის საჭიროებების გათვალისწინებით.','We can help assess the legal and organisational issues relevant to your business and AI systems.')}${actions([link('/contact/consultation/','მოითხოვეთ კონსულტაცია','Request a consultation','button button-primary'),link('/advisory/ai-governance-implementation/','AI-ის მართვის მომსახურება','AI governance services')])}</div><div class="dlg-client-actions"><button type="button" id="dlg-readiness-review" class="button button-secondary">${tr('პასუხების გადახედვა','Review answers')}</button><button type="button" id="dlg-readiness-restart" class="button button-secondary">${tr('თავიდან დაწყება','Start again')}</button></div></section>
 <aside class="dlg-readiness-disclaimer">${text('შეფასება ეფუძნება თქვენს მიერ გაცემულ პასუხებს და საინფორმაციო ხასიათისაა. ის არ ცვლის სამართლებრივ კონსულტაციას, არ ადგენს სამართლებრივ მოთხოვნებთან შესაბამისობას და არ განსაზღვრავს AI სისტემის რისკის კატეგორიას. თქვენი პასუხები სერვერზე არ იგზავნება და ვებსაიტი მათ არ ინახავს.','This informational self-assessment is based on your answers. It is not legal advice or a formal compliance or risk classification assessment. Answers remain on your device; they are not sent to a server or retained after closing the page.')}</aside>`);
 const consultation=page('მოითხოვეთ კონსულტაცია','Request a consultation','აირჩიეთ საკონსულტაციო საკითხი და შეხვედრის სასურველი დრო. შეხვედრა შეთანხმებულად ჩაითვლება მხოლოდ ჩვენი წერილობითი დადასტურების შემდეგ.','Choose the matter and preferred meeting time. A meeting is confirmed only once we confirm it in writing.',`
 <div class="dlg-client-note">${text('არ გაამჟღავნოთ კონფიდენციალური ინფორმაცია და ნუ დაურთავთ დოკუმენტებს. ფორმა დაგეხმარებათ წერილის მომზადებაში, რომელსაც თავად გაგზავნით.','Do not include confidential information, documents or matter details. This form prepares an email on your device. You decide whether to send it.')} ${link('/privacy/','კონფიდენციალურობის პოლიტიკა','Privacy notice','text-link')}</div>
 <form id="dlg-consultation-form" class="dlg-client-form" hidden><div class="dlg-field-grid">
 <label>${tr('სახელი და გვარი','Full name')}<input name="name" autocomplete="name" maxlength="100" required></label>
 <label>${tr('სამუშაო ელფოსტა','Work email')}<input name="email" type="email" autocomplete="email" maxlength="150" required></label>
 <label>${tr('ორგანიზაცია (არასავალდებულო)','Organisation (optional)')}<input name="company" autocomplete="organization" maxlength="100"></label>
 <label>${tr('მიმართულება','Matter')}<select name="matter" required><option value="">${tr('აირჩიეთ','Select')}</option>${[['ai','AI-ის მართვა','AI governance'],['contracts','ტექნოლოგიური ხელშეკრულებები','Technology contracts'],['privacy','მონაცემთა დაცვა','Data protection'],['market','საქართველოში საქმიანობა','Georgia market entry'],['counsel','მუდმივი იურიდიული მხარდაჭერა','Ongoing counsel'],['other','სხვა','Other']].map(([v,k,e])=>`<option value="${v}" data-en="${escape(e)}">${escape(k)}</option>`).join('')}</select></label>
 <label>${tr('სასურველი თარიღი','Preferred date')}<input name="date" type="date" required></label><label>${tr('სასურველი დრო (თბილისის დროით)','Preferred time (Tbilisi time)')}<input name="time" type="time" required></label>
 </div><label class="dlg-consult-agree"><input type="checkbox" name="ack" required> ${tr('ვადასტურებ, რომ წერილი არ შეიცავს კონფიდენციალურ ინფორმაციას და შეხვედრის დრო ჯერ არ არის შეთანხმებული.','I understand the meeting is not booked yet and the email contains no confidential information.')}</label>
 <button type="submit" class="button button-primary">${tr('მოთხოვნის მომზადება','Prepare request')}</button></form>
 <noscript>${text('მოთხოვნისთვის მოგვწერეთ ელფოსტაზე.','Please email us to request a consultation.')}</noscript><section class="dlg-client-result" id="dlg-consultation-result" hidden aria-labelledby="dlg-consultation-heading"><h2 id="dlg-consultation-heading" tabindex="-1">${tr('წერილი მზადაა','Your draft is ready')}</h2>${text('გაგზავნამდე გადაამოწმეთ ტექსტი. მოთხოვნა ჯერ არ გაგზავნილა.','Review your draft before sending. No request has been sent.')}<textarea id="dlg-consultation-draft" rows="9" readonly aria-label="მოთხოვნის ტექსტი" data-en-aria="Request draft"></textarea><div class="dlg-client-actions"><a id="dlg-consultation-email" class="button button-primary" href="mailto:digitallawgeorgia@gmail.com">${tr('ელფოსტის გახსნა','Open email')}</a><button type="button" id="dlg-consultation-copy" class="button button-secondary">${tr('ტექსტის კოპირება','Copy text')}</button><span id="dlg-consultation-status" role="status"></span></div></section>
 ${actions([link('/contact/','კონტაქტის სხვა გზები','Other contact options')])}`);
 const updates=page('სამართლებრივი სიახლეები','Legal updates','მიიღეთ ინფორმაცია ახალი პრაქტიკული გზამკვლევებისა და პუბლიკაციების შესახებ.','Follow new practical guides and publications.',`
 <div class="dlg-client-note"><h2>${tr('RSS არხი','RSS feed')}</h2>${text('RSS არხით შეგიძლიათ თვალი ადევნოთ ახალ პუბლიკაციებს. დაამატეთ ჩვენი არხი სასურველ RSS აპლიკაციაში. რეგისტრაცია არ გჭირდებათ. ელფოსტით გამოწერა ჯერ არ არის ხელმისაწვდომი.','Add the feed to your preferred RSS reader. No registration or personal data is required. Automated email subscriptions are not available at present.')}${actions([link('/legal-updates.xml','ქართული RSS არხი','Georgian RSS feed','button button-primary'),link('/legal-updates-en.xml','English RSS','English RSS')])}</div><h2>${tr('ბოლო პუბლიკაციები','Latest publications')}</h2><ul class="dlg-update-list">${rows.map(r=>`<li><a href="/resources/${r.slug}/">${tr(r.title,r.title_en)}</a><time datetime="${escape(r.date)}">${escape(r.date)}</time></li>`).join('')}</ul>${actions([link('/resources/','ყველა სტატია','All insights')])}`);
 const pages=[
 ['/advisory/assessment/','AI-ის გამოყენებისთვის მზადყოფნის შეფასება','AI readiness self-assessment','შეაფასეთ თქვენი კომპანიის მზადყოფნა ხელოვნური ინტელექტის უსაფრთხოდ და პასუხისმგებლობით გამოსაყენებლად.','Initial AI governance self-assessment for businesses.',assessment],
 ['/contact/consultation/','კონსულტაციის მოთხოვნა','Request a consultation','აირჩიეთ საკითხი და თქვენთვის სასურველი დრო კონსულტაციის მოთხოვნისთვის.','Prepare a consultation request for Digital Law Georgia.',consultation],
 ['/resources/legal-updates/','სამართლებრივი სიახლეები','Legal updates','ახალი პუბლიკაციები და RSS არხი.','New publications and RSS feeds.',updates]
 ];
 for(const [url,title,title_en,summary,summary_en,content] of pages){const dest=path.join(out,url,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,shell({title,title_en,summary,summary_en,url,content}));}
 const x=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 for(const lang of ['ka','en']){const prefix=lang==='en'?'/en':'',name=lang==='en'?'Digital Law Georgia — Legal updates':'Digital Law Georgia — სამართლებრივი სიახლეები';const feed=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(name)}</title><link>${x(siteUrl+prefix+'/resources/')}</link><description>${x(name)}</description><language>${lang}</language>${rows.map(r=>{const url=siteUrl+prefix+'/resources/'+r.slug+'/';return `<item><title>${x(lang==='en'?r.title_en:r.title)}</title><link>${x(url)}</link><guid isPermaLink="true">${x(url)}</guid><description>${x(lang==='en'?r.summary_en:r.summary)}</description><pubDate>${new Date(r.date+'T00:00:00Z').toUTCString()}</pubDate></item>`}).join('')}</channel></rss>`;fs.writeFileSync(path.join(out,lang==='en'?'legal-updates-en.xml':'legal-updates.xml'),feed);}
}
