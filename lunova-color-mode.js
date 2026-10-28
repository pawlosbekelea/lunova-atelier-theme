(function () {
  var key = 'lunova-color-mode';
  var root = document.documentElement;
  function getSavedMode() {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function setMode(mode, persist) {
    var normalized = mode === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-lunova-mode', normalized);
    var dark = normalized === 'dark';
    document.querySelectorAll('[data-lunova-mode-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', dark ? 'true' : 'false');
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      var label = button.querySelector('[data-lunova-mode-label]');
      if (label) label.textContent = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });
    if (persist) {
      try { window.localStorage.setItem(key, normalized); } catch (e) {}
    }
  }
  var saved = getSavedMode();
  if (saved === 'dark' || saved === 'light') {
    setMode(saved, false);
  } else {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light', false);
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-lunova-mode-toggle]');
    if (!button) return;
    event.preventDefault();
    setMode(root.getAttribute('data-lunova-mode') === 'dark' ? 'light' : 'dark', true);
  });
  document.addEventListener('DOMContentLoaded', function () {
    setMode(root.getAttribute('data-lunova-mode') || 'light', false);
  });
})();
