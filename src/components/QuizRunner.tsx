'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QuizConfig } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { CleanScenarioVisual } from './CleanScenarioVisual';
import { RadarChart } from './RadarChart';

interface QuizRunnerProps {
  config: QuizConfig;
}

export function QuizRunner({ config }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({ M: 0, F: 0, E: 0, P: 0 });
  const [resultTrait, setResultTrait] = useState<string>('M');
  const [isExporting, setIsExporting] = useState(false);
  const [statsLogged, setStatsLogged] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync completion stat to localStorage for Admin Dashboard
  useEffect(() => {
    if (gameState === 'result' && !statsLogged) {
      try {
        const stored = localStorage.getItem('pulse_quiz_analytics') || '{"completions": 0, "results": {}}';
        const parsed = JSON.parse(stored);
        parsed.completions = (parsed.completions || 0) + 1;
        parsed.results[resultTrait] = (parsed.results[resultTrait] || 0) + 1;
        parsed.lastUpdated = new Date().toISOString();
        localStorage.setItem('pulse_quiz_analytics', JSON.stringify(parsed));
        setStatsLogged(true);
      } catch (e) {
        console.error('Error logging analytics', e);
      }
    }
  }, [gameState, statsLogged, resultTrait]);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleSelectOption = (trait: string, optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);

    const nextScores = { ...scores, [trait]: (scores[trait] || 0) + 1 };
    setScores(nextScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        triggerCalculationScreen(nextScores);
      }
    }, 450);
  };

  const triggerCalculationScreen = (finalScores: Record<string, number>) => {
    let topTrait = 'M';
    let maxVal = -1;
    for (const [t, v] of Object.entries(finalScores)) {
      if (v > maxVal) {
        maxVal = v;
        topTrait = t;
      }
    }

    setResultTrait(topTrait);
    setGameState('calculating');

    setTimeout(() => {
      setGameState('result');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#EC4899', '#6366F1', '#2D2424'],
      });
    }, 1800);
  };

  const handleRestart = () => {
    setScores({ M: 0, F: 0, E: 0, P: 0 });
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setGameState('intro');
    setStatsLogged(false);
  };

  const handleShareStory = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#FFFDF7',
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${config.results[resultTrait]?.id || 'quiz'}-result.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Spending Persona 2025',
          text: `Hasil tes gayaku: ${config.results[resultTrait]?.name}! Coba tes punyamu sekarang:`,
        });
      } else {
        const link = document.createElement('a');
        link.download = `${config.results[resultTrait]?.id || 'quiz'}-result.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Error sharing card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['M'];

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2424] flex flex-col items-center justify-start p-4 sm:p-6 font-sans">
      {/* Top Brand Bar */}
      <header className="w-full max-w-md flex items-center justify-between py-3 mb-4 border-b-2 border-[#2D2424]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <h1 className="text-xs font-black tracking-widest uppercase font-mono">{config.brandName}</h1>
        </div>
        <a
          href="/admin"
          className="text-[10px] font-black uppercase tracking-wider bg-white px-2.5 py-1 rounded border border-[#2D2424] hover:bg-[#FEF3C7] transition-colors"
        >
          Admin Portal →
        </a>
      </header>

      {/* Main Card Viewport */}
      <main className="w-full max-w-md flex-1 flex flex-col justify-center">
        {/* State 1: Intro */}
        {gameState === 'intro' && (
          <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-6 shadow-[5px_5px_0px_#2D2424] text-center space-y-6">
            <div className="inline-block px-3 py-1 bg-[#FEF3C7] border-2 border-[#2D2424] rounded-full text-[11px] font-black tracking-wider uppercase font-mono">
              2025 CONSUMER COPING RADAR
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight leading-tight uppercase font-mono">
                {config.title}
              </h2>
              <p className="text-sm font-semibold text-[#4A5568] leading-relaxed">
                {config.subtitle}
              </p>
            </div>

            <div className="p-4 bg-[#FFFDF7] border-2 border-[#2D2424] rounded-xl text-left space-y-2 text-xs font-bold text-[#4A5568]">
              <div className="flex items-center gap-2 text-[#2D2424]">
                <span className="font-mono text-sm">✓</span> 6 Skenario Dilema Riil (Tanggal Tua, FOMO, Sale)
              </div>
              <div className="flex items-center gap-2 text-[#2D2424]">
                <span className="font-mono text-sm">✓</span> 100% Anonim & Zero Friction
              </div>
              <div className="flex items-center gap-2 text-[#2D2424]">
                <span className="font-mono text-sm">✓</span> Hasil Berupa Kartu Persona Siap Share ke IG Story
              </div>
            </div>

            <button
              onClick={() => setGameState('playing')}
              className="w-full py-4 bg-[#FFD482] hover:bg-[#FFC966] text-[#2D2424] font-black text-sm tracking-wider uppercase rounded-xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#2D2424] transition-all cursor-pointer font-mono"
            >
              MULAI TES SEKARANG
            </button>
          </div>
        )}

        {/* State 2: Playing Question */}
        {gameState === 'playing' && currentQ && (
          <div className="space-y-4">
            {/* Progress Counter */}
            <div className="flex items-center justify-between text-xs font-black font-mono px-1">
              <span>PERTANYAAN {currentQuestionIndex + 1} DARI {totalQuestions}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
            </div>

            <div className="w-full bg-white h-2.5 rounded-full border-2 border-[#2D2424] overflow-hidden">
              <div
                className="bg-[#FFD482] h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-5 shadow-[5px_5px_0px_#2D2424] space-y-4">
              <div className="text-[10px] font-black uppercase text-[#718096] tracking-widest font-mono">
                {currentQ.categoryBadge}
              </div>

              {/* Scenario Visual Dilemma */}
              <CleanScenarioVisual sceneCode={currentQ.sceneCode} />

              <h2 className="text-base sm:text-lg font-black leading-snug text-[#2D2424]">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.choices.map((choice, i) => {
                  const isSelected = selectedOption === choice.id;
                  const label = i === 0 ? 'A' : 'B';
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectOption(choice.targetTrait, choice.id)}
                      className={`w-full p-4 text-left rounded-xl border-3 border-[#2D2424] transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD482] shadow-[2px_2px_0px_#2D2424] translate-x-0.5 translate-y-0.5'
                          : 'bg-white hover:bg-[#FFFDF7] shadow-[3px_3px_0px_#2D2424]'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#2D2424] text-white flex items-center justify-center text-xs font-black shrink-0 font-mono">
                        {label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#2D2424] leading-relaxed">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* State 3: Calculating */}
        {gameState === 'calculating' && (
          <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-8 shadow-[5px_5px_0px_#2D2424] text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#2D2424] border-t-[#FFD482] rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-black uppercase font-mono tracking-wider">
              MEMETA-KAN INDEKS GAYAMU...
            </h3>
            <p className="text-xs font-bold text-[#718096]">
              Mengkalkulasi tingkat ketahanan, dorongan belanja, dan alokasi prioritasmu.
            </p>
          </div>
        )}

        {/* State 4: Result Story Card */}
        {gameState === 'result' && activeResult && (
          <div className="space-y-4 py-2">
            {/* 9:16 Shareable Trophy Card */}
            <div
              ref={cardRef}
              className="bg-[#FFFDF7] rounded-3xl border-3 border-[#2D2424] p-5 shadow-[6px_6px_0px_#2D2424] space-y-4"
            >
              {/* Header Box */}
              <div
                className="p-4 rounded-2xl border-2 border-[#2D2424] text-center space-y-1"
                style={{ backgroundColor: activeResult.headerBg }}
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-[#718096] font-mono">
                  {config.brandName} • 2025 CONSUMER RADAR
                </div>
                <div className="text-xl font-black text-[#2D2424] tracking-tight uppercase font-mono">
                  {activeResult.name}
                </div>
                <div className="inline-block px-2.5 py-0.5 bg-white border border-[#2D2424] rounded-full text-[10px] font-black uppercase tracking-wider text-[#2D2424] font-mono">
                  {activeResult.badge}
                </div>
              </div>

              {/* Tagline Box */}
              <div className="bg-white p-3 rounded-xl border-2 border-[#2D2424] text-center">
                <p className="text-xs font-bold italic text-[#2D2424] leading-snug">
                  &ldquo;{activeResult.tagline}&rdquo;
                </p>
              </div>

              {/* Hexagonal Radar Chart */}
              <div className="bg-white p-3 rounded-2xl border-2 border-[#2D2424]">
                <div className="text-[10px] font-black uppercase text-[#718096] tracking-wider mb-1 text-center font-mono">
                  RADAR 6 SISI TREN FINANSIAL
                </div>
                <RadarChart stats={activeResult.dimensions} />
              </div>

              {/* Key Indicators Grid */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-white p-2.5 rounded-xl border-2 border-[#2D2424]">
                  <div className="text-[9px] font-black uppercase text-[#718096] font-mono">BURNOUT INDEX</div>
                  <div className="text-xs font-black text-[#2D2424] mt-0.5">{activeResult.stressCopingIndex}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border-2 border-[#2D2424]">
                  <div className="text-[9px] font-black uppercase text-[#718096] font-mono">TRIGGER BELANJA</div>
                  <div className="text-xs font-black text-[#2D2424] mt-0.5 truncate">{activeResult.spendingTrigger}</div>
                </div>
              </div>

              {/* Work Besties vs Clashing */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-[#D1FAE5] p-2.5 rounded-xl border-2 border-[#2D2424]">
                  <div className="text-[9px] font-black uppercase text-[#065F46] font-mono">CIRCLE COCOK</div>
                  <div className="text-xs font-black text-[#065F46] mt-0.5">{activeResult.compatiblePartner}</div>
                </div>
                <div className="bg-[#FEE2E2] p-2.5 rounded-xl border-2 border-[#2D2424]">
                  <div className="text-[9px] font-black uppercase text-[#991B1B] font-mono">POTENSI BENTROK</div>
                  <div className="text-xs font-black text-[#991B1B] mt-0.5">{activeResult.clashingPartner}</div>
                </div>
              </div>

              {/* Action Advice Box */}
              <div className="bg-white p-3 rounded-xl border-2 border-[#2D2424] text-xs font-semibold text-[#4A5568] leading-relaxed">
                <span className="font-black text-[#2D2424] font-mono block mb-0.5">💡 SARAN UNTUKMU:</span>
                {activeResult.actionAdvice}
              </div>

              {/* Watermark Footer */}
              <div className="text-center text-[9px] font-black text-[#A0AEC0] uppercase tracking-widest font-mono pt-1">
                SCREENSHOT & SHARE KE INSTAGRAM STORY
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleShareStory}
                disabled={isExporting}
                className="w-full py-4 bg-[#FFD482] hover:bg-[#FFC966] text-[#2D2424] font-black text-sm tracking-wider uppercase rounded-xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer font-mono"
              >
                {isExporting ? 'MEMPROSES KARTU...' : 'SHARE STORY / SIMPAN KE GALERI'}
              </button>

              <button
                onClick={handleRestart}
                className="w-full py-3 bg-white hover:bg-[#FFFDF7] text-[#2D2424] font-black text-xs tracking-wider uppercase rounded-xl border-2 border-[#2D2424] cursor-pointer font-mono"
              >
                ULANGI ASESMEN
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
