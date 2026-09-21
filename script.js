(() => {
  "use strict";

  const storageKey = "luka-law-language";
  const languageButtons = document.querySelectorAll("[data-language]");
  const textNodes = Array.from(document.querySelectorAll("[data-en]")).map(element => ({ element, ka: element.textContent, en: element.dataset.en }));
  const translatedAttributes = [
    ...Array.from(document.querySelectorAll("[data-en-aria]")).map(element => ({ element, attribute: "aria-label", ka: element.getAttribute("aria-label"), en: element.dataset.enAria })),
    ...Array.from(document.querySelectorAll("[data-en-alt]")).map(element => ({ element, attribute: "alt", ka: element.getAttribute("alt"), en: element.dataset.enAlt }))
  ];
  const titles = { ka: "Digital Law & Advisory — ტექნოლოგიური და ციფრული სამართალი", en: "Digital Law & Advisory — Technology & Digital Law" };
  const descriptions = {
    ka: "ტექნოლოგიური და ციფრული სამართალი, მონაცემთა დაცვა, ფინანსური რეგულირება და ბიზნესის იურიდიული მომსახურება. დამფუძნებელი — ლუკა შახყულაშვილი.",
    en: "Technology and digital law, data protection, financial regulation and business legal support in Georgia. Founded by Luka Shakhkulashvili."
  };
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.getElementById("site-nav");
  const mobileQuery = window.matchMedia("(max-width: 850px)");
  const form = document.getElementById("enquiry-form");
  const statusElement = document.getElementById("form-status");
  const submitButton = form?.querySelector('[type="submit"]');
  const submitLabel = form?.querySelector("[data-submit-label]");
  const fieldIds = { name: "enquiry-name", email: "enquiry-email", message: "enquiry-message", consent: "enquiry-consent" };
  let currentLanguage = "ka";
  let formState = "idle";
  let errors = {};
  const formCopy = {
    ka: {
      submit: "გაგზავნა", sending: "იგზავნება…",
      success: "შეტყობინება გაიგზავნა. პასუხს მითითებულ ელფოსტაზე მიიღებთ.",
      inactive: "ამჟამად ფორმით გაგზავნა მიუწვდომელია. მოგვწერეთ მისამართზე: digitallawgeorgia@gmail.com. თქვენი ტექსტი ფორმაში შენახულია.",
      error: "გაგზავნა ვერ დადასტურდა. თქვენი ტექსტი ფორმაში შენახულია. სცადეთ ხელახლა ან მოგვწერეთ მისამართზე: digitallawgeorgia@gmail.com.",
      invalid: "გთხოვთ, შეამოწმოთ მონიშნული ველები.",
      name: "მიუთითეთ სახელი და გვარი — მინიმუმ 2 სიმბოლო.",
      email: "მიუთითეთ მოქმედი ელფოსტის მისამართი.",
      message: "აღწერეთ საკითხი მინიმუმ 20 და მაქსიმუმ 3000 სიმბოლოთი.",
      consent: "გაგზავნისთვის საჭიროა მონაცემების დამუშავებაზე თანხმობა."
    },
    en: {
      submit: "Send enquiry", sending: "Sending…",
      success: "Your message has been sent. We will reply to the email address you provided.",
      inactive: "The form is temporarily unavailable. Please email digitallawgeorgia@gmail.com. Your message remains in the form.",
      error: "We could not confirm that your message was sent. Your text is still in the form. Try again or email digitallawgeorgia@gmail.com.",
      invalid: "Please check the highlighted fields.",
      name: "Enter your full name using at least 2 characters.",
      email: "Enter a valid email address.",
      message: "Describe your matter in 20 to 3,000 characters.",
      consent: "Please agree to the use of your details to respond to this enquiry."
    }
  };

  function renderForm() {
    if (!form) return;
    const copy = formCopy[currentLanguage];
    const sending = formState === "sending";
    submitButton.disabled = sending;
    form.setAttribute("aria-busy", String(sending));
    submitLabel.textContent = sending ? copy.sending : copy.submit;
    statusElement.hidden = formState === "idle" || sending;
    statusElement.dataset.state = formState;
    statusElement.textContent = statusElement.hidden ? "" : copy[formState];
    form.elements.language.value = currentLanguage;
    Object.entries(fieldIds).forEach(([key, id]) => {
      const field = document.getElementById(id);
      field.setAttribute("aria-invalid", String(Boolean(errors[key])));
      document.getElementById(key + "-error").textContent = errors[key] ? copy[key] : "";
    });
  }
  function setFormState(state, focus = false) {
    formState = state;
    renderForm();
    if (focus && !statusElement.hidden) statusElement.focus({ preventScroll: false });
  }
  function updateMenuLabel() {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", currentLanguage === "en" ? (open ? "Close menu" : "Open menu") : (open ? "მენიუს დახურვა" : "მენიუს გახსნა"));
  }
  function setMenu(open, restoreFocus = false) {
    navigation.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    updateMenuLabel();
    if (restoreFocus) menuToggle.focus();
  }
  function setLanguage(language, persist = false) {
    currentLanguage = language === "en" ? "en" : "ka";
    document.documentElement.lang = currentLanguage;
    textNodes.forEach(({ element, ka, en }) => { element.textContent = currentLanguage === "en" ? en : ka; });
    translatedAttributes.forEach(({ element, attribute, ka, en }) => element.setAttribute(attribute, currentLanguage === "en" ? en : ka));
    languageButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)));
    const pageTitle = document.body.dataset[currentLanguage === "en" ? "titleEn" : "titleKa"];
    const pageDescription = document.body.dataset[currentLanguage === "en" ? "descriptionEn" : "descriptionKa"];
    document.title = pageTitle || titles[currentLanguage];
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[name="description"]').setAttribute("content", pageDescription || descriptions[currentLanguage]);
    document.querySelector('meta[property="og:description"]').setAttribute("content", pageDescription || descriptions[currentLanguage]);
    updateMenuLabel();
    renderForm();
    document.querySelectorAll("[data-site-link]").forEach(link => {
      const url = new URL(link.getAttribute("href"), window.location.href);
      if (url.origin === window.location.origin) {
        url.searchParams.set("lang", currentLanguage);
        link.href = url.pathname + url.search + url.hash;
      }
    });
    document.dispatchEvent(new CustomEvent("site:language", { detail: { language: currentLanguage } }));
    if (persist) {
      try { localStorage.setItem(storageKey, currentLanguage); } catch { /* The site works without storage. */ }
      const url = new URL(window.location.href);
      url.searchParams.set("lang", currentLanguage);
      try { window.history.replaceState(null, "", url); } catch { /* Allows local file previews. */ }
    }
  }
  let preferredLanguage = document.body.dataset.defaultLanguage || "ka";
  try { preferredLanguage = localStorage.getItem(storageKey) || preferredLanguage; } catch { /* Use the default. */ }
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "ka" || queryLanguage === "en") preferredLanguage = queryLanguage;
  setLanguage(preferredLanguage);

  languageButtons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language, true)));
  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", event => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) setMenu(false);
    const serviceLink = event.target.closest("[data-enquiry]");
    if (serviceLink && form) {
      const value = serviceLink.dataset.enquiry;
      if ([...form.elements.service.options].some(option => option.value === value)) form.elements.service.value = value;
      if (formState !== "sending") setFormState("idle");
    }
    if (event.target.closest("[data-open-privacy]") && document.getElementById("privacy")) document.getElementById("privacy").open = true;
  });
  document.addEventListener("focusin", event => { if (mobileQuery.matches && !event.target.closest(".site-header")) setMenu(false); });
  mobileQuery.addEventListener("change", () => setMenu(false));
  document.getElementById("year").textContent = String(new Date().getFullYear());

  function openLinkedPrivacy() {
    const notice = document.getElementById("privacy");
    if (notice && window.location.hash === "#privacy") notice.open = true;
  }
  openLinkedPrivacy();
  window.addEventListener("hashchange", openLinkedPrivacy);
  if (!form) return;
  const requestedService = new URLSearchParams(window.location.search).get("service");
  if ([...form.elements.service.options].some(option => option.value === requestedService)) {
    form.elements.service.value = requestedService;
  }

  // Native HTML validation remains available when JavaScript is disabled.
  form.noValidate = true;
  form.addEventListener("input", event => {
    const key = Object.keys(fieldIds).find(name => fieldIds[name] === event.target.id);
    if (key && errors[key]) { delete errors[key]; renderForm(); }
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (formState === "sending") return;
    errors = {};
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (name.length < 2 || name.length > 100) errors.name = true;
    if (!email || !form.elements.email.validity.valid || email.length > 254) errors.email = true;
    if (message.length < 20 || message.length > 3000) errors.message = true;
    if (!form.elements.consent.checked) errors.consent = true;
    if (Object.keys(errors).length) {
      setFormState("invalid");
      document.getElementById(fieldIds[Object.keys(errors)[0]]).focus();
      return;
    }
    if (form.elements._honey.value.trim()) { setFormState("error", true); return; }
    setFormState("sending");
    form.submit();
  });
  window.addEventListener("pageshow", () => {
    if (formState === "sending") setFormState("idle");
  });
})();
