'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig } from '@/types/quiz';
import { Sparkles, ArrowRight, RotateCcw, Share2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Illustration } from './Illustration';

interface QuizRunnerProps {
  initialConfig: QuizConfig;
}

export function QuizRunner({ initialConfig }: QuizRunnerProps) {
  const [config] = useState<QuizConfig>(initialConfig);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('DOOM');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleStart = () => {
    setScores({});
    setCurrentQuestionIndex(0);
    setGameState('playing');
  };

  const handleSelectChoice = (trait: string, choiceId: string) => {
    setSelectedOption(choiceId);
    const updatedScores = {
      ...scores,
      [trait]: (scores[trait] || 0) + 1,
    };
    setScores(updatedScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        calculateFinalArchetype(updatedScores);
      }
    }, 380);
  };

  const calculateFinalArchetype = (finalScores: Record<string, number>) => {
    setGameState('calculating');
    let maxScore = -1;
    let winningTrait = 'DOOM';

    Object.entries(finalScores).forEach(([trait, count]) => {
      if (count > maxScore) {
        maxScore = count;
        winningTrait = trait;
      }
    });

    setResultTrait(winningTrait);

    setTimeout(() => {
      setGameState('result');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'],
        });
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `spending-persona-${resultTrait}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Hasil Tes Tipe Belanja & Survivor',
          text: `Hasil tesku: ${activeResult?.archetypeName}! Cek tipe pengeluaranmu di:`,
        });
      } else {
        const link = document.createElement('a');
        link.download = `spending-persona-${resultTrait}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['DOOM'];

  return (
    <div
      className="min-h-screen py-8 px-4 flex flex-col items-center justify-between font-sans selection:bg-amber-200"
      style={{ backgroundColor: config.theme.bgPage }}
    >
      {/* 1. Header Brand Bar (Clean, Zero User CMS button) */}
      <header className="w-full max-w-md mx-auto mb-6 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center font-black text-zinc-900 shadow-[2px_2px_0px_#18181B]">
            ⚡
          </div>
          <div>
            <h1 className="text-xs font-black tracking-wider uppercase text-zinc-900">
              {config.brandName}
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase">
              Consumer Insight Index 2025/2026
            </p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-white border-2 border-zinc-900 text-[10px] font-black uppercase text-zinc-700 shadow-[2px_2px_0px_#18181B]">
          100% Anonymous
        </div>
      </header>

      {/* 2. Main Game Container */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        {/* State A: Intro Screen */}
        {gameState === 'intro' && (
          <div className="bg-white border-4 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_#18181B] space-y-6 text-center animate-in fade-in duration-300">
            {/* Playful badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border-2 border-zinc-900 text-xs font-extrabold text-rose-700">
              <Sparkles className="w-3.5 h-3.5" /> TRENDING LIFESTYLE RADAR
            </div>

            {/* Illustration */}
            <div className="py-2">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 border-4 border-zinc-900 flex items-center justify-center text-4xl shadow-[4px_4px_0px_#18181B] rotate-[-3deg] hover:rotate-0 transition-transform">
                💳
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-zinc-900 leading-tight">
                {config.title}
              </h2>
              <p className="text-xs font-semibold text-zinc-600 leading-relaxed px-2">
                {config.subtitle}
              </p>
            </div>

            <div className="bg-amber-50 border-2 border-dashed border-zinc-900 rounded-2xl p-3.5 text-left text-xs space-y-1.5 font-medium text-zinc-700">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <span>🎯</span> Apa yang diukur?
              </div>
              <p className="text-[11px] text-zinc-600">
                • Pola <em>Doom Spending</em> vs <em>Frugal Living</em> saat lelah mental.<br />
                • Alokasi THR & respon terhadap diskon brand.<br />
                • Identitas psikografis belanja yang viral di media sosial.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 rounded-2xl bg-amber-300 hover:bg-amber-400 text-zinc-900 font-black text-sm tracking-wide uppercase border-3 border-zinc-900 shadow-[4px_4px_0px_#18181B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#18181B] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Mulai Tes Kepribadian <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* State B: Playing Questions */}
        {gameState === 'playing' && currentQ && (
          <div className="bg-white border-4 border-zinc-900 rounded-[28px] p-6 shadow-[6px_6px_0px_#18181B] space-y-5 animate-in fade-in duration-200">
            {/* Top Step Counter & Category */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-black text-zinc-500 uppercase tracking-wider">
                <span>QUEST {currentQuestionIndex + 1} OF {totalQuestions}</span>
                <span className="text-amber-600">
                  {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full border-2 border-zinc-900 overflow-hidden">
                <div
                  className="h-full bg-amber-400 border-r-2 border-zinc-900 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Scenario Badge */}
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border-2 border-zinc-900 text-[10px] font-black uppercase text-zinc-700">
                {currentQ.categoryBadge}
              </span>
            </div>

            {/* Zero-Error Inline Vector Illustration */}
            <Illustration type={currentQ.illustrationKey} />

            {/* Question Text */}
            <h3 className="text-base font-extrabold text-zinc-900 text-center leading-snug px-1">
              {currentQ.question}
            </h3>

            {/* Binary Choices (Playful Neo-Brutalist Buttons) */}
            <div className="space-y-3 pt-2">
              {currentQ.choices.map((choice, i) => {
                const isSelected = selectedOption === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.targetTrait, choice.id)}
                    className={`w-full text-left p-4 rounded-2xl border-3 border-zinc-900 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-300 translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_#18181B]'
                        : 'bg-zinc-50 hover:bg-amber-100 shadow-[4px_4px_0px_#18181B] hover:translate-y-[-1px]'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-white border-2 border-zinc-900 flex items-center justify-center text-xs font-black text-zinc-900 shrink-0">
                      {i === 0 ? 'A' : 'B'}
                    </span>
                    <span className="text-xs font-bold text-zinc-800 leading-relaxed pt-0.5">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* State C: Calculating Transition */}
        {gameState === 'calculating' && (
          <div className="bg-white border-4 border-zinc-900 rounded-[28px] p-8 shadow-[6px_6px_0px_#18181B] text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-200 border-4 border-zinc-900 flex items-center justify-center text-4xl animate-bounce shadow-[4px_4px_0px_#18181B]">
              🔮
            </div>
            <h3 className="text-xl font-black text-zinc-900">
              Menganalisis Pola Psikografismu...
            </h3>
            <p className="text-xs font-semibold text-zinc-500">
              Mengkalkulasi tingkat ketahanan finansial, coping mechanism, dan arketipe belanjamu.
            </p>
          </div>
        )}

        {/* State D: 9:16 Vertical Persona Trophy (Screenshot / IG Story Ready) */}
        {gameState === 'result' && activeResult && (
          <div className="space-y-4 animate-in zoom-in-95 duration-500">
            {/* The Exportable Persona Card Container */}
            <div
              ref={cardRef}
              className="bg-white border-4 border-zinc-900 rounded-[28px] p-5 shadow-[6px_6px_0px_#18181B] space-y-4 text-zinc-900 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{activeResult.personaAvatarSvg}</span>
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                    {config.brandName} INSIGHT RADAR
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-300 border-2 border-zinc-900 text-[9px] font-black uppercase">
                  Q1/Q2 2025 EDITION
                </span>
              </div>

              {/* Persona Title & Badge */}
              <div className="text-center space-y-1 pt-1">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-3 border-zinc-900 flex items-center justify-center text-4xl shadow-[3px_3px_0px_#18181B] mb-2">
                  {activeResult.personaAvatarSvg}
                </div>
                <h2 className="text-xl font-black text-zinc-900 leading-tight">
                  {activeResult.archetypeName}
                </h2>
                <p className="text-[11px] font-bold text-amber-700 italic">
                  &ldquo;{activeResult.tagline}&rdquo;
                </p>
              </div>

              {/* Traits Breakdown Grid */}
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-zinc-50 border-2 border-zinc-900 rounded-xl p-2.5">
                  <span className="text-[9px] font-black uppercase text-zinc-500 block">
                    Coping Mechanism
                  </span>
                  <p className="text-[11px] font-bold text-zinc-900 mt-0.5 line-clamp-3">
                    {activeResult.stressCopingMechanism}
                  </p>
                </div>
                <div className="bg-zinc-50 border-2 border-zinc-900 rounded-xl p-2.5">
                  <span className="text-[9px] font-black uppercase text-zinc-500 block">
                    Spending Trigger
                  </span>
                  <p className="text-[11px] font-bold text-zinc-900 mt-0.5 line-clamp-3">
                    {activeResult.spendingTrigger}
                  </p>
                </div>
              </div>

              {/* Bestie & Clash Matching Matrix */}
              <div className="bg-amber-50 border-2 border-zinc-900 rounded-2xl p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[10px] text-zinc-600 font-extrabold uppercase">
                    🤝 Soulmate Finansial
                  </span>
                  <span className="text-zinc-900 font-black text-[11px]">
                    {activeResult.bestieArchetype}
                  </span>
                </div>
                <div className="flex items-center justify-between font-bold border-t border-zinc-300 pt-1.5">
                  <span className="text-[10px] text-zinc-600 font-extrabold uppercase">
                    ⚡ Lawan Karakter
                  </span>
                  <span className="text-rose-600 font-black text-[11px]">
                    {activeResult.clashArchetype}
                  </span>
                </div>
              </div>

              {/* Brand Value Insight */}
              <div className="bg-zinc-900 text-white rounded-xl p-3 text-left">
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-amber-300">
                  <span>💡</span> Brand Insight Takeaway
                </div>
                <p className="text-[11px] font-medium text-zinc-300 mt-1 leading-snug">
                  {activeResult.actionGuidance}
                </p>
              </div>

              {/* Watermark Footer */}
              <div className="text-center pt-1 border-t border-zinc-200">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  Official Consumer Insight Card • 100% Anonymous Survey
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleDownloadCard}
                disabled={isExporting}
                className="py-3.5 px-4 rounded-2xl bg-amber-300 hover:bg-amber-400 text-zinc-900 font-black text-xs uppercase border-3 border-zinc-900 shadow-[3px_3px_0px_#18181B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#18181B] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Menyimpan...' : 'Simpan ke Galeri'}
              </button>

              <button
                onClick={handleStart}
                className="py-3.5 px-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 font-black text-xs uppercase border-3 border-zinc-900 shadow-[3px_3px_0px_#18181B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#18181B] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi Kuis
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer Attribution */}
      <footer className="mt-8 text-center">
        <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">
          Engineered for Viral Brand Campaigns • Zero-Party Data Engine
        </p>
      </footer>
    </div>
  );
}
