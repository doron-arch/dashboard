// FRAME tooltip system (Phase 8)
// Scans DOM for [data-tooltip] attributes and shows a hover/focus bubble.
// Optional [data-tooltip-below="true"] positions the bubble below the element.
(function () {
  var DELAY_MS = 200;
  var bubble = null;
  var arrow = null;
  var activeEl = null;
  var showTimer = null;

  function ensureBubble() {
    if (bubble) return;
    bubble = document.createElement('div');
    bubble.className = 'frame-tooltip';
    bubble.setAttribute('role', 'tooltip');
    arrow = document.createElement('div');
    arrow.className = 'frame-tooltip-arrow';
    bubble.appendChild(arrow);
    document.body.appendChild(bubble);
  }

  function positionBubble(el, below) {
    var rect = el.getBoundingClientRect();
    var bubbleRect = bubble.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var left = centerX - bubbleRect.width / 2;
    var margin = 8;
    left = Math.max(margin, Math.min(left, window.innerWidth - bubbleRect.width - margin));
    var top;
    if (below) {
      top = rect.bottom + 8 + window.scrollY;
      bubble.classList.add('below');
      bubble.classList.remove('above');
    } else {
      top = rect.top - bubbleRect.height - 8 + window.scrollY;
      bubble.classList.add('above');
      bubble.classList.remove('below');
    }
    bubble.style.left = (left + window.scrollX) + 'px';
    bubble.style.top = top + 'px';
    var arrowLeft = centerX - left - window.scrollX;
    arrow.style.left = arrowLeft + 'px';
  }

  function show(el) {
    ensureBubble();
    var text = el.getAttribute('data-tooltip');
    if (!text) return;
    var below = el.getAttribute('data-tooltip-below') === 'true';
    // clear previous text nodes (keep only the arrow)
    var children = Array.prototype.slice.call(bubble.childNodes);
    children.forEach(function (n) { if (n !== arrow) bubble.removeChild(n); });
    bubble.insertBefore(document.createTextNode(text), arrow);
    bubble.classList.add('visible');
    positionBubble(el, below);
    activeEl = el;
  }

  function hide() {
    if (showTimer) { clearTimeout(showTimer); showTimer = null; }
    if (bubble) bubble.classList.remove('visible');
    activeEl = null;
  }

  function scheduleShow(el, immediate) {
    if (showTimer) clearTimeout(showTimer);
    if (immediate) {
      show(el);
    } else {
      showTimer = setTimeout(function () { show(el); }, DELAY_MS);
    }
  }

  function attach(el) {
    el.addEventListener('mouseenter', function () { scheduleShow(el, false); });
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focus', function () { scheduleShow(el, true); });
    el.addEventListener('blur', hide);
  }

  function init() {
    var nodes = document.querySelectorAll('[data-tooltip]');
    nodes.forEach(attach);
    window.addEventListener('scroll', function () {
      if (activeEl) positionBubble(activeEl, activeEl.getAttribute('data-tooltip-below') === 'true');
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (activeEl) positionBubble(activeEl, activeEl.getAttribute('data-tooltip-below') === 'true');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
