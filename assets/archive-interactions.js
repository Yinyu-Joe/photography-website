(() => {
  const dialog = document.querySelector("#lightbox");
  const allTiles = [...document.querySelectorAll("[data-lightbox-item]")];
  if (!dialog || !allTiles.length || typeof dialog.showModal !== "function") return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const caption = dialog.querySelector("[data-lightbox-caption]");
  const meta = dialog.querySelector("[data-lightbox-meta]");
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  const previousButton = dialog.querySelector("[data-lightbox-prev]");
  const nextButton = dialog.querySelector("[data-lightbox-next]");
  const galleryUrl = `${location.pathname}${location.search}${location.hash}`;
  let tiles = allTiles;
  let activeIndex = 0;
  let returnFocus = null;

  function preloadNext() {
    const nextTile = tiles[(activeIndex + 1) % tiles.length];
    if (!nextTile?.dataset.fullSrc) return;
    const preload = new Image();
    preload.src = nextTile.dataset.fullSrc;
  }

  function update(index, historyMode = "none") {
    activeIndex = (index + tiles.length) % tiles.length;
    const tile = tiles[activeIndex];
    image.src = tile.dataset.fullSrc;
    image.alt = tile.dataset.title || "";
    title.textContent = tile.dataset.title || "";
    caption.textContent = tile.dataset.caption || "";
    meta.textContent = tile.dataset.meta || "";

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
  previousButton?.addEventListener("click", () => update(activeIndex - 1, "replace"));
  nextButton?.addEventListener("click", () => update(activeIndex + 1, "replace"));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("is-locked");
  });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") update(activeIndex - 1, "replace");
    if (event.key === "ArrowRight") update(activeIndex + 1, "replace");
  });
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
