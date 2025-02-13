import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

function Page({ params }) {
  const { id: restaurantId } = params;
  return (
    <div className="flex flex-col overflow-y-auto">
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <h1 className="font-bold text-center text-2xl p-4">
          You can upload a Maximum of 5 Banners
        </h1>
        <p className="text-center">
          The banner images will be prominently displayed at the top of the menu
          in an automated carousel, providing a seamless and professional
          rotation for enhanced visual appeal.
        </p>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center space-y-8 p-8">
        {/* Banner 1 */}
        <div className="flex gap-8 justify-center items-center border-2 border-white rounded-lg p-4 w-96 hover:bg-gray-700 transition-colors duration-200">
          <h1 className="text-xl text-white">Banner 1</h1>
          <Link
            className="bg-blue-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-600 transition-all duration-300"
            href={""}
          >
            Upload/Edit Image
          </Link>
        </div>

        {/* Banner 2 */}
        <div className="flex gap-8 justify-center items-center border-2 border-white rounded-lg p-4 w-96 hover:bg-gray-700 transition-colors duration-200">
          <h1 className="text-xl text-white">Banner 2</h1>
          <Link
            className="bg-blue-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-600 transition-all duration-300"
            href={""}
          >
            Upload/Edit Image
          </Link>
        </div>

        {/* Banner 3 */}
        <div className="flex gap-8 justify-center items-center border-2 border-white rounded-lg p-4 w-96 hover:bg-gray-700 transition-colors duration-200">
          <h1 className="text-xl text-white">Banner 3</h1>
          <Link
            className="bg-blue-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-600 transition-all duration-300"
            href={`/banner/${restaurantId}/3`}
          >
            Upload/Edit Image
          </Link>
        </div>

        {/* Banner 4 */}
        <div className="flex gap-8 justify-center items-center border-2 border-white rounded-lg p-4 w-96 hover:bg-gray-700 transition-colors duration-200">
          <h1 className="text-xl text-white">Banner 4</h1>
          <Link
            className="bg-blue-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-600 transition-all duration-300"
            href={""}
          >
            Upload/Edit Image
          </Link>
        </div>

        {/* Banner 5 */}
        <div className="flex gap-8 justify-center items-center border-2 border-white rounded-lg p-4 w-96 hover:bg-gray-700 transition-colors duration-200">
          <h1 className="text-xl text-white">Banner 5</h1>
          <Link
            className="bg-blue-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-blue-600 transition-all duration-300"
            href={""}
          >
            Upload/Edit Image
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
