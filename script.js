// ============================
// Valentine's Day Website — JS
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const heartsContainer = document.getElementById('heartsContainer');
  const petalsContainer = document.getElementById('petalsContainer');
  const sparklesContainer = document.getElementById('sparklesContainer');

  // ---- Create Floating Hearts ----
  const heartEmojis = ['💕', '💗', '💖', '💝', '🩷', '🤍', '♡', '❤︎'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (16 + Math.random() * 24) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 6) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    heartsContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => heart.remove(), 14000);
  }

  // Spawn hearts continuously
  const heartInterval = setInterval(() => {
    createHeart();
  }, 500);

  // Initial batch
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createHeart(), i * 300);
  }

  // ---- Create Falling Petals ----
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (5 + Math.random() * 5) + 's';
    petal.style.animationDelay = Math.random() * 3 + 's';
    const hue = 330 + Math.random() * 30;
    petal.style.background = `radial-gradient(ellipse at 30% 30%, hsl(${hue}, 80%, 85%), hsl(${hue}, 70%, 75%))`;
    petal.style.width = (10 + Math.random() * 8) + 'px';
    petal.style.height = (14 + Math.random() * 8) + 'px';
    petalsContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
  }

  const petalInterval = setInterval(() => {
    createPetal();
  }, 800);

  for (let i = 0; i < 5; i++) {
    setTimeout(() => createPetal(), i * 400);
  }

  // ---- Reveal Button Click ----
  revealBtn.addEventListener('click', () => {
    // Stop spawning hearts and petals
    clearInterval(heartInterval);
    clearInterval(petalInterval);

    // Hide landing
    landing.classList.add('hidden');

    // Show bouquet page
    setTimeout(() => {
      bouquetPage.classList.add('visible');
      createSparkles();
    }, 400);

    // Remove landing from DOM after transition
    setTimeout(() => {
      landing.style.display = 'none';
    }, 1500);
  });

  // ---- Sparkles on Bouquet Page ----
  function createSparkles() {
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.width = (3 + Math.random() * 6) + 'px';
      sparkle.style.height = sparkle.style.width;
      sparkle.style.animationDuration = (1.5 + Math.random() * 3) + 's';
      sparkle.style.animationDelay = Math.random() * 4 + 's';
      sparklesContainer.appendChild(sparkle);
    }
  }
});
