// FRAME cross-mockup navigation (Phase 9)
// Floating pill (bottom-right) + Cmd+K / Ctrl+K shortcut to toggle the panel.
(function () {
  var MOCKUPS = [
    { key: 'dashboard',              name: 'Shared Analytics',   desc: 'Privacy-preserving ecosystem analytics', url: 'https://doron-arch.github.io/dashboard/' },
    { key: 'frame-technology-demo',  name: 'Technology Demo',    desc: 'Adaptation + Rapid Response + Workflow', url: 'https://doron-arch.github.io/frame-technology-demo/' },
    { key: 'frame-dashboard',        name: 'Intelligence Hub',   desc: 'Live threat and narrative monitoring',   url: 'https://doron-arch.github.io/frame-dashboard/' }
  ];

  function detectCurrent() {
    var p = window.location.pathname;
    // order matters: check frame-* before plain dashboard
    if (p.indexOf('/frame-technology-demo') >= 0) return 'frame-technology-demo';
    if (p.indexOf('/frame-dashboard') >= 0)       return 'frame-dashboard';
    if (p.indexOf('/dashboard') >= 0)             return 'dashboard';
    return 'dashboard';
  }

  var current = detectCurrent();
  var root, pill, panel, isOpen = false;

  function build() {
    root = document.createElement('div');
    root.className = 'frame-mockup-nav';

    pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'fmn-pill';
    pill.setAttribute('aria-label', 'Switch mockup');
    pill.setAttribute('aria-expanded', 'false');
    pill.innerHTML = '<span class="fmn-grid" aria-hidden="true">\u229E</span><span class="fmn-label">FRAME</span><span class="fmn-kbd">\u2318K</span>';

    panel = document.createElement('div');
    panel.className = 'fmn-panel';
    panel.setAttribute('role', 'menu');
    panel.innerHTML =
      '<div class="fmn-title">FRAME Mockups</div>' +
      MOCKUPS.map(function (m) {
        var isCurrent = m.key === current;
        return (
          '<a class="fmn-item' + (isCurrent ? ' fmn-current' : '') + '" ' +
          'href="' + m.url + '" role="menuitem" ' +
          (isCurrent ? 'aria-current="page"' : '') + '>' +
          '<span class="fmn-dot"></span>' +
          '<span class="fmn-meta">' +
            '<span class="fmn-name">' + m.name + '</span>' +
            '<span class="fmn-desc">' + m.desc + '</span>' +
          '</span>' +
          (isCurrent ? '<span class="fmn-current-tag">current</span>' : '') +
          '</a>'
        );
      }).join('');

    root.appendChild(panel);
    root.appendChild(pill);
    document.body.appendChild(root);
  }

  function open() {
    isOpen = true;
    root.classList.add('fmn-open');
    pill.setAttribute('aria-expanded', 'true');
  }
  function close() {
    isOpen = false;
    root.classList.remove('fmn-open');
    pill.setAttribute('aria-expanded', 'false');
  }
  function toggle() { isOpen ? close() : open(); }

  function onKey(e) {
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    var mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      toggle();
    } else if (e.key === 'Escape' && isOpen) {
      close();
    }
  }

  function onDocClick(e) {
    if (!isOpen) return;
    if (!root.contains(e.target)) close();
  }

  function init() {
    build();
    pill.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
