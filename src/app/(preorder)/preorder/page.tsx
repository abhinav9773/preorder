"use client";

import { useState, useCallback, useEffect } from "react";

import {
  SEED_FOUNDERS,
  PET_EMOJIS,
  TOTAL_SLOTS,
  Founder,
  PreorderFormData,
} from "@/lib/preorderData";

import ActivityBar from "@/components/Preorder/ActivityBar";
import Hero from "@/components/Preorder/Hero";
import TickerStrip from "@/components/Preorder/TickerStrip";
import PerksSection from "@/components/Preorder/PerksSection";
import PreorderModal from "@/components/Preorder/PreorderModal";
import { SuccessModal, Confetti } from "@/components/Preorder/SuccessModal";

import {
  SavingsSection,
  PetWall,
  FeedSection,
  StepsSection,
  PledgeSection,
  FaqSection,
  FinalCTA,
} from "@/components/Preorder/Sections";

export default function PreorderPage() {
  /* ───────────────────────── STATE ───────────────────────── */

  const [mounted, setMounted] = useState(false);

  const [founders, setFounders] = useState<Founder[]>(SEED_FOUNDERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [succOpen, setSuccOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<Founder | null>(null);
  const [popIdx, setPopIdx] = useState(-1);
  const [confetti, setConfetti] = useState(false);
  const [teaserPet, setTeaserPet] = useState("");
  const [lastClaimed, setLastClaimed] = useState("47 mins ago");

  /* Scroll behaviour */
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const claimed = founders.length;
  const remaining = TOTAL_SLOTS - claimed;

  /* ───────────────────────── EFFECTS ───────────────────────── */

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 100) {
        // Scrolling DOWN → hide navbar
        setShowNav(false);
      } else {
        // Scrolling UP → show navbar
        setShowNav(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  /* ───────────────────────── HANDLERS ───────────────────────── */

  const handleSuccess = useCallback((data: PreorderFormData) => {
    const emoji = PET_EMOJIS[Math.floor(Math.random() * PET_EMOJIS.length)];

    const entry: Founder = {
      name: data.owner,
      pet: data.pet,
      breed: data.breed,
      city: data.city || "India",
      emoji,
      rank: data.rank,
      time: "just now",
    };

    setFounders((prev) => [...prev, entry]);
    setNewEntry(entry);
    setPopIdx(data.rank - 1);
    setLastClaimed("just now");

    setModalOpen(false);
    setSuccOpen(true);
    setConfetti(true);

    setTimeout(() => setPopIdx(-1), 700);
    setTimeout(() => setConfetti(false), 5500);
  }, []);

  const openModal = () => setModalOpen(true);

  if (!mounted) return null;

  /* ───────────────────────── RENDER ───────────────────────── */

  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden pt-[50px]">
      {/* CONFETTI */}
      <Confetti show={confetti} />

      {/* NAVBAR */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-full"}
          bg-[rgba(8,8,8,0.95)] backdrop-blur-xl
          border-b border-[rgba(255,102,0,0.18)]
        `}
      >
        <div className="flex items-center justify-between px-10 py-4">
          {/* LOGO */}
          <img src="/myperro-logo.png" alt="MyPerro" className="h-7" />

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#FF6600] uppercase tracking-wide">
              <span className="w-[7px] h-[7px] bg-[#FF6600] rounded-full animate-pulse" />
              {remaining} spots remaining
            </div>

            <button
              onClick={openModal}
              className="bg-[#FF6600] text-[#080808] font-bold text-[13px] uppercase tracking-wide px-7 py-3 rounded-full transition hover:scale-105"
            >
              Claim Your Spot
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVITY BAR */}
      <div
        className={`
          fixed left-0 right-0 z-40
          transition-all duration-300
          ${showNav ? "top-[72px]" : "top-0"}
        `}
      >
        <ActivityBar founders={founders} />
      </div>

      {/* HERO */}
      <Hero
        claimed={claimed}
        popIdx={popIdx}
        lastClaimed={lastClaimed}
        teaserPet={teaserPet}
        onTeaserChange={setTeaserPet}
        onClaim={openModal}
      />

      {/* SECTIONS */}
      <TickerStrip />
      <PerksSection />
      <SavingsSection />
      <PetWall founders={founders} />
      <FeedSection founders={founders} onClaim={openModal} />
      <StepsSection />
      <PledgeSection />
      <FaqSection />
      <FinalCTA remaining={remaining} onClaim={openModal} />

      {/* MODALS */}
      <PreorderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        claimed={claimed}
        seedPet={teaserPet}
      />

      <SuccessModal
        open={succOpen}
        onClose={() => setSuccOpen(false)}
        rank={newEntry?.rank ?? 1}
        petName={newEntry?.pet ?? ""}
      />
    </div>
  );
}
