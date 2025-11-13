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
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Video Section */}
      <div className="relative w-screen h-[80vh] lg:h-[110vh] overflow-hidden">
        <video
          ref={videoRef}
          src="/PT_H.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-8 md:p-12 pb-16 md:pb-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-6xl font-bold leading-tight max-w-4xl">
              ELEVATE YOUR POWER.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                UNLOCK YOUR PERFORMANCE.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              Let AI do the work for your fitness goals.
            </p>

            <Link
              href={isSignedIn ? "/subscribe" : "/sign-up"}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              RAISING THE POWER OF PERFORMANCE
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              One-on-One training at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                AIMode
              </span>{" "}
              is powered by cutting-edge AI analytics and expert oversight. Our
              system decodes your physiology, optimizes every movement, and
              accelerates results bringing High-Performance Living into the era
              of intelligent fitness.
            </p>
            <p className="text-lg">
              This isn&apos;t just training it&apos;s a data-driven, expert-led
              journey to your absolute best. Experience the fusion of
              intelligence and performance today.
            </p>
          </div>
        </motion.div>
      </div>

      {/* AI Coach Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src={eleven}
              alt="Workout gym image"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-white space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-bold mb-3">LET AI BE YOUR COACH</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-200">
              Our Coaches
            </h3>

            <p className="text-base leading-relaxed text-gray-400">
              Meet FitSync Coaches your always-on AI-powered training partner.
              Designed to understand your body goals and rhythm, FitSync blends
              real time analytics with performance science to help you train
              smarter, recover faster, and grow stronger. Through Movement,
              Nutrition, and Regeneration. FitSync syncs every part of your
              fitness journey into one seamless adaptive system pushing human
              performance into the future.
            </p>

            <div className="flex gap-3 pt-4">
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <span className="text-blue-400 font-semibold">Movement</span>
              </div>
              <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <span className="text-purple-400 font-semibold">Nutrition</span>
              </div>
              <div className="px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-lg">
                <span className="text-pink-400 font-semibold">Recovery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Slideshow */}
          <motion.div
            className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-center text-white px-6">
                  <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === current ? 1 : 0,
                      y: index === current ? 0 : 20,
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {slide.title}
                  </motion.h2>
                </div>
              </motion.div>
            ))}

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6 z-10">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className="relative w-16 h-1.5 bg-white/20 overflow-hidden rounded-full backdrop-blur-sm"
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    animate={{
                      width: index === current ? `${progress}%` : "0%",
                      opacity: index === current ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="text-white flex flex-col justify-center items-start space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Personalized AI Training</h3>
              <p className="text-lg leading-relaxed text-gray-400">
                FitSync personalizes every workout to match your lifestyle
                keeping you challenged, consistent and in control.
              </p>
            </div>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Real-time performance analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Adaptive workout plans</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Expert-led guidance</span>
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg group"
              href={isSignedIn ? "/subscribe" : "/sign-up"}
            >
              Sync In
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
