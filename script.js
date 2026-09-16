(() => {
  "use strict";

  const storageKey = "luka-law-language";
  const languageButtons = document.querySelectorAll("[data-language]");
  const textNodes = Array.from(document.querySelectorAll("[data-en]")).map(element => ({
    element,
    ka: element.textContent,
    en: element.dataset.en
  }));
  const translatedAttributes = [
    ...Array.from(document.querySelectorAll("[data-en-aria]")).map(element => ({
      element, attribute: "aria-label", ka: element.getAttribute("aria-label"), en: element.dataset.enAria
    })),
    ...Array.from(document.querySelectorAll("[data-en-alt]")).map(element => ({
      element, attribute: "alt", ka: element.getAttribute("alt"), en: element.dataset.enAlt
    }))
  ];
  const titles = {
    ka: "Luka / Law — ტექნოლოგიური და ციფრული სამართალი",
    en: "Luka / Law — Technology & Digital Law"
  };
  const descriptions = {
    ka: "ლუკა შახყულაშვილის ტექნოლოგიური და ციფრული სამართლის პრაქტიკა. ტექნოლოგიები, მონაცემთა დაცვა, ფინანსური რეგულირება და ბიზნესის სამართლებრივი მხარდაჭერა.",
    en: "Luka Shakhkulashvili’s technology and digital law practice. Technology contracts, data protection, financial regulation and business legal support in Georgia."
  };

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.getElementById("site-nav");
  const mobileQuery = window.matchMedia("(max-width: 850px)");
  let currentLanguage = "ka";

  function updateMenuLabel() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", currentLanguage === "en"
      ? (isOpen ? "Close menu" : "Open menu")
      : (isOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"));
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
    translatedAttributes.forEach(({ element, attribute, ka, en }) => {
      element.setAttribute(attribute, currentLanguage === "en" ? en : ka);
    });
    languageButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)));
    document.title = titles[currentLanguage];
    document.querySelector('meta[name="description"]').setAttribute("content", descriptions[currentLanguage]);
    document.querySelector('meta[property="og:description"]').setAttribute("content", descriptions[currentLanguage]);
    updateMenuLabel();
    if (persist) {
      try { localStorage.setItem(storageKey, currentLanguage); } catch { /* Browsing still works when storage is unavailable. */ }
      const url = new URL(window.location.href);
      url.searchParams.set("lang", currentLanguage);
      try { window.history.replaceState(null, "", url); } catch { /* Safe for local file previews. */ }
    }
  }

  let preferredLanguage = "ka";
  try { preferredLanguage = localStorage.getItem(storageKey) || "ka"; } catch { /* Use the default. */ }
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "ka" || queryLanguage === "en") preferredLanguage = queryLanguage;
  setLanguage(preferredLanguage);

  languageButtons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language, true)));
  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) setMenu(false);
  });
  document.addEventListener("focusin", event => {
    if (mobileQuery.matches && !event.target.closest(".site-header")) setMenu(false);
  });
  mobileQuery.addEventListener("change", () => setMenu(false));
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
