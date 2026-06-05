/* ==========================================================================
   LAYALI CAFE — SCRIPT
   Handles: nav scroll, mobile menu, menu filtering, scroll reveal
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const header       = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav    = document.getElementById('mobile-nav');
  const mobileClose  = document.getElementById('mobile-nav-close');
  const mobileLinks  = mobileNav ? mobileNav.querySelectorAll('a') : [];
  const lightbox     = document.getElementById('menu-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const cardTrigger  = document.getElementById('menu-card-trigger');
  const mobileTrigger = document.getElementById('menu-mobile-trigger');
  const reveals      = document.querySelectorAll('.reveal');

  /* ---------- Header scroll effect ---------- */
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // run once on load

  /* ---------- Mobile nav ---------- */
  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (mobileClose)  mobileClose.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Menu Lightbox ---------- */
  function openLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent page scrolling
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // restore scrolling
  }

  if (cardTrigger) cardTrigger.addEventListener('click', openLightbox);
  if (mobileTrigger) mobileTrigger.addEventListener('click', openLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking outside the menu image
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });



})();
