import React from 'react';

export function QuestionIllustration({ index }: { index: number }) {
  // Skenario 1: Tanggal tua, saldo 80k vs Kopi Susu Aren 25k (ATM screen + cup dilemma)
  if (index === 0) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" rx="12" fill="#FFFBEB" />
        {/* ATM Screen / Mobile Balance */}
        <rect x="36" y="28" width="130" height="124" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
        <rect x="46" y="38" width="110" height="26" rx="4" fill="#FEE2E2" stroke="#2D2424" strokeWidth="1.5" />
        <text x="54" y="55" fill="#EF4444" fontSize="11" fontWeight="bold" fontFamily="monospace">SALDO: 80.000</text>
        <line x1="46" y1="74" x2="146" y2="74" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 3" />
        <text x="48" y="92" fill="#64748B" fontSize="9" fontWeight="600">STATUS: BURNOUT</text>
        <rect x="48" y="104" width="80" height="14" rx="3" fill="#FEF08A" stroke="#2D2424" strokeWidth="1" />
        <text x="54" y="114" fill="#2D2424" fontSize="8" fontWeight="bold">DEADLINE: HARI INI</text>

        {/* VS Bubble */}
        <circle cx="178" cy="90" r="14" fill="#2D2424" />
        <text x="170" y="94" fill="#FFFFFF" fontSize="10" fontWeight="900">VS</text>

        {/* Coffee Cup with price tag */}
        <g transform="translate(205, 30)">
          <path d="M18 42 L25 116 C25 120 28 124 33 124 L67 124 C72 124 75 120 75 116 L82 42 Z" fill="#FEF3C7" stroke="#2D2424" strokeWidth="2.5" />
          <path d="M12 36 L88 36 L84 46 L16 46 Z" fill="#F59E0B" stroke="#2D2424" strokeWidth="2" />
          {/* Straw */}
          <path d="M50 36 L62 10 L72 14 L58 36" fill="#EF4444" stroke="#2D2424" strokeWidth="2" />
          {/* Coffee liquid band */}
          <path d="M22 62 L78 62 L75 92 L25 92 Z" fill="#92400E" opacity="0.3" />
          {/* Price Tag */}
          <rect x="52" y="85" width="46" height="22" rx="4" fill="#10B981" stroke="#2D2424" strokeWidth="1.5" />
          <text x="58" y="100" fill="#FFFFFF" fontSize="10" fontWeight="900">25.000</text>
          {/* Steam spark */}
          <path d="M36 24 C34 16 42 12 38 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  // Skenario 2: Ajakan nongkrong cafe estetik 150k vs Warmindo 15k
  if (index === 1) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" rx="12" fill="#F0FDF4" />
        {/* Left: Fancy Cafe Menu */}
        <g transform="translate(26, 26)">
          <rect width="124" height="128" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <rect x="12" y="12" width="100" height="20" rx="3" fill="#E0E7FF" stroke="#2D2424" strokeWidth="1" />
          <text x="22" y="26" fill="#4338CA" fontSize="9" fontWeight="800">CAFE ESTETIK ✨</text>
          <circle cx="62" cy="62" r="22" fill="#FDF2E9" stroke="#2D2424" strokeWidth="1.5" />
          <path d="M54 62 C54 56 70 56 70 62 Z" fill="#F97316" />
          <text x="26" y="100" fill="#64748B" fontSize="8" fontWeight="600">Toast + Matcha Latte</text>
          <rect x="24" y="106" width="76" height="16" rx="3" fill="#EF4444" />
          <text x="36" y="118" fill="#FFFFFF" fontSize="9" fontWeight="900">TOTAL: 150K</text>
        </g>

        {/* VS */}
        <circle cx="168" cy="90" r="14" fill="#2D2424" />
        <text x="160" y="94" fill="#FFFFFF" fontSize="10" fontWeight="900">VS</text>

        {/* Right: Warmindo Magelangan */}
        <g transform="translate(192, 26)">
          <rect width="104" height="128" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <rect x="10" y="12" width="84" height="20" rx="3" fill="#FEF08A" stroke="#2D2424" strokeWidth="1" />
          <text x="20" y="26" fill="#854D0E" fontSize="9" fontWeight="900">WARMINDO 🍜</text>
          <path d="M22 65 C22 84 82 84 82 65 Z" fill="#FDE047" stroke="#2D2424" strokeWidth="2" />
          <path d="M30 65 Q52 50 74 65" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <text x="18" y="100" fill="#64748B" fontSize="8" fontWeight="600">Mie Dokdok + Es Teh</text>
          <rect x="18" y="106" width="68" height="16" rx="3" fill="#10B981" />
          <text x="28" y="118" fill="#FFFFFF" fontSize="9" fontWeight="900">TOTAL: 15K</text>
        </g>
      </svg>
    );
  }

  // Skenario 3: Keranjang checkout jam 00:00 midnight sale vs Sleep timer
  if (index === 2) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" rx="12" fill="#F5F3FF" />
        {/* Smartphone mockup */}
        <rect x="90" y="16" width="140" height="148" rx="14" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
        <rect x="135" y="22" width="50" height="5" rx="2.5" fill="#2D2424" />
        {/* Screen header */}
        <rect x="100" y="34" width="120" height="24" rx="4" fill="#4F46E5" />
        <text x="114" y="50" fill="#FFFFFF" fontSize="10" fontWeight="900">MIDNIGHT SALE 00:00</text>
        {/* Cart items */}
        <rect x="100" y="66" width="120" height="42" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        <text x="108" y="82" fill="#0F172A" fontSize="9" fontWeight="700">Sneakers + Hoodie</text>
        <text x="108" y="96" fill="#EF4444" fontSize="10" fontWeight="900">Diskon 40% (Tinggal 5m)</text>
        {/* Bottom checkout dilemma buttons */}
        <rect x="100" y="116" width="56" height="20" rx="4" fill="#10B981" stroke="#2D2424" strokeWidth="1" />
        <text x="106" y="130" fill="#FFFFFF" fontSize="8" fontWeight="800">CHECKOUT</text>
        <rect x="162" y="116" width="58" height="20" rx="4" fill="#94A3B8" stroke="#2D2424" strokeWidth="1" />
        <text x="172" y="130" fill="#FFFFFF" fontSize="8" fontWeight="800">TIDUR DULU</text>
      </svg>
    );
  }

  // Skenario 4: Pembagian THR (Investasi Reksadana vs Tiket Konser/Staycation)
  if (index === 3) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" rx="12" fill="#FEFCE8" />
        {/* Left: Gold & Mutual Fund Vault */}
        <g transform="translate(36, 26)">
          <rect width="110" height="128" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <rect x="12" y="12" width="86" height="20" rx="3" fill="#DCFCE7" stroke="#2D2424" strokeWidth="1" />
          <text x="18" y="26" fill="#166534" fontSize="9" fontWeight="900">DANA DARURAT 📈</text>
          {/* Gold bars */}
          <rect x="30" y="66" width="50" height="16" rx="2" fill="#FACC15" stroke="#2D2424" strokeWidth="1.5" />
          <rect x="38" y="52" width="34" height="14" rx="2" fill="#FDE047" stroke="#2D2424" strokeWidth="1.5" />
          <text x="24" y="104" fill="#334155" fontSize="8" fontWeight="700">Reksadana / Emas</text>
          <text x="26" y="118" fill="#15803D" fontSize="8" fontWeight="800">Tenang 6 Bulan</text>
        </g>

        {/* Center VS */}
        <circle cx="168" cy="90" r="14" fill="#2D2424" />
        <text x="160" y="94" fill="#FFFFFF" fontSize="10" fontWeight="900">VS</text>

        {/* Right: Concert Ticket & Vacation */}
        <g transform="translate(190, 26)">
          <rect width="110" height="128" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <rect x="10" y="12" width="90" height="20" rx="3" fill="#FCE7F3" stroke="#2D2424" strokeWidth="1" />
          <text x="18" y="26" fill="#9D174D" fontSize="9" fontWeight="900">FESTIVAL TIKET 🎟️</text>
          {/* Ticket pass */}
          <rect x="25" y="52" width="60" height="32" rx="4" fill="#EC4899" stroke="#2D2424" strokeWidth="1.5" />
          <line x1="68" y1="52" x2="68" y2="84" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="68" cy="52" r="3" fill="#FFFFFF" />
          <circle cx="68" cy="84" r="3" fill="#FFFFFF" />
          <text x="22" y="104" fill="#334155" fontSize="8" fontWeight="700">VIP Festival Pass</text>
          <text x="24" y="118" fill="#BE185D" fontSize="8" fontWeight="800">Memori Seumur Hidup</text>
        </g>
      </svg>
    );
  }

  // Skenario 5: Sepatu Brand Lokal vs Brand Luar Prestige
  if (index === 4) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="180" rx="12" fill="#EFF6FF" />
        {/* Sneaker showdown */}
        <g transform="translate(30, 30)">
          <rect width="116" height="120" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <text x="14" y="22" fill="#1D4ED8" fontSize="9" fontWeight="900">BRAND LOKAL 🇮🇩</text>
          {/* Sneaker silhouette */}
          <path d="M20 70 Q30 55 55 58 Q85 60 96 75 L96 85 L20 85 Z" fill="#93C5FD" stroke="#2D2424" strokeWidth="2" />
          <rect x="18" y="85" width="80" height="8" rx="2" fill="#1E293B" />
          <text x="24" y="108" fill="#1E40AF" fontSize="10" fontWeight="900">IDR 350.000</text>
        </g>

        <circle cx="166" cy="90" r="14" fill="#2D2424" />
        <text x="158" y="94" fill="#FFFFFF" fontSize="10" fontWeight="900">VS</text>

        <g transform="translate(186, 30)">
          <rect width="116" height="120" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
          <text x="14" y="22" fill="#B91C1C" fontSize="9" fontWeight="900">GLOBAL PRESTIGE 🌐</text>
          {/* Global Sneaker */}
          <path d="M20 70 Q30 55 55 58 Q85 60 96 75 L96 85 L20 85 Z" fill="#FCA5A5" stroke="#2D2424" strokeWidth="2" />
          <rect x="18" y="85" width="80" height="8" rx="2" fill="#1E293B" />
          <text x="20" y="108" fill="#991B1B" fontSize="10" fontWeight="900">IDR 2.200.000</text>
        </g>
      </svg>
    );
  }

  // Skenario 6: Friday night comfort food ojol vs Olahraga lari sore
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" rx="12" fill="#FFF1F2" />
      {/* Left: Ojol Delivery Pizza / Burger */}
      <g transform="translate(32, 28)">
        <rect width="114" height="124" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
        <text x="16" y="24" fill="#E11D48" fontSize="9" fontWeight="900">COMFORT FOOD 🍔</text>
        <circle cx="57" cy="62" r="22" fill="#FFE4E6" stroke="#2D2424" strokeWidth="1.5" />
        <rect x="42" y="55" width="30" height="8" rx="4" fill="#F43F5E" />
        <rect x="46" y="65" width="22" height="6" rx="2" fill="#FBBF24" />
        <text x="20" y="102" fill="#475569" fontSize="8" fontWeight="600">Rebahan + Nonton</text>
        <text x="24" y="116" fill="#BE123C" fontSize="9" fontWeight="900">Biaya: 95.000</text>
      </g>

      <circle cx="166" cy="90" r="14" fill="#2D2424" />
      <text x="158" y="94" fill="#FFFFFF" fontSize="10" fontWeight="900">VS</text>

      {/* Right: Jogging park shoes */}
      <g transform="translate(186, 28)">
        <rect width="114" height="124" rx="8" fill="#FFFFFF" stroke="#2D2424" strokeWidth="2.5" />
        <text x="16" y="24" fill="#047857" fontSize="9" fontWeight="900">LARI SORE GBK 🏃</text>
        <circle cx="57" cy="62" r="22" fill="#D1FAE5" stroke="#2D2424" strokeWidth="1.5" />
        <path d="M48 68 L66 54 L62 50" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <text x="18" y="102" fill="#475569" fontSize="8" fontWeight="600">Endorfin + Segar</text>
        <text x="26" y="116" fill="#065F46" fontSize="9" fontWeight="900">Biaya: GRATIS</text>
      </g>
    </svg>
  );
}
