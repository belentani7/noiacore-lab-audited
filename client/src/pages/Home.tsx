/*
 * NOIACORE / EXPERIENCIA SELECTIVA Y SILENCIOSA
 * Principio: apertura en negro absoluto con escaneo de cliente, informe progresivo,
 * razonamiento de IA y rutas de solución personalizadas en gris piedra de baja saturación.
 */
import { useEffect, useState } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { SCAN_PHASES, CLIENT_PROFILES, ClientProfile } from '@/lib/selectiveEngine';
import { Terminal, Shield, Cpu, Activity, ArrowRight, RefreshCcw, CheckCircle2 } from 'lucide-react';

type AppStage = 'boot' | 'scanning' | 'report' | 'calibrating' | 'solution';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('boot');
  const [scanStep, setScanStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ClientProfile | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'NOIACORE KERNEL v4.2.0 [ANECHOIC MODE ACTIVE]',
    'Type "help" for available diagnostic commands.'
  ]);

  // Boot sequence simulation
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
      }, 1100);
      return () => window.clearInterval(timer);
    }
  }, [stage]);

  const handleSelectAnswer = (profileKey: string) => {
    setSelectedProfile(CLIENT_PROFILES[profileKey]);
    setStage('solution');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`]);
    setTerminalInput('');

    setTimeout(() => {
      if (cmd === 'help') {
        setTerminalLogs((prev) => [...prev, 'COMMANDS: status, scan, reset, clear, exit']);
      } else if (cmd === 'status') {
        setTerminalLogs((prev) => [...prev, 'SYSTEM: STABLE. CORE TEMP: 36.4C. ENCRYPTION: 1024-BIT SILENT.']);
      } else if (cmd === 'scan') {
        setTerminalLogs((prev) => [...prev, 'RE-SCANNING PERCEPTION FIELD... NO ANOMALIES DETECTED.']);
      } else if (cmd === 'reset') {
        setStage('boot');
        setTerminalOpen(false);
        setTerminalLogs(['NOIACORE KERNEL v4.2.0 [ANECHOIC MODE ACTIVE]']);
      } else if (cmd === 'clear') {
        setTerminalLogs(['NOIACORE KERNEL v4.2.0 [ANECHOIC MODE ACTIVE]']);
      } else if (cmd === 'exit') {
        setTerminalOpen(false);
      } else {
        setTerminalLogs((prev) => [...prev, `UNKNOWN COMMAND: "${cmd}". TYPE "HELP" FOR INDEX.`]);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-black text-[#D4D4D8] font-sans relative flex flex-col justify-between selection:bg-[#272733] selection:text-white">
      <div className="noise-layer" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Header Minimal */}
      <header className="fixed top-0 inset-x-0 z-40 h-20 px-8 flex items-center justify-between border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStage('boot')}>
          <MinimalSymbol size={28} glow={false} />
          <span className="font-mono text-xs tracking-[0.25em] text-white">NOIACORE</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-[#8E8E99]">
            {stage === 'boot' && 'SYSTEM STANDBY'}
            {stage === 'scanning' && 'SCANNING PERCEPTION FIELD'}
            {stage === 'report' && 'CLIENT DOSSIER COMPILED'}
            {stage === 'calibrating' && 'CALIBRATING INTENTION'}
            {stage === 'solution' && 'SOLUTION DEPLOYED'}
          </span>
          <button
            onClick={() => setTerminalOpen(true)}
            className="px-3 py-1.5 border border-white/15 bg-[#121216] text-[#D4D4D8] font-mono text-[10px] tracking-widest hover:border-white/40 hover:text-white transition-all cursor-pointer"
          >
            TERMINAL
          </button>
        </div>
      </header>

      {/* Main Container with slow atmospheric transitions */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 max-w-5xl mx-auto w-full">
        {/* STAGE 1: BOOT */}
        {stage === 'boot' && (
          <div className="text-center animate-fade-in max-w-2xl mx-auto">
            <MinimalSymbol size={64} glow={false} className="mx-auto mb-8" />
            <h1 className="font-sans text-3xl sm:text-5xl font-light tracking-[0.2em] text-white uppercase mb-4">
              NOIACORE LAB
            </h1>
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#8E8E99] mb-12">
              SISTEMA SILENCIOSO DE INTELIGENCIA SELECTIVA
            </p>
            <button
              onClick={startSystem}
              className="px-8 py-4 border border-white/20 bg-[#121216] text-white font-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              INICIAR SECUENCIA DE ACCESO
            </button>
          </div>
        )}

        {/* STAGE 2: SCANNING */}
        {stage === 'scanning' && (
          <div className="w-full max-w-xl mx-auto text-left font-mono animate-fade-in">
            <div className="border border-white/15 bg-[#0A0A0C] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs tracking-widest text-[#8E8E99]">CAMPO DE PERCEPCIÓN ACTIVO</span>
                <span className="text-xs text-white animate-pulse">0{scanStep + 1} / 05</span>
              </div>
              <p className="text-sm tracking-widest text-white mb-8 min-h-[40px]">
                {SCAN_PHASES[scanStep]}
              </p>
              <div className="w-full h-1 bg-[#1A1A22] overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${((scanStep + 1) / SCAN_PHASES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: REPORT */}
        {stage === 'report' && (
          <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <div className="border border-white/15 bg-[#0A0A0C] p-8 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-white/70" />
                <span className="font-mono text-xs tracking-[0.25em] text-[#8E8E99]">INFORME PRELIMINAR DE CAMPO</span>
              </div>
              <h2 className="font-sans text-2xl font-light text-white tracking-widest mb-4">
                ESTE CLIENTE NO ES COMO LOS DEMÁS
              </h2>
              <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed mb-8">
                La lectura de su huella de intención confirma que usted no busca una solución estándar. El cliente de esta vez no es como los demás: exige un entorno desprovisto de artificios, con lenguaje preciso y un repertorio adaptado a su nivel de exigencia.
              </p>
              <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#8E8E99]">SELECCIONE SU EJE DE INTENCIÓN PRINCIPAL:</span>
                <button
                  onClick={() => setStage('calibrating')}
                  className="px-6 py-3 border border-white/20 bg-[#121216] text-white font-mono text-xs tracking-widest hover:border-white transition-all cursor-pointer"
                >
                  PROCEDER A CALIBRACIÓN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: CALIBRATING (QUESTIONS & BRANCHING) */}
        {stage === 'calibrating' && (
          <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <div className="border border-white/15 bg-[#0A0A0C] p-8 sm:p-10 shadow-2xl">
              <span className="font-mono text-xs tracking-[0.25em] text-[#8E8E99] block mb-2">CALIBRACIÓN DE ENTRADA</span>
              <h2 className="font-sans text-2xl font-light text-white tracking-widest mb-6">
                ¿QUÉ NIVEL DE DENSIDAD OPERATIVA DEMANDA SU ENTORNO?
              </h2>
              <div className="space-y-4 font-mono text-xs">
                <button
                  onClick={() => handleSelectAnswer('architect_strict')}
                  className="w-full text-left p-4 border border-white/10 bg-[#121216] hover:border-white/40 hover:bg-[#1A1A22] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>[01] SUPRESIÓN DE RUIDO Y GEOMETRÍA ESTRICTA</span>
                  <ArrowRight className="w-4 h-4 text-[#8E8E99] group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => handleSelectAnswer('autonomous_fui')}
                  className="w-full text-left p-4 border border-white/10 bg-[#121216] hover:border-white/40 hover:bg-[#1A1A22] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>[02] INTERFAZ AUTÓNOMA ADAPTATIVA EN TIEMPO REAL</span>
                  <ArrowRight className="w-4 h-4 text-[#8E8E99] group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => handleSelectAnswer('silent_vault')}
                  className="w-full text-left p-4 border border-white/10 bg-[#121216] hover:border-white/40 hover:bg-[#1A1A22] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>[03] BÓVEDA DE AISLAMIENTO Y SILENCIO ABSOLUTO</span>
                  <ArrowRight className="w-4 h-4 text-[#8E8E99] group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: SOLUTION (PERSONALIZED OFFER & AI REASONING) */}
        {stage === 'solution' && selectedProfile && (
          <div className="w-full max-w-3xl mx-auto animate-fade-in">
            <div className="border border-white/15 bg-[#0A0A0C] p-8 sm:p-10 shadow-2xl space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span className="font-mono text-xs tracking-widest text-white">SOLUCIÓN ASIGNADA POR IA</span>
                </div>
                <span className="font-mono text-[10px] text-[#8E8E99]">PERFIL: {selectedProfile.name}</span>
              </div>

              <div>
                <h3 className="font-mono text-xs text-[#8E8E99] tracking-widest mb-2">RAZONAMIENTO DEL SISTEMA</h3>
                <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed bg-[#121216] p-6 border border-white/10">
                  {selectedProfile.reasoning}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-white/10 bg-[#121216] p-6">
                  <h4 className="font-mono text-xs text-white tracking-widest mb-2">{selectedProfile.solutionTitle}</h4>
                  <p className="font-sans text-xs text-[#8E8E99] leading-relaxed">{selectedProfile.solutionDescription}</p>
                </div>
                <div className="border border-white/10 bg-[#121216] p-6">
                  <h4 className="font-mono text-xs text-white tracking-widest mb-2">MÓDULOS ACTIVOS EN ESTA RUTA</h4>
                  <ul className="font-mono text-xs text-[#8E8E99] space-y-2 mt-3">
                    {selectedProfile.modulesRecommended.map((mod, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => setStage('boot')}
                  className="flex items-center gap-2 font-mono text-xs text-[#8E8E99] hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  REINICIAR CALIBRACIÓN
                </button>
                <span className="font-mono text-[10px] tracking-widest text-[#8E8E99]">NOIACORE LAB / 2026</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Minimal */}
      <footer className="h-16 px-8 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#8E8E99] bg-black">
        <span>MINIMAL ANKLE / STONE GRAY PALETTE</span>
        <span>ZERO SATURATION / NOISE ACTIVE</span>
      </footer>

      {/* Terminal Modal */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl border border-white/20 bg-[#0A0A0C] p-6 font-mono text-xs shadow-2xl flex flex-col h-[400px]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="text-white tracking-widest">CONSOLA DE DIAGNÓSTICO NOIACORE</span>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-[#8E8E99] hover:text-white cursor-pointer"
              >
                [CERRAR]
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 text-[#D4D4D8]">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">{log}</div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-white">{'>'}</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Escriba un comando (ej. status, scan, reset)"
                className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs placeholder:text-[#5c5c6b]"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
