/* NOIACORE Design Reminder: Oscuridad Cinética y Cognitiva. El canvas es la capa atmosférica; la interfaz permanece legible por encima. */
import { useEffect, useRef } from 'react';

type NeuralCanvasProps = {
  accent?: string;
  density?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  drift: number;
  phase: number;
};

export function NeuralCanvas({ accent = '#7d9bff', density = 180, className = '' }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    let time = 0;
    let targetX = 0.5;
    let targetY = 0.48;
    let currentX = 0.5;
    let currentY = 0.48;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particles: Particle[] = Array.from({ length: density }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.65 + 0.15,
      drift: Math.random() * 0.8 + 0.25,
      phase: index * 0.37 + Math.random() * 6.2,
    }));

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const move = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      targetY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    };

    const touchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      targetX = Math.min(1, Math.max(0, (touch.clientX - rect.left) / rect.width));
      targetY = Math.min(1, Math.max(0, (touch.clientY - rect.top) / rect.height));
    };

    const paint = () => {
      time += prefersReducedMotion ? 0.002 : 0.012;
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      const centerX = width * (0.5 + (currentX - 0.5) * 0.07);
      const centerY = height * (0.46 + (currentY - 0.5) * 0.05);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#040406';
      context.fillRect(0, 0, width, height);

      const background = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.78);
      background.addColorStop(0, 'rgba(24, 30, 70, 0.28)');
      background.addColorStop(0.42, 'rgba(11, 14, 32, 0.13)');
      background.addColorStop(1, 'rgba(4, 4, 6, 0)');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const orbital = time * particle.drift + particle.phase;
        const perspective = 0.35 + particle.z * 0.95;
        const x = particle.x * width + Math.sin(orbital) * 22 * perspective + (centerX - width / 2) * particle.z * 0.12;
        const y = particle.y * height + Math.cos(orbital * 0.7) * 16 * perspective + (centerY - height / 2) * particle.z * 0.12;
        const distance = Math.hypot(x - centerX, y - centerY);
        const alpha = Math.max(0.05, particle.alpha * (1 - Math.min(distance / (Math.max(width, height) * 0.75), 0.8)));
        context.fillStyle = index % 13 === 0 ? `rgba(255, 158, 90, ${alpha * 0.75})` : `rgba(220, 226, 255, ${alpha})`;
        context.beginPath();
        context.arc(x, y, particle.size * perspective, 0, Math.PI * 2);
        context.fill();
      });

      const glow = context.createRadialGradient(centerX, centerY, 18, centerX, centerY, Math.min(width, height) * 0.3);
      glow.addColorStop(0, 'rgba(125, 155, 255, 0.38)');
      glow.addColorStop(0.35, 'rgba(78, 103, 209, 0.11)');
      glow.addColorStop(1, 'rgba(4, 4, 6, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(centerX, centerY, Math.min(width, height) * 0.3, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.translate(centerX, centerY);
      context.rotate(time * 0.08);
      for (let ring = 0; ring < 7; ring += 1) {
        const radius = 62 + ring * 26;
        context.beginPath();
        context.strokeStyle = `rgba(125, 155, 255, ${0.12 - ring * 0.012})`;
        context.lineWidth = ring === 2 ? 1.5 : 0.7;
        context.ellipse(0, 0, radius * 1.72, radius * 0.32, ring * 0.07, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();

      const coreGradient = context.createRadialGradient(centerX - 5, centerY - 8, 2, centerX, centerY, 66);
      coreGradient.addColorStop(0, '#000000');
      coreGradient.addColorStop(0.68, '#000000');
      coreGradient.addColorStop(0.84, 'rgba(125, 155, 255, 0.25)');
      coreGradient.addColorStop(1, 'rgba(125, 155, 255, 0)');
      context.fillStyle = coreGradient;
      context.beginPath();
      context.arc(centerX, centerY, 78, 0, Math.PI * 2);
      context.fill();

      const horizon = context.createLinearGradient(0, height * 0.64, width, height * 0.64);
      horizon.addColorStop(0, 'rgba(4, 4, 6, 0)');
      horizon.addColorStop(0.5, `rgba(125, 155, 255, ${0.08 + Math.sin(time) * 0.02})`);
      horizon.addColorStop(1, 'rgba(4, 4, 6, 0)');
      context.fillStyle = horizon;
      context.fillRect(0, height * 0.64, width, 1);

      frame += 1;
      if (!prefersReducedMotion || frame % 4 === 0) raf = requestAnimationFrame(paint);
    };

    resize();
    paint();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('touchmove', touchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', touchMove);
      cancelAnimationFrame(raf);
    };
  }, [accent, density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
