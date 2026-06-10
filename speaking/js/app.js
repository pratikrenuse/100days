/* ─────────────────────────────────────────────────────────────
   Pratik Renuse — /speaking/  (Royal-Pop-inspired scroll engine)
   Stack: Lenis + GSAP + ScrollTrigger
   ───────────────────────────────────────────────────────────── */

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. LOADER (fakes 0→100%) ──────────────────────────────
  const loader = $('#loader');
  const fill = $('#loader-bar-fill');
  const pct = $('#loader-percent');
  let progress = 0;

  function runLoader(done) {
    const tick = () => {
      progress += (100 - progress) * 0.08 + 0.6;
      if (progress >= 99.5) progress = 100;
      fill.style.width = progress + '%';
      pct.textContent = Math.round(progress) + '%';
      if (progress < 100) requestAnimationFrame(tick);
      else setTimeout(done, 220);
    };
    requestAnimationFrame(tick);
  }

  // ── 2. INIT (after window load so fonts/layout settle) ────
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    runLoader(() => {
      loader.classList.add('done');
      init();
    });
  };
  window.addEventListener('load', start);
  // Safety net — if `load` is slow (slow CDN, blocked asset), kick off anyway
  setTimeout(start, 1800);

  function init() {
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
      console.warn('Missing lib — falling back to no-anim mode.');
      simpleReveal();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Lenis — smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    setupHero();
    setupCanvasReveal();
    setupSections();
    setupStats();
    setupMarquee();
    setupDarkOverlay();
    ScrollTrigger.refresh();
  }

  // Fallback — no libs / reduced motion
  function simpleReveal() {
    $$('.scroll-section').forEach(s => {
      s.style.position = 'relative';
      s.style.opacity = 1;
      s.style.visibility = 'visible';
      s.style.pointerEvents = 'auto';
    });
    const sc = $('#scroll-container');
    if (sc) sc.style.height = 'auto';
    const cw = $('.canvas-wrap'); if (cw) cw.style.clipPath = 'circle(150% at 50% 50%)';
    const mw = $('.marquee-wrap'); if (mw) { mw.style.opacity = 0.18; mw.style.position = 'absolute'; }
  }

  // ── HERO  ─────────────────────────────────────────────────
  function setupHero() {
    gsap.from('.hero-heading span', {
      yPercent: 110,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.12,
      delay: 0.2,
    });
    gsap.from('.hero-tagline, .section-label', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.55,
      stagger: 0.08,
    });
  }

  // ── CANVAS CIRCLE-WIPE  ───────────────────────────────────
  function setupCanvasReveal() {
    const cw = $('.canvas-wrap');
    if (!cw) return;
    gsap.to(cw, {
      clipPath: 'circle(150% at 50% 50%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    });
  }

  // ── SECTIONS  ─────────────────────────────────────────────
  function setupSections() {
    const sc = $('#scroll-container');
    const total = sc.offsetHeight; // 900vh

    $$('.scroll-section').forEach(section => {
      const enter = parseFloat(section.dataset.enter || 0);
      const leave = parseFloat(section.dataset.leave || 100);
      const anim = section.dataset.animation || 'fade-up';
      const persist = section.dataset.persist === 'true';

      const startY = (enter / 100) * total;
      const endY = (leave / 100) * total;

      // Build the in/out tween for each animation key
      const inFrom = animFrom(anim);

      gsap.set(section, { ...inFrom, opacity: 0 });

      // Toggle visibility across the section's full window so it doesn't
      // stay rendered (and overlay the testimonial/footer) outside its range.
      const visStart = Math.max(0, startY - window.innerHeight * 0.5);
      const visEnd   = persist ? sc.offsetHeight : endY + window.innerHeight * 0.2;
      ScrollTrigger.create({
        trigger: sc,
        start: `${visStart}px top`,
        end:   `${visEnd}px top`,
        onEnter:     () => section.classList.add('is-visible'),
        onEnterBack: () => section.classList.add('is-visible'),
        onLeave:     () => section.classList.remove('is-visible'),
        onLeaveBack: () => section.classList.remove('is-visible'),
      });

      // IN
      gsap.to(section, {
        opacity: 1,
        x: 0, y: 0, scale: 1, rotate: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sc,
          start: `${startY}px top`,
          end: `${startY + window.innerHeight * 0.6}px top`,
          scrub: 1,
          onEnter: () => section.classList.add('is-active'),
          onLeaveBack: () => section.classList.remove('is-active'),
        },
      });

      // OUT (skip for persist=true → CTA stays visible to the bottom)
      if (!persist) {
        const outTo = animTo(anim);
        gsap.to(section, {
          ...outTo,
          ease: 'power3.in',
          scrollTrigger: {
            trigger: sc,
            start: `${endY - window.innerHeight * 0.5}px top`,
            end: `${endY}px top`,
            scrub: 1,
          },
        });
      }
    });

    // Pin the scroll-container's children to viewport while scrolling through 900vh
    ScrollTrigger.create({
      trigger: sc,
      start: 'top top',
      end: 'bottom bottom',
      pin: false,
    });
  }

  // Per-animation FROM / TO states
  function animFrom(key) {
    switch (key) {
      case 'slide-left':   return { x: -80 };
      case 'slide-right':  return { x: 80 };
      case 'clip-reveal':  return { clipPath: 'inset(0% 0% 100% 0%)' };
      case 'stagger-up':   return { y: 40 };
      case 'rotate-in':    return { rotate: -4, y: 30 };
      case 'scale-up':     return { scale: 0.94, y: 20 };
      case 'fade-up':
      default:             return { y: 30 };
    }
  }
  function animTo(key) {
    switch (key) {
      case 'slide-left':   return { x: 80, opacity: 0 };
      case 'slide-right':  return { x: -80, opacity: 0 };
      case 'clip-reveal':  return { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 };
      case 'stagger-up':   return { y: -40, opacity: 0 };
      case 'rotate-in':    return { rotate: 4, y: -30, opacity: 0 };
      case 'scale-up':     return { scale: 1.04, y: -20, opacity: 0 };
      case 'fade-up':
      default:             return { y: -30, opacity: 0 };
    }
  }

  // ── STATS (count-up) ──────────────────────────────────────
  function setupStats() {
    $$('.stat-number').forEach(el => {
      const target = parseFloat(el.dataset.value);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const obj = { v: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
          });
        },
      });
    });
  }

  // ── MARQUEE ───────────────────────────────────────────────
  function setupMarquee() {
    const wrap = $('.marquee-wrap');
    if (!wrap) return;
    const text = $('.marquee-text', wrap);

    const enter = parseFloat(wrap.dataset.enter || 38);
    const leave = parseFloat(wrap.dataset.leave || 62);
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;

    // Show/hide
    gsap.to(wrap, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${(enter / 100) * total}px top`,
        end: `${(enter / 100) * total + window.innerHeight * 0.4}px top`,
        scrub: 1,
      },
    });
    gsap.to(wrap, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${(leave / 100) * total - window.innerHeight * 0.4}px top`,
        end: `${(leave / 100) * total}px top`,
        scrub: 1,
      },
    });

    // Parallax sweep
    gsap.fromTo(text,
      { xPercent: 10 },
      {
        xPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sc,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );
  }

  // ── DARK OVERLAY (deepens during stats section) ───────────
  function setupDarkOverlay() {
    const ov = $('#dark-overlay');
    if (!ov) return;
    const sc = $('#scroll-container');
    const total = sc.offsetHeight;
    // Stats section: enter 52, leave 66
    gsap.fromTo(ov,
      { backgroundColor: 'rgba(8,6,4,0.0)' },
      {
        backgroundColor: 'rgba(8,6,4,0.55)',
        ease: 'none',
        scrollTrigger: {
          trigger: sc,
          start: `${0.50 * total}px top`,
          end: `${0.66 * total}px top`,
          scrub: 1,
        },
      }
    );
    gsap.to(ov, {
      backgroundColor: 'rgba(8,6,4,0.0)',
      ease: 'none',
      scrollTrigger: {
        trigger: sc,
        start: `${0.66 * total}px top`,
        end: `${0.74 * total}px top`,
        scrub: 1,
      },
    });
  }

  // Reduced motion → bypass
  if (prefersReduced) {
    document.addEventListener('DOMContentLoaded', () => {
      loader.classList.add('done');
      simpleReveal();
    });
  }
})();
