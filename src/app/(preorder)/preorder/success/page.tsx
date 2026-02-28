"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ShareSuccessPage() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const data = useMemo(() => {
    const petName = searchParams.get("pet") || "Your dog";
    const ownerName = searchParams.get("owner") || "A pet parent";
    const code = searchParams.get("code") || "MYPR";
    const cohort = searchParams.get("cohort") || "-";
    const position = searchParams.get("position") || "-";
    return { petName, ownerName, code, cohort, position };
  }, [searchParams]);

  const referralUrl = useMemo(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://myperro.in";
    return `${origin}/preorder?ref=${encodeURIComponent(data.code)}`;
  }, [data.code]);

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 sm:py-20 flex items-center justify-center">
      <div className="bg-[#161616] border border-[rgba(255,102,0,0.2)] rounded-2xl p-8 sm:p-12 max-w-[560px] w-full text-center po-modal-in">
        <div className="text-[56px] mb-2">🐾</div>

        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.3)] rounded-full px-4 py-1 text-[11px] font-bold text-[#FF6600] uppercase tracking-[2px]">
            Cohort {data.cohort}
          </div>
          <div className="font-bebas text-[72px] text-[#FF6600] leading-none">
            #{data.position}
          </div>
        </div>

        <h1 className="font-bebas text-[32px] mb-3">WELCOME TO THE PACK</h1>
        <p className="text-[14px] text-white/50 leading-[1.75] max-w-[400px] mx-auto">
          <strong className="text-white">{data.petName}</strong> and{" "}
          <strong className="text-white">{data.ownerName}</strong> are officially
          Founding Pack members.
        </p>

        <div className="mt-7 bg-[rgba(255,102,0,0.07)] border border-[rgba(255,102,0,0.2)] rounded-xl p-5">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#FF6600] mb-2">
            Referral Code
          </p>
          <p className="font-bebas text-[28px] tracking-[4px] text-white mb-3">
            {data.code}
          </p>
          <button
            onClick={copyReferralLink}
            className="bg-[#FF6600] text-[#080808] font-bold text-[11px] uppercase tracking-wide px-4 py-[8px] rounded-lg transition-transform hover:scale-105"
          >
            {copied ? "Copied ✓" : "Copy Referral Link"}
          </button>
        </div>

        <Link
          href={`/preorder?ref=${encodeURIComponent(data.code)}`}
          className="mt-5 inline-flex items-center justify-center bg-[#E8622A] text-white font-semibold text-[13px] tracking-wide px-6 py-[11px] rounded-full transition-opacity hover:opacity-90"
        >
          Reserve Your Spot
        </Link>
      </div>
    </main>
  );
}
