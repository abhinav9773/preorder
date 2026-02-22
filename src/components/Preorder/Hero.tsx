"use client";
// src/components/Preorder/Hero.tsx

import { TOTAL_SLOTS } from "@/lib/preorderData";
import { useCountdown } from "@/lib/useCountdown";
import PawGrid from "./PawGrid";

interface HeroProps {
  claimed: number;
  popIdx: number;
  lastClaimed: string;
  teaserPet: string;
  onTeaserChange: (v: string) => void;
  onClaim: () => void;
}

export default function Hero({ claimed, popIdx, lastClaimed, teaserPet, onTeaserChange, onClaim }: HeroProps) {
  const t = useCountdown();
  const pct = (claimed / TOTAL_SLOTS) * 100;

  const preview = teaserPet.trim().length > 1 ? (
    <span>
      Securing <strong className="text-[#FF8533]">{teaserPet}</strong>&apos;s spot as{" "}
      <strong className="text-[#FF8533]">Founding Pack Member #{claimed + 1}</strong> — saving over{" "}
      <strong className="text-[#FF8533]">₹3,500</strong> in value 🔥
    </span>
  ) : "Enter your dog's name to see their founding number.";

  const cdUnits: Array<[keyof typeof t, string]> = [["d","Days"],["h","Hours"],["m","Mins"],["s","Secs"]];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[130px] pb-20 overflow-hidden bg-[#080808]">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,102,0,0.1), transparent 70%)" }} />
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-25" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")` }} />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-2 bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.4)] rounded-full px-6 py-2 text-[11px] font-bold tracking-[2.5px] uppercase text-[#FF6600] mb-8">
        <span className="w-[7px] h-[7px] bg-[#FF6600] rounded-full po-blink shrink-0" />
        Pre-Order Now Open
      </div>

      {/* H1 */}
      <h1 className="relative font-bebas leading-[0.88] tracking-[1px]" style={{ fontSize: "clamp(72px, 13vw, 160px)" }}>
        <span className="block text-white">THE</span>
        <span className="block text-[#FF6600]">FOUNDING</span>
        <span className="block po-text-stroke">PACK</span>
      </h1>

      <p className="relative text-[17px] text-white/55 max-w-[520px] leading-[1.75] mt-6 font-light">
        India&apos;s first GPS + Geofencing pet collar. We&apos;re giving the first spots to pet parents who believe before launch — with perks that will never come around again.
      </p>

      {/* Slot tracker */}
      <div className="relative w-full max-w-[580px] mt-12">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-[2px] text-white/40">Founding Spots Claimed</span>
          <span className="font-bebas text-xl text-[#FF6600]">{claimed} / {TOTAL_SLOTS}</span>
        </div>
        <PawGrid claimed={claimed} popIdx={popIdx} />
        <div className="h-[5px] rounded-full bg-white/[0.07] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FF6600,#FF8533)", boxShadow: "0 0 16px rgba(255,102,0,0.6)" }} />
        </div>
        <div className="flex items-center justify-between mt-[10px] text-xs text-white/40 italic">
          <span>Last spot claimed <strong className="text-white/65 not-italic">{lastClaimed}</strong></span>
          <span className="flex items-center gap-[5px] text-[#FF3B3B] font-bold not-italic text-[11px] uppercase tracking-wide">
            <span className="w-[6px] h-[6px] bg-[#FF3B3B] rounded-full po-blink-fast" /> LIVE
          </span>
        </div>
      </div>

      {/* Teaser input */}
      <div className="relative w-full max-w-[480px] mt-10">
        <div className="po-teaser flex bg-white/[0.04] border border-white/[0.08] rounded-full overflow-hidden">
          <input
            className="flex-1 bg-transparent text-white text-[15px] px-6 py-4 border-none outline-none placeholder:text-white/30"
            placeholder="Enter your dog's name..."
            value={teaserPet}
            onChange={e => onTeaserChange(e.target.value)}
          />
          <button onClick={onClaim} className="bg-[#FF6600] text-[#080808] font-bold text-[13px] px-6 py-3 rounded-full m-1 shrink-0 uppercase tracking-wide transition-colors hover:bg-[#FF8533]">
            Claim Spot →
          </button>
        </div>
        <div className={`mt-3 text-sm min-h-[22px] leading-[1.55] transition-colors duration-300 ${teaserPet.trim().length > 1 ? "text-white/80" : "text-white/40"}`}>
          {preview}
        </div>
        <p className="text-xs text-white/[0.22] mt-2">₹500 token · Fully refundable · Credited to your collar price</p>
      </div>

      {/* Countdown */}
      <div className="relative flex items-center justify-center gap-2 mt-10">
        {cdUnits.map(([key, label], i) => (
          <div key={key} className="flex items-center gap-2">
            {i > 0 && <span className="font-bebas text-[44px] text-[#FF6600]" style={{ marginTop: "-14px" }}>:</span>}
            <div className="text-center">
              <span className="font-bebas text-[44px] text-white leading-none bg-[#111] border border-white/[0.07] px-4 py-2 rounded-lg min-w-[68px] block">{t[key]}</span>
              <div className="text-[10px] font-semibold text-white/35 uppercase tracking-[2px] mt-1">{label}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="relative text-xs text-white/30 mt-3">Pre-orders close when 20 spots fill OR in 7 days — whichever comes first.</p>
    </section>
  );
}
