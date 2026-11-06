'use client';

import React, { useState } from 'react';
import { QuizConfig } from '@/types/quiz';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Share2, Download, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizRunnerProps {
  config: QuizConfig;
}

export function QuizRunner({ config }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'lead_capture' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('R');
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '' });

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleStart = () => {
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setGameState('playing');
  };

  const handleSelectOption = (choiceId: string, trait: string) => {
    setSelectedOption(choiceId);
    
    // Accumulate score
    const updatedScores = {
      ...scores,
      [trait]: (scores[trait] || 0) + 1
    };
    setScores(updatedScores);

    // Auto-advance with smooth slight delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // Quiz completed
        calculateFinalResult(updatedScores);
      }
    }, 380);
  };

  const calculateFinalResult = (finalScores: Record<string, number>) => {
    // Find trait with max score (argmax with tie-breaker order)
    let bestTrait = 'R';
    let maxScore = -1;
    const traits = ['R', 'I', 'A', 'S', 'E', 'C'];
    
    for (const t of traits) {
      const score = finalScores[t] || 0;
      if (score > maxScore) {
        maxScore = score;
        bestTrait = t;
      }
    }

    setResultTrait(bestTrait);

    if (config.brand.leadCaptureEnabled) {
      setGameState('lead_capture');
    } else {
      triggerCalculationScreen(bestTrait);
    }
  };

  const triggerCalculationScreen = (traitToSet?: string) => {
    setGameState('calculating');
    setTimeout(() => {
      setGameState('result');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCalculationScreen(resultTrait);
  };

  const activeResult = config.results[resultTrait] || config.results['R'];

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      {/* Top Brand Nav Header */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
              {config.brand.brandName}
            </div>
            <div className="text-[10px] text-zinc-500 hidden sm:block">
              {config.brand.brandTagline}
            </div>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono text-zinc-400">
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Experience Body */}
      <main className="flex-1 max-w-xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {/* State 1: Intro */}
        {gameState === 'intro' && (
          <div className="text-center space-y-6 py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              White-Label Interactive Career Quiz
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {config.title}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                {config.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-left space-y-2 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Format Pengalaman:
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-zinc-400">
                <li>12 pertanyaan situasi praktis (hanya 2 pilihan per slide)</li>
                <li>Menghasilkan Holland RIASEC Workplace Persona</li>
                <li>Unduh kartu hasil format Instagram Story 9:16</li>
              </ul>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-base bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              Mulai Tes Sekarang
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* State 2: Question Active */}
        {gameState === 'playing' && currentQ && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                {currentQ.scenarioSubtitle || `Pertanyaan #${currentQ.stepNumber}`}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.targetTrait)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/10'
                        : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-600 text-zinc-200 hover:bg-zinc-800/80 active:scale-[0.99]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm sm:text-base font-medium leading-relaxed">
                        {opt.text}
                      </span>
                      <div className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-400 bg-emerald-500' : 'border-zinc-700'
                      }`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-zinc-950" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* State 3: Lead Capture (B2B Brand Value Add) */}
        {gameState === 'lead_capture' && (
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-5 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="h-10 w-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Jawabanmu Sedang Dihitung!</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Masukkan identitas singkatmu untuk membuka kartu hasil lengkap dan rekomendasi eksklusif.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-zinc-300">Nama Panggilan</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Alex"
                  value={leadInfo.name}
                  onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white text-sm outline-none transition"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-zinc-300">Email / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="alex@domain.com atau 0812..."
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white text-sm outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition cursor-pointer"
              >
                Buka Kartu Karakter Saya →
              </button>
            </form>
          </div>
        )}

        {/* State 4: Calculating Interstitial */}
        {gameState === 'calculating' && (
          <div className="text-center py-16 space-y-4 animate-in fade-in duration-300">
            <div className="inline-block animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
            <div className="text-lg font-bold text-white">Menganalisis Karakter Kerjamu...</div>
            <p className="text-xs text-zinc-500 font-mono">Applying RIASEC Holland Metric Engine</p>
          </div>
        )}

        {/* State 5: Result Card Presentation */}
        {gameState === 'result' && activeResult && (
          <div className="space-y-6 py-4 animate-in zoom-in-95 duration-500">
            {/* Downloadable / Shareable Bento Card Preview */}
            <div className="relative rounded-3xl p-6 sm:p-7 border border-zinc-800 bg-[#121316] shadow-2xl overflow-hidden space-y-5">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${activeResult.colorTheme.bgBadge}`}>
                  {activeResult.titleBadge}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {config.brand.brandName}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeResult.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 italic">
                  "{activeResult.tagline}"
                </p>
              </div>

              {/* Main Persona Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/60">
                {activeResult.description}
              </p>

              {/* Key Traits & Strengths */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Kekuatan Utama (Superpowers)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeResult.strengths.map((str, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 font-medium">
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid 2-Kolom: Work Besties & Ideal Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <span className="text-zinc-500 block mb-0.5">Rekan Kerja Paling Cocok:</span>
                  <span className="font-semibold text-emerald-400">{activeResult.besties}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                  <span className="text-zinc-500 block mb-0.5">Peran Karir Ideal:</span>
                  <span className="font-semibold text-zinc-200">{activeResult.idealRole}</span>
                </div>
              </div>

              {/* Watchout Note */}
              <div className="text-[11px] text-zinc-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
                <span className="font-semibold text-amber-400">Tips Karir:</span> {activeResult.watchout}
              </div>
            </div>

            {/* Action Bar (Share, Download, Retake, Brand CTA) */}
            <div className="space-y-3">
              <a
                href={config.brand.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {config.brand.ctaText}
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Link kuis berhasil disalin!');
                  }}
                  className="py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  Bagikan Link
                </button>

                <button
                  onClick={handleStart}
                  className="py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Ulangi Tes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-zinc-900 text-[11px] text-zinc-600">
        Powered by White-Label Interactive Quiz Engine • {config.brand.brandName}
      </footer>
    </div>
  );
}
