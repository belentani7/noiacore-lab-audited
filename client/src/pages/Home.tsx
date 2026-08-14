/*
 * NOIACORE FACTORY // ESCAPE ROOM & 15 TOOLS PERFORMANCE
 * Un escritorio virtual completo que simula un sistema operativo de alta seguridad.
 * Incluye ManusCore, Claude Code, PowerShell, Word, Excel de empleados, Photoshop,
 * DALL-E, Noiaclaw (cangrejo azul muy oscuro), Mente de la Máquina (shaders),
 * Terminal de IA, Bóveda de Cifrado, Laboratorio de Audio, Topología, Inspector y Puzzle de Escape.
 */
import React, { useState, useEffect, useRef } from 'react';
import { MinimalSymbol } from '@/components/MinimalSymbol';
import { FACTORY_TOOLS, ToolDef } from '@/lib/factoryTools';
import { MEDIA_ASSETS, FEATURED_ASSETS } from '@/lib/mediaAssets';

interface OpenWindow {
  toolId: string;
  title: string;
  icon: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    { toolId: 'manuscore', title: 'ManusCore OS', icon: '⚡', minimized: false, maximized: false, zIndex: 10 }
  ]);
  const [activeWindow, setActiveWindow] = useState<string>('manuscore');
  const [topZ, setTopZ] = useState(20);

  // Tool specific states
  // PowerShell
  const [psLogs, setPsLogs] = useState<string[]>([
    'Windows PowerShell [Version 10.0.26100.2032]',
    '(c) Microsoft Corporation. Todos los derechos reservados.',
    '',
    'PS C:\\Noiacore\\Factory> Get-Service -Name "NoiaCoreEngine" | Select Status, StartType',
    'Status   StartType',
    '------   ---------',
    'Running  Automatic',
    '',
    'PS C:\\Noiacore\\Factory> _'
  ]);
  const [psInput, setPsInput] = useState('');

  // Claude Code
  const [codeQuery, setCodeQuery] = useState('');
  const [codeLogs, setCodeLogs] = useState<string[]>([
    '// CLAUDE CODE // NOIACORE EDITION v2.4',
    '// Conectado al kernel de la fábrica. Inspeccionando memoria compartida...',
    '// Escribe una consulta para refactorizar los shaders de la máquina.'
  ]);

  // Excel (Empleados)
  const [employees, setEmployees] = useState([
    { id: 'NC-101', name: 'Dr. Valerian Vance', role: 'Arquitecto de Núcleo', status: 'Activo', clearance: 'Nivel 5' },
    { id: 'NC-102', name: 'Lyra Voss', role: 'Ingeniera de Shaders', status: 'Activo', clearance: 'Nivel 4' },
    { id: 'NC-103', name: 'Kaelen Thorne', role: 'Seguridad Perimetral', status: 'Inspección', clearance: 'Nivel 3' },
    { id: 'NC-104', name: 'Mira Althaus', role: 'Analista de Percepción', status: 'Suspendido', clearance: 'Nivel 5' },
    { id: 'NC-105', name: 'Unit-7 (Noiaclaw)', role: 'Agente Autónomo', status: 'Activo', clearance: 'Omni' },
  ]);
  const [newEmpName, setNewEmpName] = useState('');

  // Word (Manifesto)
  const [docText, setDocText] = useState(
    'MANIFIESTO DE LA FÁBRICA NOIACORE\n\n1. El sistema opera en negro absoluto (#000000) y gris piedra de baja saturación.\n2. Ninguna herramienta revela su código fuente completo a menos que el operador resuelva el puzle de escape.\n3. El cangrejo azul muy oscuro (#050b14) patrulla los sectores de memoria prohibida.\n4. La fábrica es silenciosa, lenta y autosuficiente.'
  );

  // Photoshop
  const [psLayerOpacity, setPsLayerOpacity] = useState(85);
  const [psBlendMode, setPsBlendMode] = useState('screen');

  // DALL-E
  const [dallePrompt, setDallePrompt] = useState('Cangrejo mecánico de obsidiana en una fábrica futurista monocromática');
  const [dalleGenerating, setDalleGenerating] = useState(false);
  const [dalleResult, setDalleResult] = useState<string | null>(null);

  // Noiaclaw (Cangrejo)
  const [crabMood, setCrabMood] = useState<'patrullando' | 'alerta' | 'bloqueando'>('patrullando');
  const [crabLog, setCrabLog] = useState<string[]>([
    '[NoiaClaw v1.0] Unidad autónoma en línea.',
    'Color corporativo: Azul muy oscuro (#050b14).',
    'Vigilando sectores de memoria compartida.'
  ]);

  // Machine Mind Shaders
  const [shaderSpeed, setShaderSpeed] = useState(1.2);
  const [shaderDistortion, setShaderDistortion] = useState(0.4);

  // Escape Puzzle
  const [puzzleCode, setPuzzleCode] = useState('');
  const [puzzleUnlocked, setPuzzleUnlocked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const openTool = (tool: ToolDef) => {
    const existing = openWindows.find((w) => w.toolId === tool.id);
    if (existing) {
      setOpenWindows((prev) =>
        prev.map((w) => (w.toolId === tool.id ? { ...w, minimized: false, zIndex: topZ + 1 } : w))
      );
      setActiveWindow(tool.id);
      setTopZ((z) => z + 1);
    } else {
      setOpenWindows((prev) => [
        ...prev,
        { toolId: tool.id, title: tool.name, icon: tool.icon, minimized: false, maximized: false, zIndex: topZ + 1 }
      ]);
      setActiveWindow(tool.id);
      setTopZ((z) => z + 1);
    }
  };

  const closeWindow = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenWindows((prev) => prev.filter((w) => w.toolId !== toolId));
  };

  const bringToFront = (toolId: string) => {
    setActiveWindow(toolId);
    setTopZ((z) => z + 1);
    setOpenWindows((prev) =>
      prev.map((w) => (w.toolId === toolId ? { ...w, minimized: false, zIndex: topZ + 1 } : w))
    );
  };

  const handlePsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!psInput.trim()) return;
    const cmd = psInput.trim();
    setPsLogs((prev) => [...prev, `PS C:\\Noiacore\\Factory> ${cmd}`, `Ejecutando "${cmd}" en el nodo principal... OK.`, '']);
    setPsInput('');
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeQuery.trim()) return;
    const q = codeQuery;
    setCodeQuery('');
    setCodeLogs((prev) => [...prev, `> ${q}`, 'Analizando árbol sintáctico con Claude Code (Noiacore Edition)...', 'Optimización aplicada en oled-black.ts. Núcleo estable.']);
  };

  const handleDalleGen = () => {
    setDalleGenerating(true);
    setDalleResult(null);
    setTimeout(() => {
      setDalleGenerating(false);
      setDalleResult(FEATURED_ASSETS[Math.floor(Math.random() * FEATURED_ASSETS.length)].src);
    }, 1500);
  };

  const handlePuzzleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (puzzleCode.toUpperCase() === 'NOIACORE') {
      setPuzzleUnlocked(true);
    } else {
      alert('Código de desencriptación incorrecto. Pista: Nombre del laboratorio en mayúsculas.');
    }
  };

  return (
    <div className="noia-desktop bg-black text-[#e8e8eb] font-sans antialiased h-screen w-screen overflow-hidden select-none flex flex-col relative">
      <div className="noia-grain" aria-hidden="true" />

      {/* BOOT SCREEN */}
      <div className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${booted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <MinimalSymbol size={52} glow={false} />
        <div className="font-mono text-[0.7rem] tracking-[0.3em] text-[#8b8b92] uppercase mt-6">
          INICIANDO FÁBRICA DIGITAL // 15 HERRAMIENTAS ACTIVAS
        </div>
        <div className="w-48 h-[1px] bg-white/10 mt-6 overflow-hidden">
          <div className="h-full bg-white/60 animate-pulse w-full" />
        </div>
      </div>

      {/* TOP BAR / TASKBAR */}
      <header className="h-11 bg-black/90 border-b border-white/10 px-4 flex items-center justify-between z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <MinimalSymbol size={18} glow={false} />
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-[#e8e8eb] uppercase">NOIACORE OS // FACTORY</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {openWindows.map((win) => (
            <button
              key={win.toolId}
              onClick={() => bringToFront(win.toolId)}
              className={`font-mono text-[0.62rem] tracking-[0.1em] px-3 py-1.5 rounded border transition-all cursor-pointer flex items-center gap-2 ${
                activeWindow === win.toolId
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/5 text-[#8b8b92] hover:text-white'
              }`}
            >
              <span>{win.icon}</span>
              <span className="truncate max-w-[120px]">{win.title}</span>
              <span onClick={(e) => closeWindow(win.toolId, e)} className="hover:text-red-400 ml-1">×</span>
            </button>
          ))}
        </div>
        <div className="font-mono text-[0.62rem] text-[#8b8b92] tracking-[0.1em]">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </header>

      {/* MAIN DESKTOP WORKSPACE */}
      <div className="flex-1 relative p-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 overflow-y-auto content-start">
        {FACTORY_TOOLS.map((tool) => (
          <div
            key={tool.id}
            onDoubleClick={() => openTool(tool)}
            onClick={() => openTool(tool)}
            className="group flex flex-col items-center justify-center p-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xl mb-2 group-hover:scale-105 transition-transform shadow-lg">
              {tool.icon}
            </div>
            <span className="font-mono text-[0.65rem] tracking-[0.08em] text-[#e8e8eb] group-hover:text-white line-clamp-2">
              {tool.name}
            </span>
          </div>
        ))}
      </div>

      {/* FLOATING WINDOWS */}
      {openWindows.map((win) => {
        const isActive = activeWindow === win.toolId;
        return (
          <div
            key={win.toolId}
            onClick={() => bringToFront(win.toolId)}
            style={{ zIndex: win.zIndex }}
            className={`absolute top-16 left-12 w-[min(720px,92vw)] h-[min(500px,80vh)] bg-[#050506]/95 border border-white/15 rounded-xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden transition-shadow ${
              isActive ? 'ring-1 ring-white/20' : 'opacity-90'
            }`}
          >
            {/* WINDOW TITLEBAR */}
            <div className="h-10 bg-black/80 border-b border-white/10 px-4 flex items-center justify-between cursor-move">
              <div className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-[#e8e8eb]">
                <span>{win.icon}</span>
                <span>{win.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => closeWindow(win.toolId, e)} className="w-3 h-3 rounded-full bg-white/20 hover:bg-red-500 transition-colors cursor-pointer" />
              </div>
            </div>

            {/* WINDOW CONTENT */}
            <div className="flex-1 p-5 overflow-y-auto font-mono text-[0.75rem] text-[#e8e8eb]">
              {win.toolId === 'manuscore' && (
                <div className="space-y-4">
                  <div className="border border-white/10 p-4 rounded-lg bg-black/40">
                    <div className="text-white/40 uppercase tracking-widest text-[0.6rem] mb-2">ESTADO DEL KERNEL</div>
                    <div className="text-lg font-light text-white font-['Space_Grotesk']">NOIACORE FACTORY OS v4.8</div>
                    <div className="mt-2 text-[#8b8b92]">15 Herramientas conectadas en red neuronal local. Cero latencia. Memoria OLED estable.</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 p-3 rounded bg-black/40">
                      <div className="text-white/40 text-[0.6rem]">NODOS ACTIVOS</div>
                      <div className="text-xl font-normal text-white mt-1">15 / 15</div>
                    </div>
                    <div className="border border-white/10 p-3 rounded bg-black/40">
                      <div className="text-white/40 text-[0.6rem]">SEGURIDAD</div>
                      <div className="text-xl font-normal text-white mt-1">NIVEL MÁXIMO</div>
                    </div>
                  </div>
                </div>
              )}

              {win.toolId === 'powershell' && (
                <div className="h-full flex flex-col font-mono text-[0.7rem]">
                  <div className="flex-1 overflow-y-auto space-y-1 mb-3 text-[#d5d5d8]">
                    {psLogs.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                  <form onSubmit={handlePsSubmit} className="flex gap-2 border-t border-white/10 pt-2">
                    <span className="text-[#8b8b92]">PS C:\&gt;</span>
                    <input
                      type="text"
                      value={psInput}
                      onChange={(e) => setPsInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                      placeholder="Escribe un comando (ej. Get-Process)"
                      autoFocus
                    />
                  </form>
                </div>
              )}

              {win.toolId === 'claude_code' && (
                <div className="h-full flex flex-col font-mono text-[0.7rem]">
                  <div className="flex-1 overflow-y-auto space-y-2 mb-3 text-[#d5d5d8]">
                    {codeLogs.map((l, i) => (
                      <div key={i} className={l.startsWith('&gt;') || l.startsWith('>') ? 'text-white' : 'text-[#8b8b92]'}>{l}</div>
                    ))}
                  </div>
                  <form onSubmit={handleCodeSubmit} className="flex gap-2 border-t border-white/10 pt-2">
                    <span className="text-[#8b8b92]">›</span>
                    <input
                      type="text"
                      value={codeQuery}
                      onChange={(e) => setCodeQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                      placeholder="Consulta a Claude Code..."
                    />
                  </form>
                </div>
              )}

              {win.toolId === 'word' && (
                <div className="h-full flex flex-col">
                  <textarea
                    value={docText}
                    onChange={(e) => setDocText(e.target.value)}
                    className="w-full h-full bg-black/50 border border-white/10 rounded p-4 text-white font-sans text-sm resize-none outline-none leading-relaxed"
                  />
                </div>
              )}

              {win.toolId === 'excel' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[#8b8b92] uppercase">NÓMINA DE PERSONAL // FÁBRICA</span>
                    <span className="text-xs text-white">Total: {employees.length} registros</span>
                  </div>
                  <table className="w-full text-left border-collapse font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-[#8b8b92]">
                        <th className="py-2">ID</th>
                        <th className="py-2">NOMBRE</th>
                        <th className="py-2">ROL</th>
                        <th className="py-2">ESTADO</th>
                        <th className="py-2">CLEARENCE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 text-[#8b8b92]">{emp.id}</td>
                          <td className="py-2 text-white">{emp.name}</td>
                          <td className="py-2">{emp.role}</td>
                          <td className="py-2 text-[#8b8b92]">{emp.status}</td>
                          <td className="py-2 text-white">{emp.clearance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {win.toolId === 'photoshop' && (
                <div className="space-y-4">
                  <div className="h-40 bg-black border border-white/10 rounded flex items-center justify-center relative overflow-hidden">
                    <img src={FEATURED_ASSETS[0].src} alt="Layer" className="absolute inset-0 w-full h-full object-cover filter grayscale" style={{ opacity: psLayerOpacity / 100 }} />
                    <span className="relative z-10 text-white font-mono text-xs bg-black/70 px-3 py-1 rounded">Capa Base // Retícula OLED</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-[#8b8b92] flex justify-between">
                      <span>Opacidad de Capa</span>
                      <span>{psLayerOpacity}%</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={psLayerOpacity}
                      onChange={(e) => setPsLayerOpacity(Number(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {win.toolId === 'dalle' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[#8b8b92]">Prompt Generativo DALL-E (Noiacore Edition)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={dallePrompt}
                        onChange={(e) => setDallePrompt(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-white text-xs outline-none"
                      />
                      <button
                        onClick={handleDalleGen}
                        disabled={dalleGenerating}
                        className="px-4 py-2 bg-white text-black text-xs font-mono uppercase rounded hover:bg-white/80 transition-colors cursor-pointer"
                      >
                        {dalleGenerating ? 'Generando...' : 'Generar'}
                      </button>
                    </div>
                  </div>
                  <div className="h-48 bg-black border border-white/10 rounded flex items-center justify-center overflow-hidden">
                    {dalleResult ? (
                      <img src={dalleResult} alt="Generated" className="w-full h-full object-cover filter grayscale contrast-125" />
                    ) : (
                      <span className="text-[#8b8b92] text-xs">Esperando estímulo visual...</span>
                    )}
                  </div>
                </div>
              )}

              {win.toolId === 'noiacclaw' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-[#050b14] border border-white/10">
                    <div className="text-3xl">🦀</div>
                    <div>
                      <div className="text-white font-bold">NoiaClaw // Agente Autónomo</div>
                      <div className="text-xs text-[#8b8b92]">Color corporativo: Azul muy oscuro (#050b14). Estado: {crabMood}</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-[#d5d5d8] bg-black/40 p-3 rounded border border-white/5 font-mono">
                    {crabLog.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setCrabMood('alerta');
                      setCrabLog((prev) => [...prev, '[NoiaClaw] Anomalía detectada en sector 4. Escaneando...']);
                    }}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs uppercase transition-colors cursor-pointer"
                  >
                    Iniciar Patrulla de Seguridad
                  </button>
                </div>
              )}

              {win.toolId === 'machine_mind' && (
                <div className="space-y-4">
                  <div className="text-xs text-[#8b8b92]">VISUALIZADOR DE SHADERS // MENTE DE LA MÁQUINA</div>
                  <div className="h-40 bg-black border border-white/10 rounded relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-white/5 to-black animate-pulse" />
                    <span className="relative z-10 font-mono text-xs text-white">FLUJO NEURONAL ACTIVO</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#8b8b92] block mb-1">Velocidad de Flujo ({shaderSpeed}x)</label>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={shaderSpeed}
                        onChange={(e) => setShaderSpeed(Number(e.target.value))}
                        className="w-full accent-white cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8b8b92] block mb-1">Distorsión ({shaderDistortion})</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={shaderDistortion}
                        onChange={(e) => setShaderDistortion(Number(e.target.value))}
                        className="w-full accent-white cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {win.toolId === 'escape_puzzle' && (
                <div className="space-y-4">
                  <div className="text-xs text-[#8b8b92]">PUERTA PRINCIPAL DE LA FÁBRICA // SECUENCIA DE ESCAPE</div>
                  {puzzleUnlocked ? (
                    <div className="p-4 bg-white/10 border border-white/20 rounded text-center">
                      <div className="text-white font-bold text-lg mb-1">¡PUERTA DESBLOQUEADA!</div>
                      <div className="text-xs text-[#8b8b92]">El núcleo ha reconocido tu autoridad. Acceso total concedido.</div>
                    </div>
                  ) : (
                    <form onSubmit={handlePuzzleSubmit} className="space-y-3">
                      <p className="text-xs text-[#d5d5d8] leading-relaxed">
                        Para escapar de la fábrica y obtener el reporte definitivo, ingresa el código maestro del laboratorio (Pista: el nombre exacto del proyecto en mayúsculas).
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={puzzleCode}
                          onChange={(e) => setPuzzleCode(e.target.value)}
                          placeholder="Introduce el código..."
                          className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-white text-xs outline-none uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white text-black text-xs font-mono uppercase rounded hover:bg-white/80 transition-colors cursor-pointer"
                        >
                          Desbloquear
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {['terminal_ai', 'vault_sec', 'audio_lab', 'network_map', 'inspector'].includes(win.toolId) && (
                <div className="space-y-4">
                  <div className="text-xs text-[#8b8b92]">MÓDULO DE SISTEMA // {win.title.toUpperCase()}</div>
                  <p className="text-xs text-[#d5d5d8] leading-relaxed">
                    Subsistema conectado al kernel principal. Todos los flujos de datos se encuentran encriptados en negro absoluto y operan con latencia cero.
                  </p>
                  <div className="p-4 bg-black/50 border border-white/10 rounded font-mono text-xs text-white/70">
                    STATUS: OK // STREAMING ACTIVE // ENCRYPTION AES-256
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* FOOTER / START MENU TRIGGER */}
      <footer className="h-8 bg-black border-t border-white/10 px-4 flex items-center justify-between z-40 text-[0.62rem] text-[#8b8b92] font-mono">
        <div>NOIACORE FACTORY OS // 15 TOOLS LOADED</div>
        <div>ESCAPE ROOM ACTIVE</div>
      </footer>
    </div>
  );
}
