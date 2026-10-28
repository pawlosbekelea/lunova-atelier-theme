document.addEventListener('click', function (event) {
  const button = event.target.closest('[data-category-scroll]');
  if (!button) return;
  const section = button.closest('.lunova-category-section');
  const track = section && section.querySelector('[data-category-track]');
  if (!track) return;
  const direction = button.getAttribute('data-category-scroll') === 'next' ? 1 : -1;
  track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.72, 220), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
