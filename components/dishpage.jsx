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
    return <div>Loading...</div>;
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
        <Link href={`/showDish/${dish._id}?restaurantId=${restaurantId}`}>
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
                <GiKnifeFork className="w-28 h-24" />
              </div>
            )}
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
            <div className="relative -top-2 flex pr-4">
              <button>
                <FaBookmark className="absolute text-gray-200 scale-125" />
                <CiBookmark className="absolute text-gray-500 scale-150 stroke-[1.01]" />
              </button>
            </div>
          </div>
        </Link>
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
                <p className="flex gap-2 text-sm font-semibold text-orange-500 mb-3 items-center">
                  See all
                </p>
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
