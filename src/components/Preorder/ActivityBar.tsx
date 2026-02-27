"use client";
// src/components/Preorder/ActivityBar.tsx

import { ActivityEntry, timeAgo } from "@/lib/api";

export default function ActivityBar({
  activity,
}: {
  activity: ActivityEntry[];
}) {
  // Need at least something to scroll — fallback to empty state
  if (activity.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const msgs = [...activity, ...activity];

  return (
    <div className="overflow-hidden bg-[rgba(255,102,0,0.07)] border-b border-[rgba(255,102,0,0.18)] h-[38px] flex items-center">
      <div className="flex whitespace-nowrap po-act-scroll">
        {msgs.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-white/55 font-semibold px-8 whitespace-nowrap"
          >
            🐾 <span className="text-[#FF8533]">{f.dogName}</span>&apos;s parent
            from <span className="text-[#FF8533]">{f.city}</span>&nbsp;claimed{" "}
            <strong className="text-white">
              Cohort {f.cohortNumber} · Spot #{f.position}
            </strong>
            &nbsp;· {timeAgo(f.claimedAt)}
            <span className="text-white/10 px-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
