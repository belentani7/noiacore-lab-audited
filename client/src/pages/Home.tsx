/*
 * NOIACORE — MATERIAL FACTORY / STATIC PERFORMANCE
 *
 * Regla de dirección: todo está presente al abrir. No hay boot screen,
 * texto que se escribe, terminal, emoji, cursor simulado ni ventanas de sistema.
 * La vida procede de luz, profundidad, escala, materia e imágenes reales.
 */
import { useEffect, useRef } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { FACTORY_TOOLS } from '@/lib/factoryTools';
import { MEDIA_ASSETS, FEATURED_ASSETS, ARCHIVE_ASSETS } from '@/lib/mediaAssets';

const MANIFEST = [
  ['01', 'ManusCore', 'orquestación'],
  ['02', 'Claude Code', 'arquitectura'],
  ['03', 'PowerShell', 'diagnóstico'],
  ['04', 'NoiaWriter', 'lenguaje'],
  ['05', 'NoiaSheets', 'estructura'],
  ['06', 'NoiaShop', 'materia'],
  ['07', 'NoiaDALL-E', 'síntesis'],
  ['08', 'Noiaclaw', 'vigilancia'],
  ['09', 'Machine Mind', 'percepción'],
  ['10', 'Manus AI', 'criterio'],
  ['11', 'SecureVault', 'memoria'],
  ['12', 'Resonance', 'frecuencia'],
  ['13', 'Topology', 'conexión'],
  ['14', 'DOM Inspector', 'lectura'],
  ['15', 'Escape Sequence', 'umbral'],
] as const;

function MaterialImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img className={`material-image ${className}`} src={src} alt={alt} loading="lazy" />;
}

export default function Home() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const move = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--field-x', `${x * 8}px`);
      stage.style.setProperty('--field-y', `${y * 6}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div ref={stageRef} className="material-factory">
      <div className="factory-atmosphere" aria-hidden="true" />
      <div className="factory-grain" aria-hidden="true" />

      <header className="factory-header">
        <div className="factory-mark"><MinimalSymbol size={22} glow={false} /><span>NOIACORE</span></div>
        <div className="factory-header-meta"><span>FIELD / 01</span><span>BLACK MATTER STUDY</span></div>
      </header>

      <main>
        <section className="factory-opening">
          <div className="opening-void" aria-hidden="true" />
          <div className="opening-beam" aria-hidden="true" />
          <div className="opening-figure opening-figure-left" aria-hidden="true" />
          <div className="opening-figure opening-figure-right" aria-hidden="true" />
          <div className="opening-copy">
            <span className="eyebrow">NOIACORE LAB / MATERIAL FACTORY</span>
            <h1>La forma<br /><i>piensa</i><br />en silencio.</h1>
            <p>Una fábrica de percepción, imagen y criterio. Todo lo que has traído permanece dentro: transformado, no reemplazado.</p>
          </div>
          <div className="opening-foot"><span>01—15</span><span>THE MACHINE IS ALREADY OPEN</span><span>SCROLL / FIELD</span></div>
        </section>

        <section className="factory-threshold editorial-band">
          <div className="band-title"><span className="eyebrow">UMBRAL / A</span><h2>Una máquina<br /><i>sin espectáculo.</i></h2></div>
          <div className="threshold-image"><MaterialImage src={FEATURED_ASSETS[0].src} alt="Umbral vertical de luz y arquitectura" /></div>
          <div className="threshold-note"><span className="note-line" /> <p>La estructura no se presenta. Se percibe por sus bordes, sus reflejos y la distancia exacta entre una cosa y la siguiente.</p></div>
        </section>

        <section className="factory-desk editorial-band">
          <div className="desk-copy"><span className="eyebrow">DESK / MANUSCORE</span><h2>Quince fuerzas<br /><i>en una superficie.</i></h2><p>Las herramientas no aparecen como aplicaciones separadas. Operan como estaciones de la misma fábrica: una escribe, otra ordena, otra mira, otra decide.</p></div>
          <div className="desk-image-main"><MaterialImage src={FEATURED_ASSETS[1].src} alt="Insignia orbital y núcleo de NOIACORE" /></div>
          <div className="desk-image-small"><MaterialImage src={FEATURED_ASSETS[2].src} alt="Campo visual de referencia aportado" /></div>
          <div className="desk-rule" />
        </section>

        <section className="factory-manifest editorial-band">
          <div className="manifest-head"><span className="eyebrow">MANUSCORE / FACTORY MAP</span><h2>Todo está<br /><i>conectado.</i></h2></div>
          <div className="manifest-list">
            {MANIFEST.map(([number, name, functionName]) => (
              <div className="manifest-row" key={number}>
                <span>{number}</span><strong>{name}</strong><em>{functionName}</em><i className="manifest-wire" />
              </div>
            ))}
          </div>
        </section>

        <section className="factory-archive editorial-band">
          <div className="archive-heading"><span className="eyebrow">ARCHIVE / RAW SIGNALS</span><h2>La materia<br /><i>es la interfaz.</i></h2><p>Los materiales originales permanecen visibles, en escala y silencio. Cada uno contiene una parte de la máquina.</p></div>
          <div className="archive-collage">
            {ARCHIVE_ASSETS.map((asset, index) => (
              <figure className={`archive-piece archive-piece-${(index % 7) + 1}`} key={asset.id}>
                <MaterialImage src={asset.src} alt={asset.caption} />
                <figcaption><span>{asset.label}</span><small>{asset.caption}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="factory-mind editorial-band">
          <div className="mind-field" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="mind-copy"><span className="eyebrow">MACHINE MIND / SHADER FIELD</span><h2>Dentro de la máquina<br /><i>no hay una pantalla.</i></h2><p>Hay capas de memoria, polvo, velocidad y luz. El shader no decora el sistema: es el registro de lo que la máquina está pensando.</p></div>
          <div className="mind-caption"><span>BLACK FIELD</span><span>LOW SATURATION</span><span>NOISE / 0.03</span></div>
        </section>

        <section className="factory-crab editorial-band">
          <div className="crab-image"><MaterialImage src={FEATURED_ASSETS[3].src} alt="Cangrejo o criatura oscura de referencia visual" /></div>
          <div className="crab-copy"><span className="eyebrow">NOIACLAW / UNIT 08</span><h2>El guardián<br /><i>de lo profundo.</i></h2><p>Noiaclaw no es un personaje ni un emoji. Es una criatura de vigilancia: azul casi negro, pesada, silenciosa, atenta a las zonas que la interfaz no explica.</p><div className="crab-spec"><span>BODY / OBSIDIAN BLUE</span><span>BEHAVIOUR / NONVERBAL</span><span>ROLE / PERIMETER</span></div></div>
        </section>

        <section className="factory-final editorial-band">
          <div className="final-symbol"><MinimalSymbol size={88} glow={false} /></div>
          <div className="final-copy"><span className="eyebrow">NOIACORE / MANUSCORE</span><h2>Una fábrica<br /><i>completa.</i></h2><p>Sin ventanas que imitan un sistema. Sin ruido que exige atención. Solo un campo físico donde el material, la herramienta y la decisión pueden convivir.</p></div>
          <div className="final-index">NOIACORE LAB / 2026 / FIELD 01</div>
        </section>
      </main>

      <footer className="factory-footer"><span>NOIACORE</span><span>THE MACHINE IS ALREADY OPEN</span><span>{MEDIA_ASSETS.length} MATERIALS / {FACTORY_TOOLS.length} FORCES</span></footer>
    </div>
  );
}
