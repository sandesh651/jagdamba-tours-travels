(() => {
  const opening = document.querySelector('.sea-opening');
  if (!opening || !('IntersectionObserver' in window)) return;
  const hero = opening.querySelector('.hero');
  const forest = opening.querySelector('.sea-shore');
  const button = opening.querySelector('.sea-guide');
  const label = button.querySelector('span');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = n => { n = clamp(n); return n * n * (3 - 2 * n); };
  let visible = false, frame = 0, preview = false;
  const words = document.documentElement.lang === 'mr'
    ? ['वनराई पाहा', 'पुन्हा किनाऱ्याकडे']
    : ['Reveal the forest', 'Back to the shore'];
  function update() {
    frame = 0;
    if (!visible || motion.matches || !opening.classList.contains('is-cinematic')) return;
    const rect = opening.getBoundingClientRect();
    const start = Math.min(opening.offsetTop, window.innerHeight * .44);
    const distance = Math.min(240, Math.max(120, hero.offsetHeight * .29));
    const p = preview ? 1 : clamp((start - rect.top) / distance);
    hero.style.setProperty('--sea-zoom', (1.8 - smooth(p / .72) * .8).toFixed(4));
    hero.style.setProperty('--sea-shore', smooth((p - .18) / .75).toFixed(4));
    hero.style.setProperty('--sea-shift', ((1 - p) * 9).toFixed(2) + '%');
    hero.style.setProperty('--sea-progress', p.toFixed(4));
    const shown = p >= .65;
    if (label.textContent !== words[Number(shown)]) label.textContent = words[Number(shown)];
    button.setAttribute('aria-pressed', String(shown));
  }
  function queue() { if (visible && !frame) frame = requestAnimationFrame(update); }
  function sync() {
    opening.classList.toggle('is-cinematic', !motion.matches && forest.complete && forest.naturalWidth > 0);
    queue();
  }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; queue(); }).observe(opening);
  button.addEventListener('click', () => {
    const shown = button.getAttribute('aria-pressed') === 'true';
    preview = !shown;
    opening.classList.add('is-previewing');
    if (shown) {
      hero.style.setProperty('--sea-zoom','1.8');
      hero.style.setProperty('--sea-shore','0');
      hero.style.setProperty('--sea-shift','9%');
      hero.style.setProperty('--sea-progress','0');
      label.textContent = words[0];
      button.setAttribute('aria-pressed','false');
    } else queue();
  });
  window.addEventListener('scroll', () => {
    preview = false;
    opening.classList.remove('is-previewing');
    queue();
  }, {passive:true});
  window.addEventListener('resize', queue, {passive:true});
  forest.addEventListener('load', sync);
  forest.addEventListener('error', sync);
  motion.addEventListener('change', sync);
  sync();
})();
