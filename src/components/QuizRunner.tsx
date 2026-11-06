'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { QuestionIllustration } from '@/components/Illustration';

interface QuizRunnerProps {
  initialConfig: QuizConfig;
}

export function QuizRunner({ initialConfig }: QuizRunnerProps) {
  const [config] = useState<QuizConfig>(initialConfig);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('MJ');
  const [isExporting, setIsExporting] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScores({});
    setSelectedOption(null);
  };

  const handleAnswer = (choiceId: string, trait: string) => {
    setSelectedOption(choiceId);
    const updatedScores = {
      ...scores,
      [trait]: (scores[trait] || 0) + 1,
    };
    setScores(updatedScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        calculateAndShowResult(updatedScores);
      }
    }, 380);
  };

  const calculateAndShowResult = (finalScores: Record<string, number>) => {
    setGameState('calculating');

    let highestTrait = 'MJ';
    let maxScore = -1;
    for (const [trait, score] of Object.entries(finalScores)) {
      if (score > maxScore) {
        maxScore = score;
        highestTrait = trait;
      }
    }

    setResultTrait(highestTrait);

    setTimeout(() => {
      setGameState('result');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444'],
        });
      } catch {
        // Safe confetti fallback
      }
    }, 1800);
  };

  const handleShareStory = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${config.brandName}-Result-Card.png`, { type: 'image/png' });

      // iOS Web Share API Level 2 (Direct to Instagram Stories or Photos)
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Hasil Tes Kepribadian Finansial',
          text: `Cek arketipe pengeluaran & surviving lifestyle kamu di ${window.location.href}`,
        });
        setShareFeedback('Berhasil membuka share sheet!');
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Hasil Tes Kepribadian Finansial',
          url: window.location.href,
        });
        setShareFeedback('Tautan kuis dibagikan!');
      } else {
        // Fallback browser desktop
        const link = document.createElement('a');
        link.download = `${config.brandName}-Result-Card.png`;
        link.href = dataUrl;
        link.click();
        setShareFeedback('Gambar berhasil diunduh!');
      }
    } catch {
      setShareFeedback('Gagal memproses gambar');
    } finally {
      setIsExporting(false);
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['MJ'];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2424] flex flex-col items-center justify-center p-4 selection:bg-[#FFE5A3]">
      {/* Top Header */}
      <header className="w-full max-w-md mx-auto mb-5 flex items-center justify-between border-2 border-[#2D2424] bg-white px-4 py-3 rounded-2xl shadow-[3px_3px_0px_#2D2424]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#10B981] border border-[#2D2424]" />
          <span className="text-xs font-black tracking-widest uppercase">{config.brandName}</span>
        </div>
        <span className="text-[11px] font-bold bg-[#FEF08A] border border-[#2D2424] px-2 py-0.5 rounded-md">
          100% ANONIM
        </span>
      </header>

      {/* Main Interactive Stage */}
      <main className="w-full max-w-md mx-auto">
        {/* State 1: Intro */}
        {gameState === 'intro' && (
          <div className="border-3 border-[#2D2424] bg-white rounded-3xl p-6 shadow-[5px_5px_0px_#2D2424] text-center">
            <div className="inline-block px-3 py-1 bg-[#E0E7FF] border-2 border-[#2D2424] rounded-full text-xs font-black uppercase mb-4">
              CONSUMER INSIGHT 2025
            </div>

            <h1 className="text-2xl font-black text-[#2D2424] tracking-tight leading-tight mb-3">
              {config.title}
            </h1>

            <p className="text-sm font-medium text-[#574C4C] leading-relaxed mb-6">
              {config.subtitle}
            </p>

            {/* Simulation Preview Card */}
            <div className="border-2 border-[#2D2424] bg-[#FFFBEB] rounded-2xl p-4 mb-6 shadow-[3px_3px_0px_#2D2424] text-left">
              <div className="text-[11px] font-black uppercase text-[#92400E] mb-1">DATA YANG DIUKUR:</div>
              <ul className="text-xs font-semibold text-[#574C4C] space-y-1">
                <li>• Sensitivitas Pengeluaran Tanggal Tua</li>
                <li>• Level Impulsif Midnight Checkout</li>
                <li>• Preferensi Brand Lokal vs Prestise Global</li>
                <li>• Keseimbangan Finansial vs Kewarasan Mental</li>
              </ul>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 bg-[#FFD482] hover:bg-[#FFC966] text-[#2D2424] font-black text-base border-3 border-[#2D2424] rounded-2xl shadow-[4px_4px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#2D2424] transition-all cursor-pointer"
            >
              MULAI TES SEKARANG
            </button>
          </div>
        )}

        {/* State 2: Question Steps */}
        {gameState === 'playing' && currentQ && (
          <div className="border-3 border-[#2D2424] bg-white rounded-3xl p-6 shadow-[5px_5px_0px_#2D2424]">
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs font-black mb-2">
              <span className="uppercase text-[#786C6C]">PERTANYAAN {currentQuestionIndex + 1} DARI {totalQuestions}</span>
              <span className="px-2 py-0.5 bg-[#FEF08A] border border-[#2D2424] rounded-md">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-[#F1ECE1] border-2 border-[#2D2424] rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-[#FFD482] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Scenario Badge */}
            <div className="inline-block px-3 py-1 bg-[#FEF08A] border-2 border-[#2D2424] rounded-full text-[11px] font-black uppercase tracking-wider mb-3">
              {currentQ.categoryBadge}
            </div>

            {/* Real SVG Scenario Illustration */}
            <div className="w-full h-44 rounded-2xl border-2 border-[#2D2424] overflow-hidden mb-4 bg-white shadow-[2px_2px_0px_#2D2424]">
              <QuestionIllustration index={currentQuestionIndex} />
            </div>

            {/* Question Text */}
            <h2 className="text-base font-black text-[#2D2424] leading-snug mb-5">
              {currentQ.scenarioTitle}
            </h2>

            {/* Binary Choices */}
            <div className="space-y-3">
              {currentQ.choices.map((choice, cIdx) => {
                const isSelected = selectedOption === choice.id;
                const letter = cIdx === 0 ? 'A' : 'B';
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleAnswer(choice.id, choice.targetTrait)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-2xl border-2 border-[#2D2424] font-bold text-sm transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#A7F3D0] shadow-[1px_1px_0px_#2D2424] translate-x-[2px] translate-y-[2px]'
                        : 'bg-white hover:bg-[#FFFBEB] shadow-[3px_3px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#2D2424]'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-[#2D2424] text-white flex items-center justify-center text-xs font-black shrink-0">
                      {letter}
                    </span>
                    <span className="leading-snug pt-0.5">{choice.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* State 3: Calculating Loading Transition */}
        {gameState === 'calculating' && (
          <div className="border-3 border-[#2D2424] bg-white rounded-3xl p-8 shadow-[5px_5px_0px_#2D2424] text-center py-14">
            <div className="w-16 h-16 mx-auto mb-4 border-3 border-[#2D2424] bg-[#FFD482] rounded-2xl flex items-center justify-center text-2xl animate-spin font-black shadow-[3px_3px_0px_#2D2424]">
              ✦
            </div>
            <h3 className="text-lg font-black text-[#2D2424] mb-2 uppercase tracking-wide">
              MENGANALISIS POLA SPENDING...
            </h3>
            <p className="text-xs font-semibold text-[#786C6C]">
              Menghitung toleransi risiko, tingkat impulsive buying, dan arketipe lifestyle kamu.
            </p>
          </div>
        )}

        {/* State 4: Result Card Presentation */}
        {gameState === 'result' && activeResult && (
          <div className="space-y-4">
            {/* The 9:16 Story Card Container (Target of HTML to Image export) */}
            <div
              ref={cardRef}
              className="border-3 border-[#2D2424] bg-white rounded-3xl p-6 shadow-[6px_6px_0px_#2D2424] text-[#2D2424]"
            >
              {/* Card Header Branding */}
              <div className="flex items-center justify-between border-b-2 border-[#2D2424] pb-3 mb-4">
                <span className="text-xs font-black tracking-widest uppercase">{config.brandName}</span>
                <span className="text-[10px] font-black uppercase bg-[#FEF08A] border border-[#2D2424] px-2 py-0.5 rounded">
                  ARKETIPE 2025
                </span>
              </div>

              {/* Archetype Title */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-1">{activeResult.personaAvatarSvg}</div>
                <h2 className="text-xl font-black text-[#2D2424] tracking-tight">
                  {activeResult.archetypeName}
                </h2>
                <div className="text-xs font-bold text-[#D97706] uppercase tracking-wide mt-0.5">
                  {activeResult.dominantTrait} • INDEX {activeResult.financialVibeIndex}%
                </div>
              </div>

              {/* Tagline Box */}
              <div className="bg-[#FFFBEB] border-2 border-[#2D2424] p-3 rounded-2xl mb-4 shadow-[2px_2px_0px_#2D2424]">
                <p className="text-xs font-bold text-[#574C4C] italic text-center">
                  &ldquo;{activeResult.tagline}&rdquo;
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="border-2 border-[#2D2424] p-2.5 rounded-xl bg-white shadow-[2px_2px_0px_#2D2424]">
                  <div className="text-[10px] font-black text-[#786C6C] uppercase">COPING STRES</div>
                  <div className="font-extrabold text-[#15803D]">{activeResult.stressCopingMechanism}</div>
                </div>
                <div className="border-2 border-[#2D2424] p-2.5 rounded-xl bg-white shadow-[2px_2px_0px_#2D2424]">
                  <div className="text-[10px] font-black text-[#786C6C] uppercase">TRIGGER BELANJA</div>
                  <div className="font-extrabold text-[#B91C1C]">{activeResult.spendingTrigger}</div>
                </div>
              </div>

              {/* Social Matching */}
              <div className="border-2 border-[#2D2424] p-3 rounded-2xl bg-[#F8FAFC] mb-4 space-y-1.5 shadow-[2px_2px_0px_#2D2424] text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#15803D]">PARTNER HANGOUT IDEAL:</span>
                  <span className="font-bold">{activeResult.bestieArchetype}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-1">
                  <span className="font-black text-[#B91C1C]">BAHAYA JIKA BARENG:</span>
                  <span className="font-bold">{activeResult.clashArchetype}</span>
                </div>
              </div>

              {/* Actionable Advice */}
              <div className="border-2 border-[#2D2424] p-3 rounded-2xl bg-[#FEFCE8] mb-3 shadow-[2px_2px_0px_#2D2424]">
                <div className="text-[10px] font-black uppercase text-[#854D0E] mb-1">REKOMENDASI FINANSIAL:</div>
                <p className="text-xs font-bold text-[#451A03] leading-relaxed">
                  {activeResult.actionGuidance}
                </p>
              </div>

              {/* Card Footer Watermark */}
              <div className="pt-2 text-center text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                SCREENSHOT & SHARE KE INSTAGRAM STORY • 100% ANONIM
              </div>
            </div>

            {/* Share Feedback Toast */}
            {shareFeedback && (
              <div className="p-3 bg-[#A7F3D0] border-2 border-[#2D2424] rounded-xl text-xs font-black text-center shadow-[2px_2px_0px_#2D2424]">
                {shareFeedback}
              </div>
            )}

            {/* Action Buttons (Deslopped, No Lucide icons) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShareStory}
                disabled={isExporting}
                className="py-3.5 px-4 bg-[#FFD482] hover:bg-[#FFC966] text-[#2D2424] font-black text-sm border-3 border-[#2D2424] rounded-2xl shadow-[3px_3px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#2D2424] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHARE STORY / UNDUH</span>
              </button>

              <button
                onClick={handleStart}
                className="py-3.5 px-4 bg-white hover:bg-[#F3F4F6] text-[#2D2424] font-black text-sm border-3 border-[#2D2424] rounded-2xl shadow-[3px_3px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#2D2424] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ULANGI TES</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
