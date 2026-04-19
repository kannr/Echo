import { useRef, useCallback } from "react";

/** Long-press hook (works for mouse + touch). Default 450ms. */
export function useLongPress(onLongPress: () => void, ms = 450) {
  const t = useRef<number | null>(null);
  const fired = useRef(false);

  const start = useCallback(() => {
    fired.current = false;
    t.current = window.setTimeout(() => {
      fired.current = true;
      onLongPress();
    }, ms);
  }, [onLongPress, ms]);

  const clear = useCallback(() => {
    if (t.current) {
      window.clearTimeout(t.current);
      t.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
}
