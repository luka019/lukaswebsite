(() => {
  const links = [...document.querySelectorAll('header [data-language-link]')];
  function destination(link) {
    const url = new URL(link.href);
    const current = new URL(location.href);
    url.search = current.search;
    url.searchParams.delete('lang');
    url.hash = current.hash;
    return url;
  }

  const language = new URL(location.href).searchParams.get('lang');
  const legacyLink = links.find(link => link.dataset.languageLink === language);
  if (legacyLink) {
    location.replace(destination(legacyLink));
    return;
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = destination(link);
    if (url.href !== location.href) location.assign(url);
  }));
})();
