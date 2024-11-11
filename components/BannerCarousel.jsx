"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const BannerCarousel = () => {
  const [banners, setBanners] = useState(Array(5).fill(null)); // Array of 5 placeholders for images

  const handleUploadSuccess = (index, info) => {
    setBanners((prevBanners) => {
      const newBanners = [...prevBanners];
      newBanners[index] = info?.public_id; // Update the specific image slot
      return newBanners;
    });
  };

  const handleDelete = (index) => {
    setBanners((prevBanners) => {
      const newBanners = [...prevBanners];
      newBanners[index] = null; // Clear the image slot
      return newBanners;
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 mt-4 justify-center">
      {banners.map((publicId, index) => (
        <div
          key={index}
          className="relative border-[2px] border-gray-400 p-4 rounded-lg"
        >
          <h2 className="text-center pb-2">Banner {index + 1}</h2>
          {publicId ? (
            <div>
              <CldImage
                src={publicId}
                alt={`Banner ${index + 1}`}
                width="200"
                height="170"
              />
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <CldUploadWidget
                  uploadPreset="flavourVault"
                  onSuccess={({ event, info }) => {
                    if (event === "success") {
                      handleUploadSuccess(index, info);
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => open()}
                    >
                      Edit
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-[200px] h-[170px] bg-slate-700">
              </div>
              <CldUploadWidget
                uploadPreset="flavourVault"
                onSuccess={({ event, info }) => {
                  if (event === "success") {
                    handleUploadSuccess(index, info);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    className="bg-blue-500 text-white p-4 rounded-lg"
                    onClick={() => open()}
                  >
                    Upload an Image
                  </button>
                )}
              </CldUploadWidget>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BannerCarousel;
