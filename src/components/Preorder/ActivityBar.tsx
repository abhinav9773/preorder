"use client";
// src/components/Preorder/ActivityBar.tsx

import { ActivityEntry, timeAgo } from "@/lib/api";

export default function ActivityBar({
  activity,
}: {
  activity: ActivityEntry[];
}) {
  if (activity.length === 0) return null;

  const msgs = [...activity, ...activity];

  return (
    <div className="overflow-hidden bg-[#0f0f0f] border-b border-white/[0.05] h-[36px] flex items-center">
      <div className="flex whitespace-nowrap po-act-scroll">
        {msgs.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-[11px] text-white/25 font-light px-8 whitespace-nowrap tracking-wide"
          >
            <span className="w-[5px] h-[5px] bg-[#E8622A] rounded-full shrink-0 opacity-60" />
            <span className="text-white/45">{f.dogName}</span>'s parent from{" "}
            <span className="text-white/45">{f.city}</span> just joined · Cohort{" "}
            {f.cohortNumber} · Spot #{f.position} · {timeAgo(f.claimedAt)}
            <span className="text-white/[0.07] px-6">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
