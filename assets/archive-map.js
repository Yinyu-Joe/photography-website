(() => {
  const canvas = document.querySelector("#worldMapCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  let dots = [];

  function draw() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.fillStyle = "rgba(28, 28, 28, 0.16)";
    const radius = bounds.width < 640 ? 1.15 : 1.65;
    for (const dot of dots) {
      context.beginPath();
      context.arc((dot.x / 100) * bounds.width, (dot.y / 100) * bounds.height, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  fetch("/assets/world-dots.json")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("map data unavailable")))
    .then((data) => {
      dots = Array.isArray(data.dots) ? data.dots : [];
      draw();
    })
    .catch(() => {
      canvas.hidden = true;
    });

  new ResizeObserver(draw).observe(canvas);
})();
