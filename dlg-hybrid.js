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

const form = document.getElementById('enquiry-form');
const draft = document.getElementById('enquiry-result');
const email = document.getElementById('enquiry-mailto');
const address = email.href;
form.addEventListener('input', () => {
  draft.hidden = true;
  email.href = address;
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const labels = english
    ? ['Name', 'Email', 'Company', 'Area', 'Matter']
    : ['სახელი და გვარი', 'ელფოსტა', 'ორგანიზაცია', 'მიმართულება', 'საკითხი'];
  const body = ['name', 'email', 'company', 'area', 'matter'].map((key, index) => {
    const value = key === 'area' ? form.elements.area.selectedOptions[0].textContent : values.get(key);
    return labels[index] + ': ' + value;
  }).join('\n');
  email.href = address + '?subject=' + encodeURIComponent('Digital Law Georgia | Consultation enquiry') + '&body=' + encodeURIComponent(body);
  draft.hidden = false;
});
form.hidden = false;
