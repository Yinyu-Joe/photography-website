// On phones, slide the fixed header away while the reader scrolls down
// and bring it back as soon as they scroll up. Styles live in styles.css.
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const phone = window.matchMedia("(max-width: 720px)");
  const minDelta = 8;
  let lastY = Math.max(window.scrollY, 0);
  let queued = false;

  function show() {
    header.classList.remove("is-hidden");
  }

  function update() {
    queued = false;
    const y = Math.max(window.scrollY, 0);
    const keepVisible =
      !phone.matches ||
      y <= header.offsetHeight ||
      header.contains(document.activeElement) ||
      document.body.classList.contains("is-locked");

    if (keepVisible) {
      show();
      lastY = y;
      return;
    }

    const delta = y - lastY;
    if (Math.abs(delta) < minDelta) return;
    header.classList.toggle("is-hidden", delta > 0);
    lastY = y;
  }

  window.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });

  header.addEventListener("focusin", show);
  phone.addEventListener?.("change", show);
})();
