/* Digital Law Georgia: accessible, manually controlled editorial showcase.
   No autoplay. No third-party library. Reduced-motion preferences respected. */
(() => {
  'use strict';
  const stage = document.querySelector('[data-showcase-track]');
  if (!stage) return;
  const slides = [...stage.querySelectorAll('[data-showcase-slide]')];
  const tabs = [...document.querySelectorAll('[data-showcase-tab]')];
  const previous = document.querySelector('[data-showcase-prev]');
  const next = document.querySelector('[data-showcase-next]');
  const counter = document.querySelector('[data-showcase-counter]');
  const announcement = document.querySelector('[data-showcase-announcement]');
  if (!slides.length || !tabs.length || slides.length !== tabs.length) return;
  let current = 0;

  function selectSlide(index, shouldAnnounce = true) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = !active;
      slide.classList.toggle('is-current', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === current;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    if (shouldAnnounce && announcement) {
      const title = slides[current].querySelector('h3');
      announcement.textContent = title ? title.textContent : '';
    }
  }

  previous?.addEventListener('click', () => selectSlide(current - 1));
  next?.addEventListener('click', () => selectSlide(current + 1));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSlide(index));
    tab.addEventListener('keydown', event => {
      const target = event.key === 'ArrowRight' ? index + 1
        : event.key === 'ArrowLeft' ? index - 1
        : event.key === 'Home' ? 0
        : event.key === 'End' ? tabs.length - 1 : null;
      if (target === null) return;
      event.preventDefault();
      const newIndex = (target + tabs.length) % tabs.length;
      selectSlide(newIndex);
      tabs[newIndex].focus();
    });
  });

  // Horizontal swipe on touch devices, without blocking vertical scrolling.
  let touchStart = null;
  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  stage.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerType !== 'touch') return;
    const dx = event.clientX - touchStart.x, dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.3) selectSlide(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  stage.addEventListener('pointercancel', () => { touchStart = null; }, { passive: true });

  selectSlide(0, false);

  // Reveal only visible editorial cards; all content remains visible if JS or
  // IntersectionObserver is unavailable, or the visitor requests reduced motion.
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll('.law-services .law-service, .law-audience-grid article')];
    if (targets.length) {
      document.documentElement.classList.add('law-motion-enabled');
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('law-in-view');
          observer.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px -25px 0px', threshold: 0.07 });
      targets.forEach(item => observer.observe(item));
    }
  }
})();
