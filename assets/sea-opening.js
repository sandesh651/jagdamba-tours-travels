(() => {
  const opening = document.querySelector('.sea-opening');
  if (!opening || !('IntersectionObserver' in window) || !CSS.supports('position','sticky')) return;
  const hero = opening.querySelector('.hero');
  const shore = opening.querySelector('.sea-shore');
  const label = opening.querySelector('.sea-guide span');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = n => { n = clamp(n); return n * n * (3 - 2 * n); };
  let visible = false, frame = 0, chapter = -1;
  const labels = document.documentElement.lang === 'mr'
    ? ['खुला समुद्र', 'कोकणचा किनारा', 'तारकर्लीचा समुद्रकिनारा']
    : ['Open water', 'The Konkan coast', 'Tarkarli beach'];
  function update() {
    frame = 0;
    if (!visible || motion.matches || !opening.classList.contains('is-cinematic')) return;
    const rect = opening.getBoundingClientRect();
    const extra = Math.max(1, rect.height - hero.offsetHeight);
    const p = clamp(-rect.top / extra);
    const phase = smooth(p / .62);
    hero.style.setProperty('--sea-zoom', (1.45 - phase * .45).toFixed(4));
    hero.style.setProperty('--sea-shore', smooth((p - .55) / .42).toFixed(4));
    hero.style.setProperty('--sea-shift', ((1 - p) * 9).toFixed(2) + '%');
    hero.style.setProperty('--sea-progress', p.toFixed(4));
    const next = p < .24 ? 0 : p < .77 ? 1 : 2;
    if (next !== chapter) { chapter = next; label.textContent = labels[chapter]; }
  }
  function queue() { if (visible && !frame) frame = requestAnimationFrame(update); }
  function sync() {
    opening.classList.toggle('is-cinematic', !motion.matches && shore.complete && shore.naturalWidth > 0);
    queue();
  }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; queue(); }).observe(opening);
  shore.addEventListener('load', sync);
  shore.addEventListener('error', sync);
  motion.addEventListener('change', sync);
  window.addEventListener('scroll', queue, {passive:true});
  window.addEventListener('resize', queue, {passive:true});
  sync();
})();
