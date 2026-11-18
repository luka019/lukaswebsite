/* Client-side enhancement for Digital Law Georgia's practice directory.
 * Without JavaScript all eight practices stay visible; no data is collected. */
(() => {
 'use strict';
 const section = document.querySelector('#services');
 const toolbar = section?.querySelector('[data-dlg-practice-tools]');
 const cards = section ? Array.from(section.querySelectorAll('.sig-service-row[data-dlg-practice-group]')) : [];
 if (!toolbar || cards.length === 0) return;
 const buttons = Array.from(toolbar.querySelectorAll('[data-dlg-practice-filter]'));
 const search = toolbar.querySelector('[data-dlg-practice-search]');
 const empty = section.querySelector('[data-dlg-practice-empty]');
 const count = toolbar.querySelector('[data-dlg-practice-count]');
 if (!buttons.length || !search || !empty || !count) return;
 const names = cards.map(node => {
  const english = Array.from(node.querySelectorAll('[data-en]')).map(n => n.getAttribute('data-en')).join(' ');
  return (node.textContent + ' ' + english).normalize('NFKC').toLocaleLowerCase();
 });
 let active = 'all';
 function render() {
  const query = search.value.normalize('NFKC').trim().toLocaleLowerCase();
  let visible = 0;
  cards.forEach((node,i) => {
   const match = (active === 'all' || node.dataset.dlgPracticeGroup === active) &&
    (!query || names[i].includes(query));
   node.hidden = !match;
   if(match) visible += 1;
  });
  buttons.forEach(btn => btn.setAttribute('aria-pressed',String(btn.dataset.dlgPracticeFilter === active)));
  empty.hidden = visible !== 0;
  count.textContent = document.documentElement.lang === 'en' ? visible + ' areas' : visible + ' მიმართულება';
 }
 buttons.forEach(btn => btn.addEventListener('click',() => {
  active = btn.dataset.dlgPracticeFilter || 'all';
  render();
 }));
 search.addEventListener('input',render);
 toolbar.hidden = false;
 render();
})();
