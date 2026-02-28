"use client";
// src/components/Preorder/TickerStrip.tsx

import { TICKER_ITEMS } from "@/lib/preorderData";

export default function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-[#E8622A] py-[10px]">
      <div className="flex whitespace-nowrap po-ticker">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-white/75 px-7"
          >
            {item} ·
          </span>
        ))}
      </div>
    </div>
  );
}
