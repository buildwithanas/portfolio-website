/* ==========================================================
   BuildWithAnas — site script
   Handles: mobile nav toggle, scroll-reveal animations,
   active nav link on scroll, and footer year.
   Written defensively: every feature checks for its DOM
   nodes before wiring up, and respects reduced-motion.
   ========================================================== */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;

    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after choosing a link (mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('reveal-active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Footer year ---------- */
  function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initScrollReveal();
    setFooterYear();
  });
})();