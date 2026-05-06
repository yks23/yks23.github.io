/**
 * Homepage ink / starry-night style splash. Dismissed for the rest of the browser tab session.
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

  function drawFrame(ctx, w, h, t) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#050a14";
    ctx.fillRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.42;

    // Swirling bands (Van Gogh–like motion)
    ctx.globalCompositeOperation = "screen";
    for (let layer = 0; layer < 6; layer++) {
      const phase = t * 0.00035 + layer * 1.1;
      ctx.strokeStyle = `rgba(${30 + layer * 25}, ${60 + layer * 18}, ${120 + layer * 12}, 0.12)`;
      ctx.lineWidth = 18 + layer * 6;
      ctx.beginPath();
      for (let x = -80; x < w + 80; x += 6) {
        const wave =
          Math.sin(x * 0.008 + phase) * (90 + layer * 15) +
          Math.sin(x * 0.019 - phase * 0.7) * 40;
        const y = cy + wave + layer * 22;
        if (x === -80) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Golden accents
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 4; i++) {
      const gx = cx + Math.cos(t * 0.0002 + i * 1.7) * w * 0.35;
      const gy = cy + Math.sin(t * 0.00025 + i) * h * 0.25;
      const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.45);
      grd.addColorStop(0, `rgba(212, 175, 55, ${0.04 + i * 0.015})`);
      grd.addColorStop(0.4, "rgba(80, 60, 20, 0.02)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }

    // Ink wash blobs
    ctx.globalCompositeOperation = "multiply";
    for (let b = 0; b < 5; b++) {
      const bx = (w * (0.15 + b * 0.18) + Math.sin(t * 0.00015 + b) * 80) % w;
      const by = (h * (0.2 + b * 0.15) + Math.cos(t * 0.00012 + b * 2)) % h;
      const br = 120 + b * 70 + Math.sin(t * 0.0002 + b) * 30;
      const ink = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      ink.addColorStop(0, "rgba(12, 22, 48, 0.45)");
      ink.addColorStop(0.5, "rgba(8, 14, 32, 0.22)");
      ink.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.globalCompositeOperation = "source-over";
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
