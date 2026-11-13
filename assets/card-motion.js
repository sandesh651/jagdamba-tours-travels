/* One-time postcard entrances. Cards stay readable if motion is unavailable. */
(() => {
  const grid = document.querySelector('#cards');
  if (!grid || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)');
  const seen = new WeakSet();
  const active = new Set();
  const animate = (element, frames, options) => {
    const animation = element.animate(frames, options);
    active.add(animation);
    const clear = () => active.delete(animation);
    animation.addEventListener('finish', clear, { once: true });
    animation.addEventListener('cancel', clear, { once: true });
  };
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    entries.filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach(({ target: card }) => {
        observer.unobserve(card);
        if (seen.has(card)) return;
        seen.add(card);
        if (reduced.matches || card.contains(document.activeElement)) return;
        const delay = Math.min(order++, 2) * 100;
        const options = { duration: 750, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' };
        animate(card, [
          { opacity: 0, transform: desktop.matches ? 'perspective(1200px) translateY(42px) rotateX(7deg) scale(.97)' : 'translateY(28px)' },
          { opacity: 1, transform: 'none' }
        ], options);
        const photo = card.querySelector('.destination-photo.is-current');
        if (photo) animate(photo, [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { ...options, duration: 950 });
      });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  const observe = () => {
    observer.disconnect();
    grid.querySelectorAll('.card').forEach(card => { if (!seen.has(card)) observer.observe(card); });
  };
  // Filters rebuild the cards; observe their replacements as well.
  new MutationObserver(observe).observe(grid, { childList: true });
  const cancel = () => { active.forEach(animation => animation.cancel()); active.clear(); };
  reduced.addEventListener('change', () => { if (reduced.matches) cancel(); });
  grid.addEventListener('focusin', cancel);
  observe();
})();
