/**
 * Customers page (portfolio/index.html): linkable and keyboard-accessible filter chips.
 *
 * Filtering itself is done by the shared Isotope code in main.js (click on "#portfolio-flters li").
 * This script adds, on top of it:
 *   - URL hash per filter chip: /portfolio/#castle, /portfolio/#germany ... (only hashes that match an
 *     existing chip are applied, so removing a chip also removes its hash)
 *     (the hash is the filter class without the "filter-" prefix; "All" clears the hash)
 *   - clicking a chip updates the hash without scrolling (history.replaceState)
 *   - loading the page with a hash, or changing the hash, applies that filter
 *   - Enter / Space activate a focused chip, aria-pressed reflects the active chip
 * Must be loaded after main-min.js so that main.js has created the Isotope instance on "load".
 */
(function () {
  'use strict';

  function chips() {
    return Array.prototype.slice.call(document.querySelectorAll('#portfolio-flters li[data-filter]'));
  }

  function hashName(li) {
    var f = li.getAttribute('data-filter');
    return f && f !== '*' ? f.replace('.filter-', '') : '';
  }

  function markActive(li) {
    chips().forEach(function (el) {
      el.classList.remove('filter-active');
      el.setAttribute('aria-pressed', 'false');
    });
    li.classList.add('filter-active');
    li.setAttribute('aria-pressed', 'true');
  }

  function applyHash() {
    var name = decodeURIComponent(window.location.hash.slice(1)).toLowerCase();
    var target = chips().filter(function (li) { return hashName(li) === name; })[0];
    if (!target) return;
    var container = document.querySelector('.portfolio-container');
    var iso = window.Isotope && container ? window.Isotope.data(container) : null;
    markActive(target);
    if (iso) iso.arrange({ filter: target.getAttribute('data-filter') });
    // On mobile the chip rows scroll sideways: bring the active chip into view (horizontally only)
    var row = target.parentNode;
    if (row.scrollWidth > row.clientWidth) {
      row.scrollLeft = target.offsetLeft - row.offsetLeft - 8;
    }
  }

  window.addEventListener('load', function () {
    chips().forEach(function (li) {
      li.addEventListener('click', function () {
        var name = hashName(li);
        var url = name ? '#' + name : window.location.pathname + window.location.search;
        window.history.replaceState(null, '', url);
        markActive(li);
      });
      li.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          li.click();
        }
      });
    });
    if (window.location.hash) applyHash();
    window.addEventListener('hashchange', applyHash);
  });
})();
