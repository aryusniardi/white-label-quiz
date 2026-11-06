import React from 'react';

export function Illustration({ type }: { type: string }) {
  switch (type) {
    case 'burnout_coffee':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#FFF3D6" />
          {/* Coffee cup */}
          <path d="M75 50H125L118 105C117 112 110 118 102 118H98C90 118 83 112 82 105L75 50Z" fill="#FFAA5B" stroke="#2D2424" strokeWidth="4" />
          <path d="M123 65C133 65 140 73 138 83C136 91 130 96 120 96" stroke="#2D2424" strokeWidth="4" strokeLinecap="round" />
          {/* Boba straw */}
          <line x1="110" y1="20" x2="98" y2="60" stroke="#FF5E7E" strokeWidth="6" strokeLinecap="round" />
          {/* Steam / sparkles */}
          <path d="M85 35Q90 25 85 15" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" />
          <path d="M105 32Q110 22 105 12" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" />
          {/* Face on cup */}
          <circle cx="94" cy="80" r="3" fill="#2D2424" />
          <circle cx="106" cy="80" r="3" fill="#2D2424" />
          <path d="M96 90Q100 95 104 90" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'social_hangout':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#E8F4FD" />
          {/* Two cocktail/drink glasses clinking */}
          <path d="M60 45L80 85V110H50V110H90" stroke="#2D2424" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#FF8474" />
          <path d="M140 45L120 85V110H150V110H110" stroke="#2D2424" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#99E1D9" />
          {/* Clink star */}
          <polygon points="100,50 104,58 112,60 106,66 108,74 100,70 92,74 94,66 88,60 96,58" fill="#FFD166" stroke="#2D2424" strokeWidth="3" />
        </svg>
      );
    case 'online_checkout':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#FCEBF5" />
          {/* Smartphone */}
          <rect x="70" y="25" width="60" height="95" rx="12" fill="#FFFFFF" stroke="#2D2424" strokeWidth="4" />
          {/* Shopping cart on screen */}
          <circle cx="90" cy="85" r="4" fill="#2D2424" />
          <circle cx="110" cy="85" r="4" fill="#2D2424" />
          <path d="M80 55H86L92 75H112L116 58H88" stroke="#2D2424" strokeWidth="3" strokeLinecap="round" fill="#FF6B6B" />
          <circle cx="100" cy="110" r="3" fill="#2D2424" />
        </svg>
      );
    case 'bonus_money':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#EBF9F1" />
          {/* Money envelope / coin stack */}
          <rect x="55" y="45" width="90" height="60" rx="8" fill="#A8DADC" stroke="#2D2424" strokeWidth="4" />
          <path d="M55 45L100 80L145 45" stroke="#2D2424" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Coins */}
          <circle cx="100" cy="40" r="14" fill="#FFD166" stroke="#2D2424" strokeWidth="3" />
          <text x="100" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2D2424">Rp</text>
        </svg>
      );
    case 'fashion_dilemma':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#FFF0ED" />
          {/* Cool sneaker icon */}
          <path d="M50 85L80 60H110L145 78C152 82 150 95 142 95H55C48 95 45 88 50 85Z" fill="#F4A261" stroke="#2D2424" strokeWidth="4" strokeLinejoin="round" />
          <path d="M48 95H148V104C148 107 145 110 142 110H54C51 110 48 107 48 104V95Z" fill="#FFFFFF" stroke="#2D2424" strokeWidth="4" />
          <line x1="85" y1="65" x2="100" y2="80" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'friday_reward':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#F3EEFF" />
          {/* Couch & Pizza */}
          <rect x="50" y="65" width="100" height="45" rx="10" fill="#B8B8FF" stroke="#2D2424" strokeWidth="4" />
          <path d="M70 45H130C136 45 140 50 140 56V65H60V56C60 50 64 45 70 45Z" fill="#9381FF" stroke="#2D2424" strokeWidth="4" />
          <circle cx="100" cy="85" r="10" fill="#FFD166" stroke="#2D2424" strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 140" className="w-full h-28 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="140" rx="16" fill="#FFFDF7" stroke="#2D2424" strokeWidth="3" />
          <circle cx="100" cy="70" r="28" fill="#FFDE59" stroke="#2D2424" strokeWidth="3" />
          <text x="100" y="78" textAnchor="middle" fontSize="24">✨</text>
        </svg>
      );
  }
}
