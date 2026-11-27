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

const tabs = [...document.querySelectorAll('.advisory-tabs [role="tab"]')];
function selectTab(selected) {
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectTab(tabs[next]);
    tabs[next].focus();
  });
});
document.querySelector('.advisory-tabs').hidden = false;

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

const founderDialog = document.querySelector('.founder-dialog');
const founderTrigger = document.querySelector('[data-founder-open]');
const introduction = founderDialog.querySelector('audio');
const audioLanguages = [...founderDialog.querySelectorAll('[data-founder-language]')];
const transcripts = [...founderDialog.querySelectorAll('[data-founder-copy]')];

function playIntroduction(language) {
  audioLanguages.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.founderLanguage === language));
  });
  transcripts.forEach(transcript => {
    transcript.hidden = transcript.dataset.founderCopy !== language;
  });
  introduction.lang = language;
  const recording = '/assets/audio/founder-' + language + '.mp3';
  if (introduction.getAttribute('src') !== recording) {
    introduction.src = recording;
  } else {
    introduction.currentTime = 0;
  }
  introduction.play().catch(() => {
    // Native playback controls and the transcript remain available.
  });
}

audioLanguages.forEach(button => button.addEventListener('click', () => {
  playIntroduction(button.dataset.founderLanguage);
}));
founderTrigger.addEventListener('click', () => {
  founderDialog.showModal();
  playIntroduction(english ? 'en' : 'ka');
});
founderDialog.addEventListener('close', () => {
  introduction.pause();
});
introduction.addEventListener('playing', () => {
  founderDialog.classList.add('is-speaking');
});
['pause', 'ended', 'emptied', 'error'].forEach(event => {
  introduction.addEventListener(event, () => founderDialog.classList.remove('is-speaking'));
});
founderTrigger.hidden = typeof founderDialog.showModal !== 'function';
