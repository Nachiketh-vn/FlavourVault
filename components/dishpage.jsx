import React, { useEffect, useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import Image from "next/image";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Dishpage({ restaurantId }) {
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [isVegMode, setIsVegMode] = useState(false);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);

          // Shuffle segments before setting state
          const shuffledSegments = shuffleArray(data.sections || []);
          setSegments(shuffledSegments);
        } else {
          setError("Menu not found.");
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Failed to fetch menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return <div className="pt-2">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filterDishes = (dishes) => {
    return isVegMode ? dishes.filter((dish) => dish.isVeg) : dishes;
  };

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
    <div className="bg-gray-50 p-4">
      {segments.map((segment, segmentIndex) => {
        const filteredDishes = filterDishes(segment.dishes);
        return (
          filteredDishes.length > 0 && (
            <div key={segmentIndex} className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">
                  {segment.sectionName}
                </h2>
                <Link
                  href={`/showMenu/showSegment/${segment._id}?restaurantId=${restaurantId}`}
                >
                  <p className="text-sm text-blue-500">See All</p>
                </Link>
              </div>
              <div className="flex overflow-x-auto space-x-2 custom-scroll">
                {filteredDishes.map(renderDishCard)}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Dishpage;
