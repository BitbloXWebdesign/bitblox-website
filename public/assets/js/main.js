/* ============================================================
   BitbloX — Vanilla JS
   Navigatie · scroll-reveal · FAQ-accordion · tellers · formulier
   ============================================================ */
(function () {
  'use strict';

  /* Markeer dat JS actief is (voor scroll-reveal fallback) */
  document.documentElement.classList.add('js');

  /* ---------- Header: scroll-state ---------- */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobiele navigatie ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      if (header) header.classList.toggle('menu-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        if (header) header.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll-reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- FAQ-accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // sluit alle andere items
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Geanimeerde tellers ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1600;
        var start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Contactformulier ----------
     Verzenden gebeurt server-side via admin-post.php + wp_mail()
     (WP Mail SMTP / FluentSMTP neemt de daadwerkelijke verzending over).
     Hier: alleen lichte client-side validatie + succesmelding na redirect. */
  var form = document.querySelector('.contact-form form');
  if (form) {
    function setValid(input, valid) {
      var group = input.closest('.form-group');
      if (group) group.classList.toggle('invalid', !valid);
      return valid;
    }
    function validateEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () { setValid(input, true); });
    });

    form.addEventListener('submit', function (e) {
      var ok = true;
      var name = form.querySelector('#naam');
      var email = form.querySelector('#email');
      var phone = form.querySelector('#telefoon');
      var msg = form.querySelector('#bericht');

      if (name) ok = setValid(name, name.value.trim().length >= 2) && ok;
      if (email) ok = setValid(email, validateEmail(email.value.trim())) && ok;
      if (phone) ok = setValid(phone, phone.value.trim().length >= 8) && ok;
      if (msg) ok = setValid(msg, msg.value.trim().length >= 10) && ok;

      // Alleen blokkeren als de validatie faalt — anders normaal posten
      if (!ok) e.preventDefault();
    });

    // Succesmelding na de server-side redirect (?verzonden=1)
    if (window.location.search.indexOf('verzonden=1') !== -1) {
      var successBox = document.querySelector('.form-success');
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /* ---------- Jaartal in footer ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
