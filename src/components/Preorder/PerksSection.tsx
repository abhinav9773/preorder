"use client";
// src/components/Preorder/PerksSection.tsx

import { PERKS } from "@/lib/preorderData";

export default function PerksSection() {
  return (
    <section className="py-20 px-6 bg-[#111]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#FF6600] mb-4">What Your ₹500 Unlocks</p>
          <h2 className="font-bebas leading-[0.95] mb-5" style={{ fontSize: "clamp(38px,6vw,72px)" }}>
            THE FOUNDING PACK VAULT
          </h2>
          <p className="text-[15px] text-white/50 leading-[1.8] font-light">
            Founding members don&apos;t just get a collar. They get perks worth over ₹8,500 — some of which can never be bought later, at any price.
          </p>
          <div className="flex items-baseline gap-3 mt-6 justify-center flex-wrap">
            <span className="text-[15px] text-white/25 line-through">₹7,000</span>
            <span className="font-bebas text-[68px] text-[#FF6600] leading-none">₹5,000</span>
            <span className="text-sm text-white/45">+ 6 months free subscription</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {PERKS.map(p => (
            <div key={p.name} className="po-perk-card bg-[#161616] p-8">
              <span className="text-[30px] mb-4 block">{p.ico}</span>
              <div className="font-bold text-[15px] mb-2 leading-[1.3]">{p.name}</div>
              <div className="text-[13px] text-white/45 leading-[1.7]">{p.desc}</div>
              <span className="inline-block mt-3 bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.28)] text-[#FF6600] text-[11px] font-bold tracking-wide px-[10px] py-[3px] rounded-full">
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
