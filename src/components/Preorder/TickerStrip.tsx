"use client";
// src/components/Preorder/TickerStrip.tsx

import { TICKER_ITEMS } from "@/lib/preorderData";

export default function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-[#FF6600] py-[13px] border-t-2 border-b-2 border-black/15">
      <div className="flex whitespace-nowrap po-ticker">
        {items.map((item, i) => (
          <span key={i} className="font-bebas text-xl tracking-[2px] text-[#080808] px-7">
            {item}&nbsp;🐾
          </span>
        ))}
      </div>
    </div>
  );
}
