/* ============================================
   Main JavaScript — Navigation & Animations
   ============================================ */

(function () {
  'use strict';

  // ---- Mobile Navigation ----
  function initNav() {
    var hamburger = document.querySelector('.nav__hamburger');
    var mobileMenu = document.querySelector('.nav__mobile-menu');

    if (!hamburger || !mobileMenu) return;

    var nav = document.querySelector('.nav');

    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('nav__hamburger--open');
      mobileMenu.classList.toggle('nav__mobile-menu--open', isOpen);
      if (nav) nav.classList.toggle('nav--menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('nav__hamburger--open');
        mobileMenu.classList.remove('nav__mobile-menu--open');
        if (nav) nav.classList.remove('nav--menu-open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ---- Scroll Animations (Intersection Observer) ----
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger').forEach(function (el) {
        el.classList.add(el.classList.contains('stagger') ? 'stagger--visible' : el.className.split(' ')[0] + '--visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.classList.contains('fade-in')) {
            el.classList.add('fade-in--visible');
          } else if (el.classList.contains('fade-in-left')) {
            el.classList.add('fade-in-left--visible');
          } else if (el.classList.contains('fade-in-right')) {
            el.classList.add('fade-in-right--visible');
          } else if (el.classList.contains('stagger')) {
            el.classList.add('stagger--visible');
          }
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger').forEach(function (el) {
      observer.observe(el);
    });
  }


  // ---- Nav scroll effect ----
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        nav.style.borderBottomColor = 'var(--color-border)';
      } else {
        nav.style.borderBottomColor = 'transparent';
      }
    }, { passive: true });
  }


  // ---- Active Nav Link ----
  function setActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add(link.classList.contains('nav__link') ? 'nav__link--active' : 'nav__mobile-link--active');
      }
    });
  }


  // ---- Initialize ----
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initNavScroll();
    setActiveNavLink();

    requestAnimationFrame(function () {
      initScrollAnimations();
    });
  });

})();
