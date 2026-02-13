// ============================
// Valentine's Day Website — JS (With Scenery Flowers)
// ============================
document.addEventListener('DOMContentLoaded', () => {

  const landing = document.getElementById('landing');
  const bouquetPage = document.getElementById('bouquetPage');
  const revealBtn = document.getElementById('revealBtn');
  const bouquet = document.getElementById('bouquet');

  // Create Scenery Background Flowers
  createFieldFlowers();

  // ---- Reveal Button ----
  revealBtn.addEventListener('click', () => {
    landing.classList.add('hidden');
    setTimeout(() => {
      bouquetPage.classList.add('visible');
      growFlowers();
    }, 500);
  });

  // ============================
  // SCENERY FLOWERS (Background Blurred)
  // ============================
  function createFieldFlowers() {
    const scenery = document.querySelector('.scenery');
    if (!scenery) return;

    // Create 40 random flowers in the background
    const count = 40;
    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'field-flower';

      // Random Position: 0-100% width, 0-15% bottom height (on the hills)
      const x = Math.random() * 100;
      const y = Math.random() * 15;

      // Random Scale: 0.15 to 0.35 (small background flowers)
      const s = 0.15 + Math.random() * 0.20;

      // Random Blur: 2px to 5px
      const b = 2 + Math.random() * 3;

      // Random Type
      const types = ['rose', 'sunflower', 'daisy', 'tulip'];
      const type = types[Math.floor(Math.random() * types.length)];

      f.style.left = x + '%';
      f.style.bottom = y + '%';
      f.style.transform = `scale(${s})`;
      f.style.filter = `blur(${b}px)`;
      f.style.opacity = '0.7';
      f.style.zIndex = Math.floor(y / 5) + 1; // Slight layering with hills

      // Tiny stem
      const stem = document.createElement('div');
      stem.className = 'field-stem';
      f.appendChild(stem);

      // Head HTML (simplified versions of main flowers)
      let head = document.createElement('div');
      head.className = 'bloom';
      head.style.position = 'relative'; // Override absolute for field context
      head.style.opacity = 1;
      head.style.transform = 'scale(1)';

      if (type === 'rose') {
        head.innerHTML = `<div class="rose-petals"><div class="rp"></div><div class="rp"></div><div class="rp"></div><div class="rp-inner"></div></div>`;
      } else if (type === 'sunflower') {
        let p = ''; for (let k = 0; k < 12; k++) p += `<div class="sp" style="transform:rotate(${k * 30}deg)"></div>`;
        head.innerHTML = `<div class="sunflower-petals">${p}<div class="sun-center"></div></div>`;
      } else if (type === 'daisy') {
        let p = ''; for (let k = 0; k < 8; k++) p += `<div class="dp" style="transform:rotate(${k * 45}deg)"></div>`;
        head.innerHTML = `<div class="daisy-head">${p}<div class="daisy-center"></div></div>`;
      } else if (type === 'tulip') {
        head.innerHTML = `<div class="tulip-head"><div class="tulip-top"><div class="tt"></div><div class="tt"></div><div class="tt"></div></div></div>`;
      }

      f.appendChild(head);
      scenery.appendChild(f);
    }
  }

  // ============================
  // MAIN BOUQUET FLOWERS
  // ============================
  const flowers = [
    // Back Layer
    { type: 'sunflower', h: 420, angle: -25, delay: 100 },
    { type: 'rose', h: 410, angle: 25, delay: 200 },
    { type: 'tulip', h: 440, angle: -10, delay: 300 },
    { type: 'daisy', h: 400, angle: 10, delay: 400 },

    // Front Layer 
    { type: 'rose', h: 500, angle: 0, delay: 500 },  // Center Big (Tallest)
    { type: 'daisy', h: 460, angle: -15, delay: 600 },
    { type: 'sunflower', h: 480, angle: 15, delay: 700 },  // Right Big
    { type: 'lavender', h: 380, angle: -35, delay: 800 },
    { type: 'lavender', h: 390, angle: 35, delay: 900 },
    { type: 'rose', h: 350, angle: -50, delay: 1000 },
    { type: 'tulip', h: 340, angle: 50, delay: 1100 },
  ];

  function growFlowers() {
    flowers.forEach((f, i) => {
      // 1. Create Wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'stem-wrapper';
      wrapper.style.setProperty('--h', f.h + 'px');
      wrapper.style.setProperty('--r', f.angle + 'deg');
      wrapper.style.transform = `rotate(${f.angle}deg)`;
      wrapper.style.zIndex = (i < 4) ? 5 : 10;
      bouquet.appendChild(wrapper);

      // 2. Create Stem
      const stem = document.createElement('div');
      stem.className = 'stem';
      wrapper.appendChild(stem);

      // 3. Create Leaves
      const leafL = document.createElement('div');
      leafL.className = 'stem-leaf';
      leafL.style.left = '-35px';
      leafL.style.bottom = (f.h * 0.35) + 'px';
      leafL.style.setProperty('--rot', '-35deg');
      leafL.style.transform = 'rotate(-35deg) scale(0)';
      wrapper.appendChild(leafL);

      const leafR = document.createElement('div');
      leafR.className = 'stem-leaf';
      leafR.style.left = '5px';
      leafR.style.bottom = (f.h * 0.55) + 'px';
      leafR.style.setProperty('--rot', '35deg');
      leafR.style.transform = 'rotate(35deg) scale(0)';
      wrapper.appendChild(leafR);

      // 4. Create Bloom
      const bloom = document.createElement('div');
      bloom.className = 'bloom';
      bloom.style.bottom = f.h + 'px';
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

      // 5. Animations
      setTimeout(() => { stem.classList.add('grow-stem-anim'); }, f.delay);
      setTimeout(() => { leafL.classList.add('leaf-anim'); leafR.classList.add('leaf-anim'); }, f.delay + 1000);
      setTimeout(() => { bloom.classList.add('bloom-anim'); }, f.delay + 1500);
      setTimeout(() => { wrapper.classList.add('sway-anim'); }, f.delay + 2200);
    });
  }

});
