"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiChiliPepper } from "react-icons/gi";

function page({ params, searchParams }) {
  const { id: dishId } = params;
  const restaurantId = searchParams.restaurantId;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

   const router = useRouter();

   const handleGoBack = () => {
     router.back(); // Go back to the previous page
   };

  useEffect(() => {
    // Fetch dish details if both IDs are present
    const fetchDishDetails = async () => {
      if (dishId && restaurantId) {
        try {
          const response = await fetch(
            `/api/dish?id=${dishId}&restaurantId=${restaurantId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch dish details");
          }
          const data = await response.json();
          setDish(data); // Store the dish details in state
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchDishDetails();
  }, [dishId, restaurantId]); // Depend on dishId and restaurantId

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if dish details are available
  if (!dish) {
    return <div>Dish not found</div>; // Fallback message if dish details are not available
  }

  const SpicinessIndicator = ({ spiciness }) => {
    const maxChilies = 5; // Maximum number of chilies

    return (
      <div className="flex items-center border-[1.5px] my-2 border-gray-400 rounded-lg px-1 py-[2px]">
        {/* Render chili peppers */}
        {[...Array(maxChilies)].map((_, index) => (
          <GiChiliPepper
            key={index}
            className={`w-4 h-4 ${
              index < spiciness ? "text-red-500" : "text-gray-400"
            }`} // Fill color based on spiciness
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 h-[100vh]">
      <div>
        <button onClick={handleGoBack} className=" text-black px-4 pt-4 pb-2">
          <FaArrowLeftLong className="scale-150" />
        </button>
      </div>
      <div className="flex-col p-4 items-center justify-center">
        {dish.image ? (
          <div className="flex justify-center">
            <Image
              src={dish.image}
              alt={dish.dishName}
              width={100}
              height={100}
              className="object-cover rounded-lg w-72 h-48"
            />
          </div>
        ) : (
          <div className="flex justify-center ">
            <GiKnifeFork className="w-72 h-48" />
          </div>
        )}

        <h3 className="text-balance text-center text-xl px-1 mt-2 text-gray-800 font-semibold">
          {dish.dishName}
        </h3>

        <p className="text-balance text-center text-md px-1 mt-2 text-gray-600 font-semibold">
          {dish.description}
        </p>
      </div>
      <div className="px-2 flex justify-around items-center">
        <div>
          <ul>
            {dish.prices.map((priceDetail, index) => (
              <li key={index}>
                <span className="text-base font-medium ">
                  {priceDetail.quantity}
                </span>
                :{" "}
                <span className="text-base font-semibold ">
                  {" "}
                  ₹ {priceDetail.price}
                </span>{" "}
                <span className="text-base font-medium ">
                  (Serves: {priceDetail.serves})
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-col">
          <div className="flex items-center gap-2">
            {dish.todaysSpecial && (
              <p className="bg-[#ef4444] w-14 flex justify-center items-center text-[10px] px-2 py-[1.5px] text-white font-semibold rounded-lg">
                TodaySpl
              </p>
            )}
            {dish.bestSeller && (
              <p className="bg-yellow-400 w-6 flex justify-center items-center text-[10px] px-2 py-1 text-white font-semibold rounded-lg">
                <FaFire className="text-white" />
              </p>
            )}
            {dish.mustTry && (
              <p className="bg-[#3b82f6] w-6 flex justify-center items-center text-[10px] py-1 text-white font-semibold rounded-lg">
                <FaStar className="text-white" />
              </p>
            )}
          </div>
          <div>
            {dish.spiciness && (
              <SpicinessIndicator spiciness={dish.spiciness} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

{
  /* <div className="relative -top-2 flex pr-4">
          <button>
            <FaBookmark className="absolute text-gray-200 scale-125" />
            <CiBookmark className="absolute text-gray-500 scale-150 stroke-[1.01]" />
          </button>
        </div> */
}