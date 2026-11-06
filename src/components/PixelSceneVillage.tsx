import React from 'react';

export function PixelSceneVillage({ step = 0 }: { step: number }) {
  return (
    <div className="relative w-full h-[220px] bg-[#36B898] overflow-hidden rounded-t-2xl border-b-4 border-[#272e27]">
      {/* 8-bit sky and clouds */}
      <div className="absolute top-3 left-4 w-12 h-4 bg-white/70 rounded-full" />
      <div className="absolute top-6 right-8 w-16 h-5 bg-white/60 rounded-full" />

      {/* Retro Pixel Trees Background */}
      <div className="absolute bottom-6 left-2 flex items-end space-x-2 opacity-80">
        <div className="w-8 h-12 bg-[#208468] rounded-t-lg border-2 border-[#165543]" />
        <div className="w-10 h-16 bg-[#259b7b] rounded-t-lg border-2 border-[#165543]" />
      </div>
      <div className="absolute bottom-6 right-3 flex items-end space-x-2 opacity-80">
        <div className="w-9 h-14 bg-[#259b7b] rounded-t-lg border-2 border-[#165543]" />
        <div className="w-7 h-10 bg-[#208468] rounded-t-lg border-2 border-[#165543]" />
      </div>

      {/* Little Pixel flowers on ground */}
      <div className="absolute bottom-4 left-16 w-2 h-2 bg-[#FEE440] rotate-45" />
      <div className="absolute bottom-7 left-28 w-2 h-2 bg-white rotate-45" />
      <div className="absolute bottom-3 right-20 w-2 h-2 bg-[#FEE440] rotate-45" />
      <div className="absolute bottom-6 right-32 w-2 h-2 bg-white rotate-45" />

      {/* Step Specific Pixel Centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center pt-2">
        {step === 0 && (
          /* Wooden Notice Board Intro */
          <div className="relative w-56 bg-[#DEB887] border-4 border-[#272e27] rounded-lg p-3 shadow-[4px_4px_0px_#272e27]">
            {/* Corner bolts */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-[#272e27] rounded-sm" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#272e27] rounded-sm" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#272e27] rounded-sm" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#272e27] rounded-sm" />
            
            {/* Pinned Paper */}
            <div className="bg-white border-2 border-[#272e27] p-2 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E63946] rounded-full border border-black" />
              <div className="text-[10px] font-black text-[#13ab67] uppercase tracking-wider">PULSE RADAR</div>
              <div className="text-xs font-bold text-[#272e27] mt-1 leading-tight">
                2025 SPENDER & SURVIVAL INDEX
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          /* Scene 1: Tanggal Tua (ATM vs Coffee) */
          <div className="flex items-center space-x-6">
            <div className="w-16 h-22 bg-[#2b2d42] border-3 border-[#272e27] rounded-md p-1 flex flex-col items-center shadow-[3px_3px_0px_#272e27]">
              <div className="w-12 h-6 bg-[#d90429] rounded-sm flex items-center justify-center text-[7px] font-mono text-white font-bold">
                80.000
              </div>
              <div className="w-10 h-1 bg-[#8d99ae] my-2" />
              <div className="text-[8px] font-bold text-white">ATM</div>
            </div>
            <div className="text-xl font-black text-[#272e27]">VS</div>
            <div className="w-14 h-20 bg-[#F4A261] border-3 border-[#272e27] rounded-b-xl flex flex-col items-center justify-between p-1.5 shadow-[3px_3px_0px_#272e27] relative">
              <div className="w-2 h-6 bg-[#e76f51] absolute -top-4 rounded-full" />
              <div className="w-full h-3 bg-[#e76f51] rounded-t-sm" />
              <div className="text-[8px] font-black text-white bg-[#272e27] px-1 rounded">25K</div>
            </div>
          </div>
        )}

        {step === 2 && (
          /* Scene 2: Cafe 150k vs Warmindo 20k */
          <div className="flex items-center space-x-6">
            <div className="w-16 h-20 bg-[#ffb703] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-black text-[#272e27]">CAFE</div>
              <div className="text-lg">🥐☕</div>
              <div className="text-[8px] font-bold bg-[#d90429] text-white px-1 rounded">150K</div>
            </div>
            <div className="text-xl font-black text-[#272e27]">VS</div>
            <div className="w-16 h-20 bg-[#2a9d8f] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-black text-white">WARMINDO</div>
              <div className="text-lg">🍜🥤</div>
              <div className="text-[8px] font-bold bg-white text-[#272e27] px-1 rounded">20K</div>
            </div>
          </div>
        )}

        {step === 3 && (
          /* Scene 3: Midnight Flash Sale 00:00 */
          <div className="w-24 h-24 bg-[#1d3557] border-3 border-[#272e27] rounded-xl p-2 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
            <div className="text-[9px] font-mono text-[#e63946] font-bold animate-pulse">00:00 WIB</div>
            <div className="text-2xl">🛒⚡</div>
            <div className="text-[8px] font-black text-white bg-[#e63946] px-1.5 py-0.5 rounded">SALE 40%</div>
          </div>
        )}

        {step === 4 && (
          /* Scene 4: Alokasi THR (Vault vs Festival) */
          <div className="flex items-center space-x-6">
            <div className="w-16 h-20 bg-[#f4a261] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-[#272e27]">VAULT</div>
              <div className="text-2xl">🔒🪙</div>
              <div className="text-[8px] font-black bg-[#272e27] text-white px-1 rounded">INVEST</div>
            </div>
            <div className="text-xl font-black text-[#272e27]">VS</div>
            <div className="w-16 h-20 bg-[#e76f51] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-white">PASS</div>
              <div className="text-2xl">🎟️✨</div>
              <div className="text-[8px] font-black bg-white text-[#272e27] px-1 rounded">TRIP</div>
            </div>
          </div>
        )}

        {step === 5 && (
          /* Scene 5: Local Sneaker vs Prestige Global */
          <div className="flex items-center space-x-6">
            <div className="w-16 h-20 bg-[#52b788] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-white">LOKAL</div>
              <div className="text-2xl">👟</div>
              <div className="text-[8px] font-black bg-[#272e27] text-white px-1 rounded">350K</div>
            </div>
            <div className="text-xl font-black text-[#272e27]">VS</div>
            <div className="w-16 h-20 bg-[#118ab2] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-white">GLOBAL</div>
              <div className="text-2xl">⚡👟</div>
              <div className="text-[8px] font-black bg-[#ffd166] text-[#272e27] px-1 rounded">2.2JT</div>
            </div>
          </div>
        )}

        {step === 6 && (
          /* Scene 6: Friday Comfort Food vs Evening Run */
          <div className="flex items-center space-x-6">
            <div className="w-16 h-20 bg-[#ffb703] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-[#272e27]">OJOL</div>
              <div className="text-2xl">🍔🍟</div>
              <div className="text-[8px] font-black bg-[#e63946] text-white px-1 rounded">95K</div>
            </div>
            <div className="text-xl font-black text-[#272e27]">VS</div>
            <div className="w-16 h-20 bg-[#06d6a0] border-3 border-[#272e27] rounded-lg p-1.5 flex flex-col items-center justify-between shadow-[3px_3px_0px_#272e27]">
              <div className="text-[8px] font-bold text-[#272e27]">GBK</div>
              <div className="text-2xl">🏃‍♂️💨</div>
              <div className="text-[8px] font-black bg-[#272e27] text-white px-1 rounded">GRATIS</div>
            </div>
          </div>
        )}
      </div>

      {/* Ground strip */}
      <div className="absolute bottom-0 inset-x-0 h-4 bg-[#289274] border-t-2 border-[#165543]" />
    </div>
  );
}
