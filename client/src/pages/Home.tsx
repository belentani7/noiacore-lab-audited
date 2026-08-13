/*
 * NOIACORE OS — INTELLIGENCE ARCHITECTURE
 * Implementación exacta basada en la referencia visual aportada (Qwen_html_20260812_aawz13idw.html).
 * OLED Black puro, tipografía Space Grotesk e Inter, HUD lateral de telemetría, canvas cósmico de fondo y terminal de laboratorio.
 */
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bootDone, setBootDone] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([
    'INIT NOIACORE KERNEL v4.2.0...',
    'LOADING SHADER HORIZON & WATER...',
    'ESTABLISHING OELD OLED BACKPLANE...',
    'SYSTEM READY. IMPACT IS INEVITABLE.'
  ]);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [bootProgress, setBootProgress] = useState(0);

  // Terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'NOIACORE // LAB CONSOLE — escribe `help`'
  ]);

  // Audio state
  const [audioLive, setAudioLive] = useState(false);

  // HUD telemetry state
  const [fps, setFps] = useState(60);
  const [frameCount, setFrameCount] = useState(1024);

  // Boot sequence simulation matching reference
  useEffect(() => {
    let current = 0;
    const timer = window.setInterval(() => {
      current++;
      if (current <= bootLogs.length) {
        setVisibleLogs(current);
        setBootProgress(Math.round((current / bootLogs.length) * 100));
      } else {
        window.clearInterval(timer);
        window.setTimeout(() => setBootDone(true), 600);
      }
    }, 350);
    return () => window.clearInterval(timer);
  }, []);

  // Canvas universe animation (starfield + subtle accretion glow)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.2 + 0.05
      });
    }

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = height;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * (0.6 + 0.4 * Math.sin(t + s.x))})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      // Subtle gravitational horizon glow in center
      const centerX = width / 2;
      const centerY = height / 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width * 0.4);
      gradient.addColorStop(0, 'rgba(125, 180, 255, 0.04)');
      gradient.addColorStop(0.5, 'rgba(125, 180, 255, 0.01)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      setFrameCount((prev) => prev + 1);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalLogs((prev) => [...prev, `› ${terminalInput}`]);
    setTerminalInput('');

    setTimeout(() => {
      if (cmd === 'help') {
        setTerminalLogs((prev) => [...prev, 'COMMANDS: status, scan, audio, clear, exit']);
      } else if (cmd === 'status') {
        setTerminalLogs((prev) => [...prev, 'SYS: STABLE. OLED BACKPLANE 100%. RENDERER: WEBGL2/CANVAS2D.']);
      } else if (cmd === 'scan') {
        setTerminalLogs((prev) => [...prev, 'PERCEPTION FIELD SECURE. NO ANOMALIES DETECTED.']);
      } else if (cmd === 'audio') {
        setAudioLive((prev) => !prev);
        setTerminalLogs((prev) => [...prev, `AUDIO SYNTHESIS: ${!audioLive ? 'ACTIVE' : 'MUTED'}`]);
      } else if (cmd === 'clear') {
        setTerminalLogs(['NOIACORE // LAB CONSOLE — escribe `help`']);
      } else if (cmd === 'exit') {
        setTerminalOpen(false);
      } else {
        setTerminalLogs((prev) => [...prev, `UNKNOWN COMMAND: "${cmd}". TYPE "HELP".`]);
      }
    }, 300);
  };

  return (
    <div className="bg-black text-[rgba(255,255,255,0.92)] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-[rgba(125,180,255,0.25)] selection:text-white">
      {/* BOOT OVERLAY */}
      <div 
        id="boot" 
        className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${
          bootDone ? 'opacity-0 pointer-events-none visibility-hidden' : 'opacity-100'
        }`}
      >
        <div className="w-[min(520px,86vw)] font-mono text-[0.7rem] text-[rgba(224,242,254,0.38)] leading-loose">
          <div className="font-['Space_Grotesk'] text-[1.15rem] tracking-[0.5em] text-white mb-6">NOIACORE</div>
          <div className="space-y-1 mb-6">
            {bootLogs.map((log, idx) => (
              <div 
                key={idx} 
                className={`transition-all duration-400 ${idx < visibleLogs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
              >
                {log}
              </div>
            ))}
          </div>
          <div className="h-[1px] bg-white/10 w-full overflow-hidden">
            <div className="h-full bg-[#7db4ff] transition-all duration-500" style={{ width: `${bootProgress}%` }} />
          </div>
        </div>
      </div>

      {/* CAPA 1: UNIVERSO */}
      <canvas ref={canvasRef} id="noiacore-universe" className="fixed inset-0 w-screen h-screen z-[1] pointer-events-none opacity-100" />

      {/* CONTROL AUDIO / TERMINAL BUTTON */}
      <button 
        onClick={() => setAudioLive(!audioLive)}
        className={`fixed top-5 right-5 z-[80] font-mono text-[0.62rem] tracking-[0.14em] px-4 py-2 rounded-full border transition-all cursor-pointer uppercase ${
          audioLive 
            ? 'text-[#7db4ff] border-[rgba(125,180,255,0.5)] bg-[rgba(255,255,255,0.04)]' 
            : 'text-[rgba(224,242,254,0.38)] border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:text-white hover:border-[rgba(125,180,255,0.3)]'
        }`}
      >
        {audioLive ? 'AUDIO: LIVE' : 'AUDIO: MUTED'}
      </button>

      <button
        onClick={() => setTerminalOpen(!terminalOpen)}
        className="fixed top-5 right-36 z-[80] font-mono text-[0.62rem] tracking-[0.14em] px-4 py-2 rounded-full border text-[rgba(224,242,254,0.38)] border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:text-white hover:border-[rgba(125,180,255,0.3)] transition-all cursor-pointer uppercase"
      >
        {terminalOpen ? 'CERRAR LAB' : 'ABRIR LAB'}
      </button>

      {/* CAPA 2: INTERFAZ ADAPTATIVA */}
      <main id="noiacore-ui" className="relative z-10">
        <section className="min-h-screen grid place-items-center px-[6vw] py-[12vh]" id="hero">
          <div className="text-center">
            <div className="font-['Space_Grotesk'] font-extralight text-[clamp(2.6rem,8vw,6.4rem)] tracking-[0.42em] indent-[0.42em] text-white">
              NOIACORE
            </div>
            <div className="text-center tracking-[0.6em] indent-[0.6em] font-mono text-[0.72rem] text-[rgba(224,242,254,0.38)] uppercase mt-2">
              Lab · Inteligencia silenciosa · Tecnología esencial
            </div>
            <p className="text-center mt-12 text-[rgba(255,255,255,0.55)] text-[0.95rem] leading-[2]">
              Core is invisible.<br /><em className="not-italic text-[rgba(125,180,255,0.95)]">Impact is inevitable.</em>
            </p>
            <div className="mt-10 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-[rgba(224,242,254,0.38)]">
              [ DESPLACE PARA EXPLORAR EL NÚCLEO ]
            </div>
          </div>
        </section>

        {/* Módulos adicionales de contenido basados en la referencia */}
        <section className="min-h-screen grid place-items-center px-[6vw] py-[12vh]">
          <div className="p-[clamp(2rem,5vw,3.5rem)] max-w-[820px] w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] backdrop-blur-[16px] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-[rgba(224,242,254,0.38)] block mb-4">
              MÓDULO 01 // MANIFIESTO
            </span>
            <h2 className="font-['Space_Grotesk'] font-extralight text-[clamp(2.4rem,6vw,5.2rem)] tracking-[0.28em] text-white uppercase mb-6 leading-tight">
              PERCEPCIÓN PURA
            </h2>
            <p className="text-[clamp(0.95rem,1.2vw,1.12rem)] leading-[1.7] text-[rgba(255,255,255,0.55)] font-light max-w-[620px]">
              El sistema opera bajo los principios de la <strong>atención selectiva</strong> y la supresión de toda fricción visual. Cada transición se funde desde el negro absoluto con precisión matemática.
            </p>
            <div className="mt-8 flex gap-2 flex-wrap">
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[rgba(224,242,254,0.38)] border border-white/10 px-3 py-1 rounded-full uppercase">OLED BLACK</span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[rgba(224,242,254,0.38)] border border-white/10 px-3 py-1 rounded-full uppercase">SPACE GROTESK</span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-[rgba(224,242,254,0.38)] border border-white/10 px-3 py-1 rounded-full uppercase">SILENT CORE</span>
            </div>
          </div>
        </section>
      </main>

      {/* CAPA 3: HUD TELEMETRÍA */}
      <aside 
        id="noiacore-hud" 
        className="fixed left-6 bottom-6 z-[60] font-mono text-[0.66rem] tracking-[0.08em] text-[rgba(224,242,254,0.38)] p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] backdrop-blur-[16px] rounded-xl min-w-[230px]"
      >
        <div className="flex justify-between gap-6 my-1"><span>SYS.STATE</span><b className="font-normal text-[#e0f2fe]">ONLINE</b></div>
        <div className="flex justify-between gap-6 my-1"><span>FPS</span><b className="font-normal text-[#7db4ff]">{fps}</b></div>
        <div className="flex justify-between gap-6 my-1"><span>FRAME</span><b className="font-normal text-[#7db4ff]">{frameCount}</b></div>
        <div className="flex justify-between gap-6 my-1"><span>RENDERER</span><b className="font-normal text-[#e0f2fe]">WEBGL2</b></div>
        <div className="flex justify-between gap-6 my-1"><span>PALETTE</span><b className="font-normal text-[#e0f2fe]">OLED / COLD</b></div>
      </aside>

      {/* TERMINAL DE LABORATORIO */}
      <div 
        id="terminal" 
        className={`fixed right-6 bottom-6 z-[70] w-[min(560px,calc(100vw-3rem))] h-[340px] flex flex-col p-4 font-mono text-[0.72rem] text-[#e0f2fe] bg-[rgba(10,10,12,0.92)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[20px] rounded-xl transition-all duration-700 ${
          terminalOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="text-[rgba(224,242,254,0.38)] tracking-[0.12em] uppercase border-b border-white/10 pb-2 mb-2 text-[0.62rem] flex justify-between">
          <span>NOIACORE // LAB CONSOLE</span>
          <button onClick={() => setTerminalOpen(false)} className="hover:text-white cursor-pointer">[X]</button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 font-mono text-[0.7rem] pr-2">
          {terminalLogs.map((l, i) => (
            <div key={i} className="leading-relaxed">{l}</div>
          ))}
        </div>
        <form onSubmit={handleTerminalSubmit} className="flex gap-2 mt-2 border-t border-white/10 pt-2 items-center">
          <span className="text-[#7db4ff]">›</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Escribe un comando (ej. status, scan, audio)"
            className="flex-1 bg-transparent border-none outline-none text-[#e0f2fe] font-mono text-[0.72rem] caret-[#7db4ff]"
            autoFocus
          />
        </form>
      </div>

      <footer className="relative z-10 px-[6vw] py-16 flex justify-between gap-8 flex-wrap border-t border-white/5 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-[rgba(224,242,254,0.38)]">
        <div>NOIACORE LAB © 2026<br />ALL RIGHTS RESERVED</div>
        <div>CORE IS INVISIBLE.<br />IMPACT IS INEVITABLE.</div>
      </footer>
    </div>
  );
}
