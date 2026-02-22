"use client";
// src/components/Preorder/ActivityBar.tsx

import { Founder } from "@/lib/preorderData";

export default function ActivityBar({ founders }: { founders: Founder[] }) {
  const msgs = [...founders, ...founders];
  return (
    <div className="overflow-hidden bg-[rgba(8,8,8,0.95)] backdrop-blur-xl border-b border-[rgba(255,102,0,0.25)] h-[38px] flex items-center">
      <div className="flex whitespace-nowrap po-act-scroll">
        {msgs.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-white/55 font-semibold px-8 whitespace-nowrap"
          >
            🐾 <span className="text-[#FF8533]">{f.pet}</span>&apos;s parent
            from <span className="text-[#FF8533]">{f.city}</span>&nbsp;claimed{" "}
            <strong className="text-white">Spot #{f.rank}</strong>&nbsp;·{" "}
            {f.time}
            <span className="text-white/10 px-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
