// ============================
// Valentine's Day Website — JS
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // ---- Date Card ----
  const now = new Date();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('dateMonth').textContent = months[now.getMonth()];
  document.getElementById('dateDay').textContent = now.getDate();
  document.getElementById('dateYear').textContent = now.getFullYear();
  document.getElementById('dateWeekday').textContent = weekdays[now.getDay()];

  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const heartsContainer = document.getElementById('heartsContainer');
  const particlesEl = document.getElementById('particles');

  // ---- Floating Hearts ----
  const heartEmojis = ['💕', '💗', '💖', '💝', '🩷', '🤍', '♡'];
  function createHeart() {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (14 + Math.random() * 20) + 'px';
    h.style.animationDuration = (6 + Math.random() * 6) + 's';
    h.style.animationDelay = (Math.random() * 2) + 's';
    heartsContainer.appendChild(h);
    setTimeout(() => h.remove(), 14000);
  }
  const heartInt = setInterval(createHeart, 600);
  for (let i = 0; i < 6; i++) setTimeout(createHeart, i * 350);

  // ---- Reveal ----
  revealBtn.addEventListener('click', () => {
    clearInterval(heartInt);
    landing.classList.add('hidden');
    setTimeout(() => {
      bouquetPage.classList.add('visible');
      createStars();
      growBackLayer();
      growBouquet();
      startParticles();
    }, 600);
    setTimeout(() => { landing.style.display = 'none'; }, 1800);
  });

  // ============================
  // STARS
  // ============================
  function createStars() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 55 + '%';   // only in upper sky
      star.style.width = (1.5 + Math.random() * 3) + 'px';
      star.style.height = star.style.width;
      star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
      star.style.animationDelay = (Math.random() * 3) + 's';
      container.appendChild(star);
    }
  }

  // ============================
  // BACK LAYER — blurred depth flowers
  // ============================
  function growBackLayer() {
    const backs = [
      { sel: '.bk-1', h: 320, angle: -8, delay: 200 },
      { sel: '.bk-2', h: 290, angle: 6, delay: 400 },
      { sel: '.bk-3', h: 250, angle: -20, delay: 600 },
      { sel: '.bk-4', h: 260, angle: 18, delay: 500 },
      { sel: '.bk-5', h: 240, angle: -32, delay: 700 },
      { sel: '.bk-6', h: 230, angle: 30, delay: 800 },
    ];

    backs.forEach(f => {
      const wrapper = document.querySelector(f.sel);
      if (!wrapper) return;
      const stem = wrapper.querySelector('.stem');
      const bloom = wrapper.querySelector('.bloom');

      stem.style.setProperty('--h', f.h + 'px');
      if (bloom) bloom.style.top = (-f.h) + 'px';

      // Grow stem
      setTimeout(() => { stem.classList.add('stem-grow'); }, f.delay);
      // Show bloom (already visible via CSS override, just bloom in)
      setTimeout(() => { if (bloom) bloom.classList.add('bloom-in'); }, f.delay + 1800);
    });
  }

  // ============================
  // GROW FRONT BOUQUET
  // ============================
  function growBouquet() {
    const flowers = [
      { sel: '.sw-1', h: 380, angle: 0, leafY: 180, delay: 100, sway: 'sway-a' },
      { sel: '.sw-2', h: 340, angle: -14, leafY: 160, delay: 400, sway: 'sway-b' },
      { sel: '.sw-3', h: 320, angle: 12, leafY: 150, delay: 600, sway: 'sway-a' },
      { sel: '.sw-4', h: 300, angle: -27, leafY: 140, delay: 800, sway: 'sway-c' },
      { sel: '.sw-5', h: 310, angle: 24, leafY: 145, delay: 700, sway: 'sway-b' },
      { sel: '.sw-6', h: 260, angle: -38, leafY: 120, delay: 1000, sway: 'sway-a' },
      { sel: '.sw-7', h: 270, angle: 36, leafY: 125, delay: 1100, sway: 'sway-c' },
      { sel: '.sw-8', h: 240, angle: -48, leafY: 0, delay: 1300, sway: 'sway-b' },
      { sel: '.sw-9', h: 250, angle: 46, leafY: 0, delay: 1400, sway: 'sway-c' },
    ];

    flowers.forEach(f => {
      const wrapper = document.querySelector(f.sel);
      if (!wrapper) return;

      const stem = wrapper.querySelector('.stem');
      const leaves = wrapper.querySelectorAll('.stem-leaf');
      const bloom = wrapper.querySelector('.bloom');

      wrapper.style.setProperty('--r', f.angle + 'deg');
      stem.style.setProperty('--h', f.h + 'px');

      if (bloom) bloom.style.top = (-f.h) + 'px';
      leaves.forEach(leaf => { leaf.style.bottom = f.leafY + 'px'; });

      // Step 1: Grow stem
      setTimeout(() => { stem.classList.add('stem-grow'); }, f.delay);

      // Step 2: Leaves
      if (f.leafY > 0) {
        setTimeout(() => {
          leaves.forEach(leaf => {
            leaf.classList.add(leaf.classList.contains('stem-leaf-l') ? 'leaf-in-l' : 'leaf-in-r');
          });
        }, f.delay + 1600);
      }

      // Step 3: Bloom
      setTimeout(() => { if (bloom) bloom.classList.add('bloom-in'); }, f.delay + 2000);

      // Step 4: Sway
      setTimeout(() => { wrapper.classList.add(f.sway); }, f.delay + 2800);
    });

    // Baby's breath
    setTimeout(() => {
      document.querySelectorAll('.bb').forEach(bb => bb.classList.add('bb-show'));
    }, 3800);
  }

  // ============================
  // PARTICLES
  // ============================
  function startParticles() {
    const colors = [
      'rgba(248,187,208,.7)', 'rgba(255,224,178,.5)',
      'rgba(206,147,216,.5)', 'rgba(255,255,255,.6)',
    ];
    function spawn() {
      const p = document.createElement('div');
      p.className = 'particle';
      const sz = 3 + Math.random() * 5;
      p.style.width = sz + 'px'; p.style.height = sz + 'px';
      p.style.left = (20 + Math.random() * 60) + '%';
      p.style.bottom = (5 + Math.random() * 30) + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (4 + Math.random() * 5) + 's';
      p.style.boxShadow = '0 0 ' + (4 + Math.random() * 8) + 'px ' + p.style.background;
      particlesEl.appendChild(p);
      setTimeout(() => p.remove(), 10000);
    }
    for (let i = 0; i < 8; i++) setTimeout(spawn, 2500 + i * 250);
    setInterval(spawn, 600);
  }
});
