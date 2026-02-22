"use client";
// src/components/Preorder/Sections.tsx

import { useState } from "react";
import { Founder, FAQS, PLEDGE_LINES, TOTAL_SLOTS } from "@/lib/preorderData";

/* ── Savings ──────────────────────────────────────────────── */
export function SavingsSection() {
  const items = [
    { v: "₹5,000",  l: "You Pay (Collar)",       big: false },
    { v: "₹7,000",  l: "Retail Launch Price",     big: false },
    { v: "₹1,500+", l: "Subscription Saved",      big: false },
    { v: "₹3,500+", l: "Total Value Saved",        big: true  },
  ];
  return (
    <section className="bg-[#FF6600] py-20 px-6 text-center">
      <p className="text-[11px] font-bold tracking-[3px] uppercase text-black/50 mb-3">The Numbers</p>
      <h2 className="font-bebas text-[#080808] leading-[0.95]" style={{ fontSize: "clamp(34px,6vw,72px)" }}>WHAT YOU SAVE</h2>
      <div className="flex justify-center flex-wrap mt-12">
        {items.map((s, i) => (
          <div key={s.l} className="flex items-stretch">
            {i > 0 && <div className="w-px bg-black/15 self-stretch my-2" />}
            <div className="text-center px-8">
              <div className="font-bebas text-[#080808] leading-none" style={{ fontSize: s.big ? 64 : 56 }}>{s.v}</div>
              <div className={`text-[11px] uppercase tracking-[2px] text-black/50 mt-1 ${s.big ? "font-black text-[13px]" : "font-bold"}`}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Pet Wall ─────────────────────────────────────────────── */
export function PetWall({ founders }: { founders: Founder[] }) {
  return (
    <section className="bg-[#080808] py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#FF6600] mb-3">The Founding Pack Wall</p>
        <h2 className="font-bebas leading-[0.95] mb-5" style={{ fontSize: "clamp(38px,6vw,72px)" }}>MEET THE PACK SO FAR</h2>
        <p className="text-[15px] text-white/50 leading-[1.8] font-light max-w-[460px] mb-12">
          Every founding member&apos;s dog is featured here permanently. Empty slots are waiting. One of them is yours.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[3px]">
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => {
            const f = founders[i];
            const isYours = i === founders.length;
            return (
              <div key={i} className="aspect-square bg-[#111] border border-white/[0.06] flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-colors hover:border-[rgba(255,102,0,0.4)]">
                {f ? (
                  <>
                    <div className="text-[28px]">{f.emoji}</div>
                    <div className="font-bold text-[11px] text-center px-1">{f.pet}</div>
                    <div className="font-bebas text-[11px] text-[#FF6600] tracking-wide">#{f.rank}</div>
                  </>
                ) : isYours ? (
                  <div className="absolute inset-0 border border-dashed border-[rgba(255,102,0,0.4)] bg-[rgba(255,102,0,0.06)] flex flex-col items-center justify-center gap-1 po-spot-pulse">
                    <span className="text-xl">❓</span>
                    <span className="text-[10px] font-bold text-[#FF6600] uppercase tracking-wide">Your Spot</span>
                  </div>
                ) : (
                  <>
                    <div className="text-[28px] opacity-10 grayscale">🐾</div>
                    <div className="text-[11px] text-white/10 italic">Open</div>
                    <div className="font-bebas text-[11px] text-white/10">#{i + 1}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Live Feed ────────────────────────────────────────────── */
export function FeedSection({ founders, onClaim }: { founders: Founder[]; onClaim: () => void }) {
  return (
    <section className="bg-[#111] py-20 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#FF6600] mb-3">Live Activity</p>
          <h2 className="font-bebas leading-[0.95] mb-5" style={{ fontSize: "clamp(38px,6vw,72px)" }}>WHO JUST JOINED?</h2>
          <p className="text-[15px] text-white/50 leading-[1.8] font-light max-w-[400px]">
            Real-time updates as pet parents secure their founding spots. The pack is filling up fast.
          </p>
          <button onClick={onClaim} className="mt-7 bg-[#FF6600] text-[#080808] font-bold text-[13px] uppercase tracking-wide px-7 py-3 rounded-full transition-transform hover:scale-105">
            Get My Spot →
          </button>
        </div>
        <div className="flex flex-col gap-[2px]">
          {[...founders].reverse().map((f, i) => (
            <div key={i} className="bg-[#161616] px-5 py-4 flex items-center gap-3 transition-colors hover:bg-[#1c1c1c]">
              <span className="w-[7px] h-[7px] bg-[#FF6600] rounded-full shrink-0 po-blink" />
              <div className="text-[13px] leading-[1.5] flex-1 text-white/65">
                {f.emoji} <span className="text-[#FF8533] font-semibold">{f.pet}</span>&apos;s parent{" "}
                <span className="text-white font-semibold">{f.name}</span> from {f.city} secured{" "}
                <strong>Spot #{f.rank}</strong>
              </div>
              <div className="text-[11px] text-white/20 shrink-0">{f.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Steps ────────────────────────────────────────────────── */
export function StepsSection() {
  const steps = [
    { n: "01", ico: "💳", title: "Pay ₹500 Token",        desc: "Secure your spot with a fully refundable token. Credited towards your collar — you pay just ₹4,500 at delivery. No risk, no catch." },
    { n: "02", ico: "🏷️", title: "Get Your Pack Number",   desc: "Your rank is assigned instantly. Your number is yours forever — on the website, in the app, and on your shareable founder badge." },
    { n: "03", ico: "📦", title: "First to Get Everything",desc: "Collar, merch, customisation call — you get it all first. You're not just a customer. You're a co-creator of MyPerro." },
  ];
  return (
    <section className="bg-[#080808] py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#FF6600] mb-3">Process</p>
        <h2 className="font-bebas leading-[0.95] mb-12" style={{ fontSize: "clamp(38px,6vw,72px)" }}>THREE STEPS, THAT&apos;S IT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {steps.map(s => (
            <div key={s.n} className="relative bg-[#161616] p-12 overflow-hidden">
              <div className="font-bebas text-[110px] text-[rgba(255,102,0,0.05)] leading-none absolute top-2 right-3 pointer-events-none select-none">{s.n}</div>
              <div className="text-[32px] mb-5">{s.ico}</div>
              <div className="font-bold text-[17px] mb-3">{s.title}</div>
              <div className="text-[13px] text-white/45 leading-[1.75]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pledge ───────────────────────────────────────────────── */
export function PledgeSection() {
  return (
    <section className="bg-[#080808] py-20 px-6 text-center">
      <div className="max-w-[620px] mx-auto bg-[#161616] border border-[rgba(255,102,0,0.18)] rounded-2xl p-12">
        <div className="text-[46px] mb-4">🐾</div>
        <h2 className="font-bebas text-[38px] mb-4">THE PERRO PLEDGE</h2>
        <p className="text-sm text-white/50 leading-[1.8]">
          We built MyPerro because our own pet got lost once. We know that fear. Here&apos;s what we promise every pet parent, always.
        </p>
        <div className="flex flex-col gap-3 mt-6 text-left">
          {PLEDGE_LINES.map(line => (
            <div key={line} className="flex items-start gap-3 text-[13px] text-white/70">
              <span className="text-[#FF6600] text-[15px] shrink-0 mt-[1px]">✓</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07] py-6 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="font-bold text-[15px] flex justify-between items-start gap-4">
        {q}
        <span className={`po-faq-icon text-[#FF6600] text-[22px] shrink-0 ${open ? "open" : ""}`}>+</span>
      </div>
      {open && <div className="text-[13px] text-white/50 leading-[1.8] mt-3">{a}</div>}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#111] py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-[#FF6600] mb-3">Questions</p>
        <h2 className="font-bebas leading-[0.95] mb-12" style={{ fontSize: "clamp(38px,6vw,72px)" }}>ANYTHING ON YOUR MIND?</h2>
        <div className="max-w-[700px]">
          {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────────────── */
export function FinalCTA({ remaining, onClaim }: { remaining: number; onClaim: () => void }) {
  return (
    <section className="relative text-center py-24 px-6 bg-[#111] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,102,0,0.15), transparent 60%)" }} />
      <div className="relative">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,102,0,0.08)] border border-[rgba(255,102,0,0.22)] rounded-full px-6 py-[10px] text-[13px] font-bold text-[#FF6600] mb-7">
          <span className="w-[7px] h-[7px] bg-[#FF6600] rounded-full po-blink shrink-0" />
          {remaining} spots remaining
        </div>
        <h2 className="font-bebas leading-[0.92]" style={{ fontSize: "clamp(52px,9vw,110px)" }}>
          YOUR PET<br />DESERVES<br />TO BE <span className="text-[#FF6600]">FIRST</span>
        </h2>
        <p className="text-[16px] text-white/50 max-w-[460px] mx-auto mt-5 mb-12 leading-[1.8]">
          Once these spots are gone, every perk on this page disappears with them. The collar will still be great — but it won&apos;t come with all of this.
        </p>
        <button onClick={onClaim} className="bg-[#FF6600] text-[#080808] font-bold text-[17px] uppercase tracking-wide px-[52px] py-5 rounded-full transition-transform hover:scale-105" style={{ boxShadow: "0 0 32px rgba(255,102,0,0.35)" }}>
          Claim My Founding Spot →
        </button>
        <p className="text-xs text-white/25 mt-4">₹500 token · Fully refundable · ₹3,500+ in total value saved</p>
      </div>
    </section>
  );
}
