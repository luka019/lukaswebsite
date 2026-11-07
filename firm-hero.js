/* Digital Law Georgia — accessible, original illustrated service carousel.
   Autoplay runs only while visible and unattended. Pointer hover, keyboard
   focus, document hiding, manual pause and reduced-motion settings stop it.
   Decorative SVG artwork is part of the source; no third-party photo requests.
*/
(() => {
  "use strict";
  const root = document.querySelector("[data-hero-rotator]");
  if (!root) return;
  const stage = root.querySelector(".dlg-photo-stage");
  const slides = [...root.querySelectorAll("[data-hero-slide]")];
  const tabs = [...root.querySelectorAll("[data-hero-topic]")];
  const previous = root.querySelector("[data-hero-prev]");
  const next = root.querySelector("[data-hero-next]");
  const pauseButton = root.querySelector("[data-hero-pause]");
  const pauseIcon = root.querySelector("[data-hero-pause-icon]");
  const counter = root.querySelector("[data-hero-count]");
  const dots = [...root.querySelectorAll("[data-hero-dot]")];
  const announcement = root.querySelector("[data-hero-announcement]");
  if (!stage || slides.length !== 4 || tabs.length !== slides.length || !pauseButton) return;

  const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let paused = Boolean(media?.matches);
  let userInitiatedPlayback = false;
  let active = 0;
  let visible = true;
  let hovered = false;
  let focused = false;
  let manualHold = false;
  let intervalId = null;
  let holdId = null;
  const intervalMs = 8000;
  const language = () => document.documentElement.lang === "en" ? "en" : "ka";

  function render(index, announce = false) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const selected = i === active;
      slide.hidden = !selected;
      slide.setAttribute("aria-hidden", String(!selected));
      slide.classList.toggle("is-current", selected);
    });
    tabs.forEach((tab, i) => {
      const selected = i === active;
      tab.classList.toggle("is-current", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-current", i === active));
    if (counter) counter.textContent = String(active + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    // Warm the next image so auto-rotation does not expose a blank slide.
    const following = slides[(active + 1) % slides.length]?.querySelector("img");
    if (following && following.loading === "lazy") following.loading = "eager";
    if (announce && announcement) {
      const text = slides[active].querySelector("figcaption strong");
      announcement.textContent = text?.textContent || "";
    }
  }

  function updatePause() {
    pauseButton.setAttribute("aria-pressed", String(paused));
    root.dataset.motionPaused = String(paused);
    document.documentElement.dataset.motionPaused = String(paused);
    if (pauseIcon) pauseIcon.innerHTML = paused
      ? '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m5 3 8 5-8 5z"/></svg>'
      : '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 3h3v10H4zM10 3h3v10h-3z"/></svg>';
    pauseButton.setAttribute("aria-label", language() === "en"
      ? paused ? "Resume animations and automatic slides" : "Pause animations and automatic slides"
      : paused ? "ანიმაციისა და ავტომატური გადართვის გაგრძელება" : "ანიმაციისა და ავტომატური გადართვის შეჩერება");
  }

  function allowed() {
    return !paused && (!media?.matches || userInitiatedPlayback) &&
      !hovered && !focused && !manualHold && visible && !document.hidden;
  }
  function syncAutoplay() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    if (allowed()) {
      intervalId = window.setInterval(() => {
        if (allowed()) render(active + 1, false);
        else syncAutoplay();
      }, intervalMs);
    }
  }
  function holdForReading() {
    manualHold = true;
    if (holdId !== null) window.clearTimeout(holdId);
    holdId = window.setTimeout(() => {
      manualHold = false;
      holdId = null;
      syncAutoplay();
    }, 11000);
    syncAutoplay();
  }
  function select(index) {
    render(index, true);
    holdForReading();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", event => {
      const to = event.key === "ArrowRight" || event.key === "ArrowDown" ? i + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp" ? i - 1
        : event.key === "Home" ? 0
        : event.key === "End" ? tabs.length - 1 : null;
      if (to === null) return;
      event.preventDefault();
      const target = (to + tabs.length) % tabs.length;
      select(target);
      tabs[target].focus();
    });
  });
  previous?.addEventListener("click", () => select(active - 1));
  next?.addEventListener("click", () => select(active + 1));
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    if (!paused) {
      userInitiatedPlayback = true;
      manualHold = false;
      if (holdId !== null) window.clearTimeout(holdId);
      holdId = null;
    }
    updatePause();
    syncAutoplay();
  });

  root.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      hovered = true;
      syncAutoplay();
    }
  });
  root.addEventListener("pointerleave", () => {
    hovered = false;
    syncAutoplay();
  });
  root.addEventListener("focusin", () => {
    focused = true;
    syncAutoplay();
  });
  root.addEventListener("focusout", event => {
    if (!event.relatedTarget || !root.contains(event.relatedTarget)) {
      focused = false;
      syncAutoplay();
    }
  });
  document.addEventListener("visibilitychange", syncAutoplay);
  document.addEventListener("site:language", updatePause);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        visible = entry.isIntersecting;
        syncAutoplay();
      }
    }, { threshold: 0.12 });
    observer.observe(root);
  }
  media?.addEventListener?.("change", event => {
    if (event.matches) {
      paused = true;
      userInitiatedPlayback = false;
      updatePause();
    }
    syncAutoplay();
  });

  let startTouch = null;
  stage.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch") startTouch = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  stage.addEventListener("pointerup", event => {
    if (!startTouch || event.pointerType !== "touch") return;
    const dx = event.clientX - startTouch.x;
    const dy = event.clientY - startTouch.y;
    startTouch = null;
    if (Math.abs(dx) > 54 && Math.abs(dx) > 1.3 * Math.abs(dy)) {
      select(active + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  stage.addEventListener("pointercancel", () => { startTouch = null; }, { passive: true });

  render(0, false);
  updatePause();
  syncAutoplay();
})();
