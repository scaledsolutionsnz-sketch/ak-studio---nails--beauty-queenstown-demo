/* AK STUDIO - Nails & Beauty Queenstown */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- opening animation ---- */
  var intro = document.querySelector('.intro');
  if (intro) {
    var close = function () { intro.classList.add('done'); };
    window.addEventListener('load', function () { setTimeout(close, reduced ? 60 : 1250); });
    setTimeout(close, reduced ? 300 : 2600);
  }

  /* ---- nav ---- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');

  var onScroll = function () {
    if (!nav) return;
    if (window.scrollY > 40 || nav.dataset.always === 'true') nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 90) + 'ms';
      io.observe(el);
    });
  }

  /* ---- hero photo rotation ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1 && !reduced) {
    var s = 0;
    setInterval(function () {
      slides[s].classList.remove('on');
      s = (s + 1) % slides.length;
      slides[s].classList.add('on');
    }, 5500);
  }

  /* ---- hero rotating review quotes ---- */
  var quotes = document.querySelectorAll('.hq-slide');
  if (quotes.length > 1 && !reduced) {
    var q = 0;
    setInterval(function () {
      quotes[q].classList.remove('on');
      q = (q + 1) % quotes.length;
      quotes[q].classList.add('on');
    }, 6000);
  }

  /* ---- gmail compose links (address assembled in JS) ---- */
  document.querySelectorAll('a[data-gmail]').forEach(function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
      '&su=' + (a.getAttribute('data-su') || '') +
      '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
