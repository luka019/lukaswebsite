/* DLG public navigation and accessible scroll utilities.
   The main photo carousel is managed by firm-hero.js. */
(() => {
  "use strict";
  const progress = document.querySelector("[data-scroll-progress]");
  const backTop = document.querySelector("[data-back-to-top]");
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".law-nav");
  const toggle = document.querySelector("[data-menu-toggle]");
  const sections = ["services", "approach", "about", "contact"]
    .map(id => document.getElementById(id)).filter(Boolean);
  const links = [...(nav?.querySelectorAll('a[href^="/#"]') || [])];
  let pending = false;
  function update() {
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = Math.min(100, Math.max(0, Math.round(window.scrollY / distance * 100))) + "%";
    backTop?.classList.toggle("is-visible", window.scrollY > 560);
    header?.classList.toggle("dlg-scrolled", window.scrollY > 12);
    let current = "";
    const line = window.scrollY + window.innerHeight * .34;
    for (const section of sections) if (line >= section.offsetTop) current = section.id;
    for (const link of links) {
      const active = current !== "" && link.getAttribute("href") === "/#" + current;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current","location");
      else link.removeAttribute("aria-current");
    }
    pending = false;
  }
  function queue() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener("scroll", queue, {passive:true});
  window.addEventListener("resize", queue, {passive:true});
  update();
  backTop?.addEventListener("click", () => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({top:0,behavior:reduced?"auto":"smooth"});
  });
  document.addEventListener("pointerdown", event => {
    if (nav?.classList.contains("open") &&
        !nav.contains(event.target) && !toggle?.contains(event.target)) {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "მენიუს გახსნა");
    }
  });
})();
