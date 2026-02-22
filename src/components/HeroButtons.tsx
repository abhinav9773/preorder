"use client";

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroButtons() {
  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/preorder", "_blank");
  };

  return (
    <>
      {/* Desktop Button */}
      <div className="relative z-10 flex items-end hidden lg:flex">
        <button
          onClick={handleButtonClick}
          type="button"
          className="relative overflow-hidden font-montserrat h-fit font-semibold text-base xl:text-xl px-4 xl:px-8 py-3 xl:py-4 bg-[#FF6600] text-white rounded-full hover:bg-primary transition-all flex flex-row justify-between pl-5 xl:pl-6 gap-x-3 xl:gap-x-4 pr-4 xl:pr-5 items-center group shadow-lg hover:shadow-xl hover:scale-105 duration-500 ease-out"
        >
          <span className="relative z-10 md:px-2 xl:px-4">PREORDER NOW</span>

          <MoveUpRight className="relative z-10 w-8 xl:w-10 text-white h-8 xl:h-10 bg-black rounded-full p-1.5" />

          <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>
        </button>
      </div>

      {/* Mobile Button */}
      <div className="relative z-10 pt-3 flex items-start justify-start lg:hidden">
        <button
          onClick={handleButtonClick}
          type="button"
          className="relative overflow-hidden font-montserrat h-fit font-semibold text-base md:text-lg px-4 md:px-6 py-2 md:py-3 bg-[#FF6600] text-white rounded-full hover:bg-primary transition-all flex flex-row justify-between pl-3 md:pl-4 gap-x-2 md:gap-x-3 pr-2 md:pr-3 items-center group shadow-lg hover:shadow-xl hover:scale-105 duration-500 ease-out"
        >
          <span className="relative z-10 px-1 md:px-3">PREORDER NOW</span>

          <MoveUpRight className="relative z-10 w-6 md:w-8 text-white h-6 md:h-8 bg-black rounded-full p-1" />

          <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>
        </button>
      </div>
    </>
  );
}
