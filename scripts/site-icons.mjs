// DLG editorial icon family: one 36-unit grid, consistent stroke, no containers.
const marks = {
  ai: '<rect x="9" y="9" width="18" height="18" rx="2"/><path d="M13 4v5m5-5v5m5-5v5M13 27v5m5-5v5m5-5v5M4 13h5m-5 5h5m-5 5h5m18-10h5m-5 5h5m-5 5h5"/><path d="m14 22 4-9 4 9m-6.5-3h5"/>',
  privacy: '<path d="M18 4 30 9v9c0 6-4.7 11-12 14C10.7 29 6 24 6 18V9z"/><rect x="13.5" y="16" width="9" height="7" rx="1.2"/><path d="M15 16v-3a3 3 0 0 1 6 0v3"/>',
  contracts: '<path d="M8 4h14l6 6v22H8zM22 4v7h6M13 15h9m-9 4h7"/><path d="m13 25 3 3 6-6"/>',
  products: '<path d="m18 4 13 7.5L18 19 5 11.5 18 4Zm-13 14 13 7.5L31 18M5 24.5 18 32l13-7.5"/>',
  fintech: '<rect x="5" y="6" width="26" height="24" rx="2"/><path d="M5 12h26M10 24l6-6 5 4 6-7M23 15h4v4"/>',
  corporate: '<path d="M6 32h24M9 32V5h13v27m0-20h5v20M13 10h5m-5 5h5m-5 5h5m-5 5h5m7-8h2m-2 5h2m-2 5h2"/>',
};
export function practiceIcon(key, className = 'practice-glyph') {
  return `<svg class="${className}" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${marks[key]}</svg>`;
}
