(() => {
  const dialog = document.querySelector("#lightbox");
  const allTiles = [...document.querySelectorAll("[data-lightbox-item]")];
  if (!dialog || !allTiles.length || typeof dialog.showModal !== "function") return;

  const media = dialog.querySelector(".lightbox-media");
  const image = dialog.querySelector("[data-lightbox-image]");
  const avifSource = dialog.querySelector("[data-lightbox-avif]");
  const webpSource = dialog.querySelector("[data-lightbox-webp]");
  const count = dialog.querySelector("[data-lightbox-count]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const meta = dialog.querySelector("[data-lightbox-meta]");
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  const previousButton = dialog.querySelector("[data-lightbox-prev]");
  const nextButton = dialog.querySelector("[data-lightbox-next]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const galleryUrl = `${location.pathname}${location.search}${location.hash}`;
  let tiles = allTiles;
  let activeIndex = 0;
  let returnFocus = null;
  let changeToken = 0;
  let revealListeners = null;
  let swipe = null;

  function preloadNext() {
    const nextTile = tiles[(activeIndex + 1) % tiles.length];
    const preloadSource = nextTile?.dataset.lightboxWebpSrc || nextTile?.dataset.lightboxAvifSrc;
    if (!preloadSource) return;
    const preload = new Image();
    preload.src = preloadSource;
  }

  // "3 / 9" on screen; screen readers hear "Photo 3 of 9" (template comes from the page language).
  function showPosition() {
    if (!count) return;
    const total = tiles.length;
    count.hidden = total < 2;
    if (count.hidden) return;
    const current = activeIndex + 1;
    const visible = document.createElement("span");
    visible.setAttribute("aria-hidden", "true");
    visible.textContent = `${current} / ${total}`;
    const spoken = document.createElement("span");
    spoken.className = "sr-only";
    spoken.textContent = (count.dataset.positionLabel || "{current} / {total}")
      .replace("{current}", current)
      .replace("{total}", total);
    count.replaceChildren(visible, spoken);
  }

  function resetImageMotion() {
    revealListeners?.abort();
    revealListeners = null;
    image.classList.remove("is-dragging", "is-entering");
    image.style.removeProperty("transform");
    image.style.removeProperty("opacity");
  }

  // The new photo arrives from the side it lives on: next from the right, previous from the left.
  function enterFrom(direction) {
    const token = ++changeToken;
    if (!direction || reducedMotion.matches) {
      resetImageMotion();
      return;
    }
    const offset = Math.min(64, innerWidth * 0.08);
    image.classList.remove("is-dragging");
    image.classList.add("is-entering");
    image.style.transform = `translate3d(${direction * offset}px, 0, 0)`;
    image.style.opacity = "0";
    const reveal = () => {
      if (token !== changeToken) return;
      changeToken += 1;
      void image.offsetWidth;
      image.classList.remove("is-entering");
      image.style.removeProperty("transform");
      image.style.removeProperty("opacity");
    };
    // decode() keeps the slide smooth; load/error make sure the photo never stays hidden if decode() stalls.
    revealListeners?.abort();
    revealListeners = new AbortController();
    image.addEventListener("load", reveal, { once: true, signal: revealListeners.signal });
    image.addEventListener("error", reveal, { once: true, signal: revealListeners.signal });
    image.decode().then(reveal, reveal);
  }

  function update(index, historyMode = "none", direction = 0) {
    activeIndex = (index + tiles.length) % tiles.length;
    const tile = tiles[activeIndex];
    if (tile.dataset.lightboxAvifSrc) avifSource.srcset = tile.dataset.lightboxAvifSrc;
    else avifSource.removeAttribute("srcset");
    if (tile.dataset.lightboxWebpSrc) webpSource.srcset = tile.dataset.lightboxWebpSrc;
    else webpSource.removeAttribute("srcset");
    image.src = tile.dataset.fullSrc;
    image.alt = tile.dataset.alt || tile.dataset.title || "";
    title.textContent = tile.dataset.title || "";
    caption.textContent = tile.dataset.caption || "";
    meta.textContent = tile.dataset.meta || "";
    showPosition();
    enterFrom(direction);

    const state = { archiveLightbox: true, photoId: tile.dataset.photoId, galleryUrl };
    if (historyMode === "push") history.pushState(state, "", tile.href);
    if (historyMode === "replace") history.replaceState(state, "", tile.href);
    preloadNext();
  }

  function open(index, historyMode = "push") {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    update(index, historyMode);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("is-locked");
    closeButton?.focus({ preventScroll: true });
  }

  function close({ useHistory = true } = {}) {
    if (useHistory && history.state?.archiveLightbox) {
      history.back();
      return;
    }
    changeToken += 1;
    swipe = null;
    resetImageMotion();
    if (dialog.open) dialog.close();
    document.body.classList.remove("is-locked");
    returnFocus?.focus({ preventScroll: true });
    returnFocus = null;
  }

  allTiles.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      tiles = allTiles.filter((candidate) => candidate.dataset.lightboxGroup === tile.dataset.lightboxGroup);
      const index = tiles.indexOf(tile);
      open(index, "push");
    });
  });

  closeButton?.addEventListener("click", () => close());
  previousButton?.addEventListener("click", () => update(activeIndex - 1, "replace", -1));
  nextButton?.addEventListener("click", () => update(activeIndex + 1, "replace", 1));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("is-locked");
  });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") update(activeIndex - 1, "replace", -1);
    if (event.key === "ArrowRight") update(activeIndex + 1, "replace", 1);
  });

  // Phones: swipe left or right on the photo to move through the set. The photo follows the finger,
  // springs back if the swipe is short, and pinch-zoomed views keep their normal panning.
  function settleSwipe() {
    swipe = null;
    image.classList.remove("is-dragging");
    image.style.removeProperty("transform");
  }

  media?.addEventListener("touchstart", (event) => {
    swipe = null;
    if (event.touches.length !== 1 || tiles.length < 2 || (window.visualViewport?.scale ?? 1) > 1.01) return;
    const point = event.touches[0];
    swipe = { startX: point.clientX, startY: point.clientY, startTime: event.timeStamp, dx: 0, axis: null };
  }, { passive: true });

  media?.addEventListener("touchmove", (event) => {
    if (!swipe) return;
    if (event.touches.length !== 1) {
      settleSwipe();
      return;
    }
    const point = event.touches[0];
    const dx = point.clientX - swipe.startX;
    const dy = point.clientY - swipe.startY;
    if (!swipe.axis && Math.hypot(dx, dy) > 10) swipe.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (swipe.axis !== "x") return;
    swipe.dx = dx;
    if (reducedMotion.matches) return;
    image.classList.add("is-dragging");
    image.style.transform = `translate3d(${dx}px, 0, 0)`;
  }, { passive: true });

  media?.addEventListener("touchend", (event) => {
    if (!swipe) return;
    const { dx, axis, startTime } = swipe;
    const distance = Math.abs(dx);
    const flick = distance > 30 && event.timeStamp - startTime < 280;
    if (axis === "x" && (distance > Math.min(90, media.clientWidth * 0.2) || flick)) {
      swipe = null;
      const direction = dx < 0 ? 1 : -1;
      update(activeIndex + direction, "replace", direction);
      return;
    }
    settleSwipe();
  }, { passive: true });

  media?.addEventListener("touchcancel", settleSwipe, { passive: true });

  addEventListener("popstate", (event) => {
    if (event.state?.archiveLightbox) {
      const target = allTiles.find((tile) => tile.dataset.photoId === event.state.photoId);
      if (target) tiles = allTiles.filter((tile) => tile.dataset.lightboxGroup === target.dataset.lightboxGroup);
      const index = tiles.findIndex((tile) => tile.dataset.photoId === event.state.photoId);
      if (index >= 0) open(index, "none");
      return;
    }
    close({ useHistory: false });
  });
})();
