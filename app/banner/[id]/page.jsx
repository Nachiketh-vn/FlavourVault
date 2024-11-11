import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BannerCarousel from "@/components/BannerCarousel";

function Page({ params }) {
  const { id: restaurantId } = params;
  return (
    <div className="flex flex-col overflow-y-auto">
    
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-2xl p-4">
          You can upload a Maximum of 5 Banners
        </h1>
        <p className="text-center">
          The banner images will be prominently displayed at the top of the menu
          in an automated carousel, providing a seamless and professional
          rotation for enhanced visual appeal.
        </p>
      </div>
      <div className="flex-grow">
        <BannerCarousel />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
