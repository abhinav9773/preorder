"use client";
// src/components/Preorder/SuccessModal.tsx

import { useState } from "react";

export function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  const colors = ["#FF6600", "#FF8533", "#fff", "#FFD700", "#FF6B6B"];
  return (
    <>
      {Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[i % colors.length],
        w: Math.random() * 10 + 5,
        h: Math.random() * 10 + 5,
        delay: Math.random() * 1.4,
        dur: Math.random() * 2 + 2.5,
        round: i % 2 === 0,
      })).map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-[900]"
          style={{
            left: `${p.left}vw`,
            top: -20,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </>
  );
}

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  petName: string;
  ownerName: string;
  cohortNumber: number;
  cohortPosition: number;
  referralCode: string; // their new code to share — from /payment/success
}

export function SuccessModal({
  open,
  onClose,
  petName,
  ownerName,
  cohortNumber,
  cohortPosition,
  referralCode,
}: SuccessModalProps) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const url = "https://myperro.in/preorder";
  const shareMsg = `🐾 ${petName} and I just joined MyPerro's Founding Pack — Cohort ${cohortNumber}, Spot #${cohortPosition}! India's first GPS pet collar. Use my referral code ${referralCode} when you sign up: ${url}`;

  const copyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareWA = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMsg)}`,
      "_blank",
    );

  const shareTW = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${petName} and I are in MyPerro's Founding Pack — Cohort ${cohortNumber}, Spot #${cohortPosition} 🐾 Use my code ${referralCode}: ${url}`,
      )}`,
      "_blank",
    );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[800] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#161616] border border-[rgba(255,102,0,0.2)] rounded-2xl p-12 max-w-[520px] w-full relative text-center po-modal-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 bg-transparent border-none text-white/40 text-[22px] hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="text-[56px] mb-2">🐾</div>

        {/* Cohort + Position badge */}
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.3)] rounded-full px-4 py-1 text-[11px] font-bold text-[#FF6600] uppercase tracking-[2px]">
            Cohort {cohortNumber}
          </div>
          <div className="font-bebas text-[72px] text-[#FF6600] leading-none">
            #{cohortPosition}
          </div>
        </div>

        <h3 className="font-bebas text-[32px] mb-3">WELCOME TO THE PACK</h3>
        <p className="text-[14px] text-white/50 leading-[1.75] max-w-[360px] mx-auto">
          <strong className="text-white">{petName}</strong> and{" "}
          <strong className="text-white">{ownerName}</strong> are officially
          Founding Pack Member{" "}
          <strong className="text-white">
            Cohort {cohortNumber} · #{cohortPosition}
          </strong>
          . Check your email — confirmation and next steps are on the way.
        </p>

        {/* Referral code block */}
        <div className="mt-7 bg-[rgba(255,102,0,0.07)] border border-[rgba(255,102,0,0.2)] rounded-xl p-5">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#FF6600] mb-2">
            Your Referral Code
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-bebas text-[28px] tracking-[4px] text-white">
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="bg-[#FF6600] text-[#080808] font-bold text-[11px] uppercase tracking-wide px-3 py-[6px] rounded-lg transition-transform hover:scale-105"
            >
              {codeCopied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="text-[11px] text-white/35 mt-2">
            Share this — you get credit every time someone uses it 🎁
          </p>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 justify-center mt-5 flex-wrap">
          <button
            onClick={shareWA}
            className="flex items-center gap-2 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform"
          >
            🟢 WhatsApp
          </button>
          <button
            onClick={shareTW}
            className="flex items-center gap-2 bg-[#1DA1F2] text-white font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform"
          >
            𝕏 Twitter
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-[#222] border border-white/10 text-white font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform"
          >
            {linkCopied ? "✅ Copied!" : "🔗 Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
