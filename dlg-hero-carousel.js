/* Digital Law Georgia — restrained editorial visual carousel.
 * Local assets only; no analytics, remote APIs or third-party library.
 * Automatic motion is disabled for reduced-motion users and off-screen tabs.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-dlg-hero-carousel]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('[data-dlg-slide]'));
  const dots = Array.from(root.querySelectorAll('[data-dlg-slide-to]'));
  const previous = root.querySelector('[data-dlg-prev]');
  const next = root.querySelector('[data-dlg-next]');
  const count = root.querySelector('[data-dlg-count]');
  if (slides.length < 2 || dots.length !== slides.length || !previous || !next || !count) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer = null;
  let hovered = false;
  let focused = false;
  let visible = !('IntersectionObserver' in window);
  let touchStart = null;
  const pad = num => String(num).padStart(2, '0');
  function render(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.setAttribute('aria-pressed', String(active));
      dot.classList.toggle('is-active', active);
    });
    count.textContent = pad(index + 1) + ' / ' + pad(slides.length);
  }
  function stop() { if (timer !== null) {window.clearInterval(timer); timer = null;} }
  function canPlay() {return !reduce.matches && !document.hidden && !hovered && !focused && visible;}
  function start() {
    stop();
    if (canPlay()) timer = window.setInterval(() => render(index + 1), 6500);
  }
  function change(n) {render(n); start();}
  previous.addEventListener('click', () => change(index - 1));
  next.addEventListener('click', () => change(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => change(i)));
  root.addEventListener('mouseenter', () => {hovered = true; stop();});
  root.addEventListener('mouseleave', () => {hovered = false; start();});
  root.addEventListener('focusin', () => {focused = true; stop();});
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget)) {focused = false; start();}
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {event.preventDefault(); change(index + 1);}
    else if (event.key === 'ArrowLeft') {event.preventDefault(); change(index - 1);}
    else if (event.key === 'Home') {event.preventDefault(); change(0);}
    else if (event.key === 'End') {event.preventDefault(); change(slides.length - 1);}
  });
  const stage = root.querySelector('[data-dlg-carousel-stage]');
  stage?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') touchStart = {x:event.clientX,y:event.clientY};
  },{passive:true});
  stage?.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerType !== 'touch') return;
    const dx = event.clientX - touchStart.x,dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) >= 45 && Math.abs(dy) < 85) change(index + (dx < 0 ? 1 : -1));
  },{passive:true});
  stage?.addEventListener('pointercancel', () => {touchStart = null;},{passive:true});
  document.addEventListener('visibilitychange', start);
  if (reduce.addEventListener) reduce.addEventListener('change', start);
  else if (reduce.addListener) reduce.addListener(start);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = !!entries[0]?.isIntersecting;
      start();
    },{threshold:0.25});
    observer.observe(root);
  }
  render(0);
  start();
})();