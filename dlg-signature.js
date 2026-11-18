/* Digital Law Georgia — restrained and accessible interaction.
   Service choices are user-driven rather than automatically changing while a
   prospective client reads. The complete first panel renders without JS. */
(() => {
  "use strict";
  const root = document.querySelector('[data-sig-practices]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-sig-tab]')];
  const panels = [...root.querySelectorAll('[data-sig-panel]')];
  if (tabs.length !== 4 || panels.length !== tabs.length) return;
  const select = (index, moveFocus = false) => {
    if (index < 0 || index >= tabs.length) return;
    const name = tabs[index].dataset.sigTab;
    tabs.forEach(tab => {
      const active = tab.dataset.sigTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    panels.forEach(panel => {
      const active = panel.dataset.sigPanel === name;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    if (moveFocus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      select(next, true);
    });
  });
  select(0);
})();
