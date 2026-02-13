// ============================
// Valentine's Day Website — JS
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // ---- Populate Date Card with today's date ----
  const now = new Date();
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  document.getElementById('dateMonth').textContent = months[now.getMonth()];
  document.getElementById('dateDay').textContent = now.getDate();
  document.getElementById('dateYear').textContent = now.getFullYear();
  document.getElementById('dateWeekday').textContent = days[now.getDay()];

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
      bouquetPage.classList.add('playing');
      startParticles();
    }, 500);

    setTimeout(() => {
      landing.style.display = 'none';
    }, 1800);
  });

  // ---- Glowing Particles (bouquet page) ----
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
      p.style.left = (10 + Math.random() * 80) + '%';
      p.style.bottom = (5 + Math.random() * 30) + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (3 + Math.random() * 4) + 's';
      p.style.boxShadow = `0 0 ${4 + Math.random() * 6}px ${p.style.background}`;
      particlesEl.appendChild(p);
      setTimeout(() => p.remove(), 8000);
    }

    // Initial burst
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnParticle, i * 200);
    }

    // Continuous spawn
    setInterval(spawnParticle, 400);
  }
});
