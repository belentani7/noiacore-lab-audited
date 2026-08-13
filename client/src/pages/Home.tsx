/*
 * NOIACORE / INTEGRACIÓN DE MATERIAL REAL
 * Una única página narrativa: las imágenes aportadas se convierten en evidencia visual,
 * no en una galería decorativa. El ritmo es lento, negro, mineral y editorial.
 */
import { useEffect, useRef, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { MEDIA_ASSETS, FEATURED_ASSETS, ARCHIVE_ASSETS } from '@/lib/mediaAssets';

const OBSERVATION_PHASES = [
  'EL CAMPO PERMANECE EN SILENCIO',
  'LA LUZ CONSERVA UNA DIRECCIÓN',
  'LA FORMA SE NIEGA A COMPLETARSE',
  'EL CLIENTE DE ESTA VEZ NO ES COMO LOS DEMÁS',
];

const REASONING = [
  {
    index: '01',
    label: 'LECTURA',
    title: 'No necesita más información.',
    body: 'Necesita que la información aparezca con el peso exacto. El material que ha traído no pide una interfaz que lo ordene; pide un espacio capaz de no interrumpirlo.',
  },
  {
    index: '02',
    label: 'DECISIÓN',
    title: 'La respuesta no será genérica.',
    body: 'El sistema descarta la cuadrícula de soluciones repetibles. Conserva la luz vertical, el negro profundo, la estructura incompleta y la pausa como materia principal.',
  },
  {
    index: '03',
    label: 'DESPLIEGUE',
    title: 'Primero el umbral. Después el sentido.',
    body: 'La experiencia se abre por capas: una presencia, una prueba, una lectura y una dirección. El visitante no recibe un catálogo; entra en una decisión.',
  },
];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [activeChapter, setActiveChapter] = useState('threshold');
  const [imageIndex, setImageIndex] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 1550);
    const phaseTimer = window.setInterval(() => {
      setPhase((value) => (value + 1) % OBSERVATION_PHASES.length);
    }, 2900);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-chapter');
            if (id) setActiveChapter(id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sectionsRef.current.forEach((section) => section && observer.observe(section));
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(phaseTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setImageIndex((value) => (value + 1) % FEATURED_ASSETS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const registerSection = (section: HTMLElement | null) => {
    if (section && !sectionsRef.current.includes(section)) sectionsRef.current.push(section);
  };

  return (
    <div className={`noia-page ${booted ? 'is-booted' : 'is-booting'}`}>
      <div className="noia-grain" aria-hidden="true" />
      <div className="noia-vignette" aria-hidden="true" />

      {/* La entrada no explica el sistema: solo lo deja aparecer. */}
      <div className={`noia-prelude ${booted ? 'is-gone' : ''}`} aria-hidden={booted}>
        <MinimalSymbol size={34} glow={false} />
        <span>NOIACORE / FIELD 01</span>
      </div>

      <header className="noia-header">
        <a href="#threshold" className="noia-brand" aria-label="Volver al inicio">
          <MinimalSymbol size={21} glow={false} />
          <span>NOIACORE</span>
        </a>
        <div className="noia-header-state">
          <span className="noia-state-light" aria-hidden="true" />
          <span>{activeChapter.toUpperCase()}</span>
        </div>
      </header>

      <main>
        <section
          ref={registerSection}
          data-chapter="threshold"
          id="threshold"
          className="noia-hero noia-slide"
        >
          <div className="noia-hero-image" style={{ backgroundImage: `url(${FEATURED_ASSETS[0].src})` }} aria-hidden="true" />
          <div className="noia-hero-light" aria-hidden="true" />
          <div className="noia-hero-content">
            <span className="noia-kicker">NOIACORE LAB / INTELLIGENCE ARCHITECTURE</span>
            <h1>El silencio<br /><em>también decide.</em></h1>
            <p className="noia-hero-copy">Una experiencia construida a partir de tu material. No una plantilla. No una respuesta inmediata.</p>
            <div className="noia-scroll-cue" aria-hidden="true"><span /> <small>desciende para entrar</small></div>
          </div>
        </section>

        <section ref={registerSection} data-chapter="observation" className="noia-slide noia-observation">
          <div className="noia-slide-index">01 / 05</div>
          <div className="noia-observation-copy">
            <span className="noia-kicker">CAMPO DE OBSERVACIÓN</span>
            <h2>El cliente de esta vez<br /><em>no es como los demás.</em></h2>
            <p>El sistema no abre con una colección de componentes. Abre con una lectura lenta del espacio que has dejado entre tus imágenes, tus HTML y tus instrucciones.</p>
            <div className="noia-observation-line"><span>{OBSERVATION_PHASES[phase]}</span><i /></div>
          </div>
          <div className="noia-observation-mark"><MinimalSymbol size={190} glow={false} /></div>
        </section>

        <section ref={registerSection} data-chapter="evidence" className="noia-slide noia-evidence">
          <div className="noia-slide-index">02 / 05</div>
          <div className="noia-section-heading">
            <span className="noia-kicker">EVIDENCIA VISUAL / MATERIAL APORTADO</span>
            <h2>La forma aparece<br /><em>antes que la explicación.</em></h2>
          </div>
          <div className="noia-featured-frame">
            {FEATURED_ASSETS.map((asset, index) => (
              <figure key={asset.id} className={`noia-featured-image ${index === imageIndex ? 'is-current' : ''}`}>
                <img src={asset.src} alt={asset.caption} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption><span>{asset.label}</span><small>{asset.caption}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section ref={registerSection} data-chapter="reasoning" className="noia-slide noia-reasoning">
          <div className="noia-slide-index">03 / 05</div>
          <div className="noia-section-heading">
            <span className="noia-kicker">RAZONAMIENTO DE LA IA / SIN RESPUESTA GENÉRICA</span>
            <h2>Esto es lo que el núcleo<br /><em>ha decidido conservar.</em></h2>
          </div>
          <div className="noia-reasoning-list">
            {REASONING.map((item) => (
              <article key={item.index} className="noia-reasoning-item">
                <span className="noia-reasoning-index">{item.index}</span>
                <div><span className="noia-kicker">{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section ref={registerSection} data-chapter="archive" className="noia-slide noia-archive">
          <div className="noia-slide-index">04 / 05</div>
          <div className="noia-section-heading">
            <span className="noia-kicker">ARCHIVO / 14 SEÑALES INTEGRADAS</span>
            <h2>El repertorio no se repite.<br /><em>Se transforma.</em></h2>
          </div>
          <div className="noia-archive-grid">
            {ARCHIVE_ASSETS.map((asset, index) => (
              <figure key={asset.id} className={`noia-archive-item noia-archive-item-${(index % 5) + 1}`}>
                <img src={asset.src} alt={asset.caption} loading="lazy" />
                <figcaption><span>{asset.label}</span><small>{asset.caption}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section ref={registerSection} data-chapter="offer" className="noia-slide noia-offer">
          <div className="noia-slide-index">05 / 05</div>
          <div className="noia-offer-symbol"><MinimalSymbol size={110} glow={false} /></div>
          <span className="noia-kicker">DECISIÓN DE DESPLIEGUE</span>
          <h2>La solución no se muestra.<br /><em>Se revela cuando está lista.</em></h2>
          <p>NOIACORE construirá el sistema a partir de esta lectura: una arquitectura de luz baja, un repertorio variable y una relación más precisa entre lo que miras y lo que aparece.</p>
          <div className="noia-final-line"><span>CAMPO ESTABLE</span><i /><span>LISTO PARA LA SIGUIENTE CAPA</span></div>
        </section>
      </main>

      <footer className="noia-footer"><span>NOIACORE / 2026</span><span>BLACK FIELD — COLD STONE — QUIET SIGNAL</span></footer>
    </div>
  );
}
