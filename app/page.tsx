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
  icon: string;
}

const slides: Slide[] = [
  {
    image: eight,
    title: "AI Powered Correction",
    description:
      "Using advanced pose detection, get real-time feedback on your workouts and improve your technique instantly.",
    cta: "Learn More",
    icon: "🎯",
  },
  {
    image: seven,
    title: "Personalised Training Plans",
    description:
      "Your workouts adapt dynamically to your progress, fatigue, and goals with AI precision.",
    cta: "Subscribe",
    icon: "📊",
  },
  {
    image: ten,
    title: "Track Progress with Insight",
    description:
      "Visualize growth, performance, and health metrics with detailed AI-driven analytics.",
    cta: "Personalise Plan",
    icon: "📈",
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
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>

        {/* Content Card */}
        <div className="absolute inset-10 my-auto w-[320px] md:w-[380px] h-fit">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Icon Header */}
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Personalised Workouts
            </h1>

            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>

            <p className="text-gray-700 leading-relaxed mb-6 text-base">
              Build workout plans based on your body type, fitness level, and
              goals—just like having a personal trainer 24/7. Adjusts your plan
              automatically as you progress or miss sessions.
            </p>

            <Link
              className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold transition-colors group"
              href={isSignedIn ? "/personal" : "/sign-up"}
            >
              Explore Member Benefits
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 🖼️ Interactive Feature Slides */}
      <div className="relative overflow-hidden w-full h-[70vh] lg:h-[110vh]">
        {/* Background images with parallax effect */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Foreground cards */}
        <div
          ref={containerRef}
          className={`absolute inset-x-4 bottom-10 flex items-end gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x ${
            isSmall ? "justify-start px-0" : "justify-center px-6"
          }`}
        >
          {slides.map((slide, index) => {
            const hideOnSmall = isSmall && index !== current;
            const isActive = index === current;

            return (
              <div
                key={index}
                onMouseEnter={() => !isSmall && setCurrent(index)}
                className={`group cursor-pointer shrink-0 w-[300px] md:w-[320px] snap-start transition-all duration-500 ${
                  hideOnSmall ? "hidden" : ""
                }`}
              >
                <div
                  className={`h-90 lg:h-96 rounded-2xl p-6 pb-8 backdrop-blur-sm border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-white/95 border-white shadow-2xl"
                      : "bg-black/80 border-gray-700 hover:bg-black/90 hover:border-gray-500"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                      isActive
                        ? "bg-gradient-to-br from-blue-500 to-purple-500"
                        : "bg-gray-800"
                    }`}
                  >
                    <span className="text-2xl">{slide.icon}</span>
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-2xl md:text-3xl font-bold leading-tight mb-4 ${
                      isActive ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p
                    className={`text-sm md:text-base leading-relaxed mb-6 ${
                      isActive ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg opacity-100 translate-y-0"
                        : "bg-white/10 text-white border border-white/20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
