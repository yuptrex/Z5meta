(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---- Reveal on scroll ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- Skill bar fill on reveal ---- */
    var skillFills = document.querySelectorAll('.skill-fill');
    if ('IntersectionObserver' in window && skillFills.length) {
      var skillIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = entry.target.getAttribute('data-level');
            entry.target.style.width = target + '%';
            skillIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      skillFills.forEach(function (el) { skillIo.observe(el); });
    } else {
      skillFills.forEach(function (el) {
        el.style.width = (el.getAttribute('data-level') || '0') + '%';
      });
    }

    /* ---- Pipeline signature animation (home hero) ---- */
    var pipeline = document.querySelector('.pipeline');
    if (pipeline) {
      var steps = pipeline.querySelectorAll('.pipeline-step');
      var i = 0;
      var advance = function () {
        if (i > 0) steps[i - 1].classList.remove('is-active');
        if (i > 0) steps[i - 1].classList.add('is-done');
        if (i < steps.length) {
          steps[i].classList.add('is-active');
          i++;
          setTimeout(advance, 900);
        }
      };
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        steps.forEach(function (s) { s.classList.add('is-done'); });
      } else {
        setTimeout(advance, 400);
      }
    }

    /* ---- Active nav link highlighting based on current page ---- */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach(function (link) {
      var target = link.getAttribute('data-nav-link');
      if (target === path || (target === 'index.html' && path === '')) {
        link.classList.add('is-active');
      }
    });
  });
})();
