/**
 * Homepage forest splash. Dismissed for the rest of the browser tab session.
 */
(function () {
  const STORAGE_KEY = "yks23_home_splash_seen";

  function clearSplashPending() {
    document.documentElement.classList.remove("home-splash-pending");
  }

  function lockScroll(lock) {
    document.documentElement.classList.toggle("home-splash--locked", lock);
  }

  function resizeCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function drawCanopy(ctx, w, h, t, layer) {
    const yBase = h * layer.y;
    const sway = Math.sin(t * layer.speed + layer.phase) * layer.sway;
    ctx.fillStyle = layer.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let x = -40; x <= w + 40; x += 28) {
      const wave =
        Math.sin(x * layer.freq + t * layer.speed + layer.phase) * layer.amp +
        Math.sin(x * layer.freq * 0.53 - t * layer.speed * 0.7) * layer.amp * 0.55;
      ctx.lineTo(x + sway, yBase + wave);
    }
    ctx.lineTo(w + 40, 0);
    ctx.closePath();
    ctx.fill();
  }

  function drawTrunks(ctx, w, h, t, layer) {
    ctx.fillStyle = layer.color;
    const count = Math.ceil(w / layer.gap) + 3;
    for (let i = -1; i < count; i++) {
      const baseX = i * layer.gap + layer.offset;
      const noise = Math.sin(i * 8.37 + layer.phase) * layer.gap * 0.22;
      const x = baseX + noise + Math.sin(t * layer.speed + i) * layer.sway;
      const width = layer.width + (Math.sin(i * 2.1) + 1) * layer.width * 0.32;
      const top = h * layer.top + Math.sin(i * 1.7) * 28;
      const grd = ctx.createLinearGradient(x, top, x + width, h);
      grd.addColorStop(0, layer.color);
      grd.addColorStop(0.45, layer.mid);
      grd.addColorStop(1, layer.dark);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.moveTo(x - width * 0.45, h);
      ctx.lineTo(x - width * 0.18, top);
      ctx.lineTo(x + width * 0.32, top);
      ctx.lineTo(x + width * 0.58, h);
      ctx.closePath();
      ctx.fill();

      if (layer.branches) {
        ctx.strokeStyle = layer.mid;
        ctx.lineWidth = Math.max(1, width * 0.16);
        ctx.lineCap = "round";
        for (let b = 0; b < 2; b++) {
          const by = top + (h - top) * (0.28 + b * 0.18);
          const dir = (i + b) % 2 === 0 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(x + width * 0.12, by);
          ctx.lineTo(x + dir * (width * 4.5), by - 36 - b * 18);
          ctx.stroke();
        }
      }
    }
  }

  function drawMist(ctx, w, h, t) {
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 5; i++) {
      const y = h * (0.22 + i * 0.12);
      const x = ((t * (0.006 + i * 0.002) + i * w * 0.22) % (w + 260)) - 130;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h) * 0.36);
      grd.addColorStop(0, `rgba(164, 182, 158, ${0.034 - i * 0.004})`);
      grd.addColorStop(0.48, "rgba(112, 136, 115, 0.018)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = "source-over";
  }

  function drawLight(ctx, w, h, t) {
    ctx.globalCompositeOperation = "screen";
    const shift = Math.sin(t * 0.00018) * w * 0.08;
    const grd = ctx.createLinearGradient(w * 0.18 + shift, 0, w * 0.78 + shift, h);
    grd.addColorStop(0, "rgba(182, 196, 171, 0.075)");
    grd.addColorStop(0.35, "rgba(128, 150, 126, 0.035)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  }

  function drawFrame(ctx, w, h, now) {
    const t = now || 0;

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#0f1b15");
    sky.addColorStop(0.38, "#12241b");
    sky.addColorStop(0.72, "#172d22");
    sky.addColorStop(1, "#0c1712");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    drawLight(ctx, w, h, t);
    drawMist(ctx, w, h, t);

    drawCanopy(ctx, w, h, t, {
      y: 0.2,
      amp: 28,
      freq: 0.012,
      speed: 0.0002,
      sway: 10,
      phase: 0.4,
      color: "rgba(27, 61, 42, 0.62)",
    });
    drawCanopy(ctx, w, h, t, {
      y: 0.34,
      amp: 38,
      freq: 0.016,
      speed: -0.00016,
      sway: 16,
      phase: 2.1,
      color: "rgba(18, 48, 34, 0.72)",
    });

    drawTrunks(ctx, w, h, t, {
      gap: 138,
      offset: 30,
      width: 16,
      top: 0.12,
      speed: 0.00015,
      sway: 5,
      phase: 1.2,
      color: "rgba(36, 70, 50, 0.38)",
      mid: "rgba(27, 56, 40, 0.48)",
      dark: "rgba(10, 24, 18, 0.78)",
      branches: false,
    });
    drawTrunks(ctx, w, h, t, {
      gap: 104,
      offset: 8,
      width: 24,
      top: 0.04,
      speed: 0.00024,
      sway: 8,
      phase: 3.4,
      color: "rgba(28, 54, 39, 0.58)",
      mid: "rgba(19, 42, 31, 0.68)",
      dark: "rgba(7, 17, 13, 0.9)",
      branches: true,
    });

    const ground = ctx.createLinearGradient(0, h * 0.64, 0, h);
    ground.addColorStop(0, "rgba(10, 24, 17, 0)");
    ground.addColorStop(0.65, "rgba(8, 19, 14, 0.58)");
    ground.addColorStop(1, "rgba(5, 12, 9, 0.9)");
    ctx.fillStyle = ground;
    ctx.fillRect(0, h * 0.55, w, h * 0.45);
  }

  function startLoop(canvas, reducedMotion) {
    let raf = 0;
    let { ctx, w, h } = resizeCanvas(canvas);

    const onResize = () => {
      ({ ctx, w, h } = resizeCanvas(canvas));
      if (reducedMotion) {
        drawFrame(ctx, w, h, 0);
      }
    };
    window.addEventListener("resize", onResize);

    if (reducedMotion) {
      drawFrame(ctx, w, h, 0);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    const loop = (now) => {
      drawFrame(ctx, w, h, now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }

  function randomizeTagline(root) {
    const tagline = root.querySelector(".home-splash__tagline");
    if (!tagline) return;

    try {
      const taglines = JSON.parse(tagline.getAttribute("data-taglines") || "[]");
      if (taglines.length) {
        tagline.textContent = taglines[Math.floor(Math.random() * taglines.length)];
      }
    } catch (e) {}
  }

  function dismiss(root) {
    clearSplashPending();
    root.classList.add("home-splash--hide");
    lockScroll(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(() => {
      root.remove();
    }, 800);
  }

  function init() {
    const root = document.getElementById("home-splash");
    if (!root) return;

    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      clearSplashPending();
      root.remove();
      return;
    }

    randomizeTagline(root);

    const canvas = root.querySelector(".home-splash__canvas");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    lockScroll(true);

    let stopLoop = () => {};
    if (canvas instanceof HTMLCanvasElement) {
      stopLoop = startLoop(canvas, reducedMotion);
    }

    const onDismiss = () => {
      stopLoop();
      root.removeEventListener("click", onDismiss);
      root.removeEventListener("keydown", onKey);
      dismiss(root);
    };

    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        onDismiss();
      }
    };

    root.addEventListener("click", onDismiss);
    root.addEventListener("keydown", onKey);
    root.setAttribute("tabindex", "-1");
    root.focus({ preventScroll: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
