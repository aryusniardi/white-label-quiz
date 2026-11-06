'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { PixelCharacter, PixelScene } from './PixelSprites';
import { RadarChart } from './RadarChart';

interface QuizRunnerProps {
  initialConfig: QuizConfig;
}

export function QuizRunner({ initialConfig }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('R');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = initialConfig.questions.length;
  const currentQ = initialConfig.questions[currentQuestionIndex];

  const handleStart = () => {
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setCurrentQuestionIndex(0);
    setGameState('playing');
  };

  const handleChoice = (targetTrait: string, choiceId: string) => {
    setSelectedOption(choiceId);
    const updatedScores = {
      ...scores,
      [targetTrait]: (scores[targetTrait] || 0) + 1,
    };
    setScores(updatedScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Calculate winner
        let highestScore = -1;
        let winningTrait = 'R';
        for (const [trait, val] of Object.entries(updatedScores)) {
          if (val > highestScore) {
            highestScore = val;
            winningTrait = trait;
          }
        }
        setResultTrait(winningTrait);
        setGameState('calculating');
        setTimeout(() => {
          setGameState('result');
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FFD482', '#FEB2B2', '#9AE6B4', '#D6BCFA'],
            });
          } catch {}
        }, 1400);
      }
    }, 320);
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

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${initialConfig.results[resultTrait]?.id || 'quiz'}-story.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: initialConfig.results[resultTrait]?.name || 'My Cake Quiz Result',
          text: `Gue dapet tipe ${initialConfig.results[resultTrait]?.name}! Cek kue kepribadian kerjamu di sini!`,
        });
      } else {
        const link = document.createElement('a');
        link.download = `${initialConfig.results[resultTrait]?.id || 'quiz'}-story.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch {
      alert('Kartu sedang disiapkan, silakan screenshot hasilmu!');
    } finally {
      setIsExporting(false);
    }
  };

  const activeResult = initialConfig.results[resultTrait] || initialConfig.results['R'];

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2424] font-sans antialiased selection:bg-[#FFD482]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FFFDF7]/90 backdrop-blur-md border-b-2 border-[#2D2424] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍰</span>
          <span className="text-xs font-black tracking-widest uppercase text-[#2D2424]">
            {initialConfig.brandName}
          </span>
        </div>
        <div className="text-[11px] font-bold px-2.5 py-1 bg-[#FFD482] rounded-full border border-[#2D2424]">
          100% ANONYMOUS
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* State 1: Intro */}
        {gameState === 'intro' && (
          <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-6 shadow-[5px_5px_0px_#2D2424] text-center space-y-6">
            <div className="inline-block px-3 py-1 bg-[#FEFCBF] text-[#744210] rounded-full text-xs font-black border border-[#2D2424]">
              OFFICIAL CAREER TEST 2025
            </div>

            <div className="flex justify-center py-2">
              <PixelCharacter type="tiramisu" size={130} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#2D2424] mb-2 font-mono">
                {initialConfig.title}
              </h1>
              <p className="text-sm font-semibold text-[#5A4A42] leading-relaxed">
                {initialConfig.subtitle}
              </p>
            </div>

            <div className="bg-[#FFFDF7] rounded-xl p-3 border-2 border-[#2D2424] text-left text-xs space-y-1.5 font-medium text-[#5A4A42]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2D2424]">🎮 Skenario:</span> 6 Petualangan di Desa Pencari Kerja
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2D2424]">📊 Output:</span> Arketipe Kue, Indeks Workaholic & Radar 6 Sisi
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2D2424]">✨ Output Story:</span> Siap langsung share ke IG Story / Galeri
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 bg-[#FFD482] hover:bg-[#F6AD55] text-[#2D2424] font-black text-sm tracking-wider uppercase rounded-xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#2D2424] transition-all cursor-pointer"
            >
              MULAI PETUALANGAN SEKARANG
            </button>
          </div>
        )}

        {/* State 2: Playing Question */}
        {gameState === 'playing' && currentQ && (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl border-2 border-[#2D2424] p-3 shadow-[3px_3px_0px_#2D2424]">
              <div className="flex justify-between items-center text-xs font-black uppercase text-[#2D2424] mb-2">
                <span>QUEST {currentQ.index} / {totalQuestions}</span>
                <span>{Math.round(((currentQ.index - 1) / totalQuestions) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-[#EDF2F7] rounded-full border border-[#2D2424] overflow-hidden">
                <div
                  className="h-full bg-[#FFD482] border-r border-[#2D2424] transition-all duration-300"
                  style={{ width: `${(currentQ.index / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-5 shadow-[5px_5px_0px_#2D2424] space-y-4">
              <div className="text-[11px] font-black px-2.5 py-1 bg-[#FEFCBF] text-[#744210] rounded-md border border-[#2D2424] inline-block">
                {currentQ.categoryBadge}
              </div>

              {/* Pixel Scene Illustration */}
              <div className="rounded-xl border-2 border-[#2D2424] overflow-hidden">
                <PixelScene index={currentQ.sceneType} />
              </div>

              <div>
                <div className="text-xs font-bold text-[#A0AEC0] mb-1 font-mono uppercase tracking-wide">
                  {currentQ.scenarioTitle}
                </div>
                <h2 className="text-base font-black text-[#2D2424] leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* 2 Binary Choices */}
              <div className="space-y-2.5 pt-2">
                {currentQ.choices.map((choice, i) => {
                  const isSelected = selectedOption === choice.id;
                  const letter = i === 0 ? 'A' : 'B';
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice.targetTrait, choice.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 border-[#2D2424] transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#FFD482] translate-x-[2px] translate-y-[2px] shadow-[1px_1px_0px_#2D2424]'
                          : 'bg-[#FFFDF7] hover:bg-[#FEFCBF] shadow-[3px_3px_0px_#2D2424]'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-white border-2 border-[#2D2424] flex items-center justify-center font-black text-xs shrink-0 shadow-[1px_1px_0px_#2D2424]">
                        {letter}
                      </span>
                      <span className="text-xs font-bold text-[#2D2424] leading-relaxed pt-1">
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
          <div className="bg-white rounded-2xl border-3 border-[#2D2424] p-8 shadow-[5px_5px_0px_#2D2424] text-center space-y-6">
            <div className="animate-bounce flex justify-center">
              <span className="text-5xl">🍰</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#2D2424] mb-2 font-mono">
                MEMANGGANG HASILMU...
              </h3>
              <p className="text-xs font-semibold text-[#718096]">
                Menganalisis 6 dimensi kerja dan menemukan jodoh kue kepribadianmu...
              </p>
            </div>
            <div className="w-48 mx-auto h-2.5 bg-[#EDF2F7] rounded-full border border-[#2D2424] overflow-hidden">
              <div className="h-full bg-[#FFD482] animate-pulse w-full" />
            </div>
          </div>
        )}

        {/* State 4: Result Card */}
        {gameState === 'result' && activeResult && (
          <div className="space-y-4">
            {/* Story Card to be Exported */}
            <div
              ref={cardRef}
              className="bg-white rounded-3xl border-3 border-[#2D2424] p-5 shadow-[6px_6px_0px_#2D2424] space-y-4"
              style={{ backgroundColor: '#FFFDF7' }}
            >
              {/* Header inside card */}
              <div
                className="rounded-2xl border-2 border-[#2D2424] p-3 flex items-center justify-between"
                style={{ backgroundColor: activeResult.headerBg }}
              >
                <div>
                  <div className="text-[10px] font-mono font-black uppercase text-[#718096]">
                    WHAT CAKE R U?
                  </div>
                  <div className="text-sm font-black text-[#2D2424]">
                    {activeResult.roleBadge}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase text-[#718096]">WORKAHOLISM</div>
                  <div className="text-base font-black text-[#C53030] font-mono">
                    {activeResult.workaholismIndex}
                  </div>
                </div>
              </div>

              {/* Character Pixel Art */}
              <div className="flex flex-col items-center justify-center py-1">
                <PixelCharacter type={activeResult.spriteType} size={110} />
                <h2 className="text-2xl font-black text-[#2D2424] mt-2 font-mono tracking-tight">
                  {activeResult.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {activeResult.hashtags.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-black px-2 py-0.5 bg-white rounded-md border border-[#2D2424] shadow-[1px_1px_0px_#2D2424]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-3 border-2 border-[#2D2424] text-xs leading-relaxed font-semibold text-[#4A5568]">
                {activeResult.description}
              </div>

              {/* Radar Chart (6 Dimensions) */}
              <RadarChart stats={activeResult.spiderStats} />

              {/* Meta Grid: Lucky Charm, Work Bestie, Just Coworker */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="bg-white p-2.5 rounded-xl border-2 border-[#2D2424] shadow-[2px_2px_0px_#2D2424]">
                  <div className="text-[9px] font-black text-[#A0AEC0] uppercase">LUCKY CHARM</div>
                  <div className="text-[#2D2424] mt-0.5">{activeResult.luckyCharm}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border-2 border-[#2D2424] shadow-[2px_2px_0px_#2D2424]">
                  <div className="text-[9px] font-black text-[#48BB78] uppercase">WORK BESTIES</div>
                  <div className="text-[#2D2424] mt-0.5">{activeResult.workBesties}</div>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border-2 border-[#2D2424] text-[11px] font-bold shadow-[2px_2px_0px_#2D2424]">
                <div className="text-[9px] font-black text-[#E53E3E] uppercase">JUST COWORKERS</div>
                <div className="text-[#2D2424] mt-0.5">{activeResult.justCoworkers}</div>
              </div>

              {/* Recommended Roles */}
              <div className="bg-[#FFF9E6] p-2.5 rounded-xl border-2 border-[#2D2424]">
                <div className="text-[9px] font-black text-[#744210] uppercase mb-1">
                  POSISI & PEKERJAAN REKOMENDASI:
                </div>
                <div className="text-[11px] font-bold text-[#2D2424]">
                  {activeResult.recommendedRoles.join(' • ')}
                </div>
              </div>

              {/* Card Footer Watermark */}
              <div className="text-center pt-1 border-t border-[#E2E8F0] flex justify-between items-center text-[9px] font-bold text-[#A0AEC0] font-mono">
                <span>{initialConfig.brandName}</span>
                <span>white-label-quiz.pages.dev</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleShareStory}
                disabled={isExporting}
                className="w-full py-3.5 bg-[#FFD482] hover:bg-[#F6AD55] text-[#2D2424] font-black text-xs tracking-wider uppercase rounded-xl border-3 border-[#2D2424] shadow-[4px_4px_0px_#2D2424] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isExporting ? 'MEMPROSES KARTU...' : 'SHARE STORY / SIMPAN KE GALERI'}</span>
              </button>

              <button
                onClick={handleStart}
                className="w-full py-3 bg-white hover:bg-[#EDF2F7] text-[#2D2424] font-black text-xs tracking-wider uppercase rounded-xl border-2 border-[#2D2424] shadow-[2px_2px_0px_#2D2424] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                ULANGI PETUALANGAN
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
