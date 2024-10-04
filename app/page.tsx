"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { BentoGridSecondDemo } from "@/components/features";
import { InfiniteMovingCardsDemo } from "@/components/reviews";
import { TextGenerateEffectDemo } from "@/components/description";
import Footer from "@/components/footer";

export default function BackgroundBeamsDemo() {
  return (
    <div className="text-white">
      <Navbar />
      <BackgroundBeams />

      {/* Hero */}
      <div className="mt-[4rem] flex flex-1 items-center justify-center p-4">
        <div className="w-4/5 lg:w-4/5 space-y-6 text-center lg:text-center">
          <h1 className="text-4xl font-extrabold lg:text-6xl">
            Advanced <span className="text-[#2b9c2b]">Smart QR Menu</span>{" "}
            Solutions for Modern Restaurants
          </h1>
          <div className="flex justify-center">
            <TextGenerateEffectDemo />
          </div>
          <div className="mt-[]">
            <Link
              href="/get-started"
              className="inline-block  px-6 py-3 mt-6 font-medium text-lg text-white bg-[#228b22] rounded-lg hover:bg-[#196a19]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="">
        <h2 className="text-4xl font-semibold text-center mt-16 mb-10">
          Our Featured Solutions
        </h2>
        <BentoGridSecondDemo /> {/*can use wobble cards */}
      </div>

      {/* Reviews */}
      <div className="">
        <h2 className="text-4xl font-semibold text-center relative top-[5rem]">
          What Our Customers Say
        </h2>
        {/* Add reviews component */}
      <InfiniteMovingCardsDemo />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
