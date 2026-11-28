const english = document.documentElement.lang === 'en';

const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
function setMenuState(open) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', english ? (open ? 'Close menu' : 'Open menu') : (open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'));
}
menu.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  setMenuState(open);
  if (open) nav.querySelector('a').focus();
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuState(false)));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !nav.classList.contains('open')) return;
  setMenuState(false);
  menu.focus();
});
window.matchMedia('(min-width: 921px)').addEventListener('change', event => {
  if (event.matches) setMenuState(false);
});

// The homepage has a single link to the dedicated contact page. No enquiry is collected here.
