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


/* Progressive enhancement: three quiet editorial visuals; no motion without JS. */
{
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const translations = english
      ? { pause:'Pause', play:'Play', next:'Next image', group:'Hero image controls' }
      : { pause:'შეჩერება', play:'გაშვება', next:'შემდეგი სურათი', group:'მთავარი სურათების მართვა' };
    for (const name of ['architecture', 'practice']) {
      const layer = document.createElement('div');
      layer.className = 'dlg-hero-layer dlg-hero-layer--' + name;
      layer.setAttribute('aria-hidden', 'true');
      heroPhoto.append(layer);
    }
    const controls = document.createElement('div');
    controls.className = 'dlg-hero-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', translations.group);
    const count = document.createElement('span');
    count.className = 'dlg-hero-count';
    count.setAttribute('aria-hidden','true');
    const pause = document.createElement('button');
    pause.type = 'button';
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = '→';
    next.setAttribute('aria-label', translations.next);
    controls.append(count,pause,next);
    heroPhoto.append(controls);
    let current = 0, stopped = motionPreference.matches, hovering = false, focused = false;
    let timer;
    function show(index) {
      current = index % 3;
      heroPhoto.dataset.dlgSlide = String(current);
      count.textContent = String(current + 1).padStart(2,'0') + ' / 03';
    }
    function schedule() {
      window.clearTimeout(timer);
      pause.textContent = stopped ? translations.play : translations.pause;
      if (!stopped && !hovering && !focused && !document.hidden) {
        timer = window.setTimeout(() => { show(current + 1); schedule(); }, 7000);
      }
    }
    pause.addEventListener('click', () => { stopped = !stopped; schedule(); });
    next.addEventListener('click', () => { show(current + 1); schedule(); });
    heroPhoto.addEventListener('mouseenter', () => { hovering = true; schedule(); });
    heroPhoto.addEventListener('mouseleave', () => { hovering = false; schedule(); });
    controls.addEventListener('focusin', () => { focused = true; schedule(); });
    controls.addEventListener('focusout', event => {
      if (!controls.contains(event.relatedTarget)) { focused = false; schedule(); }
    });
    motionPreference.addEventListener('change', event => {
      if (event.matches) stopped = true;
      schedule();
    });
    document.addEventListener('visibilitychange', schedule);
    show(0);
    schedule();
  }
}
