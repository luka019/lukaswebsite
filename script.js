(() => {
  const body = document.body;
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const storedLanguage = localStorage.getItem('dlg-language');
  let language = storedLanguage || body.dataset.defaultLanguage || 'en';

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
    const title = document.querySelector('title');
    if (title && document.body.dataset.titleEn) title.textContent = language === 'en' ? document.body.dataset.titleEn : document.body.dataset.titleKa;
  }

  languageButtons.forEach((button) => button.addEventListener('click', () => {
    language = button.dataset.language;
    localStorage.setItem('dlg-language', language);
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
    contracts: { en: 'Send a short request', ka: 'მოკლე მოთხოვნის გაგზავნა', href: '/client/?service=contracts' },
    ai: { en: 'Start an AI / data brief', ka: 'AI / მონაცემების აღწერის დაწყება', href: '/client/?service=ai' },
    product: { en: 'Plan the product route', ka: 'პროდუქტის მიმართულების დაგეგმვა', href: '/client/?service=product' },
    georgia: { en: 'Open a local counsel request', ka: 'ადგილობრივი მხარდაჭერის მოთხოვნა', href: '/client/?service=georgia' },
    'data-protection': { en: 'Start a data protection brief', ka: 'მონაცემთა დაცვის მოთხოვნის დაწყება', href: '/client/?service=data-protection' },
    corporate: { en: 'Discuss a corporate matter', ka: 'კორპორაციული საკითხის განხილვა', href: '/client/?service=corporate' },
    employment: { en: 'Ask about a workplace matter', ka: 'შრომითი საკითხის განხილვა', href: '/client/?service=employment' },
    'investment-funds': { en: 'Discuss a regulated business matter', ka: 'რეგულირებადი საქმიანობის საკითხის განხილვა', href: '/client/?service=investment-funds' },
    disputes: { en: 'Discuss a dispute or decision', ka: 'დავის ან რთული გადაწყვეტილების განხილვა', href: '/client/?service=disputes' }
  };
  function selectService(key) {
    const item = serviceRoutes[key] || serviceRoutes.contracts;
    choices.forEach((choice) => choice.classList.toggle('active', choice.dataset.serviceChoice === key));
    if (result) result.textContent = language === 'en' ? item.en : item.ka;
    if (cta) cta.href = item.href;
  }
  choices.forEach((choice) => choice.addEventListener('click', () => selectService(choice.dataset.serviceChoice)));
  selectService('contracts');

  const scenarios = {
    startup: {
      label: { en: 'START / 01', ka: 'დაწყება / 01' },
      title: { en: 'Make the first version legally usable.', ka: 'პირველი ვერსია სამართლებრივად გამოსაყენებელი გახადეთ.' },
      copy: { en: 'A focused setup for a new product: core terms, privacy, ownership, contracts and the decisions you should make before launch.', ka: 'ახალი პროდუქტისთვის საჭირო მოკლე სამართლებრივი მომზადება: ძირითადი პირობები, კონფიდენციალურობა, საკუთრება, ხელშეკრულებები და გაშვებამდე მისაღები გადაწყვეტილებები.' },
      list: { en: ['Product and customer terms', 'Privacy and data-use baseline', 'Founder, partner and supplier documentation'], ka: ['პროდუქტისა და მომხმარებლის პირობები', 'კონფიდენციალურობისა და მონაცემთა გამოყენების საფუძველი', 'დამფუძნებლის, პარტნიორისა და მომწოდებლის დოკუმენტები'] },
      href: '/client/?service=product'
    },
    growing: {
      label: { en: 'SCALE / 02', ka: 'ზრდა / 02' },
      title: { en: 'Remove the legal friction slowing the team down.', ka: 'მოაშორეთ იურიდიული დაბრკოლებები, რომლებიც გუნდს ანელებს.' },
      copy: { en: 'A practical route for growing teams: contract flow, supplier terms, data processes, AI use and ongoing legal questions.', ka: 'მზარდი გუნდისთვის პრაქტიკული გზა: ხელშეკრულებების ნაკადი, მომწოდებლების პირობები, მონაცემთა პროცესები, AI-ის გამოყენება და მიმდინარე საკითხები.' },
      list: { en: ['Contract review and negotiation support', 'Reusable policies and approval logic', 'Ongoing external legal counsel'], ka: ['ხელშეკრულებების შემოწმება და მოლაპარაკება', 'განმეორებით გამოსაყენებელი პოლიტიკები და დამტკიცების ლოგიკა', 'მიმდინარე გარე იურიდიული მხარდაჭერა'] },
      href: '/client/?service=contracts'
    },
    international: {
      label: { en: 'GEORGIA / 03', ka: 'საქართველო / 03' },
      title: { en: 'A clear local legal point of contact in Georgia.', ka: 'მკაფიო ადგილობრივი იურიდიული საკონტაქტო პირი საქართველოში.' },
      copy: { en: 'Support for foreign companies, founders and law firms that need English-language coordination of local legal work in Georgia.', ka: 'მხარდაჭერა უცხოური კომპანიებისთვის, დამფუძნებლებისა და იურიდიული ფირმებისთვის, რომლებსაც საქართველოში ადგილობრივი სამუშაოს ინგლისურენოვანი კოორდინაცია სჭირდებათ.' },
      list: { en: ['Local corporate and commercial documentation', 'Technology, data and regulatory support', 'Coordination with local specialists where needed'], ka: ['ადგილობრივი კორპორაციული და კომერციული დოკუმენტები', 'ტექნოლოგიების, მონაცემებისა და რეგულაციების მხარდაჭერა', 'საჭიროების შემთხვევაში ადგილობრივ სპეციალისტებთან კოორდინაცია'] },
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
    const item = scenarios[key] || scenarios.startup;
    scenarioTabs.forEach((tab) => {
      const active = tab.dataset.scenario === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    if (scenarioLabel) scenarioLabel.textContent = item.label[language];
    if (scenarioTitle) scenarioTitle.textContent = item.title[language];
    if (scenarioCopy) scenarioCopy.textContent = item.copy[language];
    if (scenarioList) scenarioList.innerHTML = item.list[language].map((entry) => '<li>' + entry + '</li>').join('');
    if (scenarioCta) scenarioCta.href = item.href;
  }
  scenarioTabs.forEach((tab) => tab.addEventListener('click', () => selectScenario(tab.dataset.scenario)));
  selectScenario('startup');

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  window.addEventListener('storage', (event) => { if (event.key === 'dlg-language') { language = event.newValue || 'en'; translate(); selectScenario('startup'); selectService('contracts'); } });
})();