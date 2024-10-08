"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { CardHoverEffectDemo } from "@/components/features";
import { InfiniteMovingCardsDemo } from "@/components/reviews";
import { TextGenerateEffectDemo } from "@/components/description";
import Footer from "@/components/footer";
import { useSession } from "next-auth/react";

export default function BackgroundBeamsDemo() {
  const { data: session } = useSession();
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
          <div>
            {session ? (
              <Link href={"/addRestaurant"}>
                <button className="relative inline-flex h-12 mt-4 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 hover:scale-105 transition ease-in focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF7F_0%,#008080_50%,#40E0D0_100%)]" />
                  <span className="inline-flex px-8 py-4 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 text-medium font-medium text-white backdrop-blur-3xl">
                    Get Started
                  </span>
                </button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <button className="relative inline-flex h-12 mt-4 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 hover:scale-105 transition ease-in focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF7F_0%,#008080_50%,#40E0D0_100%)]" />
                  <span className="inline-flex px-8 py-4 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 text-medium font-medium text-white backdrop-blur-3xl">
                    Login To Get Started
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="">
        <h2 className="text-4xl font-semibold text-center mt-16 mb-10">
          Our Featured Solutions
        </h2>
        <CardHoverEffectDemo /> {/*can use wobble cards */}
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
