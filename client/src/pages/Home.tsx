import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, Cpu, Database, Activity, Shield, Sparkles, 
  Layers, Compass, Search, Play, ArrowUpRight, RefreshCw, Eye, 
  Command, Box, Globe, Zap, CheckCircle2, AlertCircle, Volume2, VolumeX, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'systems' | 'projects' | 'agents' | 'lab'>('all');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'NOIACORE KERNEL v4.2.0 OMEGA INITIALIZED.',
    'Neural link established with primary node.',
    'Type "help" for available system commands.'
  ]);
  const [audioActive, setAudioActive] = useState(false);
  const [fps, setFps] = useState(144);
  const [nodes, setNodes] = useState(1284);
  const [intentQuery, setIntentQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Canvas ref for black hole / gravitational lensing hero effect
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for gravitational distortion
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Starfield & Accretion Disk particles
    const stars: Array<{ x: number; y: number; size: number; alpha: number; speed: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.1
      });
    }

    let angle = 0;

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.fillStyle = '#040406';
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(240, 240, 245, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
      });

      // Gravitational Core / Black Hole Center
      const centerX = width / 2 + (mouse.x - width / 2) * 0.05;
      const centerY = height / 2 + (mouse.y - height / 2) * 0.05;

      // Outer glow / accretion disk rings
      angle += 0.015;
      ctx.save();
      ctx.translate(centerX, centerY);

      // Draw multiple gravitational rings
      for (let r = 60; r < 220; r += 25) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(125, 155, 255, ${0.15 - r / 1500})`;
        ctx.lineWidth = r > 150 ? 1 : 2;
        ctx.ellipse(0, 0, r * 1.8, r * 0.6, angle + r * 0.002, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Bright accretion flare
      const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
      gradient.addColorStop(0, 'rgba(4, 4, 6, 1)');
      gradient.addColorStop(0.4, 'rgba(125, 155, 255, 0.25)');
      gradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.fill();

      // Event horizon core (pure black with subtle blue rim)
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.strokeStyle = 'rgba(125, 155, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle terminal command execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: status, reboot, matrix, clear, scan, core, contact');
    } else if (cmd === 'status') {
      newLogs.push('STATUS: ALL SYSTEMS NOMINAL. 144 FPS. CORE STABLE. MEMORY 98%.');
    } else if (cmd === 'reboot') {
      newLogs.push('Rebooting neural substrate... Synchronizing quantum nodes...');
      setTimeout(() => {
        setTerminalLogs(prev => [...prev, 'REBOOT COMPLETE. Core integrity at 100%.']);
      }, 1000);
    } else if (cmd === 'clear') {
      setTerminalLogs(['NOIACORE KERNEL v4.2.0 OMEGA INITIALIZED.']);
      setTerminalInput('');
      return;
    } else if (cmd === 'matrix') {
      newLogs.push('Entering cognitive matrix... Visualizing multidimensional states.');
      toast('Matrix mode activated!');
    } else if (cmd === 'core') {
      newLogs.push('CORE IS INVISIBLE. IMPACT IS INVETABLE.');
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help" for instructions.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const experiences = [
    { id: '01', title: 'SILÉNCIO', category: 'UNIVERSO', desc: 'Todo começa no que não se vê.', details: 'Exploración del vacío cuántico y la arquitectura invisible que sostiene la materia digital.' },
    { id: '02', title: 'PERCEPÇÃO', category: 'LABORATÓRIO', desc: 'O sistema observa. O invisível se revela.', details: 'Sistemas ópticos adaptativos que reaccionan a la dilatación pupilar y la atención ocular.' },
    { id: '03', title: 'CURIOSIDADE', category: 'PROJETOS', desc: 'Uma pergunta abre o caminho.', details: 'Algoritmos generativos de auto-consulta y motores de razonamiento heurístico.' },
    { id: '04', title: 'HIPÓTESE', category: 'AGENTES', desc: 'Entendemos a intenção.', details: 'Redes neuronales distribuidas capaces de anticipar necesidades antes de su ejecución.' },
    { id: '05', title: 'ADAPTAÇÃO', category: 'SISTEMAS', desc: 'O sistema se molda ao que você precisa.', interfaces: true, details: 'Interfaces líquidas que rediseñan su estructura en tiempo real según el contexto del usuario.' },
    { id: '06', title: 'SISTEMAS', category: 'ARQUITETURA', desc: 'Arquitetura invisível. Resultado inevitável.', details: 'Infraestructura de alto rendimiento con latencia sub-milisegundo y redundancia cuántica.' },
    { id: '07', title: 'LABORATÓRIO', category: 'EXPERIÊNCIAS', desc: 'Onde ideias se tornam experimentos.', details: 'Entorno de pruebas cerrado para simulación de futuros alternativos y UX cognitivo.' },
    { id: '08', title: 'CRIAÇÃO', category: 'GÊNESIS', desc: 'Construimos juntos o que ainda não existe.', details: 'Sintetizadores de interfaz y generadores autónomos de código y activos visuales.' },
    { id: '09', title: 'PROPOSTA', category: 'ESTRATÉGIA', desc: 'A solução feita sob medida para você.', details: 'Consultoría algorítmica y diseño de experiencias a la medida de organizaciones de élite.' },
    { id: '10', title: 'IMPACTO', category: 'FUTURO', desc: 'Tecnologia que move. Pessoas que transformam.', details: 'Métricas de impacto cognitivo y resonancia emocional a escala global.' }
  ];

  return (
    <div className="min-h-screen bg-[#040406] text-[#f0f0f5] selection:bg-[#7d9bff] selection:text-[#040406] relative">
      
      {/* Scanlines Overlay for Sci-Fi CRT Feel */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-40"></div>

      {/* Top Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#040406]/80 backdrop-blur-md border-b border-[#7d9bff]/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full border border-[#7d9bff]/40 flex items-center justify-center relative overflow-hidden group-hover:border-[#7d9bff] transition-colors">
              <div className="w-3 h-3 bg-[#7d9bff] rounded-full animate-ping absolute"></div>
              <div className="w-2 h-2 bg-[#7d9bff] rounded-full"></div>
            </div>
            <span className="font-display font-bold tracking-widest text-lg text-white">N O I A C O R E</span>
          </a>
          <span className="hidden md:inline-block text-xs font-mono-code px-2 py-1 rounded bg-[#12121c] text-[#7d9bff] border border-[#7d9bff]/20">
            LAB v4.2.0
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono-code text-zinc-400">
          <a href="#lab" className="hover:text-[#7d9bff] transition-colors">LAB</a>
          <a href="#sistemas" className="hover:text-[#7d9bff] transition-colors">SISTEMAS</a>
          <a href="#projetos" className="hover:text-[#7d9bff] transition-colors">PROJETOS</a>
          <a href="#experiencia" className="hover:text-[#7d9bff] transition-colors">EXPERIÊNCIA</a>
          <a href="#contato" className="hover:text-[#7d9bff] transition-colors">CONTATO</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTerminalOpen(true)}
            className="flex items-center gap-2 text-xs font-mono-code px-3 py-1.5 rounded bg-[#12121c] hover:bg-[#1a1a2e] text-[#7d9bff] border border-[#7d9bff]/30 transition-all"
            title="Abrir Terminal"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TERMINAL</span>
          </button>

          <button 
            onClick={() => setAudioActive(!audioActive)}
            className="p-2 rounded bg-[#12121c] hover:bg-[#1a1a2e] text-zinc-400 hover:text-white border border-white/10 transition-colors"
            title="Alternar Audio Sintonizado"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-[#7d9bff]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-[#12121c] text-zinc-400 hover:text-white border border-white/15"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#040406]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-lg font-mono-code">
            <a href="#lab" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#7d9bff]">01. LAB</a>
            <a href="#sistemas" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#7d9bff]">02. SISTEMAS</a>
            <a href="#projetos" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#7d9bff]">03. PROJETOS</a>
            <a href="#experiencia" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#7d9bff]">04. EXPERIÊNCIA</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-[#7d9bff]">05. CONTATO</a>
          </nav>
          <div className="pt-6 border-t border-white/10">
            <button 
              onClick={() => { setTerminalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-[#12121c] text-[#7d9bff] border border-[#7d9bff]/30 rounded font-mono-code flex items-center justify-center gap-2"
            >
              <TerminalIcon className="w-4 h-4" /> ABRIR CONSOLE DE TERMINAL
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION WITH WEBGL GRAVITATIONAL LENSING */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#040406]/60 to-[#040406] pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <div className="text-xs font-mono-code tracking-[0.3em] text-[#7d9bff] mb-6 uppercase border border-[#7d9bff]/30 px-4 py-1.5 rounded-full bg-[#7d9bff]/5 backdrop-blur-sm animate-pulse">
            CORE IS INVISIBLE. IMPACT IS INEVITABLE.
          </div>

          <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-6">
            N O I A C O R E
          </h1>

          <p className="text-sm sm:text-base font-mono-code tracking-widest text-zinc-400 mb-10 max-w-2xl">
            INTELIGÊNCIA SILENCIOSA. TECNOLOGIA ESSENCIAL.
          </p>

          {/* Central Intent Input Bar (Dopamine Trigger) */}
          <div className="w-full max-w-xl relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7d9bff] to-[#3b82f6] rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center bg-[#0a0a0f] border border-[#7d9bff]/30 rounded-xl p-2 shadow-2xl">
              <Search className="w-5 h-5 text-[#7d9bff] ml-3 mr-2" />
              <input 
                type="text" 
                value={intentQuery}
                onChange={(e) => setIntentQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && intentQuery.trim()) {
                    toast(`Iniciando simulación para: "${intentQuery}"`);
                    setIntentQuery('');
                  }
                }}
                placeholder="¿Qué intentas cambiar hoy?" 
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none font-mono-code px-2"
              />
              <button 
                onClick={() => {
                  if (intentQuery.trim()) {
                    toast(`Procesando intención cognitiva...`);
                    setIntentQuery('');
                  } else {
                    toast('Por favor, escribe tu intención de cambio.');
                  }
                }}
                className="bg-[#7d9bff] hover:bg-[#6886e6] text-[#040406] px-4 py-2 rounded-lg font-mono-code text-xs font-bold transition-all flex items-center gap-1"
              >
                <span>EJECUTAR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[10px] font-mono-code text-zinc-500 mt-2">
              LA INTERFAZ SE ADAPTARÁ A TU RESPUESTA EN TIEMPO REAL
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500 font-mono-code text-[10px] tracking-widest">
          <span>SCROLL PARA INICIAR</span>
          <div className="w-4 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#7d9bff] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* SIDEBAR & QUICK STATS HUD (Inspired by Reference) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Navigation Quick Widget */}
        <div className="lg:col-span-1 bg-[#0a0a0f] border border-[#7d9bff]/15 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono-code text-[#7d9bff] mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4" /> NAVEGACIÓN ACTIVA
            </div>
            <ul className="space-y-3 font-mono-code text-xs text-zinc-400">
              <li>
                <a href="#lab" className="hover:text-[#7d9bff] flex items-center justify-between py-1 border-b border-white/5">
                  <span>01. UNIVERSO</span>
                  <span className="text-[10px] text-zinc-600">ONLINE</span>
                </a>
              </li>
              <li>
                <a href="#sistemas" className="hover:text-[#7d9bff] flex items-center justify-between py-1 border-b border-white/5">
                  <span>02. LABORATORIO</span>
                  <span className="text-[10px] text-emerald-400">ACTIVO</span>
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-[#7d9bff] flex items-center justify-between py-1 border-b border-white/5">
                  <span>03. PROJETOS</span>
                  <span className="text-[10px] text-zinc-600">12 MÓDULOS</span>
                </a>
              </li>
              <li>
                <a href="#agentes" className="hover:text-[#7d9bff] flex items-center justify-between py-1 border-b border-white/5">
                  <span>04. AGENTES</span>
                  <span className="text-[10px] text-zinc-600">SINCRONIZADO</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="text-[10px] font-mono-code text-zinc-500">ESTADO DEL NÚCLEO</div>
            <div className="text-xs text-emerald-400 font-mono-code flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>ESTABLE (99.98%)</span>
            </div>
          </div>
        </div>

        {/* Center Main Metric Dashboard */}
        <div className="lg:col-span-2 bg-[#0a0a0f] border border-[#7d9bff]/15 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono-code text-[#7d9bff] flex items-center gap-2">
                <Activity className="w-4 h-4" /> TELEMETRÍA EN VIVO — RUNTIME v4.2.0
              </div>
              <span className="text-[10px] font-mono-code text-zinc-500">LATENCIA: 0.3ms</span>
            </div>
            
            {/* Simulated Audio Waveform Canvas / SVG */}
            <div className="h-28 w-full bg-[#040406] rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center p-2 mb-6">
              <div className="absolute inset-0 flex items-center justify-around opacity-40">
                {[...Array(32)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-[#7d9bff] rounded-full animate-pulse" 
                    style={{ 
                      height: `${Math.sin(i * 0.5) * 40 + 50}%`,
                      animationDuration: `${0.5 + (i % 5) * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
              <div className="relative z-10 text-center font-mono-code text-xs text-[#7d9bff] tracking-widest bg-[#040406]/80 px-4 py-1.5 rounded border border-[#7d9bff]/30">
                TRANSMISIÓN CUÁNTICA ACTIVA
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center font-mono-code">
              <div className="bg-[#12121c] p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-zinc-500">FPS</div>
                <div className="text-lg font-bold text-white mt-0.5">{fps}</div>
              </div>
              <div className="bg-[#12121c] p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-zinc-500">NODOS</div>
                <div className="text-lg font-bold text-[#7d9bff] mt-0.5">{nodes}</div>
              </div>
              <div className="bg-[#12121c] p-3 rounded-lg border border-white/5">
                <div className="text-[10px] text-zinc-500">PROCESOS</div>
                <div className="text-lg font-bold text-[#ff9e5a] mt-0.5">256</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side System Stats Bars */}
        <div className="lg:col-span-1 bg-[#0a0a0f] border border-[#7d9bff]/15 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono-code text-[#7d9bff] mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" /> RECURSOS DE SISTEMA
            </div>
            
            <div className="space-y-4 font-mono-code text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>MEMORIA</span>
                  <span className="text-white">98%</span>
                </div>
                <div className="w-full bg-[#12121c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7d9bff] h-full w-[98%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>APRENDIZAJE</span>
                  <span className="text-white">73%</span>
                </div>
                <div className="w-full bg-[#12121c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3b82f6] h-full w-[73%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>ADAPTACIÓN</span>
                  <span className="text-white">91%</span>
                </div>
                <div className="w-full bg-[#12121c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[91%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>CREATIVIDAD</span>
                  <span className="text-white">87%</span>
                </div>
                <div className="w-full bg-[#12121c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#ff9e5a] h-full w-[87%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono-code text-zinc-500">MODO SEGURO</span>
            <span className="text-[10px] font-mono-code text-emerald-400">ACTIVADO</span>
          </div>
        </div>

      </section>

      {/* 10 EXPERIENCES GRID (Award-Winning Layout Inspired by Reference) */}
      <section id="lab" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono-code text-[#7d9bff] mb-2 tracking-widest">CATÁLOGO DE EXPERIENCIAS</div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-white">Sistemas Inmersivos y Módulos</h2>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2 font-mono-code text-xs">
            {['all', 'systems', 'projects', 'agents', 'lab'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-1.5 rounded border transition-all ${
                  activeTab === tab 
                    ? 'bg-[#7d9bff] text-[#040406] border-[#7d9bff] font-bold' 
                    : 'bg-[#0a0a0f] text-zinc-400 border-white/10 hover:border-[#7d9bff]/40'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of 10 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <div 
              key={exp.id}
              onClick={() => setSelectedExperience(exp)}
              className={`group relative bg-[#0a0a0f] border border-[#7d9bff]/15 rounded-xl p-6 hover:border-[#7d9bff]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] overflow-hidden ${
                idx === 0 || idx === 7 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7d9bff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-code text-xs text-[#7d9bff] font-bold">{exp.id}</span>
                  <span className="font-mono-code text-[10px] tracking-wider text-zinc-500 uppercase px-2 py-0.5 bg-[#12121c] rounded border border-white/5">
                    {exp.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-normal text-white group-hover:text-[#7d9bff] transition-colors mb-2">
                  {exp.title}
                </h3>
                <p className="font-sans text-xs text-zinc-400 line-clamp-2">
                  {exp.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono-code text-zinc-500 group-hover:text-white transition-colors">
                <span>EXPLORAR MÓDULO</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#7d9bff]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACCESS TOOLS SECTION */}
      <section id="sistemas" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono-code text-[#7d9bff] mb-2">HERRAMIENTAS DE ÉLITE</div>
          <h2 className="font-display text-3xl font-light text-white">Acceso Rápido al Ecosistema</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono-code">
          {[
            { name: 'DOCUMENTACIÓN', icon: Layers, action: () => toast('Abriendo especificaciones técnicas...') },
            { name: 'TERMINAL', icon: TerminalIcon, action: () => setTerminalOpen(true) },
            { name: 'EDITOR 3D', icon: Box, action: () => toast('Cargando motor WebGL 3D...') },
            { name: 'SHADER LAB', icon: Sparkles, action: () => toast('Inicializando laboratorio de shaders GLSL...') },
            { name: 'BASE DE DATOS', icon: Database, action: () => toast('Conectando con almacenamiento cuántico...') },
            { name: 'IA CORE', icon: Cpu, action: () => toast('Sincronizando con modelo cognitivo principal...') },
          ].map((tool, i) => {
            const Icon = tool.icon;
            return (
              <button 
                key={i}
                onClick={tool.action}
                className="bg-[#0a0a0f] border border-[#7d9bff]/15 hover:border-[#7d9bff] rounded-xl p-5 flex flex-col items-center text-center gap-3 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#12121c] border border-white/10 flex items-center justify-center text-[#7d9bff] group-hover:bg-[#7d9bff] group-hover:text-[#040406] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-zinc-300 group-hover:text-white">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="bg-[#020204] border-t border-white/10 py-16 px-6 mt-20 font-mono-code text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-display font-bold text-white text-base tracking-widest mb-4">N O I A C O R E</div>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Diseñado para mentes que piensan diferente. Experiencias web galardonadas y sistemas autónomos de inteligencia inmersiva.
            </p>
          </div>
          <div>
            <div className="text-[#7d9bff] font-bold mb-3">SISTEMAS</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-white">Núcleo Cuántico</a></li>
              <li><a href="#" className="hover:text-white">Red Neuronal</a></li>
              <li><a href="#" className="hover:text-white">Shader Engine</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[#7d9bff] font-bold mb-3">LEGAL</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white">Manifiesto</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[#7d9bff] font-bold mb-3">FUNDADOR</div>
            <p className="text-zinc-400 text-[11px] mb-2">BELENTANI</p>
            <p className="text-zinc-600 text-[10px]">Arquitecto de Inteligencia</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-zinc-600 text-[10px]">
          <div>© NOIACORE LAB 2026. TODOS LOS DERECHOS RESERVADOS.</div>
          <div className="mt-2 sm:mt-0">DISEÑADO PARA PREMIOS INTERNACIONALES DE EXCELENCIA.</div>
        </div>
      </footer>

      {/* TERMINAL MODAL */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 bg-[#040406]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0a0f] border border-[#7d9bff]/40 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col h-[450px]">
            {/* Terminal Header */}
            <div className="bg-[#12121c] px-4 py-3 border-b border-[#7d9bff]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono-code text-xs text-[#7d9bff]">
                <TerminalIcon className="w-4 h-4" />
                <span>NOIACORE TERMINAL v4.2.0</span>
              </div>
              <button 
                onClick={() => setTerminalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Logs */}
            <div className="flex-1 p-4 font-mono-code text-xs overflow-y-auto space-y-2 bg-[#040406]">
              {terminalLogs.map((log, index) => (
                <div key={index} className={log.startsWith('>') ? 'text-[#7d9bff]' : 'text-zinc-300'}>
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="p-3 bg-[#0a0a0f] border-t border-[#7d9bff]/20 flex items-center gap-2">
              <span className="text-[#7d9bff] font-mono-code text-xs">&gt;</span>
              <input 
                type="text" 
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Escribe un comando (ej. help, status, reboot)..."
                className="w-full bg-transparent text-white font-mono-code text-xs focus:outline-none placeholder-zinc-600"
                autoFocus
              />
              <button type="submit" className="text-xs font-mono-code bg-[#7d9bff] text-[#040406] px-3 py-1 rounded font-bold">
                ENVIAR
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE DETAIL MODAL */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 bg-[#040406]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0a0f] border border-[#7d9bff]/40 w-full max-w-xl rounded-xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 font-mono-code text-xs text-[#7d9bff] mb-2">
              <span>MÓDULO {selectedExperience.id}</span>
              <span>/</span>
              <span className="uppercase">{selectedExperience.category}</span>
            </div>

            <h3 className="font-display text-2xl font-normal text-white mb-4">
              {selectedExperience.title}
            </h3>

            <p className="font-sans text-sm text-zinc-300 mb-6 leading-relaxed">
              {selectedExperience.details}
            </p>

            <div className="bg-[#12121c] p-4 rounded-lg border border-white/5 font-mono-code text-xs text-zinc-400 mb-6">
              <div>ESTADO: EN EJECUCIÓN CONTINUA</div>
              <div>PROTOCOLO: COGNITIVE_SYNC_v2</div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSelectedExperience(null)}
                className="px-4 py-2 rounded bg-[#12121c] hover:bg-[#1a1a2e] text-zinc-300 font-mono-code text-xs border border-white/10"
              >
                CERRAR
              </button>
              <button 
                onClick={() => {
                  toast(`Módulo ${selectedExperience.title} sincronizado con éxito.`);
                  setSelectedExperience(null);
                }}
                className="px-4 py-2 rounded bg-[#7d9bff] hover:bg-[#6886e6] text-[#040406] font-mono-code text-xs font-bold"
              >
                INICIAR SECUENCIA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
