import React from "react";
import FAQ from "@/components/FAQ";
import DogServices from "@/components/services/dog-walking";
export const metadata = {
  title: 'Services',
  description: "Explore MyPerros services including smart collars, GPS tracking, pet activity history, and more.",
};

export default function services() {
  return (
    <div className="w-full max-w-[85vw] mx-auto">
      {/* hero section */}
      <div className="text-black w-full">
        <div className="relative w-full h-auto  overflow-hidden rounded-3xl px-4 sm:px-6 md:px-10 py-8 md:py-16 mt-10 md:mt-15">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-[url('/services/dog-field-full.jpeg')] bg-cover bg-bottom" />
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white font-borela">
              OUR UPCOMING <br /> SERVICES
            </h1>
            <div className="flex flex-col md:flex-row mt-5 gap-6 justify-between">
              <div className="w-full md:w-1/2 lg:w-1/4">
                <p className="text-white text-lg md:text-xl lg:text-2xl">
                  Take a look at the exciting services that we are launching
                  soon, created for your dog&apos;s happiness and safety.
                </p>
                {/* <button className="mt-5 rounded-full gap-2 flex text-lg md:text-xl items-center font-borela text-white bg-secondary px-3 py-2">
                  STAY UPDATED{" "}
                  <MoveUpRight className="bg-primary w-8 h-8 md:w-12 md:h-12 rounded-full p-2 font-bold" />
                </button> */}
              </div>
              {/* <div className="hidden sm:flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-0">
                <div className="w-full sm:w-1/2 max-w-[350px] h-auto bg-white bg-opacity-10 rounded-3xl px-3 py-2">
                  <div className="py-3 md:py-5 flex text-white text-xl md:text-2xl justify-between items-center">
                    <h1>
                      Dog <br /> Walking
                    </h1>
                    <MoveUpRight className="bg-primary w-8 h-8 md:w-12 md:h-12 rounded-full p-2 font-bold" />
                  </div>
                  <Image
                    src="/services/dog-walking.png"
                    alt="dog walking"
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="w-full sm:w-1/2 max-w-[350px] h-auto bg-white bg-opacity-10 rounded-2xl px-3 py-2">
                  <div className="py-3 md:py-5 flex text-white text-xl md:text-2xl justify-between items-center">
                    <h1>
                      Dog <br /> Walking
                    </h1>
                    <MoveUpRight className="bg-primary w-8 h-8 md:w-12 md:h-12 rounded-full p-2 font-bold" />
                  </div>
                  <Image
                    src="/services/hero.png"
                    alt="dog walking"
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* walking and boarding */}
      <DogServices/>
      
      <FAQ />
    </div>
  );
}