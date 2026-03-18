/* Acceso Digital — iaDoS | main.js v2 */
(function () {
  'use strict';

  // ── Nav scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ── Mobile burger ──
  const burger = document.getElementById('burger');
  const links  = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    const sp   = burger.querySelectorAll('span');
    if (open) {
      sp[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      sp[1].style.opacity   = '0';
      sp[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      sp.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    })
  );

  // ── Scroll reveal (data-anim) ──
  const els = document.querySelectorAll('[data-anim]');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => io.observe(el));

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animCount(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));

  function animCount(el) {
    const target   = parseInt(el.dataset.count);
    const duration = 1600;
    const start    = performance.now();
    const update   = now => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * e);
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  // ── Active nav link highlight ──
  const sections = document.querySelectorAll('section[id]');
  const anchors  = document.querySelectorAll('.nav__links a');
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        anchors.forEach(a => {
          const active = a.getAttribute('href') === `#${e.target.id}`;
          a.style.color = active ? 'var(--green)' : '';
          a.style.background = active ? 'var(--green-bg)' : '';
        });
      }
    });
  }, { threshold: 0.45, rootMargin: '-20% 0px -55% 0px' }).observe
    && sections.forEach(s => new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          anchors.forEach(a => {
            const m = a.getAttribute('href') === `#${e.target.id}`;
            a.style.color = m ? 'var(--green)' : '';
            a.style.background = m ? 'var(--green-bg)' : '';
          });
      });
    }, { threshold: .45, rootMargin: '-20% 0px -55% 0px' }).observe(s));

})();
