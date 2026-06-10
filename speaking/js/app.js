/* =====================================================
   Pratik Renuse — /speaking/
   Scroll engine + image-sequence canvas (Royal-Pop pattern)
   ===================================================== */

(() => {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── 1. LOADER ─────────────────────────────────────────── */
  const loader = $('#loader');
  const fill   = $('#loader-bar-fill');
  const pct    = $('#loader-percent');

  function fakeLoader(done) {
    let p = 0;
    const step = () => {
      p += (100 - p) * 0.08 + 0.6;
      if (p >= 99.5) p = 100;
      fill.style.width = p + '%';
      pct.textContent  = Math.round(p) + '%';
      if (p < 100) requestAnimationFrame(step);
      else setTimeout(done, 220);
    };
    requestAnimationFrame(step);
  }

  /* ─── 2. CANVAS (image sequence) ────────────────────────── */
  // We don't have an extracted JPG sequence, so we simulate it with
  // the hero.jpg drawn at progressively different crops/zooms — gives
  // the same scroll-driven motion feel as Royal Pop's frame sequence.
  const canvas = $('#canvas');
  const ctx    = canvas ? canvas.getContext('2d', { alpha: false }) : null;
  const heroImg  = new Image();
  const aboutImg = new Image();
  heroImg.src  = '../hero.jpg';
  aboutImg.src = '../about.jpg';
  let canvasReady = false;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cw = 0, ch = 0;

  function resizeCanvas() {
    if (!canvas) return;
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width  = cw * dpr;
    canvas.height = ch * dpr;
    canvas.style.width  = cw + 'px';
    canvas.style.height = ch + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    drawCanvasAtProgress(currentP);
  });

  // progress 0 → 1 across the whole scroll-container
  let currentP = 0;
  function drawCanvasAtProgress(p) {
    if (!canvasReady || !ctx) return;
    currentP = p;
    ctx.fillStyle = '#0E0B08';
    ctx.fillRect(0, 0, cw, ch);

    // Pick which image dominates: hero.jpg for the first 60%, then crossfade to about.jpg
    const xfade = Math.max(0, Math.min(1, (p - 0.5) / 0.25));

    // Draw hero (full → zoomed-in pan as p grows)
    drawCover(heroImg, p, 1 - xfade);
    if (aboutImg.complete && aboutImg.naturalWidth) {
      drawCover(aboutImg, 1 - p, xfade);
    }

    // Vignette
    const grd = ctx.createRadialGradient(cw/2, ch/2, Math.min(cw,ch)*0.2, cw/2, ch/2, Math.max(cw,ch)*0.7);
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, cw, ch);
  }

  // Draw `img` to cover the canvas, with a Ken-Burns pan/zoom driven by progress
  function drawCover(img, p, alpha) {
    if (!img.complete || !img.naturalWidth || alpha <= 0) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const canvasAR = cw / ch;
    const imgAR    = iw / ih;

    // Start zoomed out a touch, zoom in slightly as p grows
    const zoom = 1.05 + p * 0.18;        // 1.05 → 1.23
    let dw, dh, dx, dy;
    if (imgAR > canvasAR) {
      // image is wider than canvas — fit to canvas height
      dh = ch * zoom;
      dw = dh * imgAR;
    } else {
      dw = cw * zoom;
      dh = dw / imgAR;
    }
    // Pan: slight horizontal drift + vertical drift driven by p
    const panX = (cw - dw) / 2 + (p - 0.5) * 80;
    const panY = (ch - dh) / 2 - (p - 0.5) * 60;
    dx = panX; dy = panY;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  function preloadImages() {
    return new Promise(resolve => {
      let pending = 2;
      const done = () => { if (--pending <= 0) resolve(); };
      heroImg.onload = done;
      heroImg.onerror = done;
      aboutImg.onload = done;
      aboutImg.onerror = done;
      // Safety
      setTimeout(resolve, 2500);
    });
  }

  /* ─── 3. INIT ───────────────────────────────────────────── */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    fakeLoader(() => {
      loader.classList.add('hidden');
      init();
    });
  };
  window.addEventListener('load', start);
  setTimeout(start, 1800);

  async function init() {
    if (canvas) {
      resizeCanvas();
      await preloadImages();
      canvasReady = true;
      drawCanvasAtProgress(0);
    }

    if (prefersReduced || !window.gsap || !window.ScrollTrigger || !window.Lenis) {
      fallback();
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    setupHero();
    setupCanvasReveal();
    setupCanvasScrub();
    setupSections();
    setupStats();
    setupMarquee();
    setupDarkOverlay();
    ScrollTrigger.refresh();
  }

  function fallback() {
    $$('.scroll-section').forEach(s => {
      s.style.position = 'relative';
      s.style.opacity = 1;
      s.style.pointerEvents = 'auto';
    });
    const sc = $('#scroll-container'); if (sc) sc.style.height = 'auto';
    const cw_ = $('.canvas-wrap'); if (cw_) cw_.style.clipPath = 'circle(150% at 50% 50%)';
  }

  /* ─── HERO entrance ─────────────────────────────────────── */
  function setupHero() {
    gsap.from('.hero-heading span', {
      yPercent: 110,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
      delay: 0.15,
    });
    gsap.from('.hero-tagline, .hero-inner .section-label', {
      opacity: 0, y: 24,
      duration: 0.9, ease: 'power3.out',
      delay: 0.5, stagger: 0.1,
    });
  }

  /* ─── Canvas circle-wipe reveal ─────────────────────────── */
  function setupCanvasReveal() {
    gsap.to('.canvas-wrap', {
      clipPath: 'circle(150% at 50% 50%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 90%',
        end:   'top 20%',
        scrub: 1,
      },
    });
  }

  /* ─── Canvas scrub — drive image transform via scroll ───── */
  function setupCanvasScrub() {
    if (!canvas) return;
    const sc = $('#scroll-container');
    ScrollTrigger.create({
      trigger: sc,
      start: 'top top',
      end:   'bottom bottom',
      onUpdate: (self) => drawCanvasAtProgress(self.progress),
    });
  }

  /* ─── SECTIONS — clean opacity fade, no fighting transforms ─ */
  function setupSections() {
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;

    $$('.scroll-section').forEach(section => {
      const enter = parseFloat(section.dataset.enter || 0) / 100;
      const leave = parseFloat(section.dataset.leave || 100) / 100;
      const anim  = section.dataset.animation || 'fade-up';
      const persist = section.dataset.persist === 'true';

      const inFrom  = animFrom(anim);

      // Initial state
      gsap.set(section, { ...inFrom, opacity: 0 });

      // ── IN: fade up + small transform during the first slice
      const inStart = enter * total;
      const inEnd   = inStart + window.innerHeight * 0.6;
      gsap.to(section, {
        opacity: 1, x: 0, y: 0, scale: 1, rotate: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sc,
          start: `${inStart}px top`,
          end:   `${inEnd}px top`,
          scrub: 1,
          onEnter:     () => section.classList.add('is-active'),
          onLeaveBack: () => section.classList.remove('is-active'),
        },
      });

      if (!persist) {
        // ── OUT: fade only (no slide-out — Royal-Pop pattern)
        const outStart = (leave * total) - window.innerHeight * 0.6;
        const outEnd   = leave * total;
        gsap.to(section, {
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sc,
            start: `${outStart}px top`,
            end:   `${outEnd}px top`,
            scrub: 1,
            onLeave: () => section.classList.remove('is-active'),
          },
        });
      }
    });
  }

  function animFrom(key) {
    switch (key) {
      case 'slide-left':   return { x: -40 };
      case 'slide-right':  return { x:  40 };
      case 'clip-reveal':  return { clipPath: 'inset(0% 0% 100% 0%)' };
      case 'stagger-up':   return { y: 30 };
      case 'rotate-in':    return { rotate: -2, y: 20 };
      case 'scale-up':     return { scale: 0.96, y: 16 };
      case 'fade-up':
      default:             return { y: 24 };
    }
  }

  /* ─── STATS — count up ──────────────────────────────────── */
  function setupStats() {
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;
    $$('.stat-number').forEach(el => {
      const target = parseFloat(el.dataset.value);
      const dec = parseInt(el.dataset.decimals || '0', 10);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: sc,
        start: `${0.52 * total}px top`,
        end:   `${0.58 * total}px top`,
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = obj.v.toFixed(dec); },
          });
        },
      });
    });
  }

  /* ─── MARQUEE ───────────────────────────────────────────── */
  function setupMarquee() {
    const wrap = $('.marquee-wrap');
    if (!wrap) return;
    const text = $('.marquee-text', wrap);
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;
    const enter = parseFloat(wrap.dataset.enter || 38) / 100;
    const leave = parseFloat(wrap.dataset.leave || 62) / 100;

    gsap.to(wrap, {
      opacity: 1, ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${enter * total}px top`,
        end:   `${enter * total + window.innerHeight * 0.4}px top`,
        scrub: 1,
      },
    });
    gsap.to(wrap, {
      opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${leave * total - window.innerHeight * 0.4}px top`,
        end:   `${leave * total}px top`,
        scrub: 1,
      },
    });
    gsap.fromTo(text,
      { xPercent: 10 },
      {
        xPercent: -60, ease: 'none',
        scrollTrigger: {
          trigger: sc,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 1,
        },
      }
    );
  }

  /* ─── DARK OVERLAY (deepens during stats) ──────────────── */
  function setupDarkOverlay() {
    const ov = $('#dark-overlay');
    if (!ov) return;
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;
    gsap.fromTo(ov,
      { opacity: 0 },
      {
        opacity: 0.72, ease: 'none',
        scrollTrigger: {
          trigger: sc,
          start: `${0.48 * total}px top`,
          end:   `${0.56 * total}px top`,
          scrub: 1,
        },
      }
    );
    gsap.to(ov, {
      opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${0.66 * total}px top`,
        end:   `${0.74 * total}px top`,
        scrub: 1,
      },
    });
  }

})();
