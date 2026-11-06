'use client';

import React, { useState, useRef, useEffect } from 'react';
import { QuizConfig } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { PixelSceneVillage } from './PixelSceneVillage';
import { RadarChart } from './RadarChart';

interface QuizRunnerProps {
  config: QuizConfig;
}

export function QuizRunner({ config }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('MJ');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScores({});
    setSelectedOption(null);
  };

  const handleSelectChoice = (trait: string, choiceId: string) => {
    if (selectedOption) return;
    setSelectedOption(choiceId);

    const updatedScores = {
      ...scores,
      [trait]: (scores[trait] || 0) + 1,
    };
    setScores(updatedScores);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // Calculate Top Trait
        let topTrait = 'MJ';
        let maxScore = -1;
        for (const [t, s] of Object.entries(updatedScores)) {
          if (s > maxScore) {
            maxScore = s;
            topTrait = t;
          }
        }
        setResultTrait(topTrait);
        triggerCalculationScreen(topTrait);
      }
    }, 450);
  };

  const triggerCalculationScreen = (finalTrait: string) => {
    setGameState('calculating');
    setTimeout(() => {
      setGameState('result');
      // Record completion
      try {
        const stored = localStorage.getItem('pulse_quiz_analytics');
        const data = stored ? JSON.parse(stored) : { completions: 0, results: {} };
        data.completions = (data.completions || 0) + 1;
        data.results[finalTrait] = (data.results[finalTrait] || 0) + 1;
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem('pulse_quiz_analytics', JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#13ab67', '#36B898', '#FEE440', '#FF70A6'],
      });
    }, 1800);
  };

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${config.brandName.toLowerCase()}-persona-card.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Tipe Belanjaku: ${activeResult.name}`,
          text: `Cek arketipe pengeluaranmu di ${config.title}!`,
        });
      } else {
        const link = document.createElement('a');
        link.download = `${config.brandName.toLowerCase()}-persona-card.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['MJ'];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#272e27] flex flex-col justify-between font-sans">
      {/* Centered Mobile-First Stage */}
      <div className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-between bg-white shadow-2xl relative">
        
        {/* Main Interactive Container */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Progress Bar (Cake.me 1:1 Capsule Outline) */}
          <div className="px-5 pt-4 pb-2 bg-[#36B898] border-b-2 border-[#272e27]/20 flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-white rounded-full border-2 border-[#272e27] overflow-hidden p-0.5">
                <div
                  className="h-full bg-[#13ab67] rounded-full transition-all duration-300"
                  style={{ width: `${gameState === 'intro' ? 10 : gameState === 'result' ? 100 : progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* STATE 1: INTRO (Wooden Village Board) */}
          {gameState === 'intro' && (
            <div className="flex-1 flex flex-col justify-between p-4 bg-[#F8F9FA]">
              <PixelSceneVillage step={0} />

              <div className="my-6 text-center px-4">
                <div className="inline-block text-[11px] font-black tracking-widest text-[#13ab67] bg-[#13ab67]/10 px-3 py-1 rounded-full mb-3">
                  {config.brandName} • CONSUMER RADAR 2025
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#272e27] leading-tight mb-2">
                  {config.title}
                </h1>
                <p className="text-xs text-[#555] leading-relaxed">
                  {config.subtitle}
                </p>
              </div>

              {/* Big Cake.me Pill CTA */}
              <div className="pb-4">
                <button
                  onClick={handleStart}
                  className="w-full py-4 bg-[#272e27] hover:bg-black text-white text-base font-bold rounded-full border-4 border-[#272e27] shadow-[0_4px_0_#111] active:translate-y-1 transition-all"
                >
                  Mulai Tes Sekarang!
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: PLAYING (Scene Village + Question + 2 Black Pill Options) */}
          {gameState === 'playing' && currentQ && (
            <div className="flex-1 flex flex-col justify-between p-4 bg-[#F8F9FA]">
              {/* Top Pixel Scene */}
              <PixelSceneVillage step={currentQ.index} />

              {/* Centered Question */}
              <div className="my-5 text-center px-2">
                <div className="text-[10px] font-mono font-bold text-[#13ab67] uppercase tracking-wider mb-1">
                  {currentQ.categoryBadge}
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#272e27] leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* Cake.me Pill Choices (Dark Charcoal Pills with High Contrast White Type) */}
              <div className="space-y-3 pb-4">
                {currentQ.choices.map((choice, idx) => {
                  const isSelected = selectedOption === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice.targetTrait, choice.id)}
                      className={`w-full text-left p-3.5 rounded-full border-2 transition-all flex items-center space-x-3 ${
                        isSelected
                          ? 'bg-[#13ab67] border-[#13ab67] text-white scale-[0.98]'
                          : 'bg-[#272e27] hover:bg-black border-[#272e27] text-white shadow-[0_3px_0_#111] active:translate-y-0.5'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx === 0 ? 'A' : 'B'}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-tight">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STATE 3: CALCULATING TRANSITION */}
          {gameState === 'calculating' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#36B898] text-center">
              <div className="w-16 h-16 bg-white rounded-2xl border-4 border-[#272e27] flex items-center justify-center text-3xl shadow-[4px_4px_0px_#272e27] animate-bounce mb-4">
                ⚡
              </div>
              <h3 className="text-base font-black text-[#272e27] tracking-wider uppercase mb-1">
                MEMETAKAN PROFIL BELANJAMU...
              </h3>
              <p className="text-xs text-white/90">
                Mengkalkulasi indeks komparasi 2025
              </p>
            </div>
          )}

          {/* STATE 4: RESULT (High-Density 9:16 Persona Card) */}
          {gameState === 'result' && activeResult && (
            <div className="flex-1 p-4 bg-[#F8F9FA] overflow-y-auto">
              {/* Persona Story Card */}
              <div
                ref={cardRef}
                className="bg-[#FFFDF7] border-4 border-[#272e27] rounded-2xl p-4 shadow-[6px_6px_0px_#272e27] mb-4 text-[#272e27]"
              >
                {/* Header Subtitle */}
                <div className="flex items-center justify-between border-b-2 border-[#272e27]/20 pb-2 mb-3">
                  <span className="text-[9px] font-black tracking-widest text-[#13ab67] uppercase">
                    {config.brandName} • 2025 CONSUMER RADAR
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#272e27] text-white px-1.5 py-0.5 rounded">
                    BURNOUT: {activeResult.stressCopingIndex}
                  </span>
                </div>

                {/* Character Badge & Title */}
                <div className="text-center my-2">
                  <div className="text-4xl mb-1">{activeResult.badge}</div>
                  <h2 className="text-base sm:text-lg font-black uppercase text-[#272e27] tracking-tight">
                    {activeResult.name}
                  </h2>
                  <p className="text-[11px] font-bold text-[#13ab67] mt-0.5">
                    {activeResult.tagline}
                  </p>
                </div>

                {/* Radar Chart 6 Sisi */}
                <div className="my-3 py-1 bg-white/70 border-2 border-[#272e27]/15 rounded-xl">
                  <RadarChart stats={activeResult.dimensions} />
                </div>

                {/* Persona Attributes Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="bg-[#FAEDCD] p-2.5 rounded-lg border-2 border-[#272e27]/20">
                    <span className="font-bold text-[10px] block text-[#6b4226] uppercase">TRIGGER BELANJA:</span>
                    <span className="text-[11px] font-semibold">{activeResult.spendingTrigger}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    <div className="bg-[#E9F5ED] p-2 rounded-lg border-2 border-[#13ab67]/30">
                      <div className="text-[9px] font-black text-[#13ab67] uppercase">CIRCLE COCOK</div>
                      <div className="font-bold mt-0.5">{activeResult.compatiblePartner}</div>
                    </div>
                    <div className="bg-[#FDE8E8] p-2 rounded-lg border-2 border-[#E63946]/30">
                      <div className="text-[9px] font-black text-[#E63946] uppercase">POTENSI BENTROK</div>
                      <div className="font-bold mt-0.5">{activeResult.clashingPartner}</div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border-2 border-[#272e27]/15 text-[10px] leading-relaxed text-[#444]">
                    <span className="font-black text-[#272e27]">SARAN SURVIVAL: </span>
                    {activeResult.actionAdvice}
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="mt-3 pt-2 border-t-2 border-[#272e27]/15 text-center text-[9px] font-mono text-[#888]">
                  VERIFIED ZERO-PARTY DATA • PULSE INSIGHTS LAB
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pb-2">
                <button
                  onClick={handleNativeShare}
                  disabled={isExporting}
                  className="w-full py-3.5 bg-[#FEE440] hover:bg-[#fedd1c] text-[#272e27] text-sm font-black rounded-full border-3 border-[#272e27] shadow-[0_4px_0_#272e27] active:translate-y-0.5 transition-all"
                >
                  {isExporting ? 'MENYIAPKAN GAMBAR...' : 'SHARE STORY / SIMPAN KE GALERI'}
                </button>
                <button
                  onClick={handleStart}
                  className="w-full py-2.5 bg-white hover:bg-gray-100 text-[#272e27] text-xs font-bold rounded-full border-2 border-[#272e27] transition-all"
                >
                  ULANGI TES
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Persistent OOOPEN Lab Style Footer Banner */}
        <div className="w-full bg-[#111] py-2 px-4 text-center border-t border-black/40">
          <span className="text-[10px] text-white/70 font-mono tracking-wider">
            Powered by <strong className="text-white underline">Pulse Engine</strong>
          </span>
        </div>

      </div>
    </div>
  );
}
