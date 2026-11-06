import React from 'react';

export function ScenarioPixelArt({ sceneCode }: { sceneCode: string }) {
  if (sceneCode === 'burnout') {
    return (
      <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
          {/* Pixel Laptop screen */}
          <rect x="20" y="30" width="80" height="55" fill="#2D2424" rx="2" />
          <rect x="25" y="35" width="70" height="42" fill="#3B82F6" />
          {/* Pixel code lines on screen */}
          <rect x="30" y="42" width="35" height="3" fill="#FFFFFF" />
          <rect x="30" y="48" width="50" height="3" fill="#93C5FD" />
          <rect x="30" y="54" width="25" height="3" fill="#F87171" />
          <rect x="30" y="60" width="45" height="3" fill="#FDE047" />
          <rect x="30" y="66" width="38" height="3" fill="#FFFFFF" />
          {/* Laptop keyboard base */}
          <polygon points="10,85 110,85 100,98 20,98" fill="#D1D5DB" stroke="#2D2424" strokeWidth="2" />
          {/* Coffee Cup with face */}
          <rect x="145" y="42" width="46" height="54" rx="6" fill="#F59E0B" stroke="#2D2424" strokeWidth="3" />
          <rect x="150" y="46" width="36" height="12" fill="#FEF3C7" />
          <rect x="160" y="24" width="6" height="20" fill="#EF4444" stroke="#2D2424" strokeWidth="2" />
          {/* Cute pixel eye */}
          <rect x="156" y="66" width="4" height="6" fill="#2D2424" />
          <rect x="174" y="66" width="4" height="6" fill="#2D2424" />
          <path d="M 163 78 Q 167 82 171 78" stroke="#2D2424" strokeWidth="2" fill="none" />
          {/* Steam dots */}
          <rect x="150" y="16" width="4" height="4" fill="#9CA3AF" />
          <rect x="170" y="12" width="4" height="4" fill="#9CA3AF" />
          {/* Label banner */}
          <rect x="50" y="105" width="140" height="20" rx="6" fill="#FEF08A" stroke="#2D2424" strokeWidth="2" />
          <text x="120" y="119" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="monospace" fill="#2D2424">
            DEADLINE VS KOPI
          </text>
        </svg>
      </div>
    );
  }

  if (sceneCode === 'hangout') {
    return (
      <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
          {/* Cafe Fancy Drink */}
          <rect x="35" y="40" width="36" height="55" rx="4" fill="#EC4899" stroke="#2D2424" strokeWidth="3" />
          <circle cx="53" cy="35" r="14" fill="#FCE7F3" stroke="#2D2424" strokeWidth="2" />
          <rect x="50" y="12" width="5" height="24" fill="#10B981" stroke="#2D2424" strokeWidth="2" />
          <rect x="25" y="98" width="56" height="16" rx="4" fill="#FDF2F8" stroke="#2D2424" strokeWidth="2" />
          <text x="53" y="110" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="monospace" fill="#DB2777">150K CAFE</text>

          {/* VS Badge */}
          <circle cx="120" cy="65" r="15" fill="#FDE047" stroke="#2D2424" strokeWidth="3" />
          <text x="120" y="70" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="monospace" fill="#2D2424">VS</text>

          {/* Warmindo Noodle Bowl */}
          <ellipse cx="185" cy="85" rx="32" ry="18" fill="#F59E0B" stroke="#2D2424" strokeWidth="3" />
          <ellipse cx="185" cy="78" rx="28" ry="12" fill="#FEF3C7" stroke="#2D2424" strokeWidth="2" />
          {/* Noodles */}
          <path d="M 168 76 Q 175 70 185 76 T 202 76" stroke="#D97706" strokeWidth="3" fill="none" />
          {/* Chopsticks */}
          <line x1="160" y1="45" x2="210" y2="78" stroke="#78350F" strokeWidth="3" />
          <line x1="165" y1="40" x2="215" y2="73" stroke="#78350F" strokeWidth="3" />
          <rect x="157" y="98" width="56" height="16" rx="4" fill="#FFFBEB" stroke="#2D2424" strokeWidth="2" />
          <text x="185" y="110" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="monospace" fill="#B45309">15K WARMINDO</text>
        </svg>
      </div>
    );
  }

  if (sceneCode === 'cart') {
    return (
      <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
          {/* Smartphone Cart */}
          <rect x="75" y="12" width="90" height="106" rx="10" fill="#1F2937" stroke="#2D2424" strokeWidth="3" />
          <rect x="82" y="22" width="76" height="86" rx="6" fill="#F3F4F6" />
          {/* App Bar */}
          <rect x="82" y="22" width="76" height="16" fill="#EF4444" />
          <text x="120" y="34" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF" fontFamily="monospace">SALE 00:00</text>
          {/* Cart Icon in screen */}
          <rect x="96" y="46" width="48" height="26" rx="4" fill="#FEF08A" stroke="#2D2424" strokeWidth="2" />
          <text x="120" y="63" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DC2626" fontFamily="monospace">-40% OFF</text>
          {/* Finger tap or Checkout pulse button */}
          <rect x="92" y="79" width="56" height="18" rx="4" fill="#22C55E" stroke="#2D2424" strokeWidth="2" />
          <text x="120" y="92" textAnchor="middle" fontSize="8" fontWeight="900" fill="#FFFFFF" fontFamily="monospace">CHECKOUT!</text>
          {/* Sparkles */}
          <polygon points="50,40 54,48 62,50 54,52 50,60 46,52 38,50 46,48" fill="#FBBF24" />
          <polygon points="190,55 193,61 200,63 193,65 190,72 187,65 180,63 187,61" fill="#FBBF24" />
        </svg>
      </div>
    );
  }

  if (sceneCode === 'thr') {
    return (
      <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
          {/* Gold Vault */}
          <rect x="30" y="32" width="60" height="60" rx="8" fill="#F59E0B" stroke="#2D2424" strokeWidth="3" />
          <circle cx="60" cy="62" r="18" fill="#FEF3C7" stroke="#2D2424" strokeWidth="3" />
          <rect x="57" y="52" width="6" height="20" fill="#2D2424" />
          <text x="60" y="108" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="monospace" fill="#78350F">DANA DARURAT</text>

          {/* VS */}
          <circle cx="120" cy="62" r="14" fill="#FEF08A" stroke="#2D2424" strokeWidth="3" />
          <text x="120" y="67" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="monospace" fill="#2D2424">VS</text>

          {/* Concert Ticket */}
          <rect x="150" y="38" width="64" height="48" rx="6" fill="#8B5CF6" stroke="#2D2424" strokeWidth="3" />
          <line x1="168" y1="38" x2="168" y2="86" stroke="#FFFFFF" strokeDasharray="3 3" strokeWidth="2" />
          <text x="190" y="58" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF" fontFamily="monospace">LIVE</text>
          <text x="190" y="72" textAnchor="middle" fontSize="8" fontWeight="900" fill="#FDE047" fontFamily="monospace">PASS VIP</text>
          <text x="182" y="108" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="monospace" fill="#5B21B6">TIKET KONSER</text>
        </svg>
      </div>
    );
  }

  if (sceneCode === 'local') {
    return (
      <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
        <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
          {/* Local Sneaker Box */}
          <rect x="25" y="40" width="70" height="45" rx="4" fill="#10B981" stroke="#2D2424" strokeWidth="3" />
          <rect x="35" y="50" width="50" height="8" fill="#FFFFFF" />
          <text x="60" y="75" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF" fontFamily="monospace">LOCAL PRIDE</text>
          <text x="60" y="105" textAnchor="middle" fontSize="9" fontWeight="900" fill="#065F46" fontFamily="monospace">350.000 IDR</text>

          {/* VS */}
          <circle cx="120" cy="62" r="14" fill="#FEF08A" stroke="#2D2424" strokeWidth="3" />
          <text x="120" y="67" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="monospace" fill="#2D2424">VS</text>

          {/* Global Hype Sneaker */}
          <rect x="145" y="40" width="70" height="45" rx="4" fill="#3B82F6" stroke="#2D2424" strokeWidth="3" />
          <polygon points="155,55 175,50 165,65" fill="#FBBF24" stroke="#2D2424" strokeWidth="2" />
          <text x="180" y="75" textAnchor="middle" fontSize="8" fontWeight="900" fill="#FFFFFF" fontFamily="monospace">HYPE GLOBAL</text>
          <text x="180" y="105" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1E40AF" fontFamily="monospace">2.200.000 IDR</text>
        </svg>
      </div>
    );
  }

  // friday reward
  return (
    <div className="w-full bg-[#FFFDF7] p-3 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] flex items-center justify-center">
      <svg width="240" height="130" viewBox="0 0 240 130" className="w-full max-w-[240px] h-auto">
        {/* Fast Food Burger */}
        <ellipse cx="60" cy="50" rx="25" ry="14" fill="#F59E0B" stroke="#2D2424" strokeWidth="3" />
        <rect x="38" y="58" width="44" height="6" fill="#10B981" />
        <rect x="35" y="64" width="50" height="8" rx="2" fill="#78350F" />
        <ellipse cx="60" cy="74" rx="25" ry="8" fill="#FCD34D" stroke="#2D2424" strokeWidth="3" />
        <text x="60" y="105" textAnchor="middle" fontSize="9" fontWeight="900" fill="#92400E" fontFamily="monospace">OJOL FOOD 95K</text>

        {/* VS */}
        <circle cx="120" cy="62" r="14" fill="#FEF08A" stroke="#2D2424" strokeWidth="3" />
        <text x="120" y="67" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="monospace" fill="#2D2424">VS</text>

        {/* Running shoe */}
        <path d="M 150 75 Q 165 45 190 55 Q 210 65 210 75 Z" fill="#EC4899" stroke="#2D2424" strokeWidth="3" />
        <rect x="145" y="75" width="68" height="8" rx="3" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2" />
        <text x="180" y="105" textAnchor="middle" fontSize="9" fontWeight="900" fill="#9D174D" fontFamily="monospace">LARI SORE: GRATIS</text>
      </svg>
    </div>
  );
}

export function PersonaPixelBadge({ trait, size = 100 }: { trait: string; size?: number }) {
  if (trait === 'M') {
    // Micro Joy: Cute Boba/Coffee cup with sunglasses & headphones
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_#2D2424]">
        <rect x="25" y="32" width="50" height="56" rx="10" fill="#F59E0B" stroke="#2D2424" strokeWidth="4" />
        <rect x="32" y="38" width="36" height="14" fill="#FEF3C7" />
        {/* Straw */}
        <rect x="46" y="10" width="8" height="24" fill="#EF4444" stroke="#2D2424" strokeWidth="3" />
        {/* Cool Sunglasses */}
        <rect x="32" y="54" width="14" height="10" rx="2" fill="#2D2424" />
        <rect x="54" y="54" width="14" height="10" rx="2" fill="#2D2424" />
        <line x1="46" y1="58" x2="54" y2="58" stroke="#2D2424" strokeWidth="3" />
        <path d="M 44 72 Q 50 78 56 72" stroke="#2D2424" strokeWidth="3" fill="none" />
      </svg>
    );
  }

  if (trait === 'F') {
    // Frugal Zen: Cute Piggy Bank with monk/zen headband
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_#2D2424]">
        <ellipse cx="50" cy="55" rx="36" ry="28" fill="#10B981" stroke="#2D2424" strokeWidth="4" />
        {/* Piggy snout */}
        <ellipse cx="50" cy="62" rx="14" ry="10" fill="#A7F3D0" stroke="#2D2424" strokeWidth="3" />
        <circle cx="45" cy="62" r="2.5" fill="#2D2424" />
        <circle cx="55" cy="62" r="2.5" fill="#2D2424" />
        {/* Zen Headband */}
        <rect x="18" y="38" width="64" height="8" rx="2" fill="#EF4444" stroke="#2D2424" strokeWidth="2" />
        {/* Coin slot */}
        <rect x="42" y="22" width="16" height="5" rx="2" fill="#F59E0B" stroke="#2D2424" strokeWidth="2" />
        {/* Eyes closed in meditation */}
        <path d="M 32 49 Q 36 45 40 49" stroke="#2D2424" strokeWidth="3" fill="none" />
        <path d="M 60 49 Q 64 45 68 49" stroke="#2D2424" strokeWidth="3" fill="none" />
      </svg>
    );
  }

  if (trait === 'E') {
    // Experience Aficionado: Retro Camera / Disco Sunglasses
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_#2D2424]">
        <rect x="18" y="30" width="64" height="50" rx="8" fill="#EC4899" stroke="#2D2424" strokeWidth="4" />
        <circle cx="50" cy="55" r="18" fill="#FEF08A" stroke="#2D2424" strokeWidth="4" />
        <circle cx="50" cy="55" r="10" fill="#3B82F6" stroke="#2D2424" strokeWidth="3" />
        <rect x="30" y="20" width="18" height="10" rx="2" fill="#F472B6" stroke="#2D2424" strokeWidth="3" />
        <circle cx="70" cy="40" r="4" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2" />
      </svg>
    );
  }

  // Pragmatic: Smart Calculator Robot
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_#2D2424]">
      <rect x="24" y="18" width="52" height="68" rx="8" fill="#6366F1" stroke="#2D2424" strokeWidth="4" />
      <rect x="32" y="26" width="36" height="16" rx="3" fill="#D1FAE5" stroke="#2D2424" strokeWidth="2" />
      <text x="50" y="38" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="monospace" fill="#065F46">999.9%</text>
      {/* Robot eyes / buttons */}
      <circle cx="36" cy="52" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
      <circle cx="50" cy="52" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
      <circle cx="64" cy="52" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
      <circle cx="36" cy="65" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
      <circle cx="50" cy="65" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
      <circle cx="64" cy="65" r="4" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
    </svg>
  );
}
