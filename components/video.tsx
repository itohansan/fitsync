"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function HeroVideo() {
  const { isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="relative w-screen h-[80vh] lg:h-[110vh] overflow-hidden">
      <video
        src="/hero-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-end items-start text-white bg-black/40 p-9 pb-20">
        <h1 className="text-5xl font-[550] mb-4">Personalised AI Plan</h1>
        <p className="text-[22px] mb-8">
          Let AI do the work for your fitness goals.
        </p>

        {/* EXACT SAME BUTTON STYLE — ONLY TEXT CHANGES */}
        <SignedOut>
          <Link
            href="/sign-up"
            className="px-8 py-3 bg-gray-50 hover:bg-gray-50/90 font-semibold text-black transition-all rounded-md text-lg"
          >
            Get Started
          </Link>
        </SignedOut>

        <SignedIn>
          <Link
            href="/plan"
            className="px-8 py-3 bg-gray-50 hover:bg-gray-50/90 font-semibold text-black transition-all rounded-md text-lg"
          >
            Go to My AI Plan
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
