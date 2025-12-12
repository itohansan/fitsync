"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    fetch("/api/profile/subscription-status")
      .then((res) => res.json())
      .then((data) => {
        const active = data.subscriptionActive === true;
        setIsSubscribed(active);
        if (active) router.replace("/plan"); // auto-send them to their plan
      })
      .catch(() => setIsSubscribed(false));
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || (isSignedIn && isSubscribed === null)) return null;

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
        <p className="text-[22px] mb-6">
          Let AI do the work for your fitness goals.
        </p>

        <SignedOut>
          <Link
            href="/sign-up"
            className="px-8 py-3 bg-gray-50 hover:bg-gray-50/90 font-semibold transition-all text-black rounded-md"
          >
            Get Started
          </Link>
        </SignedOut>

        <SignedIn>
          {isSubscribed ? (
            <Link
              href="/plan"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 font-semibold text-white transition-all rounded-md"
            >
              Go to My AI Plan
            </Link>
          ) : (
            <Link
              href="/subscribe"
              className="px-8 py-3 bg-gray-50 hover:bg-gray-50/90 font-semibold transition-all text-black rounded-md"
            >
              Get Started
            </Link>
          )}
        </SignedIn>
      </div>
    </div>
  );
}
