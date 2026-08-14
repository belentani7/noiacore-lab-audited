/*
 * NOIACORE // 3D SPATIAL DEPTH & ELEVATED HTML REFERENCES
 * Cada sección representa una página de los HTML aportados, elevada con
 * estética cinematográfica, profundidad 3D real, zoom in/out y parallax interactivo.
 */
import { useEffect, useRef, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { FEATURED_ASSETS, ARCHIVE_ASSETS } from '@/lib/mediaAssets';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      // Zoom in / zoom out effect based on scroll position
      const z = 1 + Math.sin(progress * Math.PI * 2) * 0.08;
      setZoomLevel(z);
    };

    const handlePointer = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--cursor-x', `${x}px`);
      el.style.setProperty('--cursor-y', `${y}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  return (
    <div ref={containerRef} className="noia-spatial-root" style={{ transform: `scale(${zoomLevel})` }}>
      <div className="spatial-atmosphere" aria-hidden="true" />
      <div className="spatial-grain" aria-hidden="true" />

      {/* FIXED NAVIGATION */}
      <header className="spatial-nav">
        <div className="spatial-brand">
          <MinimalSymbol size={22} glow={false} />
          <span>NOIACORE // SPATIAL ARCHITECTURE</span>
        </div>
        <div className="spatial-nav-info">
          <span>Z-DEPTH ENABLED</span>
          <span>HTML SOURCE ELEVATED</span>
        </div>
      </header>

      {/* 3D SCENE CONTAINER */}
      <main className="spatial-stages">
        
        {/* PAGE 01: QWEN / THE VERTICAL THRESHOLD */}
        <section className="spatial-stage" data-depth="0.1">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[0].src})` }} />
          <div className="stage-content">
            <span className="stage-eyebrow">REFERENCIA 01 // QWEN ARCHITECTURE</span>
            <h1>El umbral<br /><i>vertical.</i></h1>
            <p>Estructuras laterales recortadas, columna de luz central y un plano simétrico donde la materia se pliega sobre sí misma.</p>
          </div>
          <div className="stage-depth-indicator">FRONT LAYER // Z +120px</div>
        </section>

        {/* PAGE 02: Z.AI / ADVANCED AI AGENT STATION */}
        <section className="spatial-stage" data-depth="0.3">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[1].src})` }} />
          <div className="stage-content">
            <span className="stage-eyebrow">REFERENCIA 02 // Z.AI MASTER STATION</span>
            <h1>El núcleo<br /><i>orbital.</i></h1>
            <p>Anillos concéntricos de telemetría, pulso cian profundo y cálculo autónomo en tiempo real sobre superficies de obsidiana.</p>
          </div>
          <div className="stage-depth-indicator">MID LAYER // Z +240px</div>
        </section>

        {/* PAGE 03: MANOS ABIERTAS / MASTER STATION */}
        <section className="spatial-stage" data-depth="0.5">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[2].src})` }} />
          <div className="stage-content">
            <span className="stage-eyebrow">REFERENCIA 03 // MANOS ABIERTAS</span>
            <h1>La atmósfera<br /><i>en suspensión.</i></h1>
            <p>Capas de polvo cósmico y volúmenes de luz que reaccionan al movimiento del cursor en el espacio tridimensional.</p>
          </div>
          <div className="stage-depth-indicator">DEEP LAYER // Z +360px</div>
        </section>

        {/* PAGE 04: BELENTANI PORTAL */}
        <section className="spatial-stage" data-depth="0.7">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[3].src})` }} />
          <div className="stage-content">
            <span className="stage-eyebrow">REFERENCIA 04 // BELENTANI PORTAL</span>
            <h1>El guardián<br /><i>de obsidiana.</i></h1>
            <p>Presencias silenciosas y formas orgánicas oscuras que custodian los límites de la memoria compartida.</p>
          </div>
          <div className="stage-depth-indicator">ABYSS LAYER // Z +480px</div>
        </section>

        {/* PAGE 05: ARCHIVE MATRIX */}
        <section className="spatial-stage spatial-matrix">
          <div className="matrix-grid">
            {ARCHIVE_ASSETS.slice(0, 8).map((asset, i) => (
              <div key={asset.id} className="matrix-card" style={{ transform: `translateZ(${(i + 1) * 20}px)` }}>
                <img src={asset.src} alt={asset.caption} />
                <div className="matrix-meta">
                  <span>{asset.label}</span>
                  <small>{asset.caption}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="spatial-footer">
        <span>NOIACORE LAB 2026</span>
        <span>SPATIAL RENDER 3D // ACTIVE</span>
      </footer>
    </div>
  );
}
