"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";

function Page({ params }) {
  const { id: restaurantId } = params;
  const { num: bannerNumber } = params;

  const [publicId, setPublicId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the existing banner image when the component mounts
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `/api/banner?restaurantId=${restaurantId}&bannerNumber=${bannerNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          setPublicId(data.publicId || "");
        } else {
          setMessage("No banner found.");
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
        setMessage("Failed to fetch banner.");
      }
    };

    fetchBanner();
  }, [restaurantId, bannerNumber]);

  // const handleBannerUpload = async () => {
  //   // Check if the publicId is set
  //   if (!publicId) {
  //     toast.error("Upload failed. No image available to upload.");
  //     return;
  //   }

  //   const bannerData = {
  //     restaurantId,
  //     bannerNumber,
  //     publicId,
  //   };

  //   console.log("Uploading banner with data:", bannerData); // Debugging log

  //   try {
  //     const response = await fetch("/api/banner", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bannerData),
  //     });

  //     if (response.ok) {
  //       toast.success(`Banner ${bannerNumber} uploaded successfully!`);
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(`Error: ${errorData.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading banner:", error);
  //     toast.error("An error occurred while uploading the banner.");
  //   }
  // };

  const handleSaveBanner = async () => {
    // Proceed to save the banner
    const bannerData = {
      restaurantId,
      bannerNumber,
      publicId,
    };

    try {
      const response = await fetch("/api/banner", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bannerData),
      });

      if (response.ok) {
        toast.success(`Banner ${bannerNumber} saved successfully!`);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("An error occurred while saving the banner.");
    }
  };

  const handleDeleteBanner = async () => {
    try {
      const response = await fetch("/api/banner", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId, bannerNumber }),
      });

      if (response.ok) {
        setPublicId(""); // Clear the image
        toast.success(`Banner ${bannerNumber} deleted successfully!`);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("An error occurred while deleting the banner.");
    }
  };

  return (
    <div>
      <h2>Banner {bannerNumber}</h2>
      {publicId ? (
        <div>
          <CldImage
            src={publicId}
            alt="Banner"
            width={"300"}
            height={"180"}
            className="rounded-lg"
          />
          <button
            onClick={handleDeleteBanner}
            className="bg-red-500 p-2 rounded-lg mt-4"
          >
            Delete Banner
          </button>
          {/* Save button visible when publicId is present */}
          <button
            onClick={handleSaveBanner}
            className="bg-green-500 p-2 rounded-lg mt-4"
          >
            Save Banner
          </button>
        </div>
      ) : (
        <div>
          <CldUploadWidget
            uploadPreset="flavourVault"
            onSuccess={({ event, info }) => {
              if (event === "success") {
                setPublicId(info?.public_id);
                toast.success("Image uploaded successfully!");
              }
            }}
          >
            {({ open }) => (
              <button
                className="bg-blue-500 p-4 rounded-lg"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Page;
