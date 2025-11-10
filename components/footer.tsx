"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <footer>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center max:w-6xl mx-auto border-b border-b-black">
        {/* left side */}
        <div className=" relative w-full h-[85vh] lg:h-96 rounded-2xl overflow-hidden">
          <Image
            src="/five.png"
            alt="AI gym training "
            fill
            className="object-cover object-center hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end items-start text-white px-9 pb-10 text-left md:leading-11 ">
            <h2 className=" text-2xl md:text-5xl font-[550] mb-4">
              YOUR HIGH PERFORMANCE SANCTUARY
            </h2>
            <p className="md:text-[19px] text-left ">
              Become a Member and gain access to Unlimited Signature classes and
              features{" "}
            </p>
          </div>
        </div>
        {/* right  */}
        <div className="space-y-6 bg-gray-50 text-black p-9">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight mb-6 w-[30vw] text-left">
            Get in Touch
          </h2>
          <p className="text-sm">
            Have questions or want to start your AI powered fitness journey?
            Fill out the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" />
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3  bg-gray-50 text-black placeholder-gray-800 focus:outline-none focus:ring-1 focus:ring-black transition border border-black/20 hover:border-black"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 text-black placeholder-gray-800 focus:outline-none focus:ring-1 focus:ring-black transition border border-black/20 hover:border-black"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3  bg-gray-50 text-black placeholder-gray-800 focus:outline-none focus:ring-1 focus:ring-black transition border border-black/20 hover:border-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 my-6 mb-16 transition-all text-[17px] font-semibold text-black/60 ${
              isFormValid
                ? "bg-black cursor-pointer"
                : " bg-black/10 cursor-not-allowed  "
            }`}
          >
            Send Message
          </button>
        </div>
      </div>
      {/* Divider */}
      {/* <div className="border-t border-gray-800 mt-12 mb-8"></div> */}

      {/* Footer bottom */}
      <div className="flex flex-col md:flex-row  justify-between items-center gap-8 mx-auto bg-white text-gray-400 text-sm p-8 py-25">
        {/* Disclaimer */}
        <p className="text-center md:text-left text-xs text-gray-500 max-w-lg">
          Disclaimer: All images and videos used on this site are for
          demonstration purposes only and do not belong to FITSYNC or its
          affiliates.
        </p>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            className="p-2 bg-black/50 hover:bg-black rounded-full transition"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-white w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="p-2 bg-black/50 hover:bg-black rounded-full transition"
            aria-label="Instagram"
          >
            <FaInstagram className="text-white w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="p-2 bg-black/50 hover:bg-black rounded-full transition"
            aria-label="Twitter / X"
          >
            <FaXTwitter className="text-white w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="p-2 bg-black/50 hover:bg-black rounded-full transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-white w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 text-center text-black bg-gray-50 text-xs">
        © {new Date().getFullYear()} FITSYNC — All rights reserved.
      </div>
    </footer>
  );
}
