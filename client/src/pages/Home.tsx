/*
 * NOIACORE // THE INFINITE SPATIAL FACTORY (WEB INACABABLE)
 * Integrates all user references (Qwen, Z.ai, Manos Abiertas, Belentani),
 * 15 factory tools, Gestalt proximity/closure physics, Web Audio synthesis,
 * and endless 3D Z-depth navigation over absolute black (#000000).
 */
import { useEffect, useRef, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { FACTORY_TOOLS } from '@/lib/factoryTools';
import { MEDIA_ASSETS, FEATURED_ASSETS, ARCHIVE_ASSETS } from '@/lib/mediaAssets';
import { soundEngine, SoundPreset } from '@/lib/noiacoreSoundEngine';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [infiniteDepth, setInfiniteDepth] = useState(1);
  const [gazePoint, setGazePoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setInfiniteDepth(1 + progress * 2.5);
    };

    const handlePointer = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setGazePoint({ x, y });
      const el = containerRef.current;
      if (el) {
        el.style.setProperty('--cursor-x', `${x}px`);
        el.style.setProperty('--cursor-y', `${y}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  const triggerSound = (preset: SoundPreset = SoundPreset.NOIA) => {
    soundEngine.play(preset);
  };

  return (
    <div ref={containerRef} className="noia-infinite-root" style={{ transform: `scale(${1 + (infiniteDepth - 1) * 0.03})` }}>
      <div className="spatial-atmosphere" aria-hidden="true" />
      <div className="spatial-grain" aria-hidden="true" />

      {/* FIXED NAVIGATION */}
      <header className="spatial-nav">
        <div className="spatial-brand" onClick={() => triggerSound(SoundPreset.SUCCESS)}>
          <MinimalSymbol size={22} glow={false} />
          <span>NOIACORE // INFINITE SPATIAL FACTORY</span>
        </div>
        <div className="spatial-nav-info">
          <span>Z-DEPTH: {infiniteDepth.toFixed(2)}X</span>
          <span>15 TOOLS ACTIVE</span>
          <span>GESTALT ENGINE</span>
        </div>
      </header>

      {/* INFINITE SCENES CONTAINER */}
      <main className="spatial-stages">

        {/* SCENE 01: QWEN ARCHITECTURE // VERTICAL THRESHOLD */}
        <section className="spatial-stage" data-depth="0.1">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[0].src})` }} />
          <div className="stage-content" style={{ transform: `translate3d(${gazePoint.x * 0.5}px, ${gazePoint.y * 0.5}px, 100px)` }}>
            <span className="stage-eyebrow">REFERENCIA 01 // QWEN ARCHITECTURE</span>
            <h1>El umbral<br /><i>vertical.</i></h1>
            <p>Estructuras laterales recortadas, columna de luz central y un plano simétrico donde la materia piensa en silencio.</p>
            <button className="stage-action-btn" onClick={() => triggerSound(SoundPreset.CYBER)}>
              ACTIVAR NÚCLEO QWEN
            </button>
          </div>
          <div className="stage-depth-indicator">Z +100px // FRONT MATRIX</div>
        </section>

        {/* SCENE 02: Z.AI // ADVANCED AGENT MASTER STATION */}
        <section className="spatial-stage" data-depth="0.3">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[1].src})` }} />
          <div className="stage-content" style={{ transform: `translate3d(${gazePoint.x * 0.8}px, ${gazePoint.y * 0.8}px, 180px)` }}>
            <span className="stage-eyebrow">REFERENCIA 02 // Z.AI MASTER STATION</span>
            <h1>El núcleo<br /><i>orbital.</i></h1>
            <p>Anillos concéntricos de telemetría y cálculo autónomo en tiempo real sobre superficies de obsidiana absoluta.</p>
            <button className="stage-action-btn" onClick={() => triggerSound(SoundPreset.SUCCESS)}>
              SINCRONIZAR ÓRBITA Z.AI
            </button>
          </div>
          <div className="stage-depth-indicator">Z +280px // MID ORBIT</div>
        </section>

        {/* SCENE 03: MANOS ABIERTAS // MASTER STATION */}
        <section className="spatial-stage" data-depth="0.5">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[2].src})` }} />
          <div className="stage-content" style={{ transform: `translate3d(${gazePoint.x * 1.1}px, ${gazePoint.y * 1.1}px, 260px)` }}>
            <span className="stage-eyebrow">REFERENCIA 03 // MANOS ABIERTAS</span>
            <h1>La atmósfera<br /><i>en suspensión.</i></h1>
            <p>Capas de polvo cósmico y volúmenes de luz que reaccionan al campo gravitacional del observador.</p>
            <button className="stage-action-btn" onClick={() => triggerSound(SoundPreset.ACHIEVEMENT)}>
              CAPTURAR CAMPO ATMOSFÉRICO
            </button>
          </div>
          <div className="stage-depth-indicator">Z +420px // DEEP ATMOSPHERE</div>
        </section>

        {/* SCENE 04: BELENTANI PORTAL */}
        <section className="spatial-stage" data-depth="0.7">
          <div className="stage-bg-layer" style={{ backgroundImage: `url(${FEATURED_ASSETS[3].src})` }} />
          <div className="stage-content" style={{ transform: `translate3d(${gazePoint.x * 1.4}px, ${gazePoint.y * 1.4}px, 340px)` }}>
            <span className="stage-eyebrow">REFERENCIA 04 // BELENTANI PORTAL</span>
            <h1>El guardián<br /><i>de obsidiana.</i></h1>
            <p>Presencias silenciosas y formas oscuras que custodian los límites de la memoria compartida.</p>
            <button className="stage-action-btn" onClick={() => triggerSound(SoundPreset.CRITICAL)}>
              ESTABLECER ENLACE PORTAL
            </button>
          </div>
          <div className="stage-depth-indicator">Z +560px // ABYSS GATEWAY</div>
        </section>

        {/* SCENE 05: THE 15 FACTORY TOOLS (STATIONS) */}
        <section className="spatial-stage spatial-tools-stage">
          <div className="tools-header">
            <span className="stage-eyebrow">GESTALT ENGINE // 15 FACTORY STATIONS</span>
            <h2>Quince fuerzas operativas.</h2>
            <p>Cada estación representa una herramienta de la fábrica conectada por proximidad y continuidad sintética.</p>
          </div>
          <div className="tools-grid">
            {FACTORY_TOOLS.map((tool) => (
              <div 
                key={tool.id} 
                className={`tool-station ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTool(tool.id);
                  triggerSound(SoundPreset.COMPLETION);
                }}
              >
                <div className="tool-number">STATION // {tool.category.toUpperCase()}</div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="tool-status">ONLINE</span>
              </div>
            ))}
          </div>
        </section>

        {/* SCENE 06: ARCHIVE MATRIX // ENDLESS COLLAGE */}
        <section className="spatial-stage spatial-matrix-stage">
          <div className="tools-header">
            <span className="stage-eyebrow">ARCHIVE MATRIX // RAW ASSETS</span>
            <h2>La materia original.</h2>
            <p>Todos los archivos y capturas aportados integrados en el flujo tridimensional de la fábrica.</p>
          </div>
          <div className="matrix-grid">
            {ARCHIVE_ASSETS.map((asset, i) => (
              <div key={asset.id} className="matrix-card" style={{ transform: `translateZ(${(i + 1) * 15}px)` }}>
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
        <span>NOIACORE LAB 2026 // INFINITE FACTORY</span>
        <span>WEB INACABABLE // ACTIVE Z-DEPTH</span>
      </footer>
    </div>
  );
}
