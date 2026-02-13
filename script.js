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
  // GROW FLOWERS — sequential animation
  // ============================
  function growFlowers() {
    // Define each flower's config
    const flowers = [
      { el: '.fl-1', stemH: 250, leafPos: 120, delay: 200, sway: 'sway-1' },
      { el: '.fl-2', stemH: 220, leafPos: 100, delay: 500, sway: 'sway-2' },
      { el: '.fl-3', stemH: 210, leafPos: 90, delay: 700, sway: 'sway-3' },
      { el: '.fl-4', stemH: 180, leafPos: 80, delay: 1000, sway: 'sway-4' },
      { el: '.fl-5', stemH: 170, leafPos: 70, delay: 1200, sway: 'sway-5' },
      { el: '.fl-6', stemH: 230, leafPos: 100, delay: 900, sway: 'sway-2' },
      { el: '.fl-7', stemH: 240, leafPos: 110, delay: 1100, sway: 'sway-3' },
    ];

    flowers.forEach(f => {
      const flEl = document.querySelector(f.el);
      if (!flEl) return;

      const stem = flEl.querySelector('.fl-stem');
      const leaves = flEl.querySelectorAll('.fl-leaf');
      const head = flEl.querySelector('.fl-head');
      const glow = flEl.querySelector('.fl-glow');

      // Set stem target height as CSS variable
      stem.style.setProperty('--stem-h', f.stemH + 'px');

      // Position the flower head at top of stem
      if (head) {
        head.style.top = '0px';
        head.style.bottom = 'auto';
        // Position relative to the stem — head goes at top
        head.style.top = (-f.stemH) + 'px';
        head.style.bottom = 'auto';
        head.style.position = 'absolute';
      }
      if (glow) {
        glow.style.top = (-f.stemH - 20) + 'px';
      }

      // Position leaves along stem
      leaves.forEach(leaf => {
        leaf.style.bottom = f.leafPos + 'px';
      });

      // Step 1: Grow stem
      setTimeout(() => {
        stem.classList.add('stem-grow');
      }, f.delay);

      // Step 2: Sprout leaves (after stem grows)
      setTimeout(() => {
        leaves.forEach(leaf => {
          if (leaf.classList.contains('fl-leaf-l')) {
            leaf.classList.add('leaf-grow-l');
          } else {
            leaf.classList.add('leaf-grow-r');
          }
        });
      }, f.delay + 1400);

      // Step 3: Bloom flower head
      setTimeout(() => {
        if (head) head.classList.add('head-bloom');
      }, f.delay + 1600);

      // Step 4: Show glow
      setTimeout(() => {
        if (glow) glow.classList.add('glow-show');
      }, f.delay + 2000);

      // Step 5: Start swaying
      setTimeout(() => {
        flEl.classList.add(f.sway);
      }, f.delay + 2200);
    });

    // Baby's breath appears after flowers
    setTimeout(() => {
      document.querySelectorAll('.babys-breath').forEach(bb => {
        bb.classList.add('bb-visible');
      });
    }, 3200);
  }

  // ============================
  // GLOWING PARTICLES
  // ============================
  function startParticles() {
    const colors = [
      'rgba(248,187,208,0.7)',
      'rgba(255,224,178,0.6)',
      'rgba(206,147,216,0.5)',
      'rgba(255,255,255,0.6)',
      'rgba(244,143,177,0.5)',
    ];

    function spawnParticle() {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (15 + Math.random() * 70) + '%';
      p.style.bottom = (5 + Math.random() * 25) + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (3 + Math.random() * 4) + 's';
      p.style.boxShadow = '0 0 ' + (4 + Math.random() * 6) + 'px ' + p.style.background;
      particlesEl.appendChild(p);
      setTimeout(() => p.remove(), 8000);
    }

    for (let i = 0; i < 10; i++) {
      setTimeout(spawnParticle, 2000 + i * 200);
    }
    setInterval(spawnParticle, 500);
  }
});
