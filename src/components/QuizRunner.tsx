'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig } from '@/types/quiz';
import { Sparkles, ArrowRight, RotateCcw, Share2, Download, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface QuizRunnerProps {
  config: QuizConfig;
}

export function QuizRunner({ config }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'lead_capture' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('R');
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '' });
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScores({});
    setSelectedOption(null);
  };

  const handleSelectChoice = (targetTrait: string, choiceId: string) => {
    setSelectedOption(choiceId);

    const newScores = {
      ...scores,
      [targetTrait]: (scores[targetTrait] || 0) + 1,
    };
    setScores(newScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
        const highestTrait = sorted.length > 0 ? sorted[0][0] : 'R';
        setResultTrait(highestTrait);

        if (config.brand.leadCaptureEnabled) {
          setGameState('lead_capture');
        } else {
          triggerCalculationScreen(highestTrait);
        }
      }
    }, 260);
  };

  const triggerCalculationScreen = (trait: string) => {
    setGameState('calculating');
    setTimeout(() => {
      setGameState('result');
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#FFFFFF', '#D4AF37', '#8E8579', '#C2B8A3'],
        });
      } catch {}
    }, 850);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCalculationScreen(resultTrait);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#000000',
      });
      const link = document.createElement('a');
      link.download = `${config.results[resultTrait]?.name || 'archetype'}-persona.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['R'];

  return (
    <div className="min-h-screen bg-black text-[#EDEDED] flex flex-col justify-between selection:bg-white/20 selection:text-white">
      {/* Top Floating Glass Pill Header */}
      <header className="sticky top-5 z-40 px-4 flex justify-center">
        <div className="glass-pill rounded-full px-5 py-2.5 flex items-center justify-between gap-6 max-w-md w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#E5E5EA]">
              {config.brand.brandName}
            </span>
          </div>
          {gameState === 'playing' ? (
            <span className="text-[11px] font-mono tracking-tight text-[#8E8E93]">
              {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-medium">
              Holland RIASEC
            </span>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 py-8 max-w-lg mx-auto w-full">
        {/* State 1: Intro Bento */}
        {gameState === 'intro' && (
          <div className="bento-card p-8 md:p-10 w-full space-y-8 animate-in fade-in duration-500">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/[0.06] border border-white/10 text-[11px] font-medium tracking-wide text-[#A1A1A6]">
                <Sparkles className="w-3.5 h-3.5 text-white/80" />
                White-Label Psychometric Architecture
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
                {config.title}
              </h1>
              <p className="text-sm text-[#8E8E93] leading-relaxed pt-1">
                {config.subtitle}
              </p>
            </div>

            {/* Visual Bento Highlight */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#141416] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#8E8E93]">
                <span className="uppercase tracking-wider text-[10px]">Test Matrix</span>
                <span className="font-mono">12 Scenarios · ~90s</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold text-white">6</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase">Archetypes</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold text-white">100%</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase">Private</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold text-white">9:16</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase">Story Card</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full group py-4 px-6 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#E5E5EA] active:scale-[0.98] shadow-lg shadow-white/10"
            >
              <span>Mulai Asesmen</span>
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </div>
            </button>
          </div>
        )}

        {/* State 2: Quiz Playing Questions */}
        {gameState === 'playing' && currentQ && (
          <div className="w-full space-y-6 animate-in fade-in duration-300">
            {/* Progress Bar */}
            <div className="w-full bg-white/[0.08] h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="bento-card p-7 md:p-9 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono tracking-widest text-[#8E8E93] uppercase">
                  {currentQ.scenarioSubtitle || `Scenario #${currentQ.stepNumber}`}
                </span>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-white leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              {/* Binary Choice Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((choice, idx) => {
                  const isChosen = selectedOption === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice.targetTrait, choice.id)}
                      className={`choice-pill w-full text-left p-5 flex items-start gap-4 ${
                        isChosen
                          ? 'border-white bg-white/[0.08] text-white ring-1 ring-white/20'
                          : 'text-[#E5E5EA]'
                      }`}
                    >
                      <span className="text-xs font-mono text-[#8E8E93] pt-0.5 shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* State 3: Lead Capture (Optional Brand Gate) */}
        {gameState === 'lead_capture' && (
          <div className="bento-card p-8 md:p-10 w-full space-y-6 animate-in fade-in duration-400">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#8E8E93]">
                Final Step · Persona Ready
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Analisis Karakter Selesai
              </h2>
              <p className="text-sm text-[#8E8E93] leading-relaxed">
                Tuliskan identitasmu untuk personalisasi kartu persona dan klaim rekomendasi karir.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#A1A1A6]">Nama Lengkap / Panggilan</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Alex"
                  value={leadInfo.name}
                  onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#141416] border border-white/10 text-white placeholder-[#636366] text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#A1A1A6]">Email / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="name@company.com"
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#141416] border border-white/10 text-white placeholder-[#636366] text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-[#E5E5EA] active:scale-[0.98] mt-2 shadow-lg shadow-white/10"
              >
                Buka Hasil Kartu Saya
              </button>
            </form>
          </div>
        )}

        {/* State 4: Calculating Interstitial */}
        {gameState === 'calculating' && (
          <div className="bento-card p-12 w-full text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-white">Menghitung Pola Arketipe...</h3>
              <p className="text-xs text-[#8E8E93]">Sinkronisasi matriks Holland RIASEC & profil kerja</p>
            </div>
          </div>
        )}

        {/* State 5: Result Card Presentation */}
        {gameState === 'result' && activeResult && (
          <div className="w-full space-y-6 py-2 animate-in zoom-in-95 duration-500">
            {/* The 9:16 Persona Bento Card */}
            <div
              ref={cardRef}
              className="bento-card p-8 md:p-10 space-y-7 bg-[#0D0D0E] border-white/10"
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#A1A1A6]">
                    {config.brand.brandName} · CODE #{resultTrait}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-[#8E8E93]">
                  {activeResult.archetype}
                </span>
              </div>

              {/* Persona Title & Badge */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8E8E93]">
                  {activeResult.titleBadge}
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
                  {activeResult.name}
                </h2>
                <p className="text-sm text-[#A1A1A6] leading-relaxed pt-1">
                  {activeResult.tagline}
                </p>
              </div>

              {/* Core Strengths Bento */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E8E93]">
                  Signature Strengths
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeResult.strengths.map((trait) => (
                    <span
                      key={trait}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#EDEDED]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Besties & Career Tip Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-[#141416] border border-white/[0.06] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E8E93]">
                    Work Bestie
                  </div>
                  <div className="text-sm font-medium text-white">
                    {activeResult.besties}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141416] border border-white/[0.06] space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E8E93]">
                    Growth Directive
                  </div>
                  <div className="text-xs text-[#A1A1A6] leading-relaxed">
                    {activeResult.watchout}
                  </div>
                </div>
              </div>

              {/* Watermark / Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#636366]">
                <span>Verified by RIASEC Engine</span>
                <span>{leadInfo.name ? `@${leadInfo.name.toLowerCase().replace(/\s+/g, '')}` : 'Personal Report'}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleDownloadCard}
                  disabled={isExporting}
                  className="py-3.5 px-3 rounded-2xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#E5E5EA] active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Exporting...' : 'Unduh HD'}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="py-3.5 px-3 rounded-2xl bg-[#141416] border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#1C1C1E] active:scale-[0.98]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
                </button>

                <button
                  onClick={handleStart}
                  className="py-3.5 px-3 rounded-2xl bg-[#141416] border border-white/10 text-[#8E8E93] hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#1C1C1E] active:scale-[0.98]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi</span>
                </button>
              </div>

              {config.brand.ctaUrl && (
                <a
                  href={config.brand.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#18181B] border border-white/10 text-[#EDEDED] hover:text-white font-medium text-xs flex items-center justify-between transition-all hover:border-white/20"
                >
                  <span>{config.brand.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="py-6 px-4 text-center">
        <p className="text-[11px] font-mono tracking-wider text-[#636366]">
          {config.brand.brandName.toUpperCase()} · POWERED BY WHITE-LABEL ENGINE
        </p>
      </footer>
    </div>
  );
}
