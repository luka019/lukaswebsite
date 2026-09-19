(() => {
  "use strict";
  const syncContent = () => document.querySelectorAll('[data-content-language]').forEach(el => { el.hidden = el.dataset.contentLanguage !== document.documentElement.lang; });
  syncContent();
  document.addEventListener('site:language', syncContent);
  document.querySelector('[data-print-resource]')?.addEventListener('click', () => window.print());
  document.querySelector('[data-copy-resource]')?.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try { await navigator.clipboard.writeText(location.href); status.textContent = document.documentElement.lang === 'en' ? 'Link copied.' : 'ბმული დაკოპირებულია.'; }
    catch { status.textContent = document.documentElement.lang === 'en' ? 'Copy the address from your browser.' : 'დააკოპირეთ მისამართი ბრაუზერიდან.'; }
  });
  const controls = document.getElementById("resource-controls");
  if (!controls) return;
  const search = document.getElementById("resource-search");
  const topic = document.getElementById("resource-topic");
  const tabs = [...document.querySelectorAll("[data-resource-type]")];
  const cards = [...document.querySelectorAll("[data-resource-card]")];
  const count = document.getElementById("resource-count");
  const empty = document.getElementById("resource-empty");
  const emptyTitle = document.getElementById("resource-empty-title");
  const emptyDescription = document.getElementById("resource-empty-description");
  const reset = document.getElementById("resource-reset");
  const searchPlaceholderKa = search.placeholder;
  const catalogue = cards.map(card => ({ card, search: (card.dataset.search + " " + card.textContent).normalize("NFKC").toLocaleLowerCase() }));
  let kind = "all";
  function readFilters() {
    const params = new URLSearchParams(location.search);
    search.value = (params.get("q") || "").slice(0, 120);
    kind = tabs.some(tab => tab.dataset.resourceType === params.get("type")) ? params.get("type") : "all";
    topic.value = [...topic.options].some(option => option.value === params.get("topic")) ? params.get("topic") : "all";
  }
  function update(writeURL = true) {
    const en = document.documentElement.lang === "en";
    const words = search.value.trim().normalize("NFKC").toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    catalogue.forEach(item => {
      const matches = (kind === "all" || item.card.dataset.kind === kind) && (topic.value === "all" || item.card.dataset.topic === topic.value) && words.every(word => item.search.includes(word));
      item.card.hidden = !matches;
      if (matches) visible++;
    });
    tabs.forEach(tab => tab.setAttribute("aria-pressed", String(tab.dataset.resourceType === kind)));
    search.placeholder = en ? search.dataset.enPlaceholder : searchPlaceholderKa;
    count.textContent = en ? visible + (visible === 1 ? " resource" : " resources") : visible + " მასალა";
    empty.hidden = visible !== 0;
    emptyTitle.textContent = en ? "No matching resources." : "შესაბამისი მასალა ვერ მოიძებნა.";
    emptyDescription.textContent = en ? "Try another topic or show all resources." : "სცადეთ სხვა თემა ან ნახეთ ყველა რესურსი.";
    if (writeURL) {
      const url = new URL(location.href);
      [["q", search.value.trim()], ["type", kind === "all" ? "" : kind], ["topic", topic.value === "all" ? "" : topic.value]].forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
      history.replaceState(null, "", url);
    }
  }
  tabs.forEach(tab => tab.addEventListener("click", () => { kind = tab.dataset.resourceType; update(); }));
  search.addEventListener("input", () => update());
  topic.addEventListener("change", () => update());
  reset.addEventListener("click", () => { kind = "all"; search.value = ""; topic.value = "all"; update(); search.focus(); });
  document.addEventListener("site:language", () => update(false));
  window.addEventListener("popstate", () => { readFilters(); update(false); });
  readFilters();
  controls.hidden = false;
  update(false);
})();
