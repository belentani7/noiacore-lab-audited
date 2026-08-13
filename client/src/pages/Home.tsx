/*
 * NOIACORE / EXPERIENCIA MÍNIMA SIN BOTONES & LUMÍNICA
 * Principio: negro absoluto (#000000), tipografía en gris piedra y blanco roto,
 * sin botones tradicionales; la activación ocurre al tocar o presionar el espacio / enter.
 */
import { useEffect, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { SCAN_PHASES, CLIENT_PROFILES, ClientProfile } from '@/lib/selectiveEngine';

type AppStage = 'boot' | 'scanning' | 'report' | 'calibrating' | 'solution';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('boot');
  const [scanStep, setScanStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ClientProfile | null>(null);

  // Activación invisible por teclado (Espacio o Enter) o clic general
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && stage === 'boot') {
        e.preventDefault();
        startSystem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  const startSystem = () => {
    setStage('scanning');
    setScanStep(0);
  };

  useEffect(() => {
    if (stage === 'scanning') {
      const timer = window.setInterval(() => {
        setScanStep((prev) => {
          if (prev < SCAN_PHASES.length - 1) {
            return prev + 1;
          } else {
            window.clearInterval(timer);
            setStage('report');
            return prev;
          }
        });
      }, 1200);
      return () => window.clearInterval(timer);
    }
  }, [stage]);

  const handleSelectRoute = (profileKey: string) => {
    setSelectedProfile(CLIENT_PROFILES[profileKey]);
    setStage('solution');
  };

  return (
    <div 
      className="min-h-screen bg-black text-[#D4D4D8] font-sans relative flex flex-col justify-between selection:bg-[#272733] selection:text-white cursor-default select-none"
      onClick={() => {
        if (stage === 'boot') startSystem();
      }}
    >
      <div className="noise-layer" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Subtle top indicator without buttons */}
      <header className="fixed top-0 inset-x-0 z-40 h-20 px-12 flex items-center justify-between border-b border-white/5 bg-black/90 backdrop-blur-sm pointer-events-none">
        <div className="flex items-center gap-4">
          <MinimalSymbol size={24} glow={false} />
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8E8E99]">NOIACORE LAB</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#60606B] uppercase">
          {stage === 'boot' && 'TOUCH / ENTER TO ACTIVATE'}
          {stage === 'scanning' && 'SCANNING FIELD'}
          {stage === 'report' && 'DOSSIER READY'}
          {stage === 'calibrating' && 'SELECT ROUTE'}
          {stage === 'solution' && 'SOLUTION ACTIVE'}
        </span>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 max-w-4xl mx-auto w-full text-center">
        {stage === 'boot' && (
          <div className="animate-fade-in space-y-8 pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); startSystem(); }}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full animate-pulse pointer-events-none" />
              <MinimalSymbol size={80} glow={false} className="relative z-10 mx-auto" />
            </div>
            <div className="space-y-3">
              <h1 className="font-sans text-2xl sm:text-4xl font-light tracking-[0.25em] text-white uppercase">
                NOIACORE
              </h1>
              <p className="font-mono text-xs tracking-[0.3em] text-[#8E8E99]">
                SISTEMA SILENCIOSO DE INTELIGENCIA SELECTIVA
              </p>
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#60606B] pt-4 animate-pulse">
              [ PULSE EN CUALQUIER PUNTO O PRESIONE ESPACIO ]
            </p>
          </div>
        )}

        {stage === 'scanning' && (
          <div className="w-full max-w-md mx-auto text-left font-mono animate-fade-in space-y-6">
            <div className="text-[10px] tracking-[0.3em] text-[#8E8E99] flex justify-between">
              <span>ANALIZANDO INTENCIÓN</span>
              <span>0{scanStep + 1} / 05</span>
            </div>
            <p className="text-sm tracking-[0.2em] text-white min-h-[50px] leading-relaxed">
              {SCAN_PHASES[scanStep]}
            </p>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-700"
                style={{ width: `${((scanStep + 1) / SCAN_PHASES.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {stage === 'report' && (
          <div className="w-full max-w-xl mx-auto text-left animate-fade-in space-y-8">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8E8E99] block">INFORME PRELIMINAR</span>
            <h2 className="font-sans text-2xl sm:text-3xl font-light text-white tracking-[0.15em]">
              ESTE CLIENTE NO ES COMO LOS DEMÁS
            </h2>
            <p className="font-sans text-sm text-[#B4B4B9] leading-relaxed">
              La lectura de su huella de acceso confirma una exigencia ontológica superior. El sistema no ofrecerá plantillas genéricas; cada calibración desplegará un repertorio único de supresión de ruido y densidad estructural.
            </p>
            <div className="pt-4 flex items-center justify-between font-mono text-xs text-white border-t border-white/10 cursor-pointer group" onClick={() => setStage('calibrating')}>
              <span className="tracking-[0.2em]">SELECCIONAR INTENCIÓN DE RUTA</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        )}

        {stage === 'calibrating' && (
          <div className="w-full max-w-xl mx-auto text-left animate-fade-in space-y-8">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8E8E99] block">CALIBRACIÓN DEL ENTORNO</span>
            <h2 className="font-sans text-xl sm:text-2xl font-light text-white tracking-[0.15em]">
              SELECCIONE EL UMBRAL DE OPERACIÓN
            </h2>
            <div className="space-y-4 font-mono text-xs">
              <div
                onClick={() => handleSelectRoute('architect_strict')}
                className="p-5 border border-white/10 bg-[#0A0A0C] hover:border-white/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-white tracking-widest">[01] SUPRESIÓN DE RUIDO Y GEOMETRÍA ESTRICTA</span>
                <span className="text-[#8E8E99] group-hover:text-white transition-colors">→</span>
              </div>
              <div
                onClick={() => handleSelectRoute('autonomous_fui')}
                className="p-5 border border-white/10 bg-[#0A0A0C] hover:border-white/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-white tracking-widest">[02] INTERFAZ AUTÓNOMA ADAPTATIVA</span>
                <span className="text-[#8E8E99] group-hover:text-white transition-colors">→</span>
              </div>
              <div
                onClick={() => handleSelectRoute('silent_vault')}
                className="p-5 border border-white/10 bg-[#0A0A0C] hover:border-white/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="text-white tracking-widest">[03] BÓVEDA DE AISLAMIENTO Y SILENCIO ABSOLUTO</span>
                <span className="text-[#8E8E99] group-hover:text-white transition-colors">→</span>
              </div>
            </div>
          </div>
        )}

        {stage === 'solution' && selectedProfile && (
          <div className="w-full max-w-2xl mx-auto text-left animate-fade-in space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8E8E99]">SOLUCIÓN ASIGNADA POR IA</span>
              <span className="font-mono text-[10px] text-white">RUTA: {selectedProfile.name}</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-sans text-xl font-light text-white tracking-widest">{selectedProfile.solutionTitle}</h3>
              <p className="font-sans text-sm text-[#B4B4B9] leading-relaxed">{selectedProfile.solutionDescription}</p>
            </div>
            <div className="bg-[#0A0A0C] p-6 border border-white/10 space-y-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8E8E99] block">RAZONAMIENTO DEL NÚCLEO</span>
              <p className="font-sans text-xs text-[#D4D4D8] leading-relaxed">{selectedProfile.reasoning}</p>
            </div>
            <div className="pt-4 flex items-center justify-between font-mono text-xs text-[#8E8E99] border-t border-white/10">
              <span className="cursor-pointer hover:text-white transition-colors" onClick={() => setStage('boot')}>
                [ REINICIAR SISTEMA ]
              </span>
              <span>NOIACORE / 2026</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer minimal */}
      <footer className="h-16 px-12 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-[#60606B] bg-black pointer-events-none">
        <span>ABSOLUTE BLACK / STONE GRAY</span>
        <span>NOISE ACTIVE</span>
      </footer>
    </div>
  );
}
