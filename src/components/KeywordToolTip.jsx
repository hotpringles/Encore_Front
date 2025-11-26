// KeywordTooltip.jsx
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

function KeywordTooltip({ term, definition, children }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const id = useId();

  // 열릴 때 마다 위치 계산
  const updatePosition = () => {
    const t = triggerRef.current;
    const tip = tooltipRef.current;
    if (!t || !tip) return;
    const rect = t.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();

    // 기본: 텍스트 아래 중앙
    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;

    // 뷰포트 밖으로 나가지 않게 보정
    const margin = 8;
    const maxLeft =
      window.scrollX +
      document.documentElement.clientWidth -
      tipRect.width -
      margin;
    const minLeft = window.scrollX + margin;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // 아래가 좁으면 위로
    const spaceBelow = window.scrollY + window.innerHeight - (rect.bottom + 8);
    if (spaceBelow < tipRect.height && rect.top > tipRect.height + 8) {
      top = rect.top + window.scrollY - tipRect.height - 8;
    }
    setPos({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open]);

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        aria-describedby={open ? id : undefined}
        className="inline underline decoration-dotted cursor-help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children ?? term}
      </span>

      {open &&
        createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 1000,
            }}
            className="max-w-sm rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 shadow-md"
          >
            <div className="font-semibold mb-1 text-base">{term}</div>
            <div className="leading-snug text-base">{definition}</div>
          </div>,
          document.body
        )}
    </>
  );
}

export default KeywordTooltip;
