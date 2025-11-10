"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Video = dynamic(() => import("@/components/video"), { ssr: false });

// 🖼️ Assets
import one from "@/assets/one.webp";
import eight from "@/assets/eight.jpg";
import seven from "@/assets/seven.png";
import ten from "@/assets/PT_04.webp";

interface Slide {
  image: StaticImageData;
  title: string;
  description: string;
  cta: string;
}

const slides: Slide[] = [
  {
    image: eight,
    title: "AI Powered Correction",
    description:
      "Using advanced pose detection, get real-time feedback on your workouts and improve your technique instantly.",
    cta: "Learn More",
  },
  {
    image: seven,
    title: "Personalised Training Plans",
    description:
      "Your workouts adapt dynamically to your progress, fatigue, and goals with AI precision.",
    cta: "Subscribe",
  },
  {
    image: ten,
    title: "Track Progress with Insight",
    description:
      "Visualize growth, performance, and health metrics with detailed AI-driven analytics.",
    cta: "Personalise Plan",
  },
];

export default function Home() {
  const [current, setCurrent] = useState<number>(0);
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isSignedIn } = useUser();

  // 📱 Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmall(true);
        setCurrent(slides.length - 1);
      } else {
        setIsSmall(false);
        setCurrent(0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Video />

      {/* 🧍 Main hero section */}
      <div className="relative overflow-hidden">
        <Image
          src={one}
          width={1000}
          height={800}
          alt="girl with dumbbell"
          className="w-full h-[70vh] lg:h-[110vh] object-cover"
        />
        <div className="w-[260px] h-fit p-6 pb-10 absolute inset-10 bg-white text-black my-auto">
          <h1 className="text-[26px] font-[550] mb-2 py-4">
            Personalised Workouts
          </h1>
          <p className="text-left text-black/80 leading-5 mb-2 pb-4">
            Build workout plans based on your body type, fitness level, and
            goals—just like having a personal trainer 24/7. Adjusts your plan
            automatically as you progress or miss sessions.
          </p>
          <Link
            className="border-b border-b-black text-black"
            href={isSignedIn ? "/subscribe" : "/sign-up"}
          >
            Explore Member Benefits
          </Link>
        </div>
      </div>

      {/* 🖼️ Draggable/Swipeable Slides */}
      <div className="relative overflow-hidden w-full h-[70vh] lg:h-[110vh]">
        {/* Background images */}
        <div className="absolute inset-0 overflow-hidden ">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Foreground text & slide cards */}
        <div
          ref={containerRef}
          className={`absolute inset-x-4  bottom-10 flex items-end gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x justify-center ${
            isSmall ? "justify-start px-0" : "justify-center px-6 "
          }`}
        >
          {slides.map((slide, index) => {
            const hideOnSmall = isSmall && index !== current;
            return (
              <div
                key={index}
                onMouseEnter={() => !isSmall && setCurrent(index)}
                className={`group cursor-pointer shrink-0 w-[280px] h-72 lg:h-80 snap-start bg-transparent text-black p-6 pb-10 transition-all duration-300 ${
                  index === current
                    ? "bg-white shadow-lg"
                    : "bg-black/80 hover:bg-black/90 border-t border-t-white text-gray-50"
                } ${hideOnSmall ? "hidden" : "justify-end"}`}
              >
                <h2 className=" text-[20px] md:text-[26px] py-4 mb-2 font-[550] leading-7">
                  {slide.title}
                </h2>
                <p className=" text-sm md:text-[16px] text-pretty leading-5 text-black/80">
                  {slide.description}
                </p>
                <button
                  className={`mt-4 px-4 py-2 bg-white text-black rounded-md font-medium transition-all duration-300 cursor-pointer border-b-2 border-b-black ${
                    index === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden"
                  }`}
                >
                  {slide.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
