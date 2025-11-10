"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Video() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="relative w-screen h-[80vh] lg:h-[110vh] overflow-hidden ">
      {/* Background video */}
      <video
        src="/hero-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end items-start  text-white bg-black/40 p-9 pb-20">
        <h1 className="text-5xl font-[550] mb-4">Personalised AI Plan</h1>
        <p className="text-[22px] mb-6">
          Let AI do the work for your fitness goals.
        </p>
    
        <Link
          href={isSignedIn ? "/subscribe" : "/sign-up"}
          className="px-8 py-3 bg-gray-50 hover:bg-gray-50/90  font-semibold transition-all text-black "
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
