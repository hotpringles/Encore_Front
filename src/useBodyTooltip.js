import { useEffect } from 'react';

// Simple body-level tooltip that avoids clipping by scroll containers
export default function useBodyTooltip(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    // Create a singleton tooltip element appended to body
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
      transform: 'translate(-50%, -100%)', // default above
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

      // Default place above; if not enough space, place below
      const margin = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Temporarily show to measure
      tooltipEl.style.display = 'block';
      tooltipEl.style.transform = 'translate(-50%, -100%)';
      const ttRect = tooltipEl.getBoundingClientRect();

      let top = rect.top - margin; // above by default
      let left = rect.left + rect.width / 2;

      const notEnoughTopSpace = rect.top - ttRect.height - margin < 0;
      const notEnoughBottomSpace = rect.bottom + ttRect.height + margin > viewportHeight;
      const placeBelow = preferBelow || (notEnoughTopSpace && !notEnoughBottomSpace);

      if (placeBelow) {
        tooltipEl.style.transform = 'translate(-50%, 0)';
        top = rect.bottom + margin;
      }

      // Clamp horizontally within viewport
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

    const onMouseMove = (e) => {
      if (!activeTarget) return;
      // Reposition as user moves (helps when target wraps lines)
      positionTooltip(activeTarget);
    };

    const onMouseLeave = (e) => {
      const kw = findKeywordEl(e.target);
      if (!kw) return;
      hide();
    };

    const onScrollOrResize = () => {
      if (!activeTarget) return;
      // If target is still in DOM, reposition; otherwise hide
      if (!document.body.contains(activeTarget)) {
        hide();
      } else {
        positionTooltip(activeTarget);
      }
    };

    container.addEventListener('mouseenter', onMouseEnter, true);
    container.addEventListener('mousemove', onMouseMove, true);
    container.addEventListener('mouseleave', onMouseLeave, true);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize, true);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter, true);
      container.removeEventListener('mousemove', onMouseMove, true);
      container.removeEventListener('mouseleave', onMouseLeave, true);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize, true);
      tooltipEl.remove();
    };
  }, [containerRef]);
}

