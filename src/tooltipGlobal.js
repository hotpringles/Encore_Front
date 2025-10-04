// Global tooltip manager for elements with class .keyword-tooltip
// Avoids clipping by scroll containers by rendering to document.body
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__GLOBAL_KEYWORD_TOOLTIP__) return; // prevent duplicate init
  window.__GLOBAL_KEYWORD_TOOLTIP__ = true;

  const tooltipEl = document.createElement('div');
  tooltipEl.className = 'global-tooltip-portal';
  Object.assign(tooltipEl.style, {
    position: 'fixed',
    maxWidth: '320px',
    background: '#333',
    color: '#fff',
    borderRadius: '6px',
    padding: '8px 10px',
    zIndex: '10000',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    lineHeight: '1.5',
    fontSize: '14px',
    display: 'none',
    pointerEvents: 'none',
    transform: 'translate(-50%, -100%)',
    whiteSpace: 'normal',
  });
  document.body.appendChild(tooltipEl);

  let activeTarget = null;

  const hide = () => {
    activeTarget = null;
    tooltipEl.style.display = 'none';
  };

  const positionTooltip = (target, preferBelow = false) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const margin = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    tooltipEl.style.display = 'block';
    tooltipEl.style.transform = 'translate(-50%, -100%)';
    const ttRect = tooltipEl.getBoundingClientRect();

    let top = rect.top - margin;
    let left = rect.left + rect.width / 2;

    const notEnoughTopSpace = rect.top - ttRect.height - margin < 0;
    const notEnoughBottomSpace = rect.bottom + ttRect.height + margin > viewportHeight;
    const placeBelow = preferBelow || (notEnoughTopSpace && !notEnoughBottomSpace);
    if (placeBelow) {
      tooltipEl.style.transform = 'translate(-50%, 0)';
      top = rect.bottom + margin;
    }

    const halfWidth = ttRect.width / 2;
    const minLeft = halfWidth + 8;
    const maxLeft = viewportWidth - halfWidth - 8;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    tooltipEl.style.top = `${Math.round(top)}px`;
    tooltipEl.style.left = `${Math.round(left)}px`;
  };

  const findKeywordEl = (el) => {
    if (!el) return null;
    if (el.classList && el.classList.contains('keyword-tooltip')) return el;
    return el.closest ? el.closest('.keyword-tooltip') : null;
  };

  const onMouseEnter = (e) => {
    const kw = findKeywordEl(e.target);
    if (!kw) return;
    const textEl = kw.querySelector('.tooltip-text');
    if (!textEl) return;
    const content = textEl.textContent || textEl.innerText;
    if (!content) return;
    tooltipEl.textContent = content.trim();
    activeTarget = kw;
    positionTooltip(kw);
  };

  const onMouseMove = () => {
    if (!activeTarget) return;
    positionTooltip(activeTarget);
  };

  const onMouseLeave = (e) => {
    const kw = findKeywordEl(e.target);
    if (!kw) return;
    hide();
  };

  const onScrollOrResize = () => {
    if (!activeTarget) return;
    if (!document.body.contains(activeTarget)) {
      hide();
    } else {
      positionTooltip(activeTarget);
    }
  };

  document.addEventListener('mouseenter', onMouseEnter, true);
  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('mouseleave', onMouseLeave, true);
  window.addEventListener('scroll', onScrollOrResize, true);
  window.addEventListener('resize', onScrollOrResize, true);
})();

