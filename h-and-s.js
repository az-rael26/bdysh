// H and S = ambient Hearts and Stars.
// Hearts and pixel stars appear automatically in the BACKGROUND, not on clicks.
// Change these settings to control the effect:
const HNS_SETTINGS = {
  intervalMs: 440,       // Smaller number = more hearts and stars
  maxParticles: 38,     // Safety limit for performance
  heartChance: 0.56,    // 56% hearts, 44% stars
  minSize: 13,          // Sizes are random, in pixels
  maxSize: 38,
  minDuration: 8,       // Float upward for 8–15 seconds
  maxDuration: 15
};

const hnsLayer = document.getElementById('hns-background');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let hnsInterval = null;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function spawnHeartOrStar(startPartwayUp = false) {
  if (hnsLayer.childElementCount >= HNS_SETTINGS.maxParticles) return;

  const particle = document.createElement('span');
  const isHeart = Math.random() < HNS_SETTINGS.heartChance;
  const shape = document.createElement('i');
  shape.setAttribute('aria-hidden', 'true');
  shape.className = isHeart ? 'hns-heart-shape' : 'hns-star-shape';
  particle.className = 'hns-particle';
  particle.setAttribute('aria-hidden', 'true');

  const duration = randomBetween(HNS_SETTINGS.minDuration, HNS_SETTINGS.maxDuration);
  const size = randomBetween(HNS_SETTINGS.minSize, HNS_SETTINGS.maxSize);
  particle.style.setProperty('--particle-left', `${randomBetween(1, 98)}%`);
  particle.style.setProperty('--particle-size', `${size.toFixed(1)}px`);
  particle.style.setProperty('--particle-duration', `${duration.toFixed(2)}s`);
  particle.style.setProperty('--particle-drift', `${randomBetween(-120, 120).toFixed(0)}px`);
  particle.style.setProperty('--particle-spin', `${randomBetween(-90, 90).toFixed(0)}deg`);
  if (startPartwayUp) {
    particle.style.animationDelay = `-${randomBetween(0, duration * .86).toFixed(2)}s`;
  }

  particle.appendChild(shape);
  hnsLayer.appendChild(particle);
  particle.addEventListener('animationend', () => particle.remove(), { once: true });
}

function startHAndS() {
  if (hnsInterval || reduceMotion.matches) return;
  for (let i = 0; i < 15; i++) spawnHeartOrStar(true);
  hnsInterval = window.setInterval(() => {
    if (!document.hidden) spawnHeartOrStar();
  }, HNS_SETTINGS.intervalMs);
}

function stopHAndS() {
  window.clearInterval(hnsInterval);
  hnsInterval = null;
  hnsLayer.replaceChildren();
}

reduceMotion.addEventListener('change', () => {
  if (reduceMotion.matches) stopHAndS();
  else startHAndS();
});

startHAndS();
