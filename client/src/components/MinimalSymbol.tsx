/* NOIACORE BRAND REMINDER: El isotipo de la 'A' mayúscula minimalista es el ancla visual de la marca. */
import React from 'react';

interface MinimalSymbolProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function MinimalSymbol({ className = '', size = 32, glow = true }: MinimalSymbolProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center font-bold select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-[#7C3AED]/30 blur-md rounded-full pointer-events-none animate-pulse" />
      )}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-white relative z-10 drop-shadow-[0_0_12px_rgba(124,58,237,0.35)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isotipo minimalista de la A mayúscula geométrica */}
        <path 
          d="M50 12 L85 88 H68 L50 48 L32 88 H15 Z" 
          fill="currentColor" 
        />
        {/* Hendidura central o haz de luz vertical en el vértice */}
        <line 
          x1="50" 
          y1="8" 
          x2="50" 
          y2="52" 
          stroke="#000000" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
        <line 
          x1="50" 
          y1="12" 
          x2="50" 
          y2="38" 
          stroke="#A855F7" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
}
