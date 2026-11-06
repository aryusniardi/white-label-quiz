'use client';

import React, { useState, useRef } from 'react';
import { QuizConfig, ThemeConfig } from '@/types/quiz';
import { Sparkles, ArrowRight, RotateCcw, Share2, Download, Check, Settings2, Sliders, X, Palette, Star, Heart, Zap, Coffee, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface QuizRunnerProps {
  initialConfig: QuizConfig;
}

export function QuizRunner({ initialConfig }: QuizRunnerProps) {
  const [config, setConfig] = useState<QuizConfig>(initialConfig);
  const [theme, setTheme] = useState<ThemeConfig>(initialConfig.theme);
  const [showCmsModal, setShowCmsModal] = useState(false);

  // Quiz Play State
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0 = Intro, 1..12 = Questions, 13 = Result
  const [scores, setScores] = useState<Record<string, number>>({
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  });
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('R');
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalQuestions = config.questions.length;
  const currentQuestion = config.questions[currentStepIndex - 1]; // for steps 1..12

  // Start Quiz
  const handleStart = () => {
    setCurrentStepIndex(1);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setSelectedChoiceId(null);
  };

  // Answer Question
  const handleSelectOption = (trait: string, choiceId: string) => {
    if (selectedChoiceId) return; // prevent multi-tap
    setSelectedChoiceId(choiceId);

    const newScores = {
      ...scores,
      [trait]: (scores[trait] || 0) + 1,
    };
    setScores(newScores);

    // Auto-advance with fun bouncy delay
    setTimeout(() => {
      setSelectedChoiceId(null);
      if (currentStepIndex < totalQuestions) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Calculate result trait (highest score)
        let maxTrait = 'R';
        let maxVal = -1;
        const traits = ['R', 'I', 'A', 'S', 'E', 'C'];
        for (const t of traits) {
          if ((newScores[t] || 0) > maxVal) {
            maxVal = newScores[t] || 0;
            maxTrait = t;
          }
        }
        setResultTrait(maxTrait);
        setCurrentStepIndex(13); // Result step

        // Fire celebratory colorful confetti
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD482', '#FFAAA6', '#BCE3C5', '#FF8B8B', '#F7C8E0'],
        });
      }
    }, 380);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedChoiceId(null);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `kue-kepribadian-${resultTrait}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeResult = config.results[resultTrait] || config.results['R'];

  return (
    <div
      className="min-h-screen pixel-grid-bg text-[#2D2424] flex flex-col items-center justify-between p-4 sm:p-6 transition-colors duration-300"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Playful Floating Top Nav */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between bg-white fun-border fun-shadow rounded-2xl px-4 py-2.5 mb-6 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍰</span>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#2D2424]">
              {config.brandName}
            </h2>
            <p className="text-[10px] font-bold text-[#8C7A7A]">100% Anonim • Tanpa Login</p>
          </div>
        </div>

        {/* CMS Theme Customizer Button */}
        <button
          onClick={() => setShowCmsModal(true)}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-[#FFD482] fun-btn rounded-xl text-[#2D2424]"
          title="Kustomisasi Tema Kuis (CMS)"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Atur Tema</span>
        </button>
      </header>

      {/* Main Game Shell */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        {/* Step 0: Whimsical Intro Scene */}
        {currentStepIndex === 0 && (
          <div
            className="fun-border fun-shadow-lg p-6 sm:p-7 text-center relative overflow-hidden transition-all"
            style={{
              backgroundColor: theme.cardColor,
              borderRadius: theme.borderRadius,
            }}
          >
            {/* Playful Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD482] fun-border-sm text-xs font-black mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Petualangan Mencari Kerja</span>
            </div>

            {/* Illustration Banner */}
            <div className="w-full h-44 rounded-xl fun-border bg-[#FBF0D9] overflow-hidden mb-5 relative flex items-center justify-center">
              <img
                src="https://pub-dcc75da198f94d43b88e1a5c870c44e6.r2.dev/qic7Qt2po6Ws81GOElBBzNWEPhb2/quizzes/1h1mUljU76IXkC5WVCde/cover/static/src?t=1707209893"
                alt="Job Hunting Village Cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback cute illustration if image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[1px]">
                <span className="text-5xl filter drop-shadow animate-bounce">🏰</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2424] leading-tight mb-2">
              {config.title}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#6D5D5D] leading-relaxed mb-6">
              {config.subtitle}
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-[#FFF8E7] p-2 rounded-xl fun-border-sm text-center">
                <span className="block text-base">⏱️</span>
                <span className="text-[10px] font-black">2 Menit</span>
              </div>
              <div className="bg-[#FFF8E7] p-2 rounded-xl fun-border-sm text-center">
                <span className="block text-base">🧁</span>
                <span className="text-[10px] font-black">6 Arketipe</span>
              </div>
              <div className="bg-[#FFF8E7] p-2 rounded-xl fun-border-sm text-center">
                <span className="block text-base">🎁</span>
                <span className="text-[10px] font-black">Kartu Story</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 px-6 text-base font-black text-[#2D2424] fun-btn rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
              style={{ backgroundColor: theme.primaryButtonColor }}
            >
              <span>Mulai Petualangan!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 1 to 12: Situational Questions */}
        {currentStepIndex >= 1 && currentStepIndex <= totalQuestions && currentQuestion && (
          <div
            className="fun-border fun-shadow-lg p-5 sm:p-6 relative transition-all"
            style={{
              backgroundColor: theme.cardColor,
              borderRadius: theme.borderRadius,
            }}
          >
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black tracking-wide uppercase px-2.5 py-1 rounded-lg bg-[#FFD482] fun-border-sm">
                Quest {currentStepIndex} / {totalQuestions}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i + 1 === currentStepIndex
                        ? 'w-6 bg-[#2D2424]'
                        : i + 1 < currentStepIndex
                        ? 'w-2 bg-[#BCE3C5] border border-[#2D2424]'
                        : 'w-2 bg-[#EAD8C0]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Scene Illustration */}
            {currentQuestion.coverImage && (
              <div className="w-full h-40 rounded-xl fun-border bg-[#F5EBEB] overflow-hidden mb-4 relative shadow-inner">
                <img
                  src={currentQuestion.coverImage}
                  alt={`Question ${currentStepIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Question Title */}
            <h2 className="text-base sm:text-lg font-black text-[#2D2424] leading-snug mb-5">
              {currentQuestion.title}
            </h2>

            {/* Choice Buttons (Neo-Brutalist Playful Cards) */}
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, idx) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectOption(choice.targetTrait, choice.id)}
                    className={`w-full p-4 rounded-xl fun-btn text-left flex items-start gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#BCE3C5] scale-[0.98]'
                        : 'bg-[#FFFDF7] hover:bg-[#FFF9EA]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#2D2424] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx === 0 ? 'A' : 'B'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#2D2424] leading-relaxed">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 13: Result Card (Instagram Story 9:16 Ready) */}
        {currentStepIndex > totalQuestions && activeResult && (
          <div className="space-y-4">
            {/* Downloadable / Shareable Card */}
            <div
              ref={cardRef}
              className="fun-border fun-shadow-xl p-5 sm:p-6 text-[#2D2424] relative overflow-hidden"
              style={{
                backgroundColor: activeResult.cakeColor || '#FFFDF7',
                borderRadius: theme.borderRadius,
              }}
            >
              {/* Card Header Stamp */}
              <div className="flex items-center justify-between border-b-2 border-[#2D2424] pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">{activeResult.avatarEmoji}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#685353] block">
                      Hasil Kepribadian Kerja
                    </span>
                    <h3 className="text-xs font-black">{config.brandName}</h3>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-white fun-border-sm text-[10px] font-black">
                  RIASEC: {activeResult.trait}
                </div>
              </div>

              {/* Main Persona Hero */}
              <div className="text-center py-2 mb-4 bg-white/70 rounded-2xl fun-border p-4">
                <span className="text-5xl block mb-2 filter drop-shadow">{activeResult.avatarEmoji}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2D2424] uppercase tracking-tight">
                  {activeResult.cakeName}
                </h2>
                <p className="text-xs font-black text-[#8C4A4A] mt-0.5">
                  {activeResult.indonesianName}
                </p>
                <p className="text-[11px] font-bold text-[#4F3F3F] mt-1.5 italic">
                  &ldquo;{activeResult.tagline}&rdquo;
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {activeResult.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#2D2424] text-white text-[10px] font-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workaholism Index & Lucky Charm */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white p-3 rounded-xl fun-border text-center">
                  <span className="text-[10px] font-bold text-[#6D5D5D] block">Tingkat Workaholic</span>
                  <span className="text-lg font-black text-[#E85B5B]">
                    {activeResult.workaholismIndex}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl fun-border text-center">
                  <span className="text-[10px] font-bold text-[#6D5D5D] block">Benda Keberuntungan</span>
                  <span className="text-xs font-black text-[#2D2424] line-clamp-1 mt-1">
                    {activeResult.luckyCharm}
                  </span>
                </div>
              </div>

              {/* Character Summary Description */}
              <div className="bg-white p-3.5 rounded-xl fun-border mb-4">
                <h4 className="text-[11px] font-black uppercase text-[#2D2424] mb-1">
                  💡 Karakter Kerjamu:
                </h4>
                <p className="text-xs font-bold text-[#4F3F3F] leading-relaxed">
                  {activeResult.description}
                </p>
              </div>

              {/* Mini Radar / Skill Matrix */}
              <div className="bg-white p-3.5 rounded-xl fun-border mb-4">
                <h4 className="text-[11px] font-black uppercase text-[#2D2424] mb-2">
                  📊 Radar Kekuatan:
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-bold">
                  <div className="flex justify-between items-center">
                    <span>Aksi & Gerak</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.actionOriented)}{'☆'.repeat(5 - activeResult.radarScores.actionOriented)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Problem Solving</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.problemSolving)}{'☆'.repeat(5 - activeResult.radarScores.problemSolving)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Inovasi</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.innovation)}{'☆'.repeat(5 - activeResult.radarScores.innovation)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Kerja Tim</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.teamwork)}{'☆'.repeat(5 - activeResult.radarScores.teamwork)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pengaruh</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.influence)}{'☆'.repeat(5 - activeResult.radarScores.influence)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ketelitian</span>
                    <span className="text-[#E85B5B]">{'★'.repeat(activeResult.radarScores.detail)}{'☆'.repeat(5 - activeResult.radarScores.detail)}</span>
                  </div>
                </div>
              </div>

              {/* Besties & Just Coworkers */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="bg-[#E4F1E5] p-3 rounded-xl fun-border">
                  <span className="text-[10px] font-black text-[#26582A] block mb-1">
                    💚 Work Bestie
                  </span>
                  <span className="text-[11px] text-[#2D2424] leading-tight block">
                    {activeResult.workBesties}
                  </span>
                </div>
                <div className="bg-[#FBE5E5] p-3 rounded-xl fun-border">
                  <span className="text-[10px] font-black text-[#7D2929] block mb-1">
                    😐 Teman Kerja Aja
                  </span>
                  <span className="text-[11px] text-[#2D2424] leading-tight block">
                    {activeResult.justCoworkers}
                  </span>
                </div>
              </div>

              {/* Watermark */}
              <div className="mt-4 pt-3 border-t-2 border-[#2D2424] flex items-center justify-between text-[10px] font-black text-[#7D6B6B]">
                <span>white-label-quiz.pages.dev</span>
                <span>#WhatCakeAreYou</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleDownloadCard}
                disabled={isExporting}
                className="py-3 px-3 bg-[#FFD482] fun-btn rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Proses...' : 'Unduh'}</span>
              </button>
              <button
                onClick={handleShare}
                className="py-3 px-3 bg-[#BCE3C5] fun-btn rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Tersalin!' : 'Bagikan'}</span>
              </button>
              <button
                onClick={handleRestart}
                className="py-3 px-3 bg-white fun-btn rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-xs font-bold text-[#8C7A7A]">
        © 2026 {config.brandName} • White-Label Interactive Quiz Engine
      </footer>

      {/* --- SLIDE-OVER CMS THEME CUSTOMIZER MODAL --- */}
      {showCmsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white fun-border fun-shadow-xl rounded-2xl p-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#2D2424] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#2D2424]" />
                <h3 className="text-base font-black text-[#2D2424]">Kustomisasi Desain & Tema (CMS)</h3>
              </div>
              <button
                onClick={() => setShowCmsModal(false)}
                className="p-1 rounded-lg hover:bg-zinc-100 fun-border-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Palette Presets */}
            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-[11px] font-black uppercase text-[#6D5D5D] mb-2">
                  Preset Tema Playful:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      setTheme({
                        ...theme,
                        bgColor: '#FFFDF7',
                        cardColor: '#FFFFFF',
                        primaryButtonColor: '#FFD482',
                        accentColor: '#FFAAA6',
                      })
                    }
                    className="p-2.5 rounded-xl fun-btn bg-[#FFFDF7] text-left"
                  >
                    <span className="block text-xs font-black">Pastel Vanilla</span>
                    <span className="text-[10px] text-zinc-500 font-bold">Default Cake.me</span>
                  </button>
                  <button
                    onClick={() =>
                      setTheme({
                        ...theme,
                        bgColor: '#FDF0F0',
                        cardColor: '#FFFFFF',
                        primaryButtonColor: '#FFAAA6',
                        accentColor: '#FF8B8B',
                      })
                    }
                    className="p-2.5 rounded-xl fun-btn bg-[#FDF0F0] text-left"
                  >
                    <span className="block text-xs font-black">Strawberry Milk</span>
                    <span className="text-[10px] text-zinc-500 font-bold">Pink Whimsical</span>
                  </button>
                  <button
                    onClick={() =>
                      setTheme({
                        ...theme,
                        bgColor: '#F0F9F8',
                        cardColor: '#FFFFFF',
                        primaryButtonColor: '#95D2B3',
                        accentColor: '#55AD9B',
                      })
                    }
                    className="p-2.5 rounded-xl fun-btn bg-[#F0F9F8] text-left"
                  >
                    <span className="block text-xs font-black">Matcha Mint</span>
                    <span className="text-[10px] text-zinc-500 font-bold">Fresh Forest</span>
                  </button>
                </div>
              </div>

              {/* Granular Color Settings */}
              <div className="space-y-3 pt-3 border-t-2 border-[#2D2424]">
                <div>
                  <label className="block text-[11px] font-black mb-1">Background Page Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={theme.bgColor}
                      onChange={(e) => setTheme({ ...theme, bgColor: e.target.value })}
                      className="w-10 h-10 rounded-lg fun-border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={theme.bgColor}
                      onChange={(e) => setTheme({ ...theme, bgColor: e.target.value })}
                      className="flex-1 p-2 rounded-lg fun-border font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black mb-1">Card Container Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={theme.cardColor}
                      onChange={(e) => setTheme({ ...theme, cardColor: e.target.value })}
                      className="w-10 h-10 rounded-lg fun-border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={theme.cardColor}
                      onChange={(e) => setTheme({ ...theme, cardColor: e.target.value })}
                      className="flex-1 p-2 rounded-lg fun-border font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black mb-1">Button Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={theme.primaryButtonColor}
                      onChange={(e) => setTheme({ ...theme, primaryButtonColor: e.target.value })}
                      className="w-10 h-10 rounded-lg fun-border cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={theme.primaryButtonColor}
                      onChange={(e) => setTheme({ ...theme, primaryButtonColor: e.target.value })}
                      className="flex-1 p-2 rounded-lg fun-border font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="block text-[11px] font-black mb-1">
                    Border Radius ({theme.borderRadius})
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    step="2"
                    value={parseInt(theme.borderRadius) || 16}
                    onChange={(e) => setTheme({ ...theme, borderRadius: `${e.target.value}px` })}
                    className="w-full accent-[#2D2424]"
                  />
                </div>

                {/* Brand Name Input */}
                <div>
                  <label className="block text-[11px] font-black mb-1">Nama Brand / White-Label Client</label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
                    className="w-full p-2.5 rounded-lg fun-border font-bold text-xs"
                    placeholder="Contoh: TOKOKUE BRAND"
                  />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowCmsModal(false)}
                className="w-full py-3 bg-[#FFD482] fun-btn rounded-xl font-black text-sm text-[#2D2424] mt-2 cursor-pointer"
              >
                Terapkan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
