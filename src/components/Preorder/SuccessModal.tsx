"use client";
// src/components/Preorder/SuccessModal.tsx

import { useState } from "react";

/* ── Confetti ── */
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
      })).map(p => (
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

/* ── Success Modal ── */
interface Props {
  open: boolean;
  onClose: () => void;
  rank: number;
  petName: string;
}

export function SuccessModal({ open, onClose, rank, petName }: Props) {
  const [copied, setCopied] = useState(false);
  const url = "https://myperro.in/preorder";

  if (!open) return null;

  const shareWA = () => window.open(`https://wa.me/?text=${encodeURIComponent(`🐾 ${petName} and I just joined MyPerro's Founding Pack as #${rank}! India's first GPS pet collar. ${url}`)}`, "_blank");
  const shareTW = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${petName} and I are Founding Pack Member #${rank} at @MyPerro 🐾 ${url}`)}`, "_blank");
  const copy    = () => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="fixed inset-0 z-[800] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#161616] border border-[rgba(255,102,0,0.2)] rounded-2xl p-12 max-w-[500px] w-full relative text-center po-modal-in">
        <button onClick={onClose} className="absolute top-4 right-5 bg-transparent border-none text-white/40 text-[22px] hover:text-white transition-colors">✕</button>
        <div className="text-[64px] mb-2">🐾</div>
        <div className="font-bebas text-[96px] text-[#FF6600] leading-none">#{rank}</div>
        <h3 className="font-bebas text-[34px] my-3">WELCOME TO THE PACK</h3>
        <p className="text-sm text-white/50 leading-[1.75] max-w-[340px] mx-auto">
          You and <strong className="text-white">{petName}</strong> are officially Founding Pack Member{" "}
          <strong className="text-white">#{rank}</strong>. Check your email — pack number and next steps are on the way.
        </p>
        <div className="flex gap-3 justify-center mt-7 flex-wrap">
          <button onClick={shareWA} className="flex items-center gap-2 bg-[#25D366] text-black font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform">🟢 WhatsApp</button>
          <button onClick={shareTW} className="flex items-center gap-2 bg-[#1DA1F2] text-white font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform">🐦 Twitter</button>
          <button onClick={copy} className="flex items-center gap-2 bg-[#222] border border-white/10 text-white font-bold text-xs uppercase tracking-wide px-5 py-3 rounded-full hover:scale-105 transition-transform">{copied ? "✅ Copied!" : "🔗 Copy Link"}</button>
        </div>
      </div>
    </div>
  );
}
