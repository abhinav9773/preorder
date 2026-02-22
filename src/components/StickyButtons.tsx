"use client";

import { useState, useEffect } from "react";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StickyButtons() {
  const [showStickyButton, setShowStickyButton] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.5;
      setShowStickyButton(scrollPosition > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/preorder", "_blank");
  };

  return (
    <>
      {/* Sticky Button */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          showStickyButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={handleButtonClick}
          type="button"
          className="relative overflow-hidden font-montserrat h-fit font-semibold text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 bg-[#FF6600] text-white rounded-full hover:bg-primary transition-all flex flex-row justify-between pl-4 lg:pl-5 gap-x-3 pr-3 lg:pr-4 items-center group shadow-lg hover:shadow-xl hover:scale-105 duration-500 ease-out"
        >
          <span className="relative z-10">PREORDER NOW</span>

          <MoveUpRight className="relative z-10 w-6 lg:w-7 text-white h-6 lg:h-7 bg-black rounded-full p-1" />

          <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>
        </button>
      </div>
    </>
  );
}
