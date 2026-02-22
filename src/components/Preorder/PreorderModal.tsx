"use client";
// src/components/Preorder/PreorderModal.tsx

import { useState, useEffect } from "react";
import { DOG_BREEDS, COLLAR_COLOURS, REFERRAL_SOURCES, PreorderFormData } from "@/lib/preorderData";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: PreorderFormData) => void;
  claimed: number;
  seedPet: string;
}

export default function PreorderModal({ open, onClose, onSuccess, claimed, seedPet }: Props) {
  const blank: PreorderFormData = { owner: "", pet: "", email: "", phone: "", breed: "", city: "", colour: "Midnight Black", source: "Instagram", rank: claimed + 1 };
  const [form, setForm] = useState<PreorderFormData>(blank);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (open) setForm(f => ({ ...f, pet: seedPet || "", rank: claimed + 1 }));
  }, [open, seedPet, claimed]);

  const set = (k: keyof PreorderFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.owner.trim() || !form.pet.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    onSuccess(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[800] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`bg-[#161616] border border-[rgba(255,102,0,0.2)] rounded-2xl p-10 max-w-[520px] w-full relative max-h-[90vh] overflow-y-auto po-modal-in ${shake ? "po-shake" : ""}`}>
        <button onClick={onClose} className="absolute top-4 right-5 bg-transparent border-none text-white/40 text-[22px] hover:text-white transition-colors">✕</button>

        <div className="inline-flex items-center gap-2 bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.35)] text-[#FF6600] text-[11px] font-bold tracking-[2px] uppercase px-4 py-[5px] rounded-full mb-4">
          🐾 Founding Pack
        </div>
        <h3 className="font-bebas text-[44px] leading-none mb-2">LOCK IN YOUR SPOT</h3>
        <p className="text-[13px] text-white/50 leading-[1.65] mb-7">
          Pay ₹500 now — credited towards your collar. Locking in founder price, 6 months free subscription, and every perk. Fully refundable.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Your Name</label>
            <input className="po-input" value={form.owner} onChange={set("owner")} placeholder="e.g. Priya" />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Dog&apos;s Name</label>
            <input className="po-input" value={form.pet} onChange={set("pet")} placeholder="e.g. Bruno" />
          </div>
        </div>

        <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Email</label>
        <input className="po-input" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />

        <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Phone</label>
        <input className="po-input" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />

        <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Dog Breed</label>
        <select className="po-input" value={form.breed} onChange={set("breed")}>
          <option value="">Select breed</option>
          {DOG_BREEDS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">City</label>
            <input className="po-input" value={form.city} onChange={set("city")} placeholder="e.g. Bengaluru" />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">Collar Colour</label>
            <select className="po-input" value={form.colour} onChange={set("colour")}>
              {COLLAR_COLOURS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">How did you hear about us?</label>
        <select className="po-input" value={form.source} onChange={set("source")}>
          {REFERRAL_SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>

        <button onClick={submit} className="w-full bg-[#FF6600] text-[#080808] font-bold text-[15px] uppercase tracking-wide py-4 rounded-full mt-2 transition-transform hover:scale-[1.03]" style={{ boxShadow: "0 0 32px rgba(255,102,0,0.3)" }}>
          PAY ₹500 — SECURE MY FOUNDING SPOT →
        </button>
        <p className="text-[11px] text-white/22 text-center mt-3 leading-[1.6]">
          ₹500 credited to collar price. Remaining ₹4,500 before delivery. 100% refundable before shipping.
        </p>
      </div>
    </div>
  );
}
