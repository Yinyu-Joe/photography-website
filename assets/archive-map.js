(() => {
  const canvas = document.querySelector("#worldMapCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const stage = canvas.closest(".map-stage");
  const markerLayer = stage?.querySelector(".archive-marker-layer");
  const markers = [...document.querySelectorAll(".archive-map-marker")];
  const markerPositions = markers.map((marker) => ({
    marker,
    x: Number.parseFloat(marker.style.getPropertyValue("--marker-x")) / 100,
    y: Number.parseFloat(marker.style.getPropertyValue("--marker-y")) / 100
  }));
  const isEnglish = document.documentElement.lang === "en";
  // The map keeps the projection's shape on every screen; the build writes it next to the canvas.
  const mapAspect = Number.parseFloat(canvas.dataset.mapAspect) || 2.0294;
  const maxZoom = 5;
  const view = { zoom: 1, x: 0, y: 0 };
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  // Land dots: one fine grid, and levels that each add the dots between the previous level's dots.
  let grid = null;
  let levels = [];
  let landMask = null;
  // How many levels of detail are showing; between two whole numbers the next level is fading in.
  let detail = 0;
  let detailTarget = 0;
  let detailFrame = 0;
  let detailTime = 0;
  let painted = false;
  let activeCluster = null;
  let observedWidth = 0;
  let observedHeight = 0;
  let renderQueued = false;
  let drag = null;
  let touch = null;
  let suppressClick = false;

  const chooser = document.createElement("div");
  chooser.className = "archive-map-chooser";
  chooser.id = "archive-map-chooser";
  chooser.hidden = true;
  chooser.setAttribute("role", "group");
  chooser.setAttribute("aria-label", isEnglish ? "Choose a photographed place" : "选择拍摄地点");
  stage?.append(chooser);

  function closeChooser() {
    activeCluster?.setAttribute("aria-expanded", "false");
    chooser.hidden = true;
    chooser.replaceChildren();
    activeCluster = null;
  }

  function positionChooser() {
    if (chooser.hidden || !activeCluster) return;
    const bounds = stage.getBoundingClientRect();
    const anchor = activeCluster.getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportTop = viewport?.offsetTop || 0;
    const viewportLeft = viewport?.offsetLeft || 0;
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 0;
    const top = Math.max(bounds.top, headerBottom, viewportTop) + 12;
    const bottom = Math.min(bounds.bottom, viewportTop + (viewport?.height || innerHeight)) - 12;
    const left = Math.max(bounds.left, viewportLeft) + 12;
    const right = Math.min(bounds.right, viewportLeft + (viewport?.width || innerWidth)) - 12;
    const above = Math.max(0, anchor.top - 12 - top);
    const below = Math.max(0, bottom - anchor.bottom - 12);
    chooser.style.maxHeight = `${Math.max(0, bottom - top)}px`;
    const naturalHeight = chooser.scrollHeight;
    const openAbove = above >= naturalHeight || above > below;
    const availableHeight = openAbove ? above : below;
    chooser.style.maxHeight = `${Math.max(0, availableHeight)}px`;
    const menu = chooser.getBoundingClientRect();
    const x = Math.max(left, Math.min(anchor.left + anchor.width / 2 - menu.width / 2, right - menu.width));
    const y = openAbove ? anchor.top - 12 - menu.height : anchor.bottom + 12;
    chooser.style.left = `${x - bounds.left}px`;
    chooser.style.top = `${Math.max(top, Math.min(y, bottom - menu.height)) - bounds.top}px`;
  }

  function showChooser(candidates) {
    const label = document.createElement("p");
    label.textContent = isEnglish ? "Nearby places" : "附近地点";
    const list = document.createElement("ul");
    for (const marker of candidates) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = marker.href;
      link.textContent = [marker.dataset.placeLabel, marker.dataset.placeCountry].filter(Boolean).join(" · ");
      item.append(link);
      list.append(item);
    }
    chooser.replaceChildren(label, list);
    chooser.hidden = false;
    activeCluster.setAttribute("aria-expanded", "true");
    positionChooser();
    chooser.scrollTop = 0;
    chooser.querySelector("a")?.focus({ preventScroll: true });
  }

  function setupClusters() {
    markerLayer?.querySelectorAll(".archive-map-cluster").forEach((cluster) => cluster.remove());
    for (const marker of markers) {
      marker.classList.remove("is-clustered");
      marker.removeAttribute("aria-hidden");
      marker.removeAttribute("tabindex");
    }

    const remaining = new Set(markers);
    const groups = [];
    const distanceThreshold = 52;
    while (remaining.size) {
      const seed = remaining.values().next().value;
      remaining.delete(seed);
      const group = [seed];
      for (let index = 0; index < group.length; index += 1) {
        const sourceBounds = group[index].getBoundingClientRect();
        const sourceX = sourceBounds.left + sourceBounds.width / 2;
        const sourceY = sourceBounds.top + sourceBounds.height / 2;
        for (const candidate of [...remaining]) {
          const candidateBounds = candidate.getBoundingClientRect();
          const candidateX = candidateBounds.left + candidateBounds.width / 2;
          const candidateY = candidateBounds.top + candidateBounds.height / 2;
          if (Math.hypot(sourceX - candidateX, sourceY - candidateY) >= distanceThreshold) continue;
          remaining.delete(candidate);
          group.push(candidate);
        }
      }
      groups.push(group);
    }

    for (const group of groups.filter((entry) => entry.length > 1)) {
      for (const marker of group) {
        marker.classList.add("is-clustered");
        marker.setAttribute("aria-hidden", "true");
        marker.tabIndex = -1;
      }
      // The group's circle sits in the middle of its places, which are hidden while grouped.
      const middle = (property) => group.reduce((sum, marker) => sum + Number.parseFloat(marker.style.getPropertyValue(property)), 0) / group.length;
      const cluster = document.createElement("button");
      cluster.className = "archive-map-cluster";
      cluster.type = "button";
      cluster.setAttribute("aria-controls", chooser.id);
      cluster.setAttribute("aria-expanded", "false");
      cluster.style.setProperty("--marker-x", `${middle("--marker-x")}%`);
      cluster.style.setProperty("--marker-y", `${middle("--marker-y")}%`);
      cluster.setAttribute("aria-label", isEnglish ? `${group.length} nearby photographed places` : `${group.length} 个附近拍摄地点`);
      const count = document.createElement("span");
      count.textContent = String(group.length);
      count.setAttribute("aria-hidden", "true");
      cluster.append(count);
      cluster.addEventListener("click", () => {
        if (activeCluster === cluster) {
          closeChooser();
          return;
        }
        closeChooser();
        activeCluster = cluster;
        showChooser(group);
      });
      markerLayer?.append(cluster);
    }
  }

  function mapBox(width, height) {
    const boxWidth = Math.min(width, height * mapAspect);
    const boxHeight = boxWidth / mapAspect;
    return { left: (width - boxWidth) / 2, top: (height - boxHeight) / 2, width: boxWidth, height: boxHeight };
  }

  function onLevel(level, column, row) {
    const { step, checker } = levels[level];
    return column % step === 0 && row % step === 0 && (!checker || ((column + row) / step) % 2 === 0);
  }

  function loadDots(data) {
    grid = data.grid;
    levels = data.levels;
    landMask = new Uint8Array(grid.columns * grid.rows);
    levels.forEach(({ step, checker, rows }, level) => {
      const bit = 1 << level;
      for (const [row, ...runs] of rows) {
        const offset = checker && (row / step) % 2 ? step : 0;
        const stride = checker ? step * 2 : step;
        let position = 0;
        for (let index = 0; index < runs.length; index += 2) {
          position += runs[index];
          for (const end = position + runs[index + 1]; position < end; position += 1) {
            landMask[row * grid.columns + offset + position * stride] |= bit;
          }
        }
      }
    });

    // Every photographed place keeps a dot under it at every level, even on a reef too small for the outlines.
    for (const { x, y } of markerPositions) {
      const column = x * grid.width - grid.origin;
      const row = y * grid.height - grid.origin;
      levels.forEach(({ step }, level) => {
        let nearest = -1;
        let nearestDistance = Infinity;
        for (let r = Math.floor(row / step) * step - step; r <= row + step * 2; r += step) {
          for (let c = Math.floor(column / step) * step - step; c <= column + step * 2; c += step) {
            if (r < 0 || c < 0 || r >= grid.rows || c >= grid.columns || !onLevel(level, c, r)) continue;
            const distance = Math.hypot(c - column, r - row);
            if (distance < nearestDistance) {
              nearest = r * grid.columns + c;
              nearestDistance = distance;
            }
          }
        }
        if (nearest >= 0) landMask[nearest] |= 1 << level;
      });
    }
  }

  // Finer levels fade in once their dots sit about as far apart on screen as the full map's dots do,
  // so the map gains coastline and islands as it grows instead of just showing bigger dots.
  function spacing(level) {
    return levels[level].step * (levels[level].checker ? Math.SQRT2 : 1);
  }

  function targetDetail(box) {
    const coarsest = (box.width / grid.width) * spacing(0);
    const comfortable = Math.max(coarsest * 0.9, 4);
    const reach = Math.log2((coarsest * view.zoom) / comfortable);
    let target = 0;
    for (let level = 1; level < levels.length; level += 1) {
      const needed = Math.log2(spacing(0) / spacing(level));
      target += Math.min(1, Math.max(0, (reach - needed + 0.5) / 0.5));
    }
    return target;
  }

  function stepDetail(time) {
    detailFrame = 0;
    const elapsed = detailTime ? Math.min(64, time - detailTime) : 16;
    detailTime = time;
    detail += (detailTarget - detail) * (1 - Math.exp(-elapsed / 120));
    if (Math.abs(detailTarget - detail) < 0.01) detail = detailTarget;
    draw();
  }

  function draw() {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    if (!landMask) return;

    const box = mapBox(bounds.width, bounds.height);
    detailTarget = targetDetail(box);
    if (!painted || reducedMotion.matches) detail = detailTarget;
    painted = true;
    if (detail !== detailTarget && !detailFrame) {
      detailFrame = requestAnimationFrame(stepDetail);
    } else if (detail === detailTarget) {
      detailTime = 0;
    }

    const coarse = Math.min(Math.floor(detail), levels.length - 1);
    const mix = Math.min(1, detail - coarse);
    const shown = mix > 0 ? coarse + 1 : coarse;
    const coarseBit = 1 << coarse;
    const shownBit = 1 << shown;
    const { step, checker } = levels[shown];
    const radius = Math.min(2, Math.max(0.62, (box.width / grid.width) * levels[0].step * 0.24)) * view.zoom ** 0.2;

    // Only the grid lines on screen are visited.
    const toColumn = (screenX) => ((screenX - view.x) / view.zoom - box.left) / box.width * grid.width - grid.origin;
    const toRow = (screenY) => ((screenY - view.y) / view.zoom - box.top) / box.height * grid.height - grid.origin;
    const firstColumn = Math.max(0, Math.floor(toColumn(-radius)));
    const lastColumn = Math.min(grid.columns - 1, Math.ceil(toColumn(bounds.width + radius)));
    const firstRow = Math.max(0, Math.ceil(toRow(-radius) / step) * step);
    const lastRow = Math.min(grid.rows - 1, Math.floor(toRow(bounds.height + radius)));

    const steady = new Path2D();
    const leaving = new Path2D();
    const arriving = new Path2D();
    for (let row = firstRow; row <= lastRow; row += step) {
      const offset = checker && (row / step) % 2 ? step : 0;
      const stride = checker ? step * 2 : step;
      const y = (box.top + ((grid.origin + row) / grid.height) * box.height) * view.zoom + view.y;
      for (let column = offset + Math.ceil((firstColumn - offset) / stride) * stride; column <= lastColumn; column += stride) {
        const bits = landMask[row * grid.columns + column];
        if (!bits) continue;
        const inCoarse = (bits & coarseBit) && (shown === coarse || onLevel(coarse, column, row));
        const inShown = bits & shownBit;
        const path = inCoarse ? (inShown || shown === coarse ? steady : leaving) : inShown ? arriving : null;
        if (!path) continue;
        const x = (box.left + ((grid.origin + column) / grid.width) * box.width) * view.zoom + view.x;
        path.moveTo(x + radius, y);
        path.arc(x, y, radius, 0, Math.PI * 2);
      }
    }

    context.fillStyle = "rgb(28, 28, 28)";
    context.globalAlpha = 0.16;
    context.fill(steady);
    if (mix > 0) {
      context.globalAlpha = 0.16 * (1 - mix);
      context.fill(leaving);
      context.globalAlpha = 0.16 * mix;
      context.fill(arriving);
    }
    context.globalAlpha = 1;
  }

  function clampView(width, height) {
    view.x = Math.min(0, Math.max(width * (1 - view.zoom), view.x));
    view.y = Math.min(0, Math.max(height * (1 - view.zoom), view.y));
  }

  function positionMarkers(width, height) {
    const box = mapBox(width, height);
    for (const { marker, x, y } of markerPositions) {
      marker.style.setProperty("--marker-x", `${(((box.left + x * box.width) * view.zoom + view.x) / width) * 100}%`);
      marker.style.setProperty("--marker-y", `${(((box.top + y * box.height) * view.zoom + view.y) / height) * 100}%`);
    }
  }

  function renderView() {
    renderQueued = false;
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    clampView(bounds.width, bounds.height);
    stage.classList.toggle("is-zoomed", view.zoom > 1);
    draw();
    positionMarkers(bounds.width, bounds.height);
    setupClusters();
  }

  function queueRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(renderView);
  }

  function clampZoom(zoom) {
    return Math.min(maxZoom, Math.max(1, zoom));
  }

  function zoomMap(scale, clientX, clientY) {
    const bounds = stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const nextZoom = clampZoom(view.zoom * scale);
    if (nextZoom === view.zoom) return;

    const anchorX = Math.min(bounds.width, Math.max(0, clientX - bounds.left));
    const anchorY = Math.min(bounds.height, Math.max(0, clientY - bounds.top));
    const ratio = nextZoom / view.zoom;
    view.x = anchorX + (view.x - anchorX) * ratio;
    view.y = anchorY + (view.y - anchorY) * ratio;
    view.zoom = nextZoom;
    clampView(bounds.width, bounds.height);
    if (!chooser.hidden) closeChooser();
    queueRender();
  }

  function panMap(deltaX, deltaY) {
    if (view.zoom === 1) return;
    const bounds = stage.getBoundingClientRect();
    view.x += deltaX;
    view.y += deltaY;
    clampView(bounds.width, bounds.height);
    if (!chooser.hidden) closeChooser();
    queueRender();
  }

  stage?.addEventListener("wheel", (event) => {
    const lineScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1;
    const scale = Math.exp(-event.deltaY * lineScale * 0.0035);
    // At full size the wheel keeps scrolling the page, so the footer stays reachable.
    if (clampZoom(view.zoom * scale) === view.zoom || (view.zoom === 1 && window.scrollY > 1)) return;
    event.preventDefault();
    zoomMap(scale, event.clientX, event.clientY);
  }, { passive: false });

  stage?.addEventListener("keydown", (event) => {
    if (chooser.contains(event.target)) return;
    const arrows = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] };
    if (arrows[event.key] && view.zoom > 1) {
      event.preventDefault();
      panMap(...arrows[event.key]);
      return;
    }
    if (!["+", "=", "-", "_", "0"].includes(event.key)) return;
    event.preventDefault();
    const bounds = stage.getBoundingClientRect();
    const scale = event.key === "0" ? 1 / view.zoom : ["+", "="].includes(event.key) ? 1.22 : 1 / 1.22;
    zoomMap(scale, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
  });

  // Mouse: drag the map once it is zoomed in.
  stage?.addEventListener("dragstart", (event) => event.preventDefault());
  stage?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0 || view.zoom === 1 || chooser.contains(event.target)) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  });
  stage?.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    if (!drag.moved) {
      if (Math.hypot(deltaX, deltaY) < 4) return;
      drag.moved = true;
      stage.setPointerCapture(drag.id);
      stage.classList.add("is-dragging");
    }
    drag.x = event.clientX;
    drag.y = event.clientY;
    panMap(deltaX, deltaY);
  });
  function endDrag() {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
    stage.classList.remove("is-dragging");
    drag = null;
  }
  stage?.addEventListener("pointerup", endDrag);
  stage?.addEventListener("pointercancel", endDrag);
  stage?.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);

  // Touch: pinch with two fingers, then move the zoomed map with one.
  // At full size one finger is left to the browser, so the page still scrolls.
  function touchState(touches) {
    const points = [...touches];
    const [first, second] = points;
    return {
      count: points.length,
      x: points.reduce((sum, point) => sum + point.clientX, 0) / points.length,
      y: points.reduce((sum, point) => sum + point.clientY, 0) / points.length,
      distance: second ? Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY) : 0
    };
  }

  stage?.addEventListener("touchstart", (event) => {
    if (chooser.contains(event.target)) return;
    if (event.touches.length > 1) event.preventDefault();
    touch = { ...touchState(event.touches), moved: touch?.moved || false };
  }, { passive: false });

  stage?.addEventListener("touchmove", (event) => {
    if (!touch || chooser.contains(event.target)) return;
    const next = touchState(event.touches);
    if (next.count === 1 && view.zoom === 1) return;
    if (next.count !== touch.count) {
      touch = { ...next, moved: touch.moved };
      return;
    }
    if (next.count === 1 && !touch.moved && Math.hypot(next.x - touch.x, next.y - touch.y) < 6) return;
    if (event.cancelable) event.preventDefault();
    if (next.count > 1 && touch.distance) zoomMap(next.distance / touch.distance, next.x, next.y);
    panMap(next.x - touch.x, next.y - touch.y);
    touch = { ...next, moved: true };
  }, { passive: false });

  function endTouch(event) {
    if (!touch) return;
    if (event.touches.length) {
      touch = { ...touchState(event.touches), moved: touch.moved };
      return;
    }
    if (touch.moved && event.cancelable) event.preventDefault();
    touch = null;
  }
  stage?.addEventListener("touchend", endTouch, { passive: false });
  stage?.addEventListener("touchcancel", endTouch, { passive: false });
  stage?.addEventListener("gesturestart", (event) => event.preventDefault());

  chooser.addEventListener("click", (event) => event.stopPropagation());
  chooser.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });
  document.addEventListener("focusin", (event) => {
    if (!chooser.hidden && !chooser.contains(event.target) && event.target !== activeCluster) closeChooser();
  });
  addEventListener("scroll", positionChooser, { passive: true });
  window.visualViewport?.addEventListener("resize", positionChooser);
  document.addEventListener("click", (event) => {
    if (!chooser.hidden && !chooser.contains(event.target) && !event.target.closest(".archive-map-cluster")) closeChooser();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !chooser.hidden) {
      const returnFocus = activeCluster;
      closeChooser();
      returnFocus?.focus({ preventScroll: true });
    }
  });

  fetch(canvas.dataset.worldDotsSrc || "/assets/world-dots.json")
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("map data unavailable")))
    .then((data) => {
      if (!data.grid || !Array.isArray(data.levels) || !data.levels.length) throw new Error("map data unreadable");
      loadDots(data);
      draw();
    })
    .catch(() => {
      canvas.hidden = true;
    });

  new ResizeObserver(() => {
    const bounds = canvas.getBoundingClientRect();
    const sizeChanged = Math.round(bounds.width) !== Math.round(observedWidth)
      || Math.round(bounds.height) !== Math.round(observedHeight);
    if (sizeChanged && observedWidth && observedHeight) {
      const restoreFocus = chooser.contains(document.activeElement);
      closeChooser();
      if (restoreFocus) stage.focus({ preventScroll: true });
      view.x *= bounds.width / observedWidth;
      view.y *= bounds.height / observedHeight;
      clampView(bounds.width, bounds.height);
    }
    observedWidth = bounds.width;
    observedHeight = bounds.height;
    if (sizeChanged) positionMarkers(bounds.width, bounds.height);
    draw();
    if (sizeChanged && chooser.hidden) setupClusters();
  }).observe(canvas);
})();
