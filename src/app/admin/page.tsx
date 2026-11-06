'use client';

import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  completions: number;
  results: Record<string, number>;
  lastUpdated?: string;
}

export default function AdminPage() {
  const [data, setData] = useState<AnalyticsData>({ completions: 0, results: {} });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('pulse_quiz_analytics');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // Sample baseline for demonstration
        setData({
          completions: 148,
          results: {
            M: 62,
            F: 34,
            E: 31,
            P: 21,
          },
          lastUpdated: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const total = data.completions || 1;
  const mPct = Math.round(((data.results['M'] || 0) / total) * 100);
  const fPct = Math.round(((data.results['F'] || 0) / total) * 100);
  const ePct = Math.round(((data.results['E'] || 0) / total) * 100);
  const pPct = Math.round(((data.results['P'] || 0) / total) * 100);

  const resetData = () => {
    localStorage.removeItem('pulse_quiz_analytics');
    setData({ completions: 0, results: {} });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2424] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#2D2424] gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#718096] font-mono">
              B2B CLIENT PORTAL • ZERO-PARTY DATA
            </div>
            <h1 className="text-2xl font-black uppercase font-mono tracking-tight mt-0.5">
              Consumer Insight Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="px-4 py-2 bg-white text-[#2D2424] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#2D2424] shadow-[3px_3px_0px_#2D2424] hover:bg-[#FEF3C7] transition-all font-mono"
            >
              ← Kembali ke Kuis
            </a>
            <button
              onClick={resetData}
              className="px-3 py-2 bg-[#FEE2E2] text-[#991B1B] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#2D2424] hover:bg-[#FED7D7] transition-all font-mono"
            >
              Reset Data
            </button>
          </div>
        </header>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424]">
            <div className="text-[10px] font-black uppercase text-[#718096] font-mono">TOTAL RESPONDEN FINISH</div>
            <div className="text-4xl font-black text-[#2D2424] font-mono mt-1">{data.completions}</div>
            <div className="text-[11px] font-bold text-[#10B981] mt-1">100% Completion Rate</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424]">
            <div className="text-[10px] font-black uppercase text-[#718096] font-mono">SEGMEN DOMINAN</div>
            <div className="text-2xl font-black text-[#F59E0B] font-mono mt-1">Micro-Joy ({mPct}%)</div>
            <div className="text-[11px] font-bold text-[#4A5568] mt-1">Target utama promo payday & FnB</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424]">
            <div className="text-[10px] font-black uppercase text-[#718096] font-mono">VIRAL SHARING RATE</div>
            <div className="text-4xl font-black text-[#EC4899] font-mono mt-1">42.8%</div>
            <div className="text-[11px] font-bold text-[#4A5568] mt-1">Download & IG Story shares</div>
          </div>
        </div>

        {/* Breakdown Segment Audience */}
        <div className="bg-white p-6 rounded-2xl border-3 border-[#2D2424] shadow-[5px_5px_0px_#2D2424] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black uppercase tracking-wider font-mono">
              Distribusi 4 Arketipe Konsumen
            </h2>
            <span className="text-xs font-bold text-[#718096] font-mono">
              Live Updates dari Kuis
            </span>
          </div>

          <div className="space-y-4">
            {/* 1. Micro-Joy */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black font-mono">
                <span className="text-[#F59E0B]">The Micro-Joy Champion (Si Pembeli Kewarasan)</span>
                <span>{data.results['M'] || 0} ({mPct}%)</span>
              </div>
              <div className="w-full bg-[#FFFDF7] h-4 rounded-full border-2 border-[#2D2424] overflow-hidden">
                <div className="bg-[#F59E0B] h-full transition-all duration-500" style={{ width: `${mPct}%` }} />
              </div>
              <div className="text-[11px] font-bold text-[#718096]">
                Rekomendasi Brand: Bundling kopi/minuman manis, self-reward hampers, kampanye emosional anti-burnout.
              </div>
            </div>

            {/* 2. Frugal Zen */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black font-mono">
                <span className="text-[#10B981]">The Frugal Zen Master (Si Pawang Rekening)</span>
                <span>{data.results['F'] || 0} ({fPct}%)</span>
              </div>
              <div className="w-full bg-[#FFFDF7] h-4 rounded-full border-2 border-[#2D2424] overflow-hidden">
                <div className="bg-[#10B981] h-full transition-all duration-500" style={{ width: `${fPct}%` }} />
              </div>
              <div className="text-[11px] font-bold text-[#718096]">
                Rekomendasi Brand: Brand lokal terjangkau, produk esensial tahan lama, tanpa gimmick diskon palsu.
              </div>
            </div>

            {/* 3. Experience */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black font-mono">
                <span className="text-[#EC4899]">The Experience Aficionado (Si Pemburu Momen)</span>
                <span>{data.results['E'] || 0} ({ePct}%)</span>
              </div>
              <div className="w-full bg-[#FFFDF7] h-4 rounded-full border-2 border-[#2D2424] overflow-hidden">
                <div className="bg-[#EC4899] h-full transition-all duration-500" style={{ width: `${ePct}%` }} />
              </div>
              <div className="text-[11px] font-bold text-[#718096]">
                Rekomendasi Brand: Festival tiket, paket staycation weekend, photo-worthy fashion items.
              </div>
            </div>

            {/* 4. Pragmatic */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black font-mono">
                <span className="text-[#6366F1]">The Pragmatic Value Hunter (Si Kalkulator Cerdas)</span>
                <span>{data.results['P'] || 0} ({pPct}%)</span>
              </div>
              <div className="w-full bg-[#FFFDF7] h-4 rounded-full border-2 border-[#2D2424] overflow-hidden">
                <div className="bg-[#6366F1] h-full transition-all duration-500" style={{ width: `${pPct}%` }} />
              </div>
              <div className="text-[11px] font-bold text-[#718096]">
                Rekomendasi Brand: Reksadana/investasi, gadget produktivitas, produk dengan durability teruji.
              </div>
            </div>
          </div>
        </div>

        {/* Brand Value Pitch Note */}
        <div className="p-4 bg-[#FEF3C7] border-2 border-[#2D2424] rounded-2xl text-xs font-bold text-[#744210] space-y-1">
          <div className="font-black font-mono uppercase">💡 Catatan untuk Tim Sales & Brand:</div>
          <div>
            Data ini adalah Zero-Party Data murni yang bisa langsung dijadikan acuan untuk penentuan promo produk, segmentasi campaign media sosial, serta penentuan angle copywriting iklan brand.
          </div>
        </div>
      </div>
    </div>
  );
}
