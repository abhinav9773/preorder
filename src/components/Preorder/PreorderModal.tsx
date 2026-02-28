"use client";
// src/components/Preorder/PreorderModal.tsx

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import {
  DOG_BREEDS,
  COLLAR_COLOURS,
  REFERRAL_SOURCES,
} from "@/lib/preorderData";
import {
  submitOrder,
  confirmPayment,
  validateReferralCode,
} from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (result: {
    petName: string;
    ownerName: string;
    cohortNumber: number;
    cohortPosition: number;
    referralCode: string;
  }) => void;
  seedPet: string;
}

type PayState = "idle" | "submitting" | "paying" | "verifying" | "error";

export default function PreorderModal({
  open,
  onClose,
  onSuccess,
  seedPet,
}: Props) {
  // Form state — field names match what /submit expects
  const [name, setName] = useState("");
  const [dogsname, setDogsname] = useState("");
  const [mail, setMail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [colour, setColour] = useState("Midnight Black");
  const [source, setSource] = useState("Instagram");
  const [dogPhoto, setDogPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [hasReferral, setHasReferral] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [refStatus, setRefStatus] = useState<"idle" | "checking" | "ok" | "err">("idle");
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  const [payState, setPayState] = useState<PayState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const referralCheckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestReferralCodeRef = useRef("");

  // Sync seed pet name when modal opens
  useEffect(() => {
    if (open) setDogsname(seedPet || "");
  }, [open, seedPet]);

  // Full reset when modal closes
  useEffect(() => {
    if (!open) {
      setName("");
      setDogsname("");
      setMail("");
      setPhoneno("");
      setAddress("");
      setCity("");
      setColour("Midnight Black");
      setSource("Instagram");
      setDogPhoto(null);
      setPhotoPreview("");
      setHasReferral(false);
      setRefCode("");
      setRefStatus("idle");
      setPayState("idle");
      setErrorMsg("");
      if (referralCheckTimeoutRef.current) {
        clearTimeout(referralCheckTimeoutRef.current);
        referralCheckTimeoutRef.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (referralCheckTimeoutRef.current) {
        clearTimeout(referralCheckTimeoutRef.current);
      }
    };
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Photo must be under 5MB.");
      return;
    }
    setDogPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const handleRefCode = (val: string) => {
    const normalized = val.toUpperCase();
    const trimmed = normalized.trim();
    setRefCode(normalized);
    latestReferralCodeRef.current = trimmed;

    if (referralCheckTimeoutRef.current) {
      clearTimeout(referralCheckTimeoutRef.current);
      referralCheckTimeoutRef.current = null;
    }

    if (!trimmed) {
      setRefStatus("idle");
      return;
    }
    if (trimmed.length < 6) {
      setRefStatus("idle");
      return;
    }

    setRefStatus("checking");
    referralCheckTimeoutRef.current = setTimeout(async () => {
      try {
        const validation = await validateReferralCode(trimmed);
        if (latestReferralCodeRef.current !== trimmed) return;
        setRefStatus(validation.valid ? "ok" : "err");
      } catch {
        if (latestReferralCodeRef.current !== trimmed) return;
        setRefStatus("err");
      }
    }, 350);
  };

  // ── Main payment flow ────────────────────────────────────────
  const submit = async () => {
    // Validate required fields (matching /submit required fields)
    if (
      !name.trim() ||
      !dogsname.trim() ||
      !mail.trim() ||
      !phoneno.trim() ||
      !address.trim() ||
      !city.trim()
    ) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!dogPhoto) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      setErrorMsg("Please upload a photo of your dog 🐾");
      return;
    }

    if (hasReferral && refCode.trim()) {
      if (refStatus === "checking") {
        setErrorMsg("Checking referral code. Please wait.");
        return;
      }
      if (refStatus !== "ok") {
        setErrorMsg("Please enter a valid referral code or uncheck referral.");
        return;
      }
    }

    setPayState("submitting");
    setErrorMsg("");

    try {
      // ── STEP 1: POST /submit ─────────────────────────────
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phoneno", phoneno.trim());
      formData.append("address", address.trim());
      formData.append("city", city.trim());
      formData.append("mail", mail.trim());
      formData.append("dogsname", dogsname.trim());
      formData.append("dogphoto", dogPhoto);
      if (hasReferral && refStatus === "ok" && refCode.trim()) {
        formData.append("referralCode", refCode.trim().toUpperCase());
      }

      const submitRes: any = await submitOrder(formData);
      const submissionId = submitRes?.data?.data_id;
      if (!submissionId) {
        throw new Error("Submission ID missing from /submit response.");
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay key is missing in frontend env.");
      }

      setPayState("paying");

      // ── STEP 3: Open Razorpay checkout ────────────────────
      await new Promise<void>((resolve, reject) => {
        if (!isRazorpayReady || !(window as any).Razorpay) {
          reject(new Error("Payment gateway is still loading. Please try again."));
          return;
        }

        const rzp = new (window as any).Razorpay({
          key: razorpayKey,
          amount: 100,
          currency: "INR",

          name: "MyPerro",
          description: "Founding Pack — ₹500 token",

          prefill: {
            name,
            email: mail,
            contact: phoneno,
          },

          theme: { color: "#FF6600" },

          modal: {
            confirm_close: true,
            ondismiss: () => reject(new Error("cancelled")),
          },

          handler: async (response: any) => {
            try {
              setPayState("verifying");

              if (!response?.razorpay_payment_id) {
                throw new Error("Missing payment id from Razorpay.");
              }

              const data = await confirmPayment({
                submissionId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              });

              if (!data?.data) {
                throw new Error("Invalid payment success response from backend.");
              }

              onSuccess({
                petName: dogsname,
                ownerName: name,
                cohortNumber: data.data.cohortNumber,
                cohortPosition: data.data.cohortPosition,
                referralCode: data.data.referralCode,
              });

              resolve();
            } catch (error: any) {
              reject(
                new Error(
                  error?.message || "Payment succeeded, but confirmation failed.",
                ),
              );
            }
          },
        });

        rzp.open();
      });
    } catch (err: any) {
      if (err.message === "cancelled") {
        // User closed Razorpay popup — just go back to form, don't show error
        setPayState("idle");
      } else {
        setPayState("error");
        setErrorMsg(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  if (!open) return null;

  const isLoading = ["submitting", "paying", "verifying"].includes(payState);

  const btnLabel =
    payState === "submitting"
      ? "Saving your details..."
      : payState === "paying"
        ? "Complete payment in popup →"
        : payState === "verifying"
          ? "Confirming payment..."
          : "PAY ₹500 — SECURE MY FOUNDING SPOT →";

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-white/38 mb-[7px]">
      {children}
    </label>
  );

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setIsRazorpayReady(true)}
        onError={() => setIsRazorpayReady(false)}
      />

      <div
        className="fixed inset-0 z-[800] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
        onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
      >
        <div
          className={`bg-[#161616] border border-[rgba(255,102,0,0.2)] rounded-2xl p-10 max-w-[540px] w-full relative max-h-[90vh] overflow-y-auto po-modal-in ${shake ? "po-shake" : ""}`}
        >
          <button
            onClick={() => !isLoading && onClose()}
            disabled={isLoading}
            className="absolute top-4 right-5 bg-transparent border-none text-white/40 text-[22px] hover:text-white transition-colors disabled:opacity-30"
          >
            ✕
          </button>

          {/* Header */}
          <div className="inline-flex items-center gap-2 bg-[rgba(255,102,0,0.1)] border border-[rgba(255,102,0,0.35)] text-[#FF6600] text-[11px] font-bold tracking-[2px] uppercase px-4 py-[5px] rounded-full mb-4">
            🐾 Founding Pack
          </div>
          <h3 className="font-bebas text-[44px] leading-none mb-2">
            LOCK IN YOUR SPOT
          </h3>
          <p className="text-[13px] text-white/50 leading-[1.65] mb-7">
            Pay ₹500 now — credited towards your collar. Locking in founder
            price, 6 months free subscription, and every perk. Fully refundable.
          </p>

          {/* Your Name + Dog's Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Your Name *</Label>
              <input
                className="po-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>Dog&apos;s Name *</Label>
              <input
                className="po-input"
                value={dogsname}
                onChange={(e) => setDogsname(e.target.value)}
                placeholder="e.g. Bruno"
                disabled={isLoading}
              />
            </div>
          </div>

          <Label>Email *</Label>
          <input
            className="po-input"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="you@email.com"
            disabled={isLoading}
          />

          <Label>Phone *</Label>
          <input
            className="po-input"
            type="tel"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            placeholder="+91 98765 43210"
            disabled={isLoading}
          />

          <Label>Address *</Label>
          <input
            className="po-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 12B, MG Road"
            disabled={isLoading}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>City *</Label>
              <input
                className="po-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>Collar Colour</Label>
              <select
                className="po-input"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                disabled={isLoading}
              >
                {COLLAR_COLOURS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <Label>How did you hear about us?</Label>
          <select
            className="po-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            disabled={isLoading}
          >
            {REFERRAL_SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* ── Dog photo upload ───────────────────────────── */}
          <Label>Dog&apos;s Photo * (JPG / PNG / WEBP · Max 5MB)</Label>
          <div
            onClick={() => !isLoading && fileRef.current?.click()}
            className={`mb-4 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
              dogPhoto
                ? "border-[#FF6600] bg-[rgba(255,102,0,0.06)]"
                : "border-white/15 bg-white/[0.02] hover:border-white/30"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhoto}
              disabled={isLoading}
            />
            {photoPreview ? (
              <div className="flex items-center gap-4 p-4">
                <img
                  src={photoPreview}
                  alt="Dog preview"
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">
                    {dogPhoto?.name}
                  </p>
                  <p className="text-[11px] text-white/40 mt-1">
                    {((dogPhoto?.size ?? 0) / 1024).toFixed(0)} KB · Click to
                    change
                  </p>
                </div>
                <span className="text-[#FF6600] text-xl shrink-0">✓</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <span className="text-[32px]">📸</span>
                <p className="text-[13px] text-white/50">
                  Click to upload your dog&apos;s photo
                </p>
                <p className="text-[11px] text-white/25">
                  This appears on the Founding Pack Wall
                </p>
              </div>
            )}
          </div>

          {/* ── Referral code ──────────────────────────────── */}
          <div className="mb-4">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div
                onClick={() => {
                  if (isLoading) return;
                  setHasReferral((v) => !v);
                  setRefCode("");
                  setRefStatus("idle");
                  latestReferralCodeRef.current = "";
                  if (referralCheckTimeoutRef.current) {
                    clearTimeout(referralCheckTimeoutRef.current);
                    referralCheckTimeoutRef.current = null;
                  }
                }}
                className={`w-5 h-5 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all ${
                  hasReferral
                    ? "bg-[#FF6600] border-[#FF6600]"
                    : "bg-transparent border-white/25 group-hover:border-white/50"
                }`}
              >
                {hasReferral && (
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path
                      d="M1 4L4 7L10 1"
                      stroke="#080808"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors select-none">
                I have a referral code
              </span>
            </label>

            {hasReferral && (
              <div className="mt-3">
                <Label>Referral Code</Label>
                <div className="relative">
                  <input
                    className="po-input !mb-0 pr-10 uppercase tracking-[2px]"
                    style={{
                      borderColor:
                        refStatus === "ok"
                          ? "#4ade80"
                          : refStatus === "checking"
                            ? "#FF6600"
                          : refStatus === "err"
                            ? "#FF3B3B"
                            : "rgba(255,255,255,0.1)",
                    }}
                    value={refCode}
                    onChange={(e) => handleRefCode(e.target.value)}
                    placeholder="e.g. REFA1B2C3D4"
                    maxLength={20}
                    autoFocus
                    disabled={isLoading}
                  />
                  {refStatus !== "idle" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px]">
                      {refStatus === "checking" ? "..." : refStatus === "ok" ? "✅" : "❌"}
                    </span>
                  )}
                </div>
                {refStatus === "checking" && (
                  <p className="text-[12px] text-white/60 mt-[6px]">
                    Checking referral code...
                  </p>
                )}
                {refStatus === "ok" && (
                  <p className="text-[12px] text-[#4ade80] mt-[6px]">
                    🎉 Code applied! Your referrer gets credit.
                  </p>
                )}
                {refStatus === "err" && (
                  <p className="text-[12px] text-[#FF3B3B] mt-[6px]">
                    Invalid referral code.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Error message */}
          {(payState === "error" || errorMsg) && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[rgba(255,59,59,0.1)] border border-[rgba(255,59,59,0.3)] text-[13px] text-[#FF3B3B]">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={submit}
            disabled={isLoading}
            className="w-full bg-[#FF6600] text-[#080808] font-bold text-[15px] uppercase tracking-wide py-4 rounded-full mt-1 transition-all hover:scale-[1.03] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            style={{ boxShadow: "0 0 32px rgba(255,102,0,0.3)" }}
          >
            {isLoading && (
              <svg
                className="animate-spin w-5 h-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {btnLabel}
          </button>

          <p className="text-[11px] text-white/22 text-center mt-3 leading-[1.6]">
            ₹500 credited to collar price. Remaining ₹4,500 before delivery.
            100% refundable before shipping.
          </p>
        </div>
      </div>
    </>
  );
}
