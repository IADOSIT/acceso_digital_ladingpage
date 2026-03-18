// ═══════════════════════════════════════════
// Acceso Digital — iaDoS | main.js
// ═══════════════════════════════════════════

(function () {
  'use strict';

  // ── Nav scroll effect ──
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile menu ──
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    // Animate burger
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ── Scroll Reveal (Intersection Observer) ──
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-delay]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger children in sol-card grid
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach(el => {
    // Skip hero elements (animated via CSS)
    if (!el.closest('.hero')) revealObserver.observe(el);
  });

  // Stagger cards
  document.querySelectorAll('.sol-card, .app-screen-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    if (!card.closest('.hero')) revealObserver.observe(card);
  });

  // ── Counter animation ──
  const countEls = document.querySelectorAll('.count-up');
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  countEls.forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const target = parseFloat(el.textContent);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    }
    requestAnimationFrame(update);
  }

  // ── Smooth active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${entry.target.id}`
              ? 'var(--green)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: '-30% 0px -60% 0px' }
  );
  sections.forEach(s => sectionObserver.observe(s));

  // ── Feature tab interaction ──
  const featItems = document.querySelectorAll('.feat-item');
  featItems.forEach(item => {
    item.addEventListener('click', () => {
      featItems.forEach(i => i.classList.remove('feat-item--active'));
      item.classList.add('feat-item--active');
    });
  });

  // ── Parallax subtle on hero ──
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroGlow.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // ── Hero badges parallax ──
  const badges = document.querySelectorAll('.hero-badge');
  if (badges.length) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      badges.forEach((badge, i) => {
        const factor = i % 2 === 0 ? 10 : -10;
        badge.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    }, { passive: true });
  }

})();
