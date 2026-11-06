/* DLG — Interactive first-screen legal practice selector.
   User-controlled, bilingual, accessible and respectful of reduced motion. */
(() => {
  "use strict";
  const tabs = [...document.querySelectorAll("[data-hero-topic]")];
  const title = document.querySelector("[data-hero-title]");
  const description = document.querySelector("[data-hero-description]");
  const link = document.querySelector("[data-hero-link]");
  const panel = document.querySelector("[data-hero-detail]");
  const count = document.querySelector("[data-hero-count]");
  if (tabs.length !== 4 || !title || !description || !link || !panel) return;
  const items = {
    contracts: {
      ka: ["ხელშეკრულებები და კომერციული ურთიერთობები", "ბიზნესისა და ტექნოლოგიური მომსახურების ხელშეკრულებების მომზადება, შემოწმება და მოლაპარაკებებში დახმარება."],
      en: ["Contracts and commercial relationships", "Drafting, reviewing and negotiating agreements for businesses and technology services."],
      href: "/services/contracts/"
    },
    privacy: {
      ka: ["პერსონალურ მონაცემთა დაცვა", "მონაცემთა დამუშავების კანონიერების შეფასება, შიდა წესების მომზადება და კონტრაქტებში შესაბამისი პირობების განსაზღვრა."],
      en: ["Data protection and privacy", "Reviewing lawful data processing, preparing internal policies and addressing privacy obligations in contracts."],
      href: "/services/data-protection/"
    },
    fintech: {
      ka: ["ფინტექი და ფინანსური რეგულირება", "ციფრული ფინანსური პროდუქტების სამართლებრივი შეფასება, მარეგულირებელი მოთხოვნების განსაზღვრა და დოკუმენტაციის მომზადება."],
      en: ["FinTech and financial regulation", "Assessing digital financial products, identifying regulatory requirements and preparing legal documentation."],
      href: "/services/fintech/"
    },
    ai: {
      ka: ["AI-ის გამოყენება და ციფრული პროდუქტები", "ხელოვნური ინტელექტის გამოყენების წესები, ტექნოლოგიური მომწოდებლების ხელშეკრულებები და ციფრული პროდუქტების სამართლებრივი რისკები."],
      en: ["AI governance and digital products", "AI use policies, technology supplier agreements and legal risk assessment for digital products."],
      href: "/services/ai/"
    }
  };
  let selected = "contracts";
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  function render(id, animate) {
    if (!Object.hasOwn(items,id)) return;
    selected=id;
    const item=items[id];
    const lang=document.documentElement.lang === "en" ? "en" : "ka";
    title.textContent=item[lang][0];
    description.textContent=item[lang][1];
    link.setAttribute("href",item.href);
    const pos=tabs.findIndex(tab => tab.dataset.heroTopic === id);
    if (count) count.textContent=String(pos+1).padStart(2,"0")+" / "+String(tabs.length).padStart(2,"0");
    tabs.forEach(tab => {
      const active=tab.dataset.heroTopic===id;
      tab.setAttribute("aria-pressed",String(active));
      tab.classList.toggle("is-selected",active);
    });
    if (animate && !reducedMotion) {
      panel.classList.remove("is-animating");
      void panel.offsetWidth;
      panel.classList.add("is-animating");
    }
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener("click",()=>render(tab.dataset.heroTopic,true));
    tab.addEventListener("keydown",event=>{
      const next=event.key==="ArrowRight"||event.key==="ArrowDown" ? i+1 :
        event.key==="ArrowLeft"||event.key==="ArrowUp" ? i-1 :
        event.key==="Home" ? 0 : event.key==="End" ? tabs.length-1 : null;
      if (next === null) return;
      event.preventDefault();
      const target=tabs[(next+tabs.length)%tabs.length];
      render(target.dataset.heroTopic,true);
      target.focus();
    });
  });
  document.addEventListener("site:language",()=>render(selected,false));
  render(selected,false);
})();
