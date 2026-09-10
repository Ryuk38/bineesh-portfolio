import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    const moveCursor = (event) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        const { x, y } = positionRef.current;
        if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frameRef.current = null;
      });
    };

    const updateHoverState = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = target?.closest('a, button, input, textarea, select, [role="button"]');
      ringRef.current?.classList.toggle('is-hovering', Boolean(isInteractive));
    };

    document.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('mouseover', updateHoverState, { passive: true });

    return () => {
      document.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('mouseover', updateHoverState);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <span ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}