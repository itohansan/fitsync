"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import one from "../../assets/PT_02.webp";
import two from "../../assets/PT_03.webp";
import three from "../../assets/PT_04.webp";
import four from "../../assets/PT_05.webp";
import eleven from "@/assets/eleven.jpg";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { div } from "framer-motion/client";

const slides = [
  { id: 1, image: one, title: "Empower Your Performance" },
  { id: 2, image: two, title: "Train Smart with AI" },
  { id: 3, image: three, title: "Unlock Your Potential" },
  { id: 4, image: four, title: "Redefine Fitness" },
];

export default function Personal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 8000;
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, duration);

    // progress bar animation
    const progressTimer = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : 0));
    }, duration / 100);

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  return (
    <>
      <div className="relative w-screen h-[80vh]  lg:h-[110vh] overflow-hidden ">
        {/* Background video */}
        <video
          ref={videoRef}
          src="/PT_H.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start text-white bg-black/40  p-9 pb-20">
          <h1 className=" text-2xl md:text-5xl font-[550] mb-4">
            ELEVATE YOUR POWER. UNLOCK YOUR PERFORMANCE.
          </h1>
          <p className="md:text-lg mb-6">
            Let AI do the work for your fitness goals.
          </p>

          <Link
            href={isSignedIn ? "/subscribe" : "/sign-up"}
            className="px-8
             py-3 text-black  bg-gray-50 hover:bg-gray-50/55 font-semibold transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl p-4  text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-3xl font-[550] tracking-tight leading-8 mb-6  w-full md:w-[30vw] text-left ">
          RAISING THE POWER OF PERFORMANCE
        </h1>
        <p className=" text-gray-50 text-left leading-5 mb-3 pt-3 ">
          One-on-One training at <span className="">AIMode</span> is powered by
          cutting-edge AI analytics and expert oversight. Our system decodes
          your physiology, optimizes every movement, and accelerates results
          bringing High-Performance Living into the era of intelligent fitness.
        </p>
        <p className="text-gray-50 text-left">
          This isn&apos;t just training it&apos;s a data-driven, expert-led
          journey to your absolute best. Experience the fusion of intelligence
          and performance today.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
        {/* 🟩 Left side — Image */}
        <div className="w-full h-[400px] relative">
          <Image
            src={eleven}
            alt="Workout gym image"
            fill
            className="object-cover object-center rounded-xl"
          />
        </div>

        {/* 🟩 Right side — Text */}
        <div className="text-white">
          <h1 className="text-3xl font-[550] mb-4">LET AI BE YOUR COACH</h1>

          <h3 className="text-2xl py-6">Our Coaches</h3>

          <p className="text-sm tracking-wide leading-relaxed text-white/70">
            Meet FitSync Coaches your always-on AI-powered training partner.
            Designed to understand your body goals and rhythm, FitSync blends
            real time analytics with performance science to help you train
            smarter, recover faster, and grow stronger. Through Movement,
            Nutrition, and Regeneration. FitSync syncs every part of your
            fitness journey into one seamless adaptive system pushing human
            performance into the future.
          </p>
        </div>
      </div>

      {/* 🟩 Responsive grid container */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
        {/* 🟩 Left side — Slideshow */}
        <div className="relative w-full h-[80vh] xl:h-screen overflow-hidden rounded-xl shadow-lg">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === current ? 1 : 0,
                scale: index === current ? 1 : 1.25,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.img
                src={slide.image.src}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
              />

              {/* Overlay text */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
                <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold mb-4">
                  {slide.title}
                </h2>
              </div>
            </motion.div>
          ))}

          {/* Progress Indicators */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 px-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className="relative w-14 h-1 bg-white/30 overflow-hidden rounded-full"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gray-50"
                  animate={{
                    width: index === current ? `${progress}%` : "0%",
                    opacity: index === current ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🟩 Right side — Text content */}
        <div className="text-white flex flex-col justify-center items-start px-4 xl:px-10">
          <p className="pb-16 text-lg leading-relaxed text-white/80">
            FitSync personalizes every workout to match your lifestyle keeping
            you challenged, consistent and in control.
          </p>

          <Link
            className="p-3 px-9 font-[550] text-gray-50 border border-white hover:bg-white hover:text-black transition-all"
            href={isSignedIn ? "/subscribe" : "/sign-up"}
          >
            Sync In
          </Link>
        </div>
      </div>
    </>
  );
}
