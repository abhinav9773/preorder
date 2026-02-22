import React from "react";
import Mission from "@/components/Mission";
import Newsletter from "@/components/Newsletter/Newsletter";
import Companies from "@/components/Companies/Companies";
import TeamSection from "@/components/About/TeamSection";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "About Us",
  description:
    "Learn about the mission and story behind MyPerro — where technology meets love for pets.",
};

function About() {
  return (
    <div className="max-w-[85vw]">
      <div className="text-black w-full">
        <div className="relative w-full md:h-[80vh] overflow-hidden rounded-3xl px-10 py-16 mt-8 mb-16">
          {/* Background image with overlay */}
          <Image
            src="/about/dog.gif"
            width={1000}
            height={1000}
            alt="dog running"
            className="absolute inset-0 bg-cover w-full h-full bg-bottom"
          ></Image>

          <div className="absolute inset-0 bg-[url('/about/overlay.jpeg')] opacity-30" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-6xl lg:text-8xl text-white font-borela">
              ABOUT US
            </h1>
            <div className="h-full flex mt-5  justify-between">
              <div className="w-full lg:w-1/2">
                <p className="text-white text-md font-montserrat md:text-lg lg:text-2xl">
                  Welcome to MyPerro, where your pet&apos;s well-being is our
                  priority, providing personalized care and peace of mind with
                  technology-driven solutions.
                </p>
                <Link href="/contact" passHref>
                  <button className="mt-5 rounded-full gap-3 flex text-xl items-center  font-borela text-white bg-background pl-5 px-3 py-2">
                    REACH US OUT{" "}
                    <MoveUpRight className="bg-primary w-10 h-10 rounded-full p-2 font-bold" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="w-full flex flex-col md:flex-row gap-8">
        <h1 className="text-3xl md:text-5xl font-borela text-background md:w-1/2">
          Smart Care for Pets, Every Step of the Way
        </h1>
        <div className="md:w-1/2 font-montserrat font-medium text-md md:text-lg text-background">
          <p>
            MyPerro is dedicated to enhancing the bond between pets and their
            parents through innovation and care.
          </p>
          <br></br>
          <p>
            MyPerro is more than a service, it&apos;s a commitment to redefining
            pet care with technology and trust.
          </p>
          <br></br>
          <p>
            At MyPerro, we&apos;re driven by a simple mission: to ensure every
            pet is safe, healthy, and happy. With our state-of-the-art smart
            collars and personalized pet care services like dog walking and
            boarding, we provide solutions that make life easier for both pets
            and their owners.{" "}
          </p>
        </div>
      </div>

      <Mission />

      {/* story*/}
      <div className="bg-white rounded-3xl shadow-md lg:overflow-hidden mt-12 md:mt-24  h-full w-full lg:w-3/4  mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 relative h-[30vh] lg:h-auto">
            <Image
              src="/about/sidedog.png"
              width={1000}
              height={1000}
              alt="happy shiba inu"
              className="w-3/4 md:w-1/2 lg:w-full h-auto object-cover bottom-3 -scale-x-100 absolute"
            />
            <div className="w-1/2 lg:w-3/5 bg-primary h-full rounded-r-full"></div>
          </div>

          <div className="p-8 lg:p-20 lg:pl-0 lg:w-3/5">
            <h2 className="text-4xl lg:text-6xl font-borela  text-gray-800 mb-6">
              OUR STORY
            </h2>

            <p className="text-gray-700 font-medium text-md lg:text-xl mb-6 font-montserrat">
              MyPerro is a pet care startup that combines smart collar
              technology with a network of certified caregivers to provide
              real-time health monitoring and premium services like dog walking
              and boarding. Our smart collars track essential health vitals and
              GPS location.
            </p>

            <p className="text-gray-700 font-medium text-md lg:text-xl font-montserrat">
              We aim to give pet parents peace of mind by ensuring their dogs
              receive personalized attention and care, even when they&apos;re
              away, their &quot;Perro&quot; will be just like it is
              &quot;MyPerro&quot; in a safe and home-like environment.
            </p>
          </div>
        </div>
      </div>
      <TeamSection />
      <Newsletter />
      <Companies />
    </div>
  );
}

export default About;
