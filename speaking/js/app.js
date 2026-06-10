/* =====================================================
   Pratik Renuse — /speaking/
   Wodniack-style choreography: intro splash, hero waves,
   binary code, photo wheel, catcher distortion, scrollbar
   ===================================================== */

(() => {
  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Split text helpers ────────────────────────────────── */
  $$('[data-word]').forEach(word => {
    const text = word.textContent;
    word.textContent = '';
    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      word.appendChild(span);
    }
  });

  /* ─── Wrap binary code chars for cycling ────────────────── */
  $$('[data-cycle]').forEach(el => {
    const txt = el.textContent;
    el.textContent = '';
    for (const ch of txt) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      // (binary cycler removed)
      if (ch === '0' || ch === '1') span.setAttribute('data-bit', ch);
      el.appendChild(span);
    }
  });

  /* ─── Intro splash ──────────────────────────────────────── */
  function runIntro() {
    return new Promise(resolve => {
      if (prefersReduced) {
        $('#intro').style.display = 'none';
        document.documentElement.classList.remove('is-blocked');
        resolve();
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          $('#intro').style.display = 'none';
          document.documentElement.classList.remove('is-blocked');
          resolve();
        }
      });
      tl.to('.intro__logo .bar--v', { scaleY: 1, duration: 0.55, stagger: 0.06, ease: 'expo.out' }, 0.15)
        .to('.intro__logo .bar--h', { scaleX: 1, duration: 0.6, ease: 'expo.out' }, 0.5)
        .to('.intro__logo .bar', { y: -8, duration: 0.45, ease: 'sine.inOut' }, '+=0.35')
        .to('.intro__logo .bar', { y: 0,  duration: 0.45, ease: 'sine.inOut' })
        .to('.intro__logo', { scale: 0.92, opacity: 0, duration: 0.55, ease: 'expo.in' }, '+=0.2')
        .to('.intro__sweep', { scaleY: 1, duration: 0.65, ease: 'expo.inOut' }, '-=0.4')
        .to('#intro', { opacity: 0, duration: 0.4 }, '+=0.1');
    });
  }

  /* ─── Reveal site content after intro ───────────────────── */
  function revealSite() {
    if (prefersReduced) {
      gsap.set('.site-wrapper', { opacity: 1 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to('.site-wrapper', { opacity: 1, duration: 0.6 }, 0)
      .from('.site-head', { y: -40, opacity: 0, duration: 0.9 }, 0.1)
      .to('.hero__title .word > *', { y: 0, duration: 1.2, stagger: 0.04 }, 0.2)
      .from('.hero__tagline', { y: 30, opacity: 0, duration: 0.9 }, 0.7)
      .from('.ticker-sep', { opacity: 0, duration: 0.6, stagger: 0.1 }, 0.5);
  }

  /* ─── Hero waves ────────────────────────────────────────── */
  function animateWaves() {
    if (prefersReduced) return;
    const waves = $$('.hero__waves .wave');
    waves.forEach((w, i) => {
      gsap.to(w, {
        xPercent: i % 2 ? 6 : -6,
        yPercent: 1 + i,
        duration: 6 + i * 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      });
    });
  }

  /* ─── Binary code shimmer (cycle 1/0 randomly) ──────────── */
  function shimmerBinary() {
    if (prefersReduced) return;
    const bits = $$('.bin__code .char[data-bit]');
    setInterval(() => {
      // Flip ~6 random bits per tick
      for (let i = 0; i < 6; i++) {
        const el = bits[Math.floor(Math.random() * bits.length)];
        if (!el) continue;
        const cur = el.getAttribute('data-bit');
        const flipped = cur === '0' ? '1' : '0';
        el.setAttribute('data-bit', flipped);
        el.textContent = flipped;
      }
    }, 220);
  }

  /* ─── Awards hover (handled by CSS) — no JS needed ──────── */

  /* ─── Stages photo wheel ────────────────────────────────── */
  function setupWheel(lenis) {
    const wheel = $('#wheel');
    if (!wheel) return;
    const cards = $$('.scene__card', wheel);
    const N = cards.length;
    // 360° wheel: cards arranged around a circle, each rotated to face outward
    // from the centre. Scroll rotates the wheel so each card takes its turn.
    const angleStep = 360 / N;
    const radius    = Math.round(280 / (2 * Math.tan(Math.PI / N)) + 60);

    const layoutWheel = () => {
      cards.forEach((card, i) => {
        card.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
      });
    };
    layoutWheel();
    window.addEventListener('resize', layoutWheel);

    // Scroll-driven full rotation. Heavy scrub for that velvety follow.
    if (window.ScrollTrigger) {
      gsap.to(wheel, {
        rotationY: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: '.s-stages',
          start: 'top 80%',
          end:   'bottom 20%',
          scrub: 3,
        },
      });
      // Subtle vertical parallax / tilt for depth
      gsap.fromTo(wheel,
        { rotationX: 4, y: 30 },
        {
          rotationX: -2, y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: '.s-stages',
            start: 'top bottom',
            end:   'bottom top',
            scrub: 2,
          },
        }
      );
      // Idle "breathing" — small back-and-forth so the wheel feels alive at rest
      gsap.to(wheel, {
        rotationY: '+=5',
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Stages title letter stagger on scroll-in
    gsap.from('.stages__title .letter', {
      y: '100%', opacity: 0,
      duration: 0.9, ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.s-stages',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  /* ─── Custom scrollbar ──────────────────────────────────── */
  function setupScrollbar(lenis) {
    const thumb = $('#sb-thumb');
    if (!thumb) return;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const trackH = window.innerHeight;
      const thumbH = thumb.offsetHeight;
      thumb.style.transform = `translateY(${p * (trackH - thumbH)}px)`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ─── About awards stagger on enter ─────────────────────── */
  function setupAwards() {
    gsap.from('[data-award]', {
      y: 16, opacity: 0,
      duration: 0.7, ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.about__block--awards',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    gsap.from('.about__block--text > *', {
      y: 28, opacity: 0,
      duration: 0.9, ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.about__block--text',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  /* ─── Catcher: subtle parallax on smiley ────────────────── */
  function setupCatcher() {
    gsap.fromTo('.catcher__smiley',
      { y: 40, opacity: 0 },
      {
        y: -20, opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.s-catcher',
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1,
        },
      }
    );
    // Catcher text slight Y parallax for depth
    gsap.fromTo('.catcher__normal .catcher__text',
      { y: 60 },
      {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: '.s-catcher',
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1,
        },
      }
    );
    gsap.fromTo('.catcher__text--distorted',
      { y: 30 },
      {
        y: -30, ease: 'none',
        scrollTrigger: {
          trigger: '.s-catcher',
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1.4,
        },
      }
    );
  }

  /* ─── Topics section reveal ─────────────────────────────── */
  function setupTopics() {
    // Title letters slam up
    gsap.fromTo('.topics__title .word > *',
      { y: '110%' },
      {
        y: 0, duration: 1.0, ease: 'expo.out',
        stagger: 0.035,
        scrollTrigger: { trigger: '.s-topics', start: 'top 70%', toggleActions: 'play none none reverse' },
      }
    );
    // Cards rise + fade
    gsap.from('.topic-card', {
      y: 60, opacity: 0,
      duration: 1.1, ease: 'expo.out',
      stagger: 0.14,
      scrollTrigger: { trigger: '.topics__grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
    // Mouse-follow halo on each card
    $$('.topic-card').forEach(card => {
      const halo = card.querySelector('.topic__halo');
      if (!halo) return;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        halo.style.top = y + 'px';
        halo.style.left = x + 'px';
      });
    });
  }

  /* ─── CTA reveal ────────────────────────────────────────── */
  function setupCta() {
    gsap.from('.cta__line', {
      opacity: 0, y: 50,
      duration: 1.0, ease: 'expo.out',
      stagger: 0.18,
      scrollTrigger: { trigger: '.s-cta', start: 'top 80%', toggleActions: 'play none none reverse' },
    });
    gsap.from('.cta__btn', {
      scale: 0, opacity: 0,
      duration: 1.0, ease: 'expo.out',
      scrollTrigger: { trigger: '.s-cta', start: 'top 70%', toggleActions: 'play none none reverse' },
    });
    gsap.from('.cta__stars svg', {
      scale: 0, opacity: 0,
      duration: 0.7, ease: 'back.out(2)',
      stagger: 0.08,
      scrollTrigger: { trigger: '.s-cta', start: 'top 70%', toggleActions: 'play none none reverse' },
    });
    gsap.from('.cta__sub', {
      y: 18, opacity: 0,
      duration: 0.8, ease: 'expo.out',
      scrollTrigger: { trigger: '.s-cta', start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }

  /* ─── Magnetic CTA button ───────────────────────────────── */
  function setupMagneticButton() {
    const btn = $('.cta__btn');
    if (!btn || window.matchMedia('(hover: none)').matches) return;
    let rect;
    const onEnter = () => { rect = btn.getBoundingClientRect(); };
    const onMove = (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'expo.out' });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    };
    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
  }

  /* ─── Boot ──────────────────────────────────────────────── */
  let booted = false;
  const boot = async () => {
    if (booted) return;
    booted = true;

    await runIntro();
    revealSite();

    if (!window.gsap || !window.ScrollTrigger || !window.Lenis || prefersReduced) {
      animateWaves();
      shimmerBinary();
      // Static fallback for wheel
      const wheel = $('#wheel');
      if (wheel) {
        const cards = $$('.scene__card', wheel);
        const N = cards.length;
        const step = 360 / N;
        const r    = Math.round(280 / (2 * Math.tan(Math.PI / N)) + 60);
        cards.forEach((card, i) => {
          card.style.transform = `rotateY(${i * step}deg) translateZ(${r}px)`;
        });
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    animateWaves();
    shimmerBinary();
    setupWheel(lenis);
    setupAwards();
    setupTopics();
    setupCatcher();
    setupCta();
    setupMagneticButton();
    setupScrollbar(lenis);

    ScrollTrigger.refresh();
  };

  window.addEventListener('load', boot);
  setTimeout(boot, 2200); // safety net

})();
