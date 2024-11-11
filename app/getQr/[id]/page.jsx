"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import QRCode from "qrcode"; // Import QRCode library
import Image from "next/image";
import { SiGooglelens } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

function Page({ params }) {
  const [value, setValue] = useState("");
  const { id: restaurantId } = params;
  const [qrUrl, setQrUrl] = useState("");

  const generateQrCode = async () => {
    try {
      // Constructing the complete URL with encoded table number or name
      const url = `http://localhost:3000/showMenu/${restaurantId}?table=${encodeURIComponent(
        value
      )}`;

      // Generate QR code with custom options (example: color and error correction level)
      const dataUrl = await QRCode.toDataURL(url, {
        color: {
          dark: "#000000", // QR Code color
          light: "#ffffff", // Background color
        },
        errorCorrectionLevel: "H", // Error correction level (H, L, M, Q)
      });

      setQrUrl(dataUrl);
    } catch (e) {
      console.error("Error generating QR Code", e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          QR Code Generator
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 mb-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter Total Number of Tables You have"
          />
          <button
            onClick={generateQrCode}
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Generate QR Code
          </button>
          {qrUrl && (
            <div className="mt-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-2">
                Your QR Code Banner:
              </h2>
              <div className="bg-[#d4d4d4] text-black p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-zinc-900">
                  Logo
                </h1>
                <h1 className="text-2xl font-bold mb-4 text-center text-zinc-900">
                  Table Menu
                </h1>
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div
                      className="relative rounded-lg border-4 border-gray-800 rounded-b-none overflow-hidden"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <Image
                        src={qrUrl}
                        alt="QR Code"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="bg-gray-800 text-white p-2">
                      <h1 className="text-center text-lg font-semibold">
                        Scan Me
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-700">
                  <p className="mb-4">
                    <strong>Scan and order your delicious meal.</strong> Use
                    this QR code to explore our menu and place your order.
                  </p>

                  <p className="text-center text-sm text-gray-600 mb-4">
                    <strong>How to Scan?</strong>
                  </p>
                  <p className="mb-2 flex items-center mx-2 gap-2">
                    <strong>Step 1:</strong> Open Google/Chrome{" "}
                    <span>
                      <FcGoogle />
                    </span>
                  </p>
                  <p className="mb-2 flex items-center mx-2 gap-2">
                    <strong>Step 2:</strong> Click on Google Lens{" "}
                    <span>
                      <SiGooglelens />
                    </span>
                  </p>
                  <p className="mb-2 flex items-center mx-2 gap-2">
                    <strong>Step 3:</strong> Scan the QR Code and Click on
                    Search{" "}
                    <span>
                      <CiSearch />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
