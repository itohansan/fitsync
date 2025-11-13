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
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch max-w-7xl mx-auto border-b-2 border-gray-200 overflow-hidden">
        {/* Left side - Image Section */}
        <div className="relative w-full h-[85vh] lg:h-[600px] overflow-hidden group">
          <Image
            src="/five.png"
            alt="AI gym training"
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end items-start text-white px-8 md:px-12 pb-12 md:pb-16">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                YOUR HIGH PERFORMANCE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  SANCTUARY
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                Become a Member and gain access to Unlimited Signature classes
                and features
              </p>
              <div className="flex gap-2 pt-2">
                <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-1 bg-purple-500 rounded-full"></div>
                <div className="w-4 h-1 bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-xl mx-auto w-full space-y-6">
            <div className="space-y-3">
              <div className="inline-block">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Get in Touch
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                Have questions or want to start your AI powered fitness journey?
                Fill out the form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isFormValid ? (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg
                      className="w-5 h-5"
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
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Disclaimer */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-700">Disclaimer:</span>{" "}
                All images and videos used on this site are for demonstration
                purposes only and do not belong to FITSYNC or its affiliates.
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Follow Us:
            </span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-900 hover:bg-blue-600 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-900 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-900 hover:bg-black rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              aria-label="Twitter / X"
            >
              <FaXTwitter className="text-white w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-900 hover:bg-blue-700 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-white w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t-2 border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-gray-900">FITSYNC</span> — All
              rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
