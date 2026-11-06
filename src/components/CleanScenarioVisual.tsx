import React from 'react';

export function CleanScenarioVisual({ sceneCode }: { sceneCode: string }) {
  if (sceneCode === 'burnout') {
    return (
      <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
        <div className="flex-1 bg-white p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#E53E3E] tracking-wider mb-1">REKENING ATM</div>
          <div className="text-xl font-black text-[#2D2424] font-mono">Rp 80.000</div>
          <div className="text-[9px] font-bold text-[#A0AEC0] mt-0.5">Sisa Saldo Darurat</div>
        </div>
        <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
        <div className="flex-1 bg-[#FEFCBF] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#B7791F] tracking-wider mb-1">KOPI AREN 25K</div>
          <div className="text-xl font-black text-[#744210] font-mono">WARAS</div>
          <div className="text-[9px] font-bold text-[#B7791F] mt-0.5">Bensin Kewarasan</div>
        </div>
      </div>
    );
  }

  if (sceneCode === 'hangout') {
    return (
      <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
        <div className="flex-1 bg-white p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#805AD5] tracking-wider mb-1">CAFE ESTETIK</div>
          <div className="text-lg font-black text-[#2D2424] font-mono">Rp 150.000+</div>
          <div className="text-[9px] font-bold text-[#A0AEC0] mt-0.5">Aesthetic & Konten</div>
        </div>
        <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
        <div className="flex-1 bg-[#C6F6D5] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#22543D] tracking-wider mb-1">WARMINDO SANTAI</div>
          <div className="text-lg font-black text-[#22543D] font-mono">Rp 20.000</div>
          <div className="text-[9px] font-bold text-[#276749] mt-0.5">Kenyang & Ngobrol</div>
        </div>
      </div>
    );
  }

  if (sceneCode === 'sale') {
    return (
      <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
        <div className="flex-1 bg-[#FED7D7] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#9B2C2C] tracking-wider mb-1">MIDNIGHT SALE</div>
          <div className="text-lg font-black text-[#9B2C2C] font-mono">DISKON 40%</div>
          <div className="text-[9px] font-bold text-[#C53030] mt-0.5">Sisa 1 Jam Kilat</div>
        </div>
        <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
        <div className="flex-1 bg-white p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#4A5568] tracking-wider mb-1">WISHLIST FILTER</div>
          <div className="text-lg font-black text-[#2D2424] font-mono">TIDUR DULU</div>
          <div className="text-[9px] font-bold text-[#718096] mt-0.5">Cek Besok Pagi</div>
        </div>
      </div>
    );
  }

  if (sceneCode === 'thr') {
    return (
      <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
        <div className="flex-1 bg-[#EBF8FF] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#2B6CB0] tracking-wider mb-1">ALOKASI 40%</div>
          <div className="text-lg font-black text-[#2B6CB0] font-mono">REKSA DANA</div>
          <div className="text-[9px] font-bold text-[#3182CE] mt-0.5">Benteng Masa Depan</div>
        </div>
        <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
        <div className="flex-1 bg-[#FEEBC8] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#C05621] tracking-wider mb-1">MEMORI HIDUP</div>
          <div className="text-lg font-black text-[#C05621] font-mono">TIKET KONSER</div>
          <div className="text-[9px] font-bold text-[#DD6B20] mt-0.5">Investasi Bahagia</div>
        </div>
      </div>
    );
  }

  if (sceneCode === 'local') {
    return (
      <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
        <div className="flex-1 bg-white p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#2D3748] tracking-wider mb-1">BRAND LOKAL</div>
          <div className="text-lg font-black text-[#2D2424] font-mono">Rp 350.000</div>
          <div className="text-[9px] font-bold text-[#718096] mt-0.5">Value For Money</div>
        </div>
        <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
        <div className="flex-1 bg-[#EDF2F7] p-3 rounded-lg border border-[#2D2424] text-center">
          <div className="text-[10px] font-black uppercase text-[#2D3748] tracking-wider mb-1">BRAND GLOBAL</div>
          <div className="text-lg font-black text-[#2D2424] font-mono">Rp 2.200.000</div>
          <div className="text-[9px] font-bold text-[#718096] mt-0.5">Prestige & Durability</div>
        </div>
      </div>
    );
  }

  // reward
  return (
    <div className="w-full bg-[#FFFDF7] p-4 rounded-xl border-2 border-[#2D2424] flex items-center justify-between gap-3">
      <div className="flex-1 bg-[#FEFCBF] p-3 rounded-lg border border-[#2D2424] text-center">
        <div className="text-[10px] font-black uppercase text-[#744210] tracking-wider mb-1">OJOL REWARD</div>
        <div className="text-lg font-black text-[#744210] font-mono">COMFORT FOOD</div>
        <div className="text-[9px] font-bold text-[#B7791F] mt-0.5">Rebahan & Nonton</div>
      </div>
      <div className="font-black text-sm text-[#2D2424] px-1 font-mono">VS</div>
      <div className="flex-1 bg-[#C6F6D5] p-3 rounded-lg border border-[#2D2424] text-center">
        <div className="text-[10px] font-black uppercase text-[#22543D] tracking-wider mb-1">ENDORFIN SEHAT</div>
        <div className="text-lg font-black text-[#22543D] font-mono">LARI SORE</div>
        <div className="text-[9px] font-bold text-[#276749] mt-0.5">Gratis & Segar</div>
      </div>
    </div>
  );
}
