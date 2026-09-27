(() => {
  const body = document.body;
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  let storedLanguage;
  try { storedLanguage = localStorage.getItem('dlg-language'); } catch {}
  let activeService = 'contracts', activeScenario = 'startup';
  let language = ['ka','en'].includes(storedLanguage) ? storedLanguage : body.dataset.defaultLanguage || 'ka';

  function translate() {
    body.lang = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en]').forEach((element) => {
      if (!element.dataset.ka) element.dataset.ka = element.textContent;
      element.textContent = language === 'en' ? element.dataset.en : element.dataset.ka;
    });
    document.querySelectorAll('[data-en-placeholder]').forEach((element) => {
      if (!element.dataset.kaPlaceholder) element.dataset.kaPlaceholder = element.getAttribute('placeholder') || '';
      element.setAttribute('placeholder', language === 'en' ? element.dataset.enPlaceholder : element.dataset.kaPlaceholder);
    });
    languageButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelectorAll('[data-en-alt]').forEach((element) => {
      if (!element.dataset.kaAlt) element.dataset.kaAlt = element.getAttribute('alt') || '';
      element.alt = language === 'en' ? element.dataset.enAlt : element.dataset.kaAlt;
    });
    document.querySelectorAll('[data-en-aria]').forEach(el => {
      if (!el.dataset.kaAria) el.dataset.kaAria = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', language === 'en' ? el.dataset.enAria : el.dataset.kaAria);
    });
    const description = document.querySelector('meta[name="description"]');
    if (description && body.dataset.descriptionKa) description.content = language === 'en' ? body.dataset.descriptionEn : body.dataset.descriptionKa;
    document.dispatchEvent(new CustomEvent('site:language', {detail: {language}}));
    const title = document.querySelector('title');
    if (title && document.body.dataset.titleEn) title.textContent = language === 'en' ? document.body.dataset.titleEn : document.body.dataset.titleKa;
  }

  languageButtons.forEach((button) => button.addEventListener('click', () => {
    language = button.dataset.language;
    try { localStorage.setItem('dlg-language', language); } catch {}
    translate();
  }));
  translate();

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const choices = [...document.querySelectorAll('[data-service-choice]')];
  const result = document.querySelector('[data-service-result]');
  const cta = document.querySelector('[data-service-cta]');
  const serviceRoutes = {
    contracts: { en: 'Send a short request', ka: 'ხელშეკრულების საკითხი', href: '/client/?service=contracts' },
    ai: { en: 'Start an AI / data brief', ka: 'ხელოვნური ინტელექტი და მონაცემები', href: '/client/?service=ai' },
    product: { en: 'Plan the product route', ka: 'ციფრული პროდუქტის საკითხი', href: '/client/?service=product' },
    georgia: { en: 'Open a local counsel request', ka: 'საქართველოში საქმიანობის დაწყება', href: '/client/?service=georgia' },
    'data-protection': { en: 'Start a data protection brief', ka: 'მონაცემთა დაცვის მოთხოვნის დაწყება', href: '/client/?service=data-protection' },
    corporate: { en: 'Discuss a corporate matter', ka: 'კორპორაციული საკითხის განხილვა', href: '/client/?service=corporate' },
    employment: { en: 'Ask about a workplace matter', ka: 'შრომითი საკითხის განხილვა', href: '/client/?service=employment' },
    'investment-funds': { en: 'Discuss a regulated business matter', ka: 'რეგულირებადი საქმიანობის საკითხის განხილვა', href: '/client/?service=investment-funds' },
    disputes: { en: 'Discuss a dispute or decision', ka: 'დავის ან რთული გადაწყვეტილების განხილვა', href: '/client/?service=disputes' }
  };
  function selectService(key) {
    activeService = serviceRoutes[key] ? key : 'contracts';
    const item = serviceRoutes[activeService];
    choices.forEach((choice) => { const active = choice.dataset.serviceChoice === activeService; choice.classList.toggle('active', active); choice.setAttribute('aria-pressed', String(active)); });
    if (result) result.textContent = language === 'en' ? item.en : item.ka;
    if (cta) cta.href = item.href;
  }
  choices.forEach((choice) => choice.addEventListener('click', () => selectService(choice.dataset.serviceChoice)));
  selectService('contracts');

  const scenarios = {
    startup: {
      label: { en: 'START / 01', ka: 'დაწყება / 01' },
      title: { en: 'Make the first version legally usable.', ka: 'მოამზადეთ ბიზნესი საქმიანობის დასაწყებად.' },
      copy: { en: 'A focused setup for a new product: core terms, privacy, ownership, contracts and the decisions you should make before launch.', ka: 'ახალი პროდუქტის შექმნისას წინასწარ განსაზღვრეთ მომხმარებლის პირობები, მონაცემთა დამუშავების წესები და პარტნიორთა უფლებები. საჭირო დოკუმენტებს თქვენი პროდუქტის მიხედვით მოვამზადებთ.' },
      list: { en: ['Product and customer terms', 'Privacy and data-use baseline', 'Founder, partner and supplier documentation'], ka: ['პროდუქტით სარგებლობის პირობები', 'მონაცემთა დამუშავების წესები', 'დამფუძნებლებისა და პარტნიორების შეთანხმებები'] },
      href: '/client/?service=product'
    },
    growing: {
      label: { en: 'SCALE / 02', ka: 'ზრდა / 02' },
      title: { en: 'Remove the legal friction slowing the team down.', ka: 'მოაწესრიგეთ მზარდი ბიზნესის სამართლებრივი საკითხები.' },
      copy: { en: 'A practical route for growing teams: contract flow, supplier terms, data processes, AI use and ongoing legal questions.', ka: 'გუნდის ზრდასთან ერთად იმატებს ხელშეკრულებები, თანამშრომლები და სამართლებრივი კითხვები. დაგეხმარებით პროცესების მოწესრიგებასა და მიმდინარე საკითხების გადაწყვეტაში.' },
      list: { en: ['Contract review and negotiation support', 'Reusable policies and approval logic', 'Ongoing external legal counsel'], ka: ['ხელშეკრულებების შემოწმება და მოლაპარაკება', 'შიდა წესები და დოკუმენტების შეთანხმების პროცესი', 'ყოველთვიური იურიდიული მომსახურება'] },
      href: '/client/?service=contracts'
    },
    international: {
      label: { en: 'GEORGIA / 03', ka: 'საქართველო / 03' },
      title: { en: 'A clear local legal point of contact in Georgia.', ka: 'თქვენი იურიდიული მრჩეველი საქართველოში.' },
      copy: { en: 'Support for foreign companies, founders and law firms that need English-language coordination of local legal work in Georgia.', ka: 'ვეხმარებით უცხოურ კომპანიებს საქართველოში დაფუძნებაში, ხელშეკრულებების მომზადებასა და ადგილობრივი სამართლებრივი საკითხების მოგვარებაში. კომუნიკაცია შესაძლებელია ინგლისურად.' },
      list: { en: ['Local corporate and commercial documentation', 'Technology, data and regulatory support', 'Coordination with local specialists where needed'], ka: ['ადგილობრივი კორპორაციული და კომერციული დოკუმენტები', 'ტექნოლოგიებისა და მონაცემთა დაცვის საკითხები', 'საჭიროების შემთხვევაში ადგილობრივ სპეციალისტებთან კოორდინაცია'] },
      href: '/client/?service=georgia'
    }
  };
  const scenarioTabs = [...document.querySelectorAll('[data-scenario]')];
  const scenarioLabel = document.querySelector('[data-scenario-label]');
  const scenarioTitle = document.querySelector('[data-scenario-title]');
  const scenarioCopy = document.querySelector('[data-scenario-copy]');
  const scenarioList = document.querySelector('[data-scenario-list]');
  const scenarioCta = document.querySelector('[data-scenario-cta]');
  function selectScenario(key) {
    activeScenario = scenarios[key] ? key : 'startup';
    const item = scenarios[activeScenario];
    scenarioTabs.forEach((tab) => {
      const active = tab.dataset.scenario === activeScenario;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    if (scenarioLabel) scenarioLabel.textContent = item.label[language];
    if (scenarioTitle) scenarioTitle.textContent = item.title[language];
    if (scenarioCopy) scenarioCopy.textContent = item.copy[language];
    if (scenarioList) scenarioList.innerHTML = item.list[language].map((entry) => '<li>' + entry + '</li>').join('');
    if (scenarioCta) scenarioCta.href = item.href;
  }
  scenarioTabs.forEach((tab) => tab.addEventListener('click', () => selectScenario(tab.dataset.scenario)));
  selectScenario('startup');
  document.addEventListener('site:language', () => { selectService(activeService); selectScenario(activeScenario); });
  scenarioTabs.forEach((tab, index) => tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % scenarioTabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + scenarioTabs.length) % scenarioTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = scenarioTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectScenario(scenarioTabs[next].dataset.scenario); scenarioTabs[next].focus(); }
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav?.classList.contains('open')) { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.focus(); } });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  window.addEventListener('storage', (event) => { if (event.key === 'dlg-language') { language = event.newValue === 'en' ? 'en' : 'ka'; translate(); } });
})();
