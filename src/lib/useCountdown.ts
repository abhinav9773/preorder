"use client";
// src/lib/useCountdown.ts

import { useState, useEffect } from "react";

export interface Countdown { d: string; h: string; m: string; s: string; }

const DEADLINE_MS = Date.now() + 7 * 24 * 60 * 60 * 1000;

const pad = (n: number) => String(n).padStart(2, "0");

const calc = (): Countdown => {
  const diff = DEADLINE_MS - Date.now();
  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
};

export function useCountdown(): Countdown {
  const [time, setTime] = useState<Countdown>(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
