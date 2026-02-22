import React from "react";
import { MoveUpRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="text-black w-full h-screen">
      <div className="relative w-full overflow-hidden rounded-3xl">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/about/about-vid.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 px-10 py-16">
          <h1 className="text-2xl md:text-6xl lg:text-8xl text-white font-borela">
            OUR UPCOMING <br /> SERVICES
          </h1>
          <div className="h-full flex mt-5 justify-between">
            <div className="w-1/2 lg:w-1/4">
              <p className="text-white text-2xl">
                Take a look at the exciting services that we are launching soon,
                created for your dog&apos;s happiness and safety.{" "}
              </p>
              <button className="mt-5 rounded-full gap-3 flex text-xl items-center font-borela text-white bg-secondary px-3 py-2">
                STAY UPDATED{" "}
                <MoveUpRight className="bg-primary w-12 h-12 rounded-full p-2 font-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
