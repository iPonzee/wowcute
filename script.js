// ============================
// Valentine's Day Website — JS
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const heartsContainer = document.getElementById('heartsContainer');

  // ---- Create Floating Hearts on Landing ----
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

  // Spawn hearts
  const heartInterval = setInterval(createHeart, 600);
  for (let i = 0; i < 6; i++) {
    setTimeout(createHeart, i * 350);
  }

  // ---- Reveal Button ----
  revealBtn.addEventListener('click', () => {
    clearInterval(heartInterval);

    // Hide landing page
    landing.classList.add('hidden');

    // Show bouquet page & start animations
    setTimeout(() => {
      bouquetPage.classList.add('visible');
      // Start the flower growing animations
      bouquetPage.classList.add('playing');
    }, 500);

    // Remove landing from DOM
    setTimeout(() => {
      landing.style.display = 'none';
    }, 1800);
  });
});
