"use client";
// src/app/(preorder)/preorder/page.tsx

import { useState, useEffect, useCallback } from "react";
import {
  fetchActivity,
  fetchCohorts,
  fetchSpotsStatus,
  ActivityEntry,
  CohortsData,
  SpotsStatus,
  timeAgo,
} from "@/lib/api";

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

// Shape of result coming back from PreorderModal after payment
interface PaymentResult {
  petName: string;
  ownerName: string;
  cohortNumber: number;
  cohortPosition: number;
  referralCode: string;
}

const POLL_MS = 30_000; // refresh live data every 30 seconds

export default function PreorderPage() {
  // ── Live data from backend ─────────────────────────────────
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [cohorts, setCohorts] = useState<CohortsData>({
    "cohort 1": [],
    "cohort 2": [],
  });
  const [spots, setSpots] = useState<SpotsStatus>({
    currentCohortNumber: 1,
    claimed: 0,
    total: 20,
    remaining: 20,
    totalPaidOverall: 0,
    lastClaimedAt: "",
  });

  // ── UI state ───────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [succOpen, setSuccOpen] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [teaserPet, setTeaserPet] = useState("");
  const [showNav, setShowNav] = useState(true);

  // ── Fetch all live data ────────────────────────────────────
  const loadAll = useCallback(async () => {
    const [act, coh, sp] = await Promise.all([
      fetchActivity(20),
      fetchCohorts(),
      fetchSpotsStatus(),
    ]);
    setActivity(act);
    setCohorts(coh);
    setSpots(sp);
  }, []);

  // Initial fetch + poll every 30s
  useEffect(() => {
    loadAll();
    const id = setInterval(loadAll, POLL_MS);
    return () => clearInterval(id);
  }, [loadAll]);

  // ── Handle scroll to show/hide navbar ───────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down → hide
        setShowNav(false);
      } else {
        // Scrolling up → show
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── After successful payment ───────────────────────────────
  const handleSuccess = useCallback(
    async (data: PaymentResult) => {
      setResult(data);
      setModalOpen(false);
      setSuccOpen(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5500);

      // Re-fetch immediately so wall + activity update right away
      await loadAll();
    },
    [loadAll],
  );

  // Derive display values from spots
  const lastClaimed = spots.lastClaimedAt
    ? timeAgo(spots.lastClaimedAt)
    : "recently";

  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden pt-[72px]">
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
              {spots.remaining} spots remaining
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#FF6600] text-[#080808] font-bold text-[13px] uppercase tracking-wide px-7 py-3 rounded-full transition hover:scale-105"
            >
              Claim Your Spot
            </button>
          </div>
        </div>
      </div>

      {/* ── Activity bar ─────────────────────────────────── */}
      <ActivityBar activity={activity} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero
        claimed={spots.claimed}
        total={spots.total}
        lastClaimed={lastClaimed}
        teaserPet={teaserPet}
        onTeaserChange={setTeaserPet}
        onClaim={() => setModalOpen(true)}
      />

      <TickerStrip />
      <PerksSection />
      <SavingsSection />

      {/* ── Pet Wall (cohort data from /cohorts) ─────────── */}
      <PetWall cohorts={cohorts} />

      {/* ── Live feed (activity from /activity/live) ──────── */}
      <FeedSection activity={activity} onClaim={() => setModalOpen(true)} />

      <StepsSection />
      <PledgeSection />
      <FaqSection />
      <FinalCTA
        remaining={spots.remaining}
        onClaim={() => setModalOpen(true)}
      />

      {/* ── Modals ───────────────────────────────────────── */}
      <PreorderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        seedPet={teaserPet}
      />

      {result && (
        <SuccessModal
          open={succOpen}
          onClose={() => setSuccOpen(false)}
          petName={result.petName}
          ownerName={result.ownerName}
          cohortNumber={result.cohortNumber}
          cohortPosition={result.cohortPosition}
          referralCode={result.referralCode}
        />
      )}
    </div>
  );
}
