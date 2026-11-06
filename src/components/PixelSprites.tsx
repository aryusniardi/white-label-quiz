import React from 'react';

export function PixelCharacter({ type, size = 120 }: { type: string; size?: number }) {
  if (type === 'tiramisu') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        <rect x="25" y="35" width="50" height="35" rx="4" fill="#6B4226" stroke="#2D2424" strokeWidth="4" />
        <rect x="25" y="48" width="50" height="8" fill="#F4E8C1" />
        <rect x="27" y="37" width="46" height="6" fill="#4A2E1B" />
        <rect x="36" y="44" width="6" height="8" rx="2" fill="#2D2424" />
        <rect x="58" y="44" width="6" height="8" rx="2" fill="#2D2424" />
        <path d="M 45 58 Q 50 63 55 58" fill="none" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="53" r="4" fill="#FF8A8A" opacity="0.6" />
        <circle cx="68" cy="53" r="4" fill="#FF8A8A" opacity="0.6" />
      </svg>
    );
  }
  if (type === 'cupcake') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        <path d="M 30 55 L 35 80 L 65 80 L 70 55 Z" fill="#E8D7B8" stroke="#2D2424" strokeWidth="4" />
        <path d="M 25 55 Q 25 30 50 30 Q 75 30 75 55 Z" fill="#9AE6B4" stroke="#2D2424" strokeWidth="4" />
        <circle cx="50" cy="24" r="7" fill="#E53E3E" stroke="#2D2424" strokeWidth="3" />
        <rect x="40" y="42" width="5" height="7" rx="2" fill="#2D2424" />
        <rect x="55" y="42" width="5" height="7" rx="2" fill="#2D2424" />
        <path d="M 46 51 Q 50 54 54 51" fill="none" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'strawberry') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        <path d="M 20 65 L 75 35 L 75 75 L 20 75 Z" fill="#FFF5F5" stroke="#2D2424" strokeWidth="4" />
        <path d="M 20 65 L 75 35 L 50 20 L 20 65 Z" fill="#FED7D7" stroke="#2D2424" strokeWidth="4" />
        <circle cx="50" cy="35" r="8" fill="#E53E3E" stroke="#2D2424" strokeWidth="3" />
        <rect x="36" y="52" width="5" height="7" rx="2" fill="#2D2424" />
        <rect x="52" y="46" width="5" height="7" rx="2" fill="#2D2424" />
        <circle cx="32" cy="58" r="3" fill="#FC8181" />
        <circle cx="60" cy="52" r="3" fill="#FC8181" />
      </svg>
    );
  }
  if (type === 'macaron') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        <rect x="25" y="30" width="50" height="15" rx="7" fill="#D6BCFA" stroke="#2D2424" strokeWidth="4" />
        <rect x="28" y="43" width="44" height="6" rx="2" fill="#FAF5FF" stroke="#2D2424" strokeWidth="2" />
        <rect x="25" y="47" width="50" height="15" rx="7" fill="#D6BCFA" stroke="#2D2424" strokeWidth="4" />
        <rect x="38" y="36" width="5" height="6" rx="2" fill="#2D2424" />
        <rect x="57" y="36" width="5" height="6" rx="2" fill="#2D2424" />
        <path d="M 46 41 Q 50 44 54 41" fill="none" stroke="#2D2424" strokeWidth="2.5" />
      </svg>
    );
  }
  if (type === 'roll') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        <circle cx="50" cy="50" r="28" fill="#FEEBC8" stroke="#2D2424" strokeWidth="4" />
        <path d="M 50 32 A 18 18 0 1 1 35 55 A 10 10 0 1 1 50 50" fill="none" stroke="#7B341E" strokeWidth="5" strokeLinecap="round" />
        <rect x="42" y="44" width="4" height="6" rx="2" fill="#2D2424" />
        <rect x="54" y="44" width="4" height="6" rx="2" fill="#2D2424" />
        <path d="M 46 54 Q 50 57 54 54" fill="none" stroke="#2D2424" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  // layer cake (default)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
      <rect x="22" y="35" width="56" height="38" rx="4" fill="#FBD38D" stroke="#2D2424" strokeWidth="4" />
      <line x1="22" y1="44" x2="78" y2="44" stroke="#7B341E" strokeWidth="3" />
      <line x1="22" y1="53" x2="78" y2="53" stroke="#7B341E" strokeWidth="3" />
      <line x1="22" y1="62" x2="78" y2="62" stroke="#7B341E" strokeWidth="3" />
      <rect x="36" y="47" width="5" height="7" rx="2" fill="#2D2424" />
      <rect x="59" y="47" width="5" height="7" rx="2" fill="#2D2424" />
      <path d="M 45 56 Q 50 60 55 56" fill="none" stroke="#2D2424" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PixelScene({ index }: { index: number }) {
  if (index === 0) {
    // Village gate & signpost
    return (
      <svg viewBox="0 0 240 130" className="w-full h-32">
        <rect width="240" height="130" fill="#EBF8FF" rx="8" />
        <path d="M 0 110 Q 60 95 120 110 T 240 105 L 240 130 L 0 130 Z" fill="#9AE6B4" />
        <rect x="30" y="50" width="8" height="60" fill="#7B341E" />
        <rect x="18" y="35" width="60" height="22" rx="3" fill="#ECC94B" stroke="#2D2424" strokeWidth="3" />
        <text x="48" y="50" fontSize="9" fontWeight="900" fill="#2D2424" textAnchor="middle" fontFamily="monospace">JOB VILLAGE</text>
        <circle cx="160" cy="70" r="14" fill="#FBD38D" stroke="#2D2424" strokeWidth="3" />
        <rect x="156" y="84" width="8" height="20" fill="#3182CE" />
      </svg>
    );
  }
  if (index === 1) {
    // Crystal ball
    return (
      <svg viewBox="0 0 240 130" className="w-full h-32">
        <rect width="240" height="130" fill="#FAF5FF" rx="8" />
        <ellipse cx="120" cy="112" rx="50" ry="10" fill="#E2E8F0" />
        <rect x="105" y="85" width="30" height="25" rx="3" fill="#D69E2E" stroke="#2D2424" strokeWidth="3" />
        <circle cx="120" cy="55" r="32" fill="#E9D8FD" stroke="#2D2424" strokeWidth="4" />
        <path d="M 105 45 Q 115 35 130 42" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
        <polygon points="120,35 124,43 132,45 126,51 128,59 120,55 112,59 114,51 108,45 116,43" fill="#FAF089" stroke="#2D2424" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 2) {
    // Cafe counter & espresso
    return (
      <svg viewBox="0 0 240 130" className="w-full h-32">
        <rect width="240" height="130" fill="#FFFAF0" rx="8" />
        <rect x="20" y="70" width="200" height="45" rx="4" fill="#DD6B20" stroke="#2D2424" strokeWidth="3" />
        <rect x="50" y="35" width="40" height="35" rx="3" fill="#CBD5E0" stroke="#2D2424" strokeWidth="3" />
        <rect x="140" y="45" width="22" height="25" rx="2" fill="#FFFFFF" stroke="#2D2424" strokeWidth="3" />
        <text x="151" y="62" fontSize="12" textAnchor="middle">☕</text>
      </svg>
    );
  }
  if (index === 3) {
    // Resume parchment
    return (
      <svg viewBox="0 0 240 130" className="w-full h-32">
        <rect width="240" height="130" fill="#F0FFF4" rx="8" />
        <rect x="75" y="15" width="90" height="95" rx="4" fill="#FFFFFF" stroke="#2D2424" strokeWidth="3" />
        <rect x="90" y="28" width="60" height="6" rx="2" fill="#3182CE" />
        <rect x="90" y="42" width="40" height="4" rx="2" fill="#A0AEC0" />
        <rect x="90" y="52" width="55" height="4" rx="2" fill="#CBD5E0" />
        <rect x="90" y="62" width="50" height="4" rx="2" fill="#CBD5E0" />
        <rect x="90" y="72" width="58" height="4" rx="2" fill="#CBD5E0" />
      </svg>
    );
  }
  if (index === 4) {
    // Interview table
    return (
      <svg viewBox="0 0 240 130" className="w-full h-32">
        <rect width="240" height="130" fill="#FFF5F5" rx="8" />
        <rect x="70" y="65" width="100" height="40" rx="4" fill="#ED8936" stroke="#2D2424" strokeWidth="3" />
        <circle cx="50" cy="55" r="14" fill="#FEB2B2" stroke="#2D2424" strokeWidth="3" />
        <circle cx="190" cy="55" r="14" fill="#90CDF4" stroke="#2D2424" strokeWidth="3" />
        <rect x="110" y="52" width="20" height="13" rx="2" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2" />
      </svg>
    );
  }
  // Offer celebrate (index 5)
  return (
    <svg viewBox="0 0 240 130" className="w-full h-32">
      <rect width="240" height="130" fill="#FFFFF0" rx="8" />
      <rect x="70" y="30" width="100" height="65" rx="4" fill="#FAF089" stroke="#2D2424" strokeWidth="4" />
      <text x="120" y="68" fontSize="16" fontWeight="900" fill="#C53030" textAnchor="middle" fontFamily="monospace">OFFER GET!</text>
      <circle cx="45" cy="40" r="4" fill="#ED8936" />
      <circle cx="195" cy="35" r="5" fill="#48BB78" />
      <circle cx="35" cy="85" r="6" fill="#4299E1" />
      <circle cx="205" cy="80" r="4" fill="#9F7AEA" />
    </svg>
  );
}
