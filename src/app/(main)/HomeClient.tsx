"use client";
import dynamic from "next/dynamic";
const Features = dynamic(() => import("@/components/Features/Features"), {
  loading: () => <div className="h-40" />,
});

const Companies = dynamic(() => import("@/components/Companies/Companies"), {
  loading: () => <div className="h-40" />,
});

const Unleash = dynamic(() => import("@/components/Unleash"), {
  loading: () => <div className="h-40" />,
});

const FeatureShowcase = dynamic(
  () => import("@/components/FeatureShowcase.tsx"),
  {
    loading: () => <div className="h-40" />,
  },
);
import HeroCollar from "@/components/HeroCollar";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import StickyButtons from "@/components/StickyButtons";
import HeroButtons from "@/components/HeroButtons";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (searchParams.get("waitlist") == "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <>
      <StickyButtons />

      {/* hero section */}
      <div className="relative w-full h-auto flex-col items-center overflow-hidden hidden lg:flex">
        <div className="bg-foreground w-[85vw] h-[90vh] flex flex-col">
          <div className="flex flex-col justify-start items-start">
            <h1 className="relative font-borela text-4xl md:text-8xl lg:text-[9vw] mt-4 md:mt-8 text-background leading-none">
              SMART COLLARS
              <span className="md:absolute font-mombay text-6xl sm:text-7xl -bottom-5 right-0 md:left-[42%] z-10 text-background">
                for
              </span>
            </h1>

            <h1 className="font-montserrat text-2xl md:text-4xl lg:text-[5vw] rounded-lg bg-primary leading-none p-5">
              HAPPIER PETS
            </h1>
          </div>

          <Image
            alt="hero dog image"
            src="/hero/dog-hero2.png"
            priority
            width={1000}
            height={1000}
            className="absolute bottom-0 lg:right-10 md:h-[40vh] lg:h-[85vh] h-[40vh] w-auto"
          />

          <div className="lg:flex items-center w-[500px] h-[200px] bg-background p-7 rounded-3xl mt-[6rem] hidden">
            <h3 className="text-2xl text-white text-opacity-70 font-montserrat">
              REDEFINING THE FUTURE OF PET CARE WITH OUR{" "}
              <span className="text-opacity-100 text-white flex items-center gap-2">
                NEXT-GEN{" "}
                <Image
                  src="/hero/zig.png"
                  alt="zigzag"
                  width={1000}
                  height={1000}
                  className="w-auto h-full"
                />
              </span>{" "}
              SMART COLLARS
            </h3>

            <Image
              alt="hero dog image"
              src="/hero/video.png"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-[2rem]">
            <HeroButtons />
          </div>

          <div className="absolute bottom-0 left-0 overflow-hidden w-full">
            <Marquee
              autoFill
              className="text-xl bg-background opacity-80 py-1 text-white"
            >
              <Star className="mx-5 fill-white" /> MYPERRO{" "}
              <Star className="mx-5 fill-white" /> SMART COLLARS{" "}
              <Star className="mx-5 fill-white" /> TRACK.MONITOR.PROTECT
            </Marquee>
          </div>
        </div>
      </div>

      {/* hero section mobile */}
      <div className="relative w-full h-auto flex flex-col items-center overflow-hidden lg:hidden">
        <div className="bg-foreground w-[85vw] h-[90vh] flex flex-col">
          <div className="flex flex-col justify-start items-start">
            <h1 className="relative font-borela text-5xl md:text-6xl lg:text-[9vw] mt-8 md:mt-16 text-background leading-none">
              SMART COLLARS
              <span className="font-mombay text-6xl sm:text-7xl text-background ml-4">
                for
              </span>
            </h1>

            <h1 className="font-montserrat text-2xl md:text-4xl lg:text-[5vw] rounded-lg bg-primary leading-none p-5">
              HAPPIER PETS
            </h1>

            <div style={{ marginLeft: "0px" }}>
              <HeroButtons />
            </div>
          </div>

          <Image
            alt="hero dog image"
            src="/hero/dog-hero.png"
            width={1000}
            height={1000}
            className="h-full w-auto self-center"
          />

          <div className="absolute bottom-0 left-0 overflow-hidden w-full">
            <Marquee
              autoFill
              className="text-xl bg-background opacity-80 py-3 text-white"
            >
              <Star className="mx-5 fill-white" /> MYPERRO{" "}
              <Star className="mx-5 fill-white" /> SMART COLLARS{" "}
              <Star className="mx-5 fill-white" /> TRACK.MONITOR.PROTECT
            </Marquee>
          </div>
        </div>
      </div>

      <HeroCollar />

      <div className="flex flex-col items-center relative bg-foreground w-full min-h-screen text-center bg-white">
        <div className="max-w-[85vw] w-full h-auto items-stretch">
          <h1 className="font-borela text-black p-4 text-3xl lg:text-6xl mt-0 lg:mt-8">
            THE <span className="text-gray-600">FUTURE</span> OF PET CARE
          </h1>

          <div className="lg:hidden text-lg p-4 lg:text-xl text-left flex flex-col items-center">
            <Image
              src="/petcare/collar-features-icon.png"
              height={1500}
              width={1500}
              alt="dog icon"
              className="object-contain mb-4 w-40"
            />

            <p className="text-gray-600">
              Our smart collars offer you peace of mind with real-time tracking
              and health insights for your pets.
            </p>
          </div>

          <Image
            src="/hero/collar.svg"
            height={1000}
            width={1000}
            alt="center image"
            className="lg:absolute lg:top-[58%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-[1] h-[70%] w-auto"
          />

          <Image
            src="/hero/base.svg"
            width={1000}
            height={1000}
            alt="bottom left image"
            className="hidden lg:block lg:absolute left-0 -bottom-0 h-auto w-8/12 z-[0]"
          />
        </div>
      </div>

      <WaitlistForm isOpen={showForm} onClose={() => setShowForm(false)} />

      <FeatureShowcase />
      <Features />
      <Unleash />
      <Companies />
    </>
  );
}
