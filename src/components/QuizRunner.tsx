'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { QuizConfig } from '@/types/quiz';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { RadarChart } from './RadarChart';

interface QuizRunnerProps {
  config: QuizConfig;
}

export function QuizRunner({ config }: QuizRunnerProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [resultTrait, setResultTrait] = useState<string>('M');
  const [isExporting, setIsExporting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const totalQuestions = config.questions.length;
  const currentQ = config.questions[currentQuestionIndex];

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const handleStart = () => {
    // Play BGM on first interaction
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
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
        let topTrait = 'M';
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

  const activeResult = config.results[resultTrait] || config.results['M'];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#272e27] flex flex-col justify-between font-sans">
      {/* Hidden Audio Player for 8-bit BGM */}
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
      />

      {/* Centered Mobile-First Stage with exact OOOPEN Lab canvas */}
      <div
        className="w-full max-w-[540px] mx-auto min-h-screen flex flex-col justify-between relative shadow-sm"
        style={{
          backgroundImage: gameState === 'intro' ? "url('/images/ooopen_bg.jpg')" : "url('/images/q_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        {/* Main Interactive Container */}
        <div className="flex-1 flex flex-col justify-between">
          
          {/* Top Bar with 1:1 Capsule Progress & Sound Toggle */}
          <div className="px-5 pt-6 pb-2 flex items-center justify-between space-x-3">
            <div className="flex-1">
              <div className="h-3 bg-white/80 rounded-full border border-[#272e27]/30 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full bg-[#13ab67] rounded-full transition-all duration-300"
                  style={{ width: `${gameState === 'intro' ? 10 : gameState === 'result' ? 100 : progressPercent}%` }}
                />
              </div>
            </div>
            
            {/* Audio Toggle Button (Cake.me Speaker Icon) */}
            <button
              onClick={toggleSound}
              className="w-7 h-7 bg-white/80 border border-[#272e27]/30 rounded-full flex items-center justify-center text-xs active:scale-95 transition-transform"
              title={isMuted ? "Unmute BGM" : "Mute BGM"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            {gameState === 'playing' && (
              <span className="font-pixel text-[9px] text-[#272e27] bg-white/70 px-2 py-0.5 rounded-full border border-[#272e27]/20">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            )}
          </div>

          {/* STATE 1: INTRO (Pixel Art Hero Showcase) */}
          {gameState === 'intro' && (
            <div className="flex-1 flex flex-col justify-between p-5">
              <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border-2 border-[#272e27]/30 shadow-md bg-transparent mt-2">
                <Image
                  src="/images/pixel/scene_1_burnout.png"
                  alt="2025 Consumer Dilemma"
                  fill
                  className="object-cover rounded-2xl"
                  style={{ imageRendering: 'pixelated' }}
                  priority
                />
              </div>

              <div className="my-auto py-6 text-center px-2 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#272e27]/15 p-4 my-4 shadow-sm">
                <span className="font-pixel text-[8px] bg-[#FFD482] text-[#272e27] px-2.5 py-1 rounded-md border border-[#272e27]/40 uppercase shadow-xs">
                  CONSUMER RADAR 2025
                </span>
                <h1 className="text-xs sm:text-sm font-pixel uppercase text-[#272e27] tracking-tight leading-relaxed mt-4 mb-2">
                  {config.title}
                </h1>
                <p className="text-xs text-[#444] font-medium leading-relaxed max-w-xs mx-auto">
                  {config.subtitle}
                </p>
              </div>

              <div className="pb-4">
                <button
                  onClick={handleStart}
                  className="w-full py-4 bg-[#272e27] hover:bg-black text-white font-pixel text-[11px] rounded-full border-2 border-[#272e27] shadow-[0_4px_0_#111] active:translate-y-1 active:shadow-[0_1px_0_#111] transition-all"
                >
                  MULAI TES SEKARANG!
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: PLAYING (Scene Village + Question + 2 Black Pill Options) */}
          {gameState === 'playing' && currentQ && (
            <div className="flex-1 flex flex-col justify-between p-5">
              {/* Top Pixel Scene Image - Transparent seamless blend */}
              <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border-2 border-[#272e27]/20 shadow-md bg-transparent">
                <Image
                  src={currentQ.imageSrc}
                  alt={currentQ.scenarioTitle}
                  fill
                  className="object-cover"
                  style={{ imageRendering: 'pixelated' }}
                  priority
                />
                <div className="absolute bottom-2 left-2 bg-[#272e27]/90 text-white px-2.5 py-1 rounded text-[7.5px] font-pixel border border-white/20 shadow-sm">
                  {currentQ.scenarioTitle}
                </div>
              </div>

              {/* Seamless Centered Question (No heavy white box blocking the scenery) */}
              <div className="my-3 text-center px-2">
                <div className="inline-block text-[8px] font-pixel text-[#13ab67] bg-white/80 px-2 py-0.5 rounded border border-[#272e27]/15 uppercase tracking-wider mb-2 shadow-xs">
                  {currentQ.categoryBadge}
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#272e27] leading-snug drop-shadow-xs">
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
                      className={`w-full text-left p-3.5 rounded-full border transition-all flex items-center space-x-3 ${
                        isSelected
                          ? 'bg-[#13ab67] border-[#13ab67] text-white scale-[0.98]'
                          : 'bg-[#272e27] hover:bg-black border-[#272e27] text-white shadow-[0_3px_0_#111] active:translate-y-0.5'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 text-white font-pixel text-[9px] flex items-center justify-center shrink-0 border border-white/20">
                        {idx === 0 ? 'A' : 'B'}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold leading-tight">
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
              <h3 className="text-xs sm:text-sm font-pixel text-[#272e27] tracking-wider uppercase mb-2">
                MEMETAKAN PROFIL BELANJAMU...
              </h3>
              <p className="text-[10px] font-pixel text-white/90">
                MENGKALKULASI RADAR 2025
              </p>
            </div>
          )}

          {/* STATE 4: RESULT (High-Density 9:16 Persona Card) */}
          {gameState === 'result' && activeResult && (
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Persona Story Card */}
              <div
                ref={cardRef}
                className="bg-[#FFFDF7] border-4 border-[#272e27] p-4 shadow-[6px_6px_0px_#272e27] mb-4 text-[#272e27] relative"
                style={{
                  backgroundImage: "url('/images/q_bg.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              >
                {/* Header Subtitle */}
                <div className="flex items-center justify-between border-b-2 border-[#272e27]/20 pb-2 mb-3">
                  <span className="text-[8px] font-pixel text-[#13ab67] uppercase">
                    {config.brandName} • 2025 RADAR
                  </span>
                  <span className="text-[7.5px] font-pixel bg-[#272e27] text-white px-2 py-1">
                    BURNOUT: {activeResult.stressCopingIndex}
                  </span>
                </div>

                {/* Character Badge & Title */}
                <div className="text-center my-2">
                  {activeResult.badgeImage ? (
                    <div className="relative w-24 h-24 mx-auto mb-2 overflow-hidden border-4 border-[#272e27] shadow-[3px_3px_0px_#272e27] bg-[#EAEAEA]">
                      <Image
                        src={activeResult.badgeImage}
                        alt={activeResult.name}
                        fill
                        className="object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  ) : (
                    <div className="text-4xl mb-1">{activeResult.badge}</div>
                  )}
                  <h2 className="text-xs sm:text-sm font-pixel uppercase text-[#272e27] tracking-tight mt-2">
                    {activeResult.name}
                  </h2>
                  <p className="text-[14px] text-[#13ab67] mt-1 font-fun font-bold">
                    "{activeResult.tagline}"
                  </p>
                </div>

                {/* Radar Chart 6 Sisi */}
                <div className="my-3 py-1 bg-white/70 border-2 border-[#272e27]">
                  <RadarChart stats={activeResult.dimensions} />
                </div>

                {/* Persona Attributes Breakdown */}
                <div className="space-y-2 text-xs font-fun">
                  <div className="bg-[#FAEDCD] p-2.5 border-2 border-[#272e27]">
                    <span className="font-pixel text-[8px] block text-[#6b4226] uppercase mb-0.5">TRIGGER BELANJA:</span>
                    <span className="text-[14px] leading-tight text-[#272e27]">{activeResult.spendingTrigger}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[#E9F5ED] p-2 border-2 border-[#13ab67]">
                      <div className="text-[7.5px] font-pixel text-[#13ab67] uppercase mb-0.5">CIRCLE COCOK</div>
                      <div className="text-[13px] leading-tight font-bold text-[#155724]">{activeResult.compatiblePartner}</div>
                    </div>
                    <div className="bg-[#FDE8E8] p-2 border-2 border-[#E63946]">
                      <div className="text-[7.5px] font-pixel text-[#E63946] uppercase mb-0.5">POTENSI BENTROK</div>
                      <div className="text-[13px] leading-tight font-bold text-[#721c24]">{activeResult.clashingPartner}</div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 border-2 border-[#272e27] text-[13px] leading-snug text-[#272e27]">
                    <span className="font-pixel text-[8px] text-[#272e27] block mb-0.5">SARAN SURVIVAL:</span>
                    {activeResult.actionAdvice}
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="mt-3 pt-2 border-t-2 border-[#272e27]/20 text-center text-[8px] font-pixel text-[#888]">
                  VERIFIED ZERO-PARTY DATA
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pb-2">
                <button
                  onClick={handleNativeShare}
                  disabled={isExporting}
                  className="w-full py-3.5 px-4 bg-[#FFD482] hover:bg-[#ffc857] text-[#272e27] font-pixel text-[9px] border-4 border-[#272e27] shadow-[4px_4px_0px_#272e27] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#272e27] transition-all flex items-center justify-center space-x-2"
                >
                  <span>{isExporting ? 'MEMPROSES KARTU...' : 'SHARE STORY / SIMPAN KE GALERI'}</span>
                </button>
                <button
                  onClick={handleStart}
                  className="w-full py-2.5 px-4 bg-[#F8F9FA] hover:bg-[#ECEEF0] text-[#272e27] font-pixel text-[8px] border-3 border-[#272e27] shadow-[2px_2px_0px_#272e27] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center"
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
