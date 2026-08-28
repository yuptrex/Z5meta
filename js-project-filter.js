(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var pills = document.querySelectorAll('.filter-pill');
    var cards = document.querySelectorAll('[data-category]');
    var empty = document.querySelector('.empty-state');
    if (!pills.length || !cards.length) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) {
          p.classList.remove('is-active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('is-active');
        pill.setAttribute('aria-pressed', 'true');

        var filter = pill.getAttribute('data-filter');
        var visibleCount = 0;
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.hidden = !match;
          if (match) visibleCount++;
        });
        if (empty) empty.hidden = visibleCount !== 0;
      });
    });
  });
})();
