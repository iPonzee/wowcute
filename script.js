// ============================
// Valentine's Day Website — JS (Final - Visible & Animated)
// ============================
document.addEventListener('DOMContentLoaded', () => {

  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const bouquet = document.getElementById('bouquet');

  // Reveal
  revealBtn.addEventListener('click', () => {
    landing.classList.add('hidden');
    setTimeout(() => {
      bouquetPage.classList.add('visible');
      growFlowers();
    }, 500);
  });

  // Date
  const now = new Date();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (document.getElementById('dateMonth')) {
    document.getElementById('dateMonth').textContent = months[now.getMonth()];
    document.getElementById('dateDay').textContent = now.getDate();
    document.getElementById('dateWeekday').textContent = weekdays[now.getDay()];
  }

  // ============================
  // FLOWER CONFIGURATION
  // ============================
  const flowers = [
    // Back Layer
    { type: 'sunflower', h: 320, angle: -28, delay: 100 },
    { type: 'rose', h: 310, angle: 28, delay: 200 },
    { type: 'tulip', h: 330, angle: -10, delay: 300 },
    { type: 'daisy', h: 300, angle: 10, delay: 400 },

    // Front Layer 
    { type: 'rose', h: 380, angle: 0, delay: 500 },  // Center Big
    { type: 'daisy', h: 360, angle: -16, delay: 600 },
    { type: 'sunflower', h: 350, angle: 16, delay: 700 },  // Right Big
    { type: 'lavender', h: 270, angle: -45, delay: 800 },
    { type: 'lavender', h: 280, angle: 45, delay: 900 },
    { type: 'rose', h: 260, angle: -60, delay: 1000 },
    { type: 'tulip', h: 250, angle: 60, delay: 1100 },
  ];

  function growFlowers() {
    flowers.forEach((f, i) => {
      // Wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'stem-wrapper';
      wrapper.style.zIndex = (i < 4) ? 5 : 10; // First 4 are back layer
      wrapper.style.setProperty('--h', f.h + 'px');
      wrapper.style.setProperty('--r', f.angle + 'deg');
      // Initial Static Rotation (before animation)
      wrapper.style.transform = `rotate(${f.angle}deg)`;

      bouquet.appendChild(wrapper);

      // Stem
      const stem = document.createElement('div');
      stem.className = 'stem';
      wrapper.appendChild(stem);

      // Leaves
      const leafL = document.createElement('div');
      leafL.className = 'stem-leaf';
      leafL.style.left = '-25px';
      leafL.style.bottom = (f.h * 0.35) + 'px';
      leafL.style.setProperty('--rot', '-30deg'); // Custom property for animation
      leafL.style.transform = 'rotate(-30deg) scale(0)';
      wrapper.appendChild(leafL);

      const leafR = document.createElement('div');
      leafR.className = 'stem-leaf';
      leafR.style.left = '2px';
      leafR.style.bottom = (f.h * 0.55) + 'px';
      leafR.style.setProperty('--rot', '30deg');
      leafR.style.transform = 'rotate(30deg) scale(0)';
      wrapper.appendChild(leafR);

      // Bloom
      const bloom = document.createElement('div');
      bloom.className = 'bloom';
      bloom.style.bottom = f.h + 'px'; // Set exact bottom position
      // Reset top to auto so bottom works
      bloom.style.top = 'auto';
      wrapper.appendChild(bloom);

      // Inner Bloom HTML
      let html = '';
      if (f.type === 'rose') {
        html = `<div class="rose-petals"><div class="rp"></div><div class="rp"></div><div class="rp"></div><div class="rp-inner"></div></div>`;
      } else if (f.type === 'sunflower') {
        let p = '';
        for (let k = 0; k < 12; k++) p += `<div class="sp" style="transform:rotate(${k * 30}deg)"></div>`;
        html = `<div class="sunflower-petals">${p}<div class="sun-center"></div></div>`;
      } else if (f.type === 'tulip') {
        html = `<div class="tulip-head"><div class="tulip-top"><div class="tt"></div><div class="tt"></div><div class="tt"></div></div></div>`;
      } else if (f.type === 'daisy') {
        let p = '';
        for (let k = 0; k < 8; k++) p += `<div class="dp" style="transform:rotate(${k * 45}deg)"></div>`;
        html = `<div class="daisy-head">${p}<div class="daisy-center"></div></div>`;
      } else if (f.type === 'lavender') {
        html = `<div class="lavender-head"><div class="ld"></div><div class="ld"></div><div class="ld"></div><div class="ld"></div></div>`;
      }
      bloom.innerHTML = html;

      // Anim Sequence
      setTimeout(() => { stem.classList.add('grow-stem-anim'); }, f.delay);

      setTimeout(() => {
        leafL.classList.add('leaf-anim');
        leafR.classList.add('leaf-anim');
      }, f.delay + 1000);

      setTimeout(() => { bloom.classList.add('bloom-anim'); }, f.delay + 1500);

      // Keep static rotation, just add sway class which uses --r
      setTimeout(() => { wrapper.classList.add('sway-anim'); }, f.delay + 2200);
    });
  }
});
