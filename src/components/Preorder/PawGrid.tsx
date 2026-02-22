"use client";
// src/components/Preorder/PawGrid.tsx

import { TOTAL_SLOTS } from "@/lib/preorderData";

export default function PawGrid({ claimed, popIdx }: { claimed: number; popIdx: number }) {
  return (
    <div className="flex gap-[6px] justify-center flex-wrap mb-3">
      {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
        <span
          key={i}
          className={["paw-slot", i < claimed ? "active" : "", i === popIdx ? "pop" : ""].filter(Boolean).join(" ")}
        >
          🐾
        </span>
      ))}
    </div>
  );
}
