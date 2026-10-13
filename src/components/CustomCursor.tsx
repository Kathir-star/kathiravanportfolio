import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);

  useEffect(() => {
    // Only initialize custom cursor on desktop / non-touch fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (isFirstMove) {
        setTrailingPos({ x: e.clientX, y: e.clientY });
        setIsFirstMove(false);
      }
      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Dynamic hover detector for all clickable & interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovering(false);
        return;
      }

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('stag') ||
        target.closest('.cursor-pointer') !== null;

      setIsHovering(isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth lerp for trailing thin glow ring
    let reqId: number;
    const animate = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      reqId = requestAnimationFrame(animate);
    };
    reqId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, [pos, isFirstMove]);

  if (!isVisible || pos.x < 0 || pos.y < 0) return null;

  return (
    <>
      {/* Center Bright Dot with subtle soft aura */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-75 ease-out"
        style={{
          width: isHovering ? '6px' : '5px',
          height: isHovering ? '6px' : '5px',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) ${isMouseDown ? 'scale(0.75)' : 'scale(1)'}`,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.8), 0 0 14px 2px rgba(6, 182, 212, 0.4)',
        }}
      />

      {/* Thin Minimal Cosmic Glow Ring (As displayed in reference screenshot) */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-200 ease-out"
        style={{
          width: isHovering ? '44px' : isMouseDown ? '28px' : '36px',
          height: isHovering ? '44px' : isMouseDown ? '28px' : '36px',
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: 'translate(-50%, -50%)',
          border: '1px solid',
          borderColor: isHovering
            ? 'rgba(6, 182, 212, 0.85)'
            : 'rgba(6, 182, 212, 0.45)',
          backgroundColor: isHovering
            ? 'rgba(6, 182, 212, 0.06)'
            : 'rgba(6, 182, 212, 0.02)',
          boxShadow: isHovering
            ? '0 0 16px rgba(6, 182, 212, 0.4), inset 0 0 10px rgba(6, 182, 212, 0.15)'
            : '0 0 10px rgba(6, 182, 212, 0.22)',
        }}
      />
    </>
  );
};
