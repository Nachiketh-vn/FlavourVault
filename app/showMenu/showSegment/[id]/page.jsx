"use client";
import React, { useState, useEffect } from "react";
import { FaFire, FaStar } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Page({ params, searchParams }) {
  const { id: segmentId } = params;
  const restaurantId = searchParams.restaurantId;
  const [dishes, setDishes] = useState([]);
  const [segmentName, setSegmentName] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Go back to the previous page
  };

  useEffect(() => {
    // Fetch segment and dishes if both IDs are present
    const fetchSegmentDetails = async () => {
      if (segmentId && restaurantId) {
        try {
          const response = await fetch(
            `/api/segment?id=${segmentId}&restaurantId=${restaurantId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch segment details");
          }
          const data = await response.json();
          setSegmentName(data.segmentName); // Store the segment name in state
          setDishes(data.dishes); // Store the fetched dishes in state
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchSegmentDetails();
  }, [segmentId, restaurantId]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if dishes are available
  if (!dishes.length) {
    return <div>No dishes found</div>; // Fallback message if no dishes are available
  }

  const renderDishCard = (dish) => {
    const priceArray = dish.prices.map((price) => price.price);
    priceArray.sort((a, b) => a - b);
    const minPrice = priceArray[0];
    const maxPrice = priceArray[priceArray.length - 1];
    const displayPrice =
      minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;

    return (
      <div
        key={dish._id.$oid}
        className="p-2 bg-white border-[1.5px] flex-col border-gray-200 rounded-lg min-w-[160px] max-w-[160px]"
      >
        <div>
          {dish.image ? (
            <div className="flex justify-center">
              <Image
                src={dish.image}
                alt={dish.dishName}
                width={100}
                height={100}
                className="object-cover rounded-md w-32 h-24"
              />
            </div>
          ) : (
            <div className="flex justify-center ">
              <div className="border-2 border-gray-400 bg-gray-200 w-32 h-24 flex justify-center items-center rounded-md">
                <GiKnifeFork className="w-20 h-16 text-gray-500" />
              </div>
            </div>
          )}

          <hr className="border-1 relative top-3 border-gray-400 pt-2" />

          <div className="flex py-1 items-center gap-2">
            {dish.todaysSpecial && (
              <p className="bg-[#ef4444] relative top-2 w-14 flex justify-center items-center text-[10px] px-2 py-[1.5px] text-white font-semibold rounded-lg">
                TodaySpl
              </p>
            )}
            {dish.bestSeller && (
              <p className="bg-yellow-400 relative top-2 w-6 flex justify-center items-center text-[10px] px-2 py-1 text-white font-semibold rounded-lg">
                <FaFire className="text-white" />
              </p>
            )}
            {dish.mustTry && (
              <p className="bg-[#3b82f6] relative top-2 w-6 flex justify-center items-center text-[10px] py-1 text-white font-semibold rounded-lg">
                <FaStar className="text-white" />
              </p>
            )}
          </div>
          <h3 className="text-balance px-1 mt-2 text-gray-700 font-medium">
            {dish.dishName}
          </h3>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-900 pl-1 font-bold">{displayPrice}</p>
        </div>
        <div className="pl-1 flex justify-between">
          <Link
            href={`/showMenu/showDish/${dish._id}?restaurantId=${restaurantId}`}
          >
            <p className="text-sm text-gray-400 hover:text-gray-500 flex items-center underline">
              View more{" "}
              <span className="relative top-[1px]">
                <MdKeyboardDoubleArrowRight />
              </span>
            </p>
          </Link>
          {dish.isVeg ? (
            <div className="relative top-1 left-2 flex pr-4">
              <div className="w-4 h-4 border-2 border-green-600 flex rounded justify-center items-center">
                <div className=" w-2 h-2 rounded-full bg-green-600"></div>
              </div>
            </div>
          ) : (
            <div className="relative top-1 left-2 flex pr-4">
              <div className="w-4 h-4 border-2 border-red-600 flex rounded justify-center items-center">
                <div className=" w-2 h-2 rounded-full bg-red-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 h-[100vh]">
      <div className="inline-block">
        <button onClick={handleGoBack} className=" text-black px-4 pt-4 pb-2">
          <FaArrowLeftLong className="scale-150" />
        </button>
      </div>
      <div className="absolute top-2 left-[44vw]">
        <h1 className="text-2xl text-gray-900 font-semibold">{segmentName}</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {dishes.map((dish) => renderDishCard(dish))}
      </div>
    </div>
  );
}

export default Page;
