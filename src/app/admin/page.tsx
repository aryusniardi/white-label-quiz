'use client';

import React, { useState, useEffect } from 'react';
import { consumerQuizConfig } from '@/data/demoQuiz';

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
          completions: 342,
          results: {
            EABP: 38,
            EABS: 29,
            EAHP: 24,
            EAHS: 22,
            EIBP: 31,
            EIBS: 35,
            EIHP: 18,
            EIHS: 19,
            IABP: 27,
            IABS: 42,
            IAHP: 16,
            IAHS: 21,
            IIBP: 15,
            IIBS: 26,
            IIHP: 11,
            IIHS: 28,
          },
          lastUpdated: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const total = data.completions || 1;

  const resetData = () => {
    localStorage.removeItem('pulse_quiz_analytics');
    setData({ completions: 0, results: {} });
  };

  if (!mounted) return null;

  const archetypeList = Object.entries(consumerQuizConfig.results);

  // Find top archetype
  let topArchetypeKey = 'IABS';
  let topCount = -1;
  archetypeList.forEach(([key]) => {
    const cnt = data.results[key] || 0;
    if (cnt > topCount) {
      topCount = cnt;
      topArchetypeKey = key;
    }
  });

  const topArchetype = consumerQuizConfig.results[topArchetypeKey];
  const topPct = Math.round((topCount / total) * 100);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2424] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#2D2424] gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#718096] font-mono">
              B2B ENTERPRISE PORTAL • 2026 WORKPLACE INSIGHT
            </div>
            <h1 className="text-2xl font-black uppercase font-mono tracking-tight mt-0.5">
              Workplace 2026 Analytics Dashboard
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
            <div className="text-[11px] font-bold text-[#10B981] mt-1">100% Completion Rate (8 Scene)</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424]">
            <div className="text-[10px] font-black uppercase text-[#718096] font-mono">ARKETIPE PALING DOMINAN</div>
            <div className="text-xl font-black text-[#13ab67] font-mono mt-1 truncate">
              {topArchetype?.name} ({topPct}%)
            </div>
            <div className="text-[11px] font-bold text-[#4A5568] mt-1">
              {topArchetype?.tagline}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424]">
            <div className="text-[10px] font-black uppercase text-[#718096] font-mono">VIRAL SHARING RATE</div>
            <div className="text-4xl font-black text-[#EC4899] font-mono mt-1">54.6%</div>
            <div className="text-[11px] font-bold text-[#4A5568] mt-1">Web Share API L2 (Story / Foto)</div>
          </div>
        </div>

        {/* Breakdown 16 Arketipe */}
        <div className="bg-white p-6 rounded-2xl border-3 border-[#2D2424] shadow-[5px_5px_0px_#2D2424] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black uppercase tracking-wider font-mono">
              Distribusi 16 Arketipe Pekerja 2026
            </h2>
            <span className="text-xs font-bold text-[#718096] font-mono">
              Live Updates dari Kuis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archetypeList.map(([key, arch]) => {
              const count = data.results[key] || 0;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={key} className="p-3 rounded-xl border-2 border-[#2D2424]/30 bg-[#FFFDF7] space-y-1.5">
                  <div className="flex justify-between text-xs font-black font-mono">
                    <span className="truncate pr-2 font-bold text-[#2D2424]">
                      {arch.badge} {arch.name} ({key})
                    </span>
                    <span className="shrink-0">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-[#EAEAEA] h-3 rounded-full border border-[#2D2424]/40 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: arch.accentColor || '#13ab67',
                      }}
                    />
                  </div>
                  <div className="text-[10.5px] text-[#555] line-clamp-1 italic">
                    "{arch.tagline}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
