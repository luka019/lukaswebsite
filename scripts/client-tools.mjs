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
 return `<aside class="dlg-assessment-feature dlg-assessment-inline" id="business-tools" aria-labelledby="dlg-client-tools-heading">
 <div class="dlg-assessment-inline-icon">${toolIcon('assessment')}</div><div class="dlg-assessment-feature-copy"><p class="dlg-tool-eyebrow">${tr('უფასო ინსტრუმენტი','FREE TOOL')}</p><h3 id="dlg-client-tools-heading">${tr('რამდენად მზად არის თქვენი კომპანია AI-ის გამოსაყენებლად?','How prepared is your business for responsible AI use?')}</h3>${tr('უპასუხეთ 8 კითხვას და მიიღეთ რეკომენდაციები თქვენს კომპანიაში AI-ის უსაფრთხოდ გამოყენების შესახებ.','Answer eight questions and receive practical recommendations for responsible AI use.','p')}<div class="dlg-feature-meta"><span>${tr('8 კითხვა','8 questions')}</span><span>${tr('დაახლოებით 3 წუთი','Approx. 3 minutes')}</span><span>${tr('რეგისტრაციის გარეშე','No registration')}</span></div></div><a class="dlg-tool-cta" href="/advisory/assessment/">${tr('დაიწყეთ შეფასება','Start assessment')} <span aria-hidden="true">↗</span></a></aside>`;
}
export function clientToolsUpdates(){
 return `<aside class="dlg-insight-subscribe" aria-label="სამართლებრივი სიახლეები" data-en-aria="Legal updates"><div class="dlg-tool-icon">${toolIcon('news')}</div><div><h3>${tr('თვალი ადევნეთ სამართლებრივ სიახლეებს','Stay informed about legal developments')}</h3>${tr('გაეცანით ახალ პუბლიკაციებს ან გამოიწერეთ განახლებები RSS-ით.','Read our latest publications or follow updates through RSS.','p')}</div><div class="dlg-news-actions"><a class="dlg-news-primary" href="/resources/legal-updates/">${tr('სიახლეების ნახვა','View updates')} <span aria-hidden="true">↗</span></a><a class="dlg-news-rss" href="/resources/legal-updates/#rss-subscribe"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8"/><circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none"/></svg>${tr('RSS-ით გამოწერა','Follow via RSS')}</a></div></aside>`;
}
export function clientToolsPrompt(){
 return `<aside id="dlg-readiness-prompt" class="dlg-readiness-prompt" hidden aria-labelledby="dlg-prompt-heading"><button class="dlg-prompt-close" type="button" aria-label="შეთავაზების დახურვა" data-en-aria="Dismiss suggestion"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div class="dlg-prompt-label">${toolIcon('assessment')}${tr('უფასო ინსტრუმენტი','FREE TOOL')}</div><h2 id="dlg-prompt-heading">${tr('მზად არის თქვენი კომპანია AI-ის გამოსაყენებლად?','Assess your company’s AI readiness')}</h2>${tr('8 კითხვა, დაახლოებით 3 წუთი. რეგისტრაცია არ გჭირდებათ.','8 questions, approximately 3 minutes. No registration required.','p')}<a class="dlg-tool-cta" href="/advisory/assessment/">${tr('დაიწყეთ შეფასება','Start assessment')} <span aria-hidden="true">↗</span></a></aside><script src="/dlg-resource-prompt.js?v=20261128-final" defer></script>`;
}
export function buildClientTools({out,shell,rows,siteUrl}){
 const assessment=page('კომპანიის მზადყოფნა AI-ის გამოსაყენებლად','AI readiness assessment','შეაფასეთ, რამდენად მზად არის თქვენი კომპანია ხელოვნური ინტელექტის (AI) უსაფრთხოდ და პასუხისმგებლობით გამოსაყენებლად.','Identify how well your organisation has established core arrangements for responsible AI use.',`
 <div class="dlg-readiness-intro"><div class="dlg-readiness-intro-icon">${toolIcon('assessment')}</div><div><h2>${tr('როგორ მიმდინარეობს შეფასება?','How does the assessment work?')}</h2>${text('უპასუხეთ 8 კითხვას იმის მიხედვით, თუ რა წესები და პროცედურები მოქმედებს თქვენს კომპანიაში. თუ AI-ს ჯერ არ იყენებთ, გაითვალისწინეთ, როგორ ხართ მომზადებული მისი დანერგვისთვის. პასუხების საფუძველზე მიიღებთ შედეგებსა და რეკომენდაციებს.','Answer eight questions based on your organisation’s actual arrangements. If you do not yet use AI, assess your current preparedness. At the end, receive a summary and practical recommendations.')}</div><div class="dlg-feature-meta"><span>${tr('უფასო','Free')}</span><span>${tr('დაახლოებით 3 წუთი','Approx. 3 minutes')}</span><span>${tr('პასუხები არ ინახება','Answers are not stored')}</span></div></div>
 <form id="dlg-readiness-form" class="dlg-client-form" hidden>
 <div class="dlg-readiness-progress"><div class="dlg-readiness-progress-top"><p id="dlg-readiness-step" aria-live="polite">${tr('კითხვა 1 / 8','Question 1 / 8')}</p><span id="dlg-readiness-answered">${tr('პასუხები: 0 / 8','Answered: 0 / 8')}</span></div><progress id="dlg-readiness-progress" max="8" value="0" aria-label="შეფასების პროგრესი" data-en-aria="Assessment progress"></progress></div>
 ${fields.map(([id,category,categoryEn,ka,en,hintKa,hintEn,tipKa,tipEn],i)=>`<fieldset class="dlg-readiness-question" data-id="${id}"${i?' hidden':''}><legend tabindex="-1"><span class="dlg-readiness-category">${tr(category,categoryEn)}</span><span class="dlg-readiness-question-text">${tr(ka,en)}</span></legend>${text(hintKa,hintEn,'p','dlg-readiness-hint')}<div class="dlg-choice-group">${[['yes','დიახ, სრულად','Yes, fully','საჭირო წესები და პროცედურები მოქმედებს.','Fully defined and implemented.'],['partial','ნაწილობრივ','Partly','ეს საკითხი ნაწილობრივ გვაქვს მოწესრიგებული.','Some measures exist, but are not fully in place.'],['no','არა','Not yet','ეს საკითხი ჯერ არ გვაქვს მოწესრიგებული.','No measures in place yet.'],['unknown','არ ვიცი','Not sure','არ მაქვს საკმარისი ინფორმაცია.','I do not have enough information.']].map(([value,k,e,desc,descEn])=>`<label class="dlg-readiness-choice"><input type="radio" name="${id}" value="${value}" required><span class="dlg-choice-copy">${tr(k,e,'strong')}${tr(desc,descEn,'small')}</span></label>`).join('')}</div><p class="dlg-readiness-tip" hidden>${tr(tipKa,tipEn)}</p></fieldset>`).join('')}
 <p id="dlg-readiness-error" class="dlg-readiness-error" role="status"></p>
 <div class="dlg-client-actions dlg-readiness-navigation"><button type="button" id="dlg-readiness-back" class="button button-secondary" disabled>${tr('← წინა კითხვა','← Previous')}</button><button type="button" id="dlg-readiness-next" class="button button-primary">${tr('შემდეგი კითხვა →','Next question →')}</button><button type="submit" id="dlg-readiness-finish" class="button button-primary" hidden>${tr('შედეგების ნახვა →','View results →')}</button></div>
 </form><noscript>${text('შეფასების გასავლელად ჩართეთ JavaScript.','Enable JavaScript to use the self-assessment.')}</noscript>
 <section id="dlg-readiness-result" class="dlg-client-result dlg-readiness-result" hidden aria-labelledby="dlg-readiness-heading"><h2 id="dlg-readiness-heading" tabindex="-1">${tr('შეფასების შედეგები','Your assessment results')}</h2><p id="dlg-readiness-summary" role="status"></p><div class="dlg-readiness-counts">${[['yes','მოწესრიგებული','Implemented'],['partial','ნაწილობრივ','Partial'],['no','მოსაწესრიგებელი','Not in place'],['unknown','დასაზუსტებელი','To clarify']].map(([id,ka,en])=>`<div class="dlg-readiness-count" data-state="${id}"><strong data-answer-count="${id}">0</strong>${tr(ka,en)}</div>`).join('')}</div><h3>${tr('რეკომენდაციები','Recommended next steps')}</h3><ul id="dlg-readiness-priorities" class="dlg-readiness-priorities"></ul><div class="dlg-readiness-result-cta"><h3>${tr('გსურთ უფრო დეტალური შეფასება?','Would you like a more detailed assessment?')}</h3>${text('დაგეხმარებით AI-ის გამოყენებასთან დაკავშირებული სამართლებრივი და ორგანიზაციული საკითხების შეფასებაში, თქვენი ბიზნესის საჭიროებების გათვალისწინებით.','We can help assess the legal and organisational issues relevant to your business and AI systems.')}${actions([link('/contact/consultation/','მოითხოვეთ კონსულტაცია','Request a consultation','button button-primary'),link('/advisory/ai-governance-implementation/','AI-ის მართვის სისტემის დანერგვა','AI governance services')])}</div><div class="dlg-client-actions dlg-assessment-save-actions"><button type="button" id="dlg-readiness-save" class="button button-primary">${tr('შედეგების შენახვა','Save results')} <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/></svg></button><button type="button" id="dlg-readiness-review" class="button button-secondary">${tr('პასუხების გადახედვა','Review answers')}</button><button type="button" id="dlg-readiness-restart" class="button button-secondary">${tr('თავიდან დაწყება','Start again')}</button></div><p class="dlg-assessment-save-note">${tr('შედეგების შენახვა შესაძლებელია ტექსტურ ფაილად. ინფორმაცია სერვერზე არ იგზავნება.','Save your results as a text file. No information is sent to a server.')}</p><p id="dlg-readiness-save-status" role="status" aria-live="polite"></p></section>
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
 const feeds=[['/legal-updates.xml','ქართული პუბლიკაციები','Georgian publications'],['/legal-updates-en.xml','ინგლისურენოვანი პუბლიკაციები','English publications']];
 const updates=page('სამართლებრივი სიახლეები','Legal updates','გაეცანით ბოლო პუბლიკაციებსა და პრაქტიკულ გზამკვლევებს.','Explore our latest publications and practical guides.',`
 <section class="dlg-updates-latest" aria-labelledby="dlg-updates-heading"><div class="dlg-updates-heading"><h2 id="dlg-updates-heading">${tr('ბოლო პუბლიკაციები','Latest publications')}</h2>${link('/resources/','ყველა პუბლიკაცია','All publications','dlg-tool-link')}</div><div class="dlg-update-cards">${rows.map(r=>`<article class="dlg-update-card"><a href="/resources/${r.slug}/"><img src="${escape(r.cover)}" alt="" loading="lazy" width="1200" height="800"><div><time datetime="${escape(r.date)}">${escape(r.date.split('-').reverse().join('.'))}</time><h3>${tr(r.title,r.title_en)}</h3>${text(r.summary,r.summary_en,'p')}</div><span class="dlg-update-arrow" aria-hidden="true">↗</span></a></article>`).join('')}</div></section>
 <section class="dlg-rss-subscribe" id="rss-subscribe" aria-labelledby="dlg-rss-heading"><div class="dlg-rss-intro"><div class="dlg-tool-icon"><svg viewBox="0 0 24 24" width="29" height="29" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8"/><circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none"/></svg></div><div><h2 id="dlg-rss-heading">${tr('გამოიწერეთ ახალი პუბლიკაციები RSS-ით','Follow new publications via RSS')}</h2>${text('RSS საშუალებას გაძლევთ ახალ პუბლიკაციებს თვალი ადევნოთ სპეციალური აპლიკაციით. აირჩიეთ ენა, დააკოპირეთ ბმული და დაამატეთ თქვენს RSS აპლიკაციაში.','RSS lets you follow new publications in a feed reader. Choose a language, copy the feed address and add it to your RSS reader.')}</div></div><ol class="dlg-rss-steps"><li>${tr('აირჩიეთ ენა','Choose a language')}</li><li>${tr('დააკოპირეთ არხის ბმული','Copy the feed address')}</li><li>${tr('დაამატეთ RSS აპლიკაციაში','Add it to your feed reader')}</li></ol><div class="dlg-rss-feeds">${feeds.map(([feed,ka,en],i)=>`<div class="dlg-rss-feed"><label for="dlg-feed-${i}">${tr(ka,en)}</label><div class="dlg-rss-controls"><input id="dlg-feed-${i}" type="text" readonly data-feed-path="${feed}" value="${escape(siteUrl+feed)}" spellcheck="false"><button type="button" class="button button-primary" data-dlg-copy-feed="dlg-feed-${i}">${tr('ბმულის კოპირება','Copy address')}</button></div><a class="dlg-rss-open" href="${feed}" target="_blank" rel="noopener noreferrer">${tr('RSS არხის გახსნა','Open RSS feed')} <span aria-hidden="true">↗</span></a><span class="dlg-rss-status" role="status" aria-live="polite"></span></div>`).join('')}</div><p class="dlg-rss-note">${tr('რეგისტრაცია არ გჭირდებათ. ელფოსტით გამოწერა ამ ეტაპზე ხელმისაწვდომი არ არის.','No registration is required. Email subscriptions are not available at present.')}</p></section>`);
 const pages=[
 ['/advisory/assessment/','კომპანიის მზადყოფნა AI-ის გამოსაყენებლად','AI readiness assessment','შეაფასეთ თქვენი კომპანიის მზადყოფნა ხელოვნური ინტელექტის უსაფრთხოდ და პასუხისმგებლობით გამოსაყენებლად.','Initial AI readiness assessment for businesses.',assessment],
 ['/contact/consultation/','კონსულტაციის მოთხოვნა','Request a consultation','აირჩიეთ საკითხი და თქვენთვის სასურველი დრო შეხვედრის დროის შესათანხმებლად.','Prepare a consultation request for Digital Law Georgia.',consultation],
 ['/resources/legal-updates/','სამართლებრივი სიახლეები','Legal updates','ახალი პუბლიკაციები და RSS არხი.','New publications and RSS feeds.',updates]
 ];
 for(const [url,title,title_en,summary,summary_en,content] of pages){const dest=path.join(out,url,'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,shell({title,title_en,summary,summary_en,url,content}));}
 const x=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 for(const lang of ['ka','en']){const prefix=lang==='en'?'/en':'',name=lang==='en'?'Digital Law Georgia — Legal updates':'Digital Law Georgia — სამართლებრივი სიახლეები';const feed=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(name)}</title><link>${x(siteUrl+prefix+'/resources/')}</link><description>${x(name)}</description><language>${lang}</language>${rows.map(r=>{const url=siteUrl+prefix+'/resources/'+r.slug+'/';return `<item><title>${x(lang==='en'?r.title_en:r.title)}</title><link>${x(url)}</link><guid isPermaLink="true">${x(url)}</guid><description>${x(lang==='en'?r.summary_en:r.summary)}</description><pubDate>${new Date(r.date+'T00:00:00Z').toUTCString()}</pubDate></item>`}).join('')}</channel></rss>`;fs.writeFileSync(path.join(out,lang==='en'?'legal-updates-en.xml':'legal-updates.xml'),feed);}
}
