"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarWidth = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.scrollbarWidth = "";
    };
  }, [isOpen]);

  // close down when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // console.log(user, isLoaded, isSignedIn, SignOutButton);

  if (!isLoaded) return <p>Loading...</p>;
  return (
    <nav className=" bg-black fixed top-0 z-50  w-full h-[60px] flex items-center justify-center px-8">
      <div className="flex items-center justify-between font-bold w-full px-4">
        <div className="">
          <Link className="" href="/">
            <h2 className="font-extrabold text-[18px] tracking-[6px]">
              FITSYNC
            </h2>
          </Link>
        </div>
        {/* SHOWN TO EVERYONE */}

        {/* in */}

        {/* <SignedIn>
          <Link href="/plan">Plan</Link>
          {user?.imageUrl ? (
            <Link href="/profile">
              <Image
                src={user.imageUrl}
                alt="profile picture"
                width={40}
                height={40}
              />
            </Link>
          ) : (
            <div></div>
          )}
        </SignedIn> */}

        <div
          className="relative flex gap-3 justify-end w-full  "
          ref={dropdownRef}
        >
          <SignedIn>
            {/* user image */}
            <Link href="/plan" className="relative inline-block group">
              {/* SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>

              {/* Label that shows on hover */}
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-2 py-1 rounded transition-opacity duration-200">
                Subscribe
              </span>
            </Link>
            {user?.imageUrl ? (
              <Link href="/profile" className="relative inline-block group">
                <Image
                  src={user.imageUrl}
                  alt="profile picture"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                {/* Label that shows on hover */}
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-2 py-1 rounded transition-opacity duration-200">
                  Profile
                </span>
              </Link>
            ) : (
              <div></div>
            )}

            <SignOutButton>
              <div className="relative inline-block group cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>

                {/* Label on hover */}
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-2 py-1 rounded transition-opacity duration-200">
                  Sign Out
                </span>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* out */}
        <div className="relative flex gap-3" ref={dropdownRef}>
          <SignedOut>
            <div className="" onClick={toggleDropdown}>
              {isOpen ? (
                <motion.svg
                  key="close"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </motion.svg>
              )}
              <div>
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ x: "100%", opacity: 0 }} // starts off-screen right
                      animate={{ x: 0, opacity: 1 }} // slides in
                      exit={{ x: "100%", opacity: 0 }} // slides out
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute top-10 -right-5 mx-auto w-screen h-screen bg-black"
                    >
                      {" "}
                      <ul className="flex flex-col items-center justify-center h-screen gap-7 text-3xl">
                        <li>
                          <Link href="/">Home</Link>
                        </li>

                        <li>
                          <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>
                            Subscribe
                          </Link>
                        </li>
                        <li>
                          <Link href="/personal">Personalised Plan</Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* <Link href="/">Home</Link>
          <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>Subscribe</Link> */}
            <Link href="/sign-up">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
