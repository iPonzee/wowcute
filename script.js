// ============================
// Valentine's Day Website — JS
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // ---- Populate Date Card with today's date ----
  const now = new Date();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  document.getElementById('dateMonth').textContent = months[now.getMonth()];
  document.getElementById('dateDay').textContent = now.getDate();
  document.getElementById('dateYear').textContent = now.getFullYear();
  document.getElementById('dateWeekday').textContent = weekdays[now.getDay()];

  // ---- Element References ----
  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const heartsContainer = document.getElementById('heartsContainer');
  const particlesEl = document.getElementById('particles');

  // ---- Floating Hearts on Landing ----
  const heartEmojis = ['💕', '💗', '💖', '💝', '🩷', '🤍', '♡'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 6) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 14000);
  }

  const heartInterval = setInterval(createHeart, 600);
  for (let i = 0; i < 6; i++) setTimeout(createHeart, i * 350);

  // ---- Reveal Button ----
  revealBtn.addEventListener('click', () => {
    clearInterval(heartInterval);
    landing.classList.add('hidden');

    setTimeout(() => {
      bouquetPage.classList.add('visible');
      growFlowers();
      startParticles();
    }, 600);

    setTimeout(() => { landing.style.display = 'none'; }, 1800);
  });

  // ============================
  // GROW FLOWERS — smooth sequential
  // ============================
  function growFlowers() {
    // Flower configs — tall stems, fanned out
    const flowers = [
      // Center rose — tallest
      { el: '.fl-1', stemH: 340, leafPos: 160, delay: 100, sway: 'sway-1' },
      // Left daisy
      { el: '.fl-2', stemH: 300, leafPos: 140, delay: 400, sway: 'sway-2' },
      // Right tulip
      { el: '.fl-3', stemH: 280, leafPos: 120, delay: 600, sway: 'sway-3' },
      // Far left cherry blossom
      { el: '.fl-4', stemH: 260, leafPos: 110, delay: 900, sway: 'sway-4' },
      // Far right small rose
      { el: '.fl-5', stemH: 250, leafPos: 100, delay: 1100, sway: 'sway-5' },
      // Inner-left small daisy
      { el: '.fl-6', stemH: 310, leafPos: 150, delay: 700, sway: 'sway-2' },
      // Inner-right small tulip
      { el: '.fl-7', stemH: 320, leafPos: 155, delay: 800, sway: 'sway-3' },
    ];

    flowers.forEach(f => {
      const flEl = document.querySelector(f.el);
      if (!flEl) return;

      const stem = flEl.querySelector('.fl-stem');
      const leaves = flEl.querySelectorAll('.fl-leaf');
      const head = flEl.querySelector('.fl-head');
      const glow = flEl.querySelector('.fl-glow');

      // Set stem height as CSS variable for the animation
      stem.style.setProperty('--stem-h', f.stemH + 'px');

      // Position head at top of (future) stem
      if (head) {
        head.style.top = (-f.stemH) + 'px';
      }
      if (glow) {
        glow.style.top = (-f.stemH - 25) + 'px';
      }

      // Position leaves along the stem
      leaves.forEach(leaf => {
        leaf.style.bottom = f.leafPos + 'px';
      });

      // Step 1: Grow stem smoothly
      setTimeout(() => {
        stem.classList.add('stem-grow');
      }, f.delay);

      // Step 2: Sprout leaves (when stem is ~60% grown)
      setTimeout(() => {
        leaves.forEach(leaf => {
          leaf.classList.add(
            leaf.classList.contains('fl-leaf-l') ? 'leaf-grow-l' : 'leaf-grow-r'
          );
        });
      }, f.delay + 1400);

      // Step 3: Bloom flower head (when stem finishes)
      setTimeout(() => {
        if (head) head.classList.add('head-bloom');
      }, f.delay + 2000);

      // Step 4: Show glow halo
      setTimeout(() => {
        if (glow) glow.classList.add('glow-show');
      }, f.delay + 2600);

      // Step 5: Start gentle swaying
      setTimeout(() => {
        flEl.classList.add(f.sway);
      }, f.delay + 2800);
    });

    // Baby's breath pops in after all flowers bloom
    setTimeout(() => {
      document.querySelectorAll('.babys-breath').forEach(bb => {
        bb.classList.add('bb-visible');
      });
    }, 3800);
  }

  // ============================
  // GLOWING PARTICLES
  // ============================
  function startParticles() {
    const colors = [
      'rgba(248,187,208,0.7)',
      'rgba(255,224,178,0.5)',
      'rgba(206,147,216,0.5)',
      'rgba(255,255,255,0.6)',
      'rgba(244,143,177,0.4)',
    ];

    function spawnParticle() {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (15 + Math.random() * 70) + '%';
      p.style.bottom = (10 + Math.random() * 30) + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (4 + Math.random() * 5) + 's';
      p.style.boxShadow = '0 0 ' + (4 + Math.random() * 8) + 'px ' + p.style.background;
      particlesEl.appendChild(p);
      setTimeout(() => p.remove(), 10000);
    }

    // Delayed start — particles appear once flowers are growing
    for (let i = 0; i < 8; i++) {
      setTimeout(spawnParticle, 2500 + i * 250);
    }
    setInterval(spawnParticle, 600);
  }
});
