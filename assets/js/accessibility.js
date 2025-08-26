document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const style = document.createElement('style');
  style.innerHTML = `
    .accessibility-menu { position: fixed; top: 10px; left: 10px; z-index: 10000; }
    .accessibility-toggle { background: #000; color: #fff; padding: 8px; border: none; cursor: pointer; }
    .accessibility-panel { display: none; background: #fff; color: #000; border: 1px solid #000; padding: 10px; margin-top: 5px; }
    .accessibility-panel button { display: block; width: 100%; margin: 2px 0; }
    .font-size-1 { font-size: 100%; }
    .font-size-2 { font-size: 110%; }
    .font-size-3 { font-size: 120%; }
    .font-size-4 { font-size: 130%; }
    .contrast-dark { background-color: #000 !important; color: #fff !important; }
    .contrast-light { background-color: #fff !important; color: #000 !important; }
    .color-blind { filter: grayscale(100%) contrast(120%); }
    .highlight-links a { background: yellow !important; color: #000 !important; text-decoration: underline !important; }
    .readable-font { font-family: Arial, sans-serif !important; }
  `;
  document.head.appendChild(style);

  const menu = document.createElement('div');
  menu.className = 'accessibility-menu';
  menu.innerHTML = `
    <button class="accessibility-toggle" aria-expanded="false">Accessibility</button>
    <div class="accessibility-panel">
      <button data-action="font-up">Increase Font</button>
      <button data-action="contrast-dark">Dark Contrast</button>
      <button data-action="contrast-light">Light Contrast</button>
      <button data-action="color-blind">Color Blind Mode</button>
      <button data-action="highlight-links">Highlight Links</button>
      <button data-action="readable-font">Readable Font</button>
      <button data-action="reset">Reset</button>
    </div>`;
  document.body.appendChild(menu);

  const toggle = menu.querySelector('.accessibility-toggle');
  const panel = menu.querySelector('.accessibility-panel');
  toggle.addEventListener('click', function () {
    const open = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', String(!open));
  });

  let fontLevel = 1;
  function setFont(level) {
    body.classList.remove('font-size-1','font-size-2','font-size-3','font-size-4');
    body.classList.add('font-size-' + level);
  }

  panel.addEventListener('click', function (e) {
    const action = e.target.getAttribute('data-action');
    if (!action) return;
    switch (action) {
      case 'font-up':
        fontLevel = Math.min(fontLevel + 1, 4);
        setFont(fontLevel);
        break;
      case 'contrast-dark':
        body.classList.toggle('contrast-dark');
        body.classList.remove('contrast-light');
        break;
      case 'contrast-light':
        body.classList.toggle('contrast-light');
        body.classList.remove('contrast-dark');
        break;
      case 'color-blind':
        body.classList.toggle('color-blind');
        break;
      case 'highlight-links':
        body.classList.toggle('highlight-links');
        break;
      case 'readable-font':
        body.classList.toggle('readable-font');
        break;
      case 'reset':
        body.classList.remove('contrast-dark','contrast-light','color-blind','highlight-links','readable-font','font-size-1','font-size-2','font-size-3','font-size-4');
        fontLevel = 1;
        break;
    }
  });
});
