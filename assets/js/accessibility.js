(function() {
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = '/assets/css/accessibility.css';
  document.head.appendChild(cssLink);

  function setFontSize(level) {
    document.body.classList.remove('fs-1','fs-2','fs-3','fs-4');
    document.body.classList.add('fs-' + level);
    localStorage.setItem('acc-font-size', level);
  }

  function toggleSetting(cls) {
    document.body.classList.toggle(cls);
    localStorage.setItem('acc-' + cls, document.body.classList.contains(cls));
  }

  function applyStored() {
    const size = localStorage.getItem('acc-font-size');
    if (size) setFontSize(size);
    ['dark-contrast','light-contrast','color-blind','highlight-links','readable-font'].forEach(cls => {
      if (localStorage.getItem('acc-' + cls) === 'true') {
        document.body.classList.add(cls);
      }
    });
  }

  function resetSettings() {
    ['dark-contrast','light-contrast','color-blind','highlight-links','readable-font','fs-1','fs-2','fs-3','fs-4'].forEach(cls => {
      document.body.classList.remove(cls);
    });
    ['acc-dark-contrast','acc-light-contrast','acc-color-blind','acc-highlight-links','acc-readable-font','acc-font-size'].forEach(k => localStorage.removeItem(k));
  }

  function buildMenu() {
    const toolbar = document.createElement('div');
    toolbar.id = 'accessibility-toolbar';
    toolbar.innerHTML = `
      <button id="acc-menu-toggle">תפריט נגישות</button>
      <div id="acc-menu">
        <div class="acc-section">
          <span>גודל טקסט</span>
          <button class="acc-font-btn" data-size="1">קטן</button>
          <button class="acc-font-btn" data-size="2">רגיל</button>
          <button class="acc-font-btn" data-size="3">גדול</button>
          <button class="acc-font-btn" data-size="4">ענק</button>
        </div>
        <button id="acc-dark">ניגודיות כהה</button>
        <button id="acc-light">ניגודיות בהירה</button>
        <button id="acc-color-blind">התאמת צבעים לעיוורי צבעים</button>
        <button id="acc-highlight">הדגשת קישורים</button>
        <button id="acc-readable">פונט קריא</button>
        <button id="acc-reset">איפוס הגדרות</button>
      </div>
    `;
    document.body.appendChild(toolbar);

    const menu = document.getElementById('acc-menu');
    document.getElementById('acc-menu-toggle').addEventListener('click', () => {
      menu.classList.toggle('show');
    });

    document.querySelectorAll('.acc-font-btn').forEach(btn => {
      btn.addEventListener('click', () => setFontSize(btn.getAttribute('data-size')));
    });

    document.getElementById('acc-dark').addEventListener('click', () => {
      document.body.classList.remove('light-contrast');
      localStorage.removeItem('acc-light-contrast');
      toggleSetting('dark-contrast');
    });

    document.getElementById('acc-light').addEventListener('click', () => {
      document.body.classList.remove('dark-contrast');
      localStorage.removeItem('acc-dark-contrast');
      toggleSetting('light-contrast');
    });

    document.getElementById('acc-color-blind').addEventListener('click', () => toggleSetting('color-blind'));
    document.getElementById('acc-highlight').addEventListener('click', () => toggleSetting('highlight-links'));
    document.getElementById('acc-readable').addEventListener('click', () => toggleSetting('readable-font'));
    document.getElementById('acc-reset').addEventListener('click', () => {
      resetSettings();
      menu.classList.remove('show');
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    applyStored();
    buildMenu();
  });
})();

