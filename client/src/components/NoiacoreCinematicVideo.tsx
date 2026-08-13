import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { MinimalSymbol } from './MinimalSymbol';

interface NoiacoreCinematicVideoProps {
  onClose: () => void;
}

export function NoiacoreCinematicVideo({ onClose }: NoiacoreCinematicVideoProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const scenes = [
    { title: '01 / THE VOID & THE SYMBOL', subtitle: 'Absolute black origin. The minimalist uppercase A.', duration: 6000 },
    { title: '02 / VERTICAL THRESHOLD', subtitle: 'Cropped structures, volumetric clouds, and parallax depth.', duration: 7000 },
    { title: '03 / SYSTEM TELEMETRY', subtitle: 'Real-time synchronization and neural intelligence nodes.', duration: 7000 },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = 50;
    const currentDuration = scenes[currentScene].duration;
    const step = (interval / currentDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentScene < scenes.length - 1) {
            setCurrentScene((s) => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentScene]);

  const resetScene = () => {
    setCurrentScene(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8">
      <div className="relative w-full max-w-5xl aspect-video bg-[#020204] border border-[#7C3AED]/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.2)] flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 z-20 bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <MinimalSymbol size={28} />
            <span className="font-mono text-xs tracking-widest text-white font-semibold">NOIACORE / CINEMATIC PREVIEW</span>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scene Viewport */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {/* Background atmosphere per scene */}
          <div className="absolute inset-0 bg-radial from-[#4C1D95]/30 via-black to-black opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C3AED]/10 via-transparent to-transparent animate-pulse" />

          {currentScene === 0 && (
            <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in">
              <MinimalSymbol size={96} glow={true} />
              <h2 className="font-sans text-3xl sm:text-5xl font-extralight tracking-widest text-white mt-6 uppercase">NOIACORE LAB</h2>
              <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#C4B5FD] mt-3">A SILENT ARCHITECTURE FOR LOUD IDEAS</p>
            </div>
          )}

          {currentScene === 1 && (
            <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in">
              <div className="w-[2px] h-36 bg-gradient-to-b from-transparent via-white to-[#A855F7] shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
              <h2 className="font-sans text-2xl sm:text-4xl font-light tracking-widest text-white mt-6 uppercase">VERTICAL THRESHOLD</h2>
              <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/70 mt-3">PARALLAX DEPTH & VOLUMETRIC OBSIDIAN</p>
            </div>
          )}

          {currentScene === 2 && (
            <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-black/60 border border-[#7C3AED]/30 p-4 rounded-xl backdrop-blur-md">
                  <span className="font-mono text-[10px] text-white/50 block">FPS</span>
                  <strong className="font-mono text-xl text-[#C4B5FD]">60.0</strong>
                </div>
                <div className="bg-black/60 border border-[#7C3AED]/30 p-4 rounded-xl backdrop-blur-md">
                  <span className="font-mono text-[10px] text-white/50 block">NODES</span>
                  <strong className="font-mono text-xl text-[#C4B5FD]">12,480</strong>
                </div>
                <div className="bg-black/60 border border-[#7C3AED]/30 p-4 rounded-xl backdrop-blur-md">
                  <span className="font-mono text-[10px] text-white/50 block">SYNC</span>
                  <strong className="font-mono text-xl text-[#C4B5FD]">99.8%</strong>
                </div>
              </div>
              <h2 className="font-sans text-2xl sm:text-4xl font-light tracking-widest text-white uppercase">SYSTEM TELEMETRY</h2>
              <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#C4B5FD] mt-2">INTELLIGENCE DESIGNED AS EXPERIENCE</p>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="p-6 border-t border-white/10 z-20 bg-black/80 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[11px] tracking-widest text-[#A855F7] block">{scenes[currentScene].title}</span>
              <span className="font-sans text-sm text-white/80">{scenes[currentScene].subtitle}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-white hover:bg-[#7C3AED]/40 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={resetScene}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Reiniciar vídeo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7C3AED] to-white transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
