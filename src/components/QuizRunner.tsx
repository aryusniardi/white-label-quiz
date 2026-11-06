'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig, ThemeConfig } from '@/types/quiz';
import { Sparkles, ArrowRight, RotateCcw, Share2, Download, Check, Settings2, Sliders, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface QuizRunnerProps {
  initialConfig: QuizConfig;
}

export function QuizRunner({ initialConfig }: QuizRunnerProps) {
  const [config, setConfig] = useState<QuizConfig>(initialConfig);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('R');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = config.theme;
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
        triggerCalculationScreen(highestTrait);
      }
    }, 240);
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
    }, 750);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: theme.backgroundColor,
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

  const updateTheme = (fields: Partial<ThemeConfig>) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...fields,
      },
    }));
  };

  const activeResult = config.results[resultTrait] || config.results['R'];

  return (
    <div
      className="min-h-screen flex flex-col justify-between selection:bg-white/20 selection:text-white transition-colors duration-500 relative"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      {/* Dynamic Background Noise / Vignette */}
      {theme.enableNoiseOverlay && (
        <div
          className="fixed inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Top Floating Glass Pill Header */}
      <header className="sticky top-5 z-40 px-4 flex justify-center">
        <div className="glass-pill rounded-full px-5 py-2.5 flex items-center justify-between gap-6 max-w-md w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#E5E5EA]">
              {config.brand.brandName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {gameState === 'playing' ? (
              <span className="text-[11px] font-mono tracking-tight text-[#8E8E93]">
                {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-medium">
                100% Anonymous
              </span>
            )}

            {/* CMS Theme Customizer Trigger */}
            <button
              onClick={() => setIsCmsOpen(!isCmsOpen)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Kustomisasi Tema & Background (CMS)"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over CMS Customizer Panel */}
      {isCmsOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#111113] border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between text-white animate-in slide-in-from-right duration-300">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold tracking-wide">Brand & Theme CMS</h3>
              </div>
              <button
                onClick={() => setIsCmsOpen(false)}
                className="p-1 rounded-lg text-[#8E8E93] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Background Style Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase text-[#8E8E93]">Background Archetype</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() =>
                    updateTheme({
                      backgroundStyle: 'pure-black',
                      backgroundColor: '#000000',
                      cardBackground: '#111113',
                      cardBorder: 'rgba(255, 255, 255, 0.08)',
                      textColor: '#F5F5F7',
                      subtextColor: '#8E8E93',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme.backgroundStyle === 'pure-black'
                      ? 'border-white bg-white/10 font-medium'
                      : 'border-white/10 bg-black/40 text-[#8E8E93]'
                  }`}
                >
                  Pure Black
                </button>
                <button
                  onClick={() =>
                    updateTheme({
                      backgroundStyle: 'dark-forest',
                      backgroundColor: '#0A1A12',
                      cardBackground: '#0F261B',
                      cardBorder: 'rgba(52, 211, 153, 0.15)',
                      textColor: '#F3F4F6',
                      subtextColor: '#9CA3AF',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme.backgroundStyle === 'dark-forest'
                      ? 'border-emerald-400 bg-emerald-950/40 font-medium text-emerald-200'
                      : 'border-white/10 bg-black/40 text-[#8E8E93]'
                  }`}
                >
                  Dark Forest
                </button>
                <button
                  onClick={() =>
                    updateTheme({
                      backgroundStyle: 'warm-editorial',
                      backgroundColor: '#141210',
                      cardBackground: '#1E1B18',
                      cardBorder: 'rgba(228, 221, 208, 0.12)',
                      textColor: '#E4DDD0',
                      subtextColor: '#A8A196',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme.backgroundStyle === 'warm-editorial'
                      ? 'border-[#E4DDD0] bg-[#2A2622] font-medium text-[#E4DDD0]'
                      : 'border-white/10 bg-black/40 text-[#8E8E93]'
                  }`}
                >
                  Warm Espresso
                </button>
                <button
                  onClick={() =>
                    updateTheme({
                      backgroundStyle: 'custom-gradient',
                      backgroundColor: '#0B0F19',
                      cardBackground: '#111827',
                      cardBorder: 'rgba(99, 102, 241, 0.2)',
                      textColor: '#F9FAFB',
                      subtextColor: '#9CA3AF',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme.backgroundStyle === 'custom-gradient'
                      ? 'border-indigo-400 bg-indigo-950/40 font-medium text-indigo-200'
                      : 'border-white/10 bg-black/40 text-[#8E8E93]'
                  }`}
                >
                  Midnight Blue
                </button>
              </div>
            </div>

            {/* Custom Brand Colors */}
            <div className="space-y-3 pt-2">
              <label className="text-[11px] font-mono uppercase text-[#8E8E93]">Color Controls</label>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#A1A1A6]">Background Color</span>
                  <input
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A1A1A6]">Card Surface</span>
                  <input
                    type="color"
                    value={theme.cardBackground}
                    onChange={(e) => updateTheme({ cardBackground: e.target.value })}
                    className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A1A1A6]">Accent Sheen</span>
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => updateTheme({ accentColor: e.target.value })}
                    className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Card Corner Radius */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[11px] font-mono text-[#8E8E93]">
                <span>Squircle Radius</span>
                <span>{theme.cardRadius}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                value={theme.cardRadius}
                onChange={(e) => updateTheme({ cardRadius: Number(e.target.value) })}
                className="w-full accent-white"
              />
            </div>

            {/* Brand Title Editor */}
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-mono uppercase text-[#8E8E93]">Brand Label</label>
              <input
                type="text"
                value={config.brand.brandName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    brand: { ...config.brand, brandName: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-[#636366] text-center">
            Live Preview • Zero-Reload Sync
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 py-8 max-w-lg mx-auto w-full z-10">
        {/* State 1: Intro Bento */}
        {gameState === 'intro' && (
          <div
            className="bento-card p-8 md:p-10 w-full space-y-8 animate-in fade-in duration-500"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
              borderRadius: `${theme.cardRadius}px`,
            }}
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/[0.06] border border-white/10 text-[11px] font-medium tracking-wide text-[#A1A1A6]">
                <Sparkles className="w-3.5 h-3.5 text-white/80" />
                White-Label Psychometric Architecture
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15]">
                {config.title}
              </h1>
              <p
                className="text-sm leading-relaxed pt-1"
                style={{ color: theme.subtextColor }}
              >
                {config.subtitle}
              </p>
            </div>

            {/* Visual Bento Highlight */}
            <div
              className="p-5 space-y-3"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: `${Math.max(16, theme.cardRadius - 8)}px`,
              }}
            >
              <div className="flex items-center justify-between text-xs" style={{ color: theme.subtextColor }}>
                <span className="uppercase tracking-wider text-[10px]">Test Protocol</span>
                <span className="font-mono">{totalQuestions} Scenarios · ~60s</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold">6</div>
                  <div className="text-[10px]" style={{ color: theme.subtextColor }}>Archetypes</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold">100%</div>
                  <div className="text-[10px]" style={{ color: theme.subtextColor }}>Anonymous</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-base font-semibold">9:16</div>
                  <div className="text-[10px]" style={{ color: theme.subtextColor }}>Story Card</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full group py-4 px-6 rounded-full bg-white text-black font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#E5E5EA] active:scale-[0.98] shadow-lg shadow-white/10"
            >
              <span>Mulai Asesmen (Anonim)</span>
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

            <div
              className="bento-card p-7 md:p-9 space-y-6"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder,
                borderRadius: `${theme.cardRadius}px`,
              }}
            >
              <div className="space-y-2">
                <span
                  className="text-[11px] font-mono tracking-widest uppercase"
                  style={{ color: theme.subtextColor }}
                >
                  {currentQ.scenarioSubtitle || `Scenario #${currentQ.stepNumber}`}
                </span>
                <h2 className="text-xl md:text-2xl font-medium tracking-tight leading-snug">
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
                      className={`choice-pill w-full text-left p-5 flex items-start gap-4 transition-all ${
                        isChosen
                          ? 'border-white bg-white/[0.12] text-white ring-1 ring-white/20'
                          : 'text-[#E5E5EA]'
                      }`}
                      style={{
                        backgroundColor: isChosen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                        borderColor: isChosen ? '#FFFFFF' : theme.cardBorder,
                        borderRadius: `${Math.max(14, theme.cardRadius - 10)}px`,
                      }}
                    >
                      <span
                        className="text-xs font-mono pt-0.5 shrink-0"
                        style={{ color: theme.subtextColor }}
                      >
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

        {/* State 3: Calculating Interstitial */}
        {gameState === 'calculating' && (
          <div
            className="bento-card p-12 w-full text-center space-y-5 animate-in fade-in duration-300"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
              borderRadius: `${theme.cardRadius}px`,
            }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Menghitung Pola Arketipe...</h3>
              <p className="text-xs" style={{ color: theme.subtextColor }}>
                Sinkronisasi matriks Holland RIASEC secara anonim
              </p>
            </div>
          </div>
        )}

        {/* State 4: Direct Result Card Presentation (No Email Required) */}
        {gameState === 'result' && activeResult && (
          <div className="w-full space-y-6 py-2 animate-in zoom-in-95 duration-500">
            {/* The 9:16 Persona Bento Card */}
            <div
              ref={cardRef}
              className="bento-card p-8 md:p-10 space-y-7 transition-all"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder,
                borderRadius: `${theme.cardRadius}px`,
              }}
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: theme.subtextColor }}>
                    {config.brand.brandName} · CODE #{resultTrait}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04]" style={{ color: theme.subtextColor }}>
                  {activeResult.archetype}
                </span>
              </div>

              {/* Persona Title & Badge */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: theme.subtextColor }}>
                  {activeResult.titleBadge}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeResult.avatarIcon || '🍰'}</span>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                    {activeResult.name}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: theme.subtextColor }}>
                  {activeResult.tagline}
                </p>
              </div>

              {/* Core Strengths Bento */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: theme.subtextColor }}>
                  Signature Strengths
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeResult.strengths.map((trait) => (
                    <span
                      key={trait}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Besties & Career Tip Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div
                  className="p-4 space-y-1"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: `${Math.max(14, theme.cardRadius - 10)}px`,
                  }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: theme.subtextColor }}>
                    Work Bestie
                  </div>
                  <div className="text-sm font-medium">
                    {activeResult.besties}
                  </div>
                </div>

                <div
                  className="p-4 space-y-1"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: `${Math.max(14, theme.cardRadius - 10)}px`,
                  }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: theme.subtextColor }}>
                    Growth Directive
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: theme.subtextColor }}>
                    {activeResult.watchout}
                  </div>
                </div>
              </div>

              {/* Watermark / Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono" style={{ color: theme.subtextColor }}>
                <span>Verified by RIASEC Engine</span>
                <span>Anonymous Report</span>
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
                  className="py-3.5 px-3 rounded-2xl border font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorder,
                  }}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
                </button>

                <button
                  onClick={handleStart}
                  className="py-3.5 px-3 rounded-2xl border font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorder,
                    color: theme.subtextColor,
                  }}
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
                  className="w-full py-3.5 px-4 rounded-2xl border text-xs font-medium flex items-center justify-between transition-all"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.cardBorder,
                  }}
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
      <footer className="py-6 px-4 text-center z-10">
        <p className="text-[11px] font-mono tracking-wider" style={{ color: theme.subtextColor }}>
          {config.brand.brandName.toUpperCase()} · POWERED BY WHITE-LABEL ENGINE
        </p>
      </footer>
    </div>
  );
}
