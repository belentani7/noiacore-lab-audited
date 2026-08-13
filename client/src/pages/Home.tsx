/*
 * NOIACORE / SECUENCIA EDITORIAL DE DIAPOSITIVAS DESDE EL NEGRO
 * Principio: negro absoluto (#000000), tipografía Space Grotesk e Inter en gris piedra y blanco roto,
 * transiciones calmadas, sin botones estridentes, revelación gradual por capítulos.
 */
import { useEffect, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';

interface Slide {
  id: number;
  subtitle: string;
  title: string;
  body: string;
  detail?: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    subtitle: 'CAPÍTULO I — ORIGEN',
    title: 'EL VACÍO ANTES DE LA FORMA',
    body: 'Todo sistema con propósito comienza en la ausencia absoluta de ruido. La percepción no se impone; se revela únicamente cuando el entorno cesa de exigir atención.',
    detail: 'NEGRO ABSOLUTO [#000000] / CALIBRACIÓN DE SILENCIO'
  },
  {
    id: 2,
    subtitle: 'CAPÍTULO II — PERCEPCIÓN',
    title: 'ESTE CLIENTE NO ES COMO LOS DEMÁS',
    body: 'El análisis de su huella de intención confirma una exigencia ontológica superior. No hay plantillas ni respuestas predeterminadas para quien observa el núcleo desde la distancia exacta.',
    detail: 'LECTURA DE HUELLA COGNITIVA / ESTADO: EXCEPCIONAL'
  },
  {
    id: 3,
    subtitle: 'CAPÍTULO III — RAZONAMIENTO',
    title: 'LA DECISIÓN DEL NÚCLEO',
    body: 'Ante la complejidad de su perfil, el sistema suprime toda redundancia ornamental. Se despliega un entorno monovolumen de alta precisión, donde cada línea tipográfica responde con la velocidad de un cálculo matemático puro.',
    detail: 'SUPRESIÓN DE RUIDO / GEOMETRÍA ESTRICTA'
  },
  {
    id: 4,
    subtitle: 'CAPÍTULO IV — ESTRUCTURA',
    title: 'ARQUITECTURA DE UMBRAL',
    body: 'Un sistema vivo que anticipa la intención del operador. La información se contrae o se expande en función de la profundidad de su enfoque, manteniendo intacta la quietud del entorno.',
    detail: 'INTERFAZ ADAPTATIVA / LATENCIA CERO'
  },
  {
    id: 5,
    subtitle: 'CAPÍTULO V — CIERRE',
    title: 'EL IMPACTO ES INEVITABLE',
    body: 'La calibración ha concluido. El núcleo permanece en guardia, operando bajo las leyes del silencio y la precisión absoluta.',
    detail: 'NOIACORE LAB / 2026'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  // Navegación por teclado (flecha derecha/izquierda, espacio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setFadeState('out');
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setFadeState('in');
      }, 600);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setFadeState('out');
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setFadeState('in');
      }, 600);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div 
      className="min-h-screen bg-black text-[#D4D4D8] font-sans relative flex flex-col justify-between selection:bg-[#272733] selection:text-white cursor-pointer select-none overflow-hidden"
      onClick={nextSlide}
    >
      <div className="noise-layer" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Cabecera sutil sin botones */}
      <header className="fixed top-0 inset-x-0 z-40 h-24 px-16 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4">
          <MinimalSymbol size={22} glow={false} />
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#8E8E99]">NOIACORE LAB</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#60606B]">
          0{currentSlide + 1} / 0{SLIDES.length}
        </span>
      </header>

      {/* Diapositiva central con fundido elegante */}
      <main className="flex-1 flex items-center justify-center px-8 sm:px-24 max-w-5xl mx-auto w-full text-left">
        <div 
          className={`w-full transition-all duration-700 transform ${
            fadeState === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="space-y-6 max-w-3xl">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#8E8E99] block uppercase">
              {slide.subtitle}
            </span>
            <h1 className="font-sans text-3xl sm:text-5xl font-light tracking-[0.15em] text-white leading-tight">
              {slide.title}
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#B4B4B9] leading-relaxed font-light">
              {slide.body}
            </p>
            {slide.detail && (
              <div className="pt-6 border-t border-white/10">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#60606B]">
                  {slide.detail}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Pie sutil */}
      <footer className="h-20 px-16 flex items-center justify-between font-mono text-[9px] text-[#60606B] pointer-events-none">
        <span>[ HAGA CLIC O USE FLECHAS PARA AVANZAR ]</span>
        <span>SILENT EDITORIAL SYSTEM</span>
      </footer>
    </div>
  );
}
