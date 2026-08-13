import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const soundtrackUrl = '/manus-storage/noiacore-soundtrack_6dca7173.mp3';

export function SoundtrackPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(soundtrackUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked by browser policy until manual click
        });
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="soundtrack-player fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/80 border border-[#7C3AED]/30 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.15)]">
      <div className="flex items-center gap-2">
        <Music className={`w-4 h-4 text-[#A855F7] ${isPlaying ? 'animate-bounce' : ''}`} />
        <span className="font-mono text-[11px] tracking-widest text-white/80 hidden sm:inline">
          {isPlaying ? 'RESONANCE BGM' : 'AUDIO MUTED'}
        </span>
      </div>
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-white hover:bg-[#7C3AED]/40 transition-all cursor-pointer"
        aria-label="Toggle Soundtrack"
      >
        {isPlaying ? <Volume2 className="w-4 h-4 text-[#C4B5FD]" /> : <VolumeX className="w-4 h-4 text-white/50" />}
      </button>
    </div>
  );
}
