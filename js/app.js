(function () {
  const dom = {
    toggles: ['b1', 'b2', 'b4', 'b5', 'd1', 'd2', 'd4', 'd5'].map((id) => document.getElementById(id)),
    svgBtns: ['b3', 'd3'].map((id) => document.getElementById(id)),
    tabs: document.querySelectorAll('.tabs__item'),
    copyBtns: document.querySelectorAll('.code__copy'),
  };

  const svgClosed = ['M5,8 L23,8', 'M5,14 L23,14', 'M5,20 L23,20'];
  const svgOpen = ['M7,7 L21,21', 'M14,14 L14,14', 'M21,7 L7,21'];

  function setAria(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  function toggleBtn(btn) {
    const open = btn.classList.toggle('is-open');
    setAria(btn, open);
  }

  function toggleSvg(btn, open) {
    const paths = btn.querySelectorAll('.demo__svg-path');
    paths.forEach((p, i) => {
      p.style.d = 'path("' + (open ? svgOpen[i] : svgClosed[i]) + '")';
      p.style.opacity = (open && i === 1) ? '0' : '1';
    });
  }

  function switchTab(btn) {
    dom.tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tabs__panel').forEach((p) => p.classList.remove('is-active'));
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(btn.getAttribute('aria-controls')).classList.add('is-active');
  }

  function copyCode(btnEl) {
    const pre = btnEl.closest('.code').querySelector('.code__pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(
      () => feedback(btnEl, 'Copiado'),
      () => feedback(btnEl, 'Error')
    );
  }

  function feedback(btnEl, label) {
    const prev = btnEl.textContent;
    btnEl.textContent = label;
    setTimeout(() => { btnEl.textContent = prev; }, 2000);
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function hlCss(src) {
    const lines = escHtml(src).split('\n');
    return lines.map((line) => {
      const sel = line.match(/^(\s*)([^{}]+?)(\s*\{)\s*$/);
      if (sel) return sel[1] + '<span class="tok-sel">' + sel[2] + '</span>' + sel[3];
      const decl = line.match(/^(\s*)([a-zA-Z0-9-]+)(\s*:\s*)(.+?)(;?)\s*$/);
      if (decl) return decl[1] + '<span class="tok-prop">' + decl[2] + '</span>' + decl[3] + '<span class="tok-val">' + decl[4] + '</span>' + decl[5];
      return line;
    }).join('\n');
  }

  function hlHtml(src) {
    let s = escHtml(src);
    s = s.replace(/([a-zA-Z-]+)="([^"]*)"/g, '<span class="tok-prop">$1</span>="<span class="tok-val">$2</span>"');
    s = s.replace(/(&lt;\/?)([a-zA-Z0-9]+)/g, '$1<span class="tok-sel">$2</span>');
    return s;
  }

  function hlJs(src) {
    let s = escHtml(src);
    s = s.replace(/('[^']*'|"[^"]*")/g, '<span class="tok-val">$1</span>');
    s = s.replace(/\b(const|let|var|function|return|if|else|for|of|new|true|false|null|document|querySelector|querySelectorAll|addEventListener|classList|toggle|setAttribute|forEach|style)\b/g, '<span class="tok-sel">$1</span>');
    return s;
  }

  function highlightAll() {
    document.querySelectorAll('.code__pre').forEach((pre) => {
      const header = pre.previousElementSibling;
      const langEl = header && header.querySelector('.code__header-text');
      const lang = (langEl ? langEl.textContent : '').trim().toLowerCase();
      const raw = pre.textContent;
      let out;
      if (lang === 'css') out = hlCss(raw);
      else if (lang === 'html') out = hlHtml(raw);
      else if (lang === 'js') out = hlJs(raw);
      else out = escHtml(raw);
      pre.innerHTML = out;
    });
  }

  function init() {
    highlightAll();

    dom.toggles.forEach((btn) => {
      if (btn) btn.addEventListener('click', () => toggleBtn(btn));
    });

    dom.svgBtns.forEach((btn) => {
      if (!btn) return;
      let open = false;
      btn.addEventListener('click', () => {
        open = !open;
        toggleSvg(btn, open);
        setAria(btn, open);
      });
      toggleSvg(btn, false);
    });

    dom.tabs.forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn));
    });

    dom.copyBtns.forEach((btnEl) => {
      btnEl.addEventListener('click', () => copyCode(btnEl));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
