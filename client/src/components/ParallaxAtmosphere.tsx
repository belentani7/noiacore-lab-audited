/* NOIACORE DESIGN REMINDER: La atmósfera se comporta como arquitectura viva; el movimiento debe sugerir profundidad, nunca marear. */
import { useEffect, useRef } from 'react';

const orbitalWordmark = '/manus-storage/noiacore-orbital-wordmark_23b0b159.png';

export function ParallaxAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const render = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      root.style.setProperty('--parallax-x', `${current.x.toFixed(2)}px`);
      root.style.setProperty('--parallax-y', `${current.y.toFixed(2)}px`);
      frameRef.current = window.requestAnimationFrame(render);
    };

    const handlePointer = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      targetRef.current = { x: x * 26, y: y * 18 };
    };
    const reset = () => { targetRef.current = { x: 0, y: 0 }; };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerleave', reset, { passive: true });
    frameRef.current = window.requestAnimationFrame(render);
    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerleave', reset);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className="parallax-atmosphere" aria-hidden="true">
      <div className="parallax-atmosphere__depth parallax-atmosphere__depth--far" />
      <div className="parallax-atmosphere__clouds" />
      <div className="parallax-atmosphere__structure parallax-atmosphere__structure--left" />
      <div className="parallax-atmosphere__structure parallax-atmosphere__structure--right" />
      <div className="parallax-atmosphere__beam" />
      <img className="parallax-atmosphere__wordmark" src={orbitalWordmark} alt="" />
      <div className="parallax-atmosphere__reflection" />
      <div className="parallax-atmosphere__scan" />
    </div>
  );
}
