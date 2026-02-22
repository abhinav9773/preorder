"use client"

import { cn } from "@/lib/utils"
import { MapIcon, BarChart3Icon, MapPinIcon, ActivityIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import Image from "next/image"
import woman from "../../../public/features/woman-using-smartphone.jpeg"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const features = [
  {
    id: "gps",
    title: "GPS TRACKING",
    icon: MapIcon,
    image: "/features/gps.png",
    content: {
      heading: "Never lose sight of your pet's location, no matter where they roam.",
    },
  },
  {
    id: "activity",
    title: "ACTIVITY INSIGHTS",
    icon: BarChart3Icon,
    image: "/features/activity.png",
    content: {
      heading: "Track your pet's daily activities and monitor their health.",
    },
  },
  {
    id: "geofencing",
    title: "GEOFENCING",
    icon: MapPinIcon,
    image: "/features/geofence.png",
    content: {
      heading: "Set up virtual boundaries and get alerts when your pet crosses them.",
    },
  },
  {
    id: "pulse",
    title: "PULSE CHECKING",
    icon: ActivityIcon,
    image: "/features/pulse.png",
    content: {
      heading: "Monitor your pet's vital signs in real-time for peace of mind.",
    },
  },
]

export default function FeatureSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 p-6 pr-0">
      {/* Desktop Sidebar */}
      <ScrollArea className="hidden md:block w-[20rem] lg:w-[26rem] pr-8 h-96 space-y-1">
        {features.map((feature, index) => (
          <button
        key={feature.id}
        onClick={() => setActiveIndex(index)}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(activeIndex)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-6 border-b-gray-400 border-b text-gray-400 text-xl font-montserrat font-medium text-left transition-colors",
          "hover:text-gray-700",
          activeIndex === index && "text-gray-700"
        )}
          >
        <div className="flex flex-row justify-between w-full text-lg lg:text-2xl">
          {feature.title}
          <feature.icon className="h-7 w-7" />
        </div>
          </button>
        ))}
      </ScrollArea>

      {/* Desktop Content */}
      <div className="hidden md:block flex-1 h-72 relative rounded-[50px] rounded-br-none bg-muted/30 p-6 bg-foreground">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={cn(
              "absolute inset-0 p-6 transition-all duration-1000 ease-in-out",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="space-y-6">
              <div className="flex flex-row justify-between w-full lg:gap-0 ">
                <div className="ml-10">   
                  <div className="text-sm text-gray-400 uppercase tracking-wider flex gap-6">
                    <feature.icon className="h-6 w-6 text-gray-400" />
                    {feature.title}</div>
                  <h2 className="lg:text-3xl text-2xl text-md text-secondary text-left font-semibold leading-tight mt-8 w-4/5 max-w-md">
                    "{feature.content.heading}"
                  </h2>
                </div>
                <div className="h-full rounded-xl overflow-hidden z-10">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    height={1000}
                    width={1000}
                    className="w-[450px] object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-28 w-full left-0 flex">
                <div className="w-1/4 bg-white h-28 rounded-[50px] z-10 flex items-center justify-evenly ">
                  <ArrowLeft className="text-foreground h-10 w-10 p-2 cursor-pointer" onClick={handlePrev} />
                  <ArrowRight className="text-white bg-primary h-10 w-10 rounded-full p-2 cursor-pointer" onClick={handleNext} />
                </div>
                <div className="w-3/4 bg-foreground h-28 rounded-[50px] rounded-tr-none"></div>
                <div className="absolute w-1/2 h-16 left-10 bg-foreground"></div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Mobile Carousel */}
      <div className="md:hidden w-full">
        <Carousel className="w-full">
          <CarouselContent className="h-[28rem] w-11/12 -ml-4">
            {features.map((feature) => (
              <CarouselItem key={feature.id} className="h-full pl-4 md:basis-3/5">
                <div className="p-6 bg-white rounded-xl h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-sm text-gray-400 uppercase tracking-wider">{feature.title}</div>
                      <feature.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <h2 className="text-lg text-secondary font-semibold leading-tight mb-8">
                      "{feature.content.heading}"
                    </h2>
                    <div className="mt-auto rounded-xl overflow-hidden">
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        height={1000}
                        width={1000}
                        className="h-72 w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
