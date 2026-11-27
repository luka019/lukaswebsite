// Original Digital Law Georgia practice icons.
const marks = {
  ai: '<circle cx="18" cy="18" r="4"/><circle cx="6" cy="7" r="3"/><circle cx="30" cy="7" r="3"/><circle cx="6" cy="29" r="3"/><circle cx="30" cy="29" r="3"/><path d="M9 9l6 6m6 0 6-6M9 27l6-6m6 0 6 6"/>',
  privacy: '<path d="M18 3l13 5v10c0 7-5 12-13 15C10 30 5 25 5 18V8z"/><path d="m12 18 4 4 8-9"/>',
  contracts: '<path d="M8 3h15l6 6v24H8zM23 3v7h6M13 16h11M13 21h11M13 26h7"/><path d="M4 8v24"/>',
  products: '<rect x="3" y="5" width="30" height="25" rx="1"/><path d="M3 12h30M8 8.5h.1m4 0h.1M9 18h7v7H9zm11 0h8m-8 4h8m-8 3h5"/>',
  fintech: '<path d="M4 31h28M7 27V16m8 11V9m8 18V13m7 14V5"/><path d="m5 13 10-8 8 4 7-5"/>',
  corporate: '<path d="M3 12 18 4l15 8H3Zm3 18h24M9 15v11m9-11v11m9-11v11M3 33h30"/>',
};

export function practiceIcon(key, className = 'practice-glyph') {
  return `<svg class="${className}" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${marks[key]}</svg>`;
}
