"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GiKnifeFork } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function Page({ params }) {
  const { id: restaurantId } = params;
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [isVegMode, setIsVegMode] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
          setSegments(data.sections || []);

          // Extract dishes for special sections
          const allDishes = data.sections.flatMap((section) => section.dishes);
          setBestSellers(allDishes.filter((dish) => dish.bestSeller));
          setMustTry(allDishes.filter((dish) => dish.mustTry));
          setTodaysSpecial(allDishes.filter((dish) => dish.todaysSpecial));
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

  const renderDishCard = (dish) => {
    // Extract the prices into an array
    const priceArray = dish.prices.map((price) => price.price);

    // Sort the prices in ascending order
    priceArray.sort((a, b) => a - b);

    // Get the minimum and maximum prices
    const minPrice = priceArray[0];
    const maxPrice = priceArray[priceArray.length - 1];

    // Determine if we should display a range or a single price
    const displayPrice =
      minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;

    return (
      <div
        key={dish._id.$oid}
        className=" p-2  border-[1.5px] flex-col border-gray-200 rounded-lg min-w-[160px] max-w-[160px]"
      >
        <Link href={""}>
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
              <GiKnifeFork className="w-28 h-24" />
            )}
            <h3 className="text-balance px-1 mt-2 text-gray-700 font-medium">
              {dish.dishName}
            </h3>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-900 font-bold">{displayPrice}</p>
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
    <div className="bg-gray-50">

      {/* search */}
      <div className=" flex items-center gap-4 rounded-b-2xl w-full p-4 ">
        <div className="bg-gray-50 gap-2 p-2 pl-4 h-12 rounded-full border border-gray-400 flex items-center w-full max-w-md">
          <IoIosSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 focus:outline-none ml-2 w-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <Label
            htmlFor="veg-mode"
            className="text-gray-700 flex flex-col text-center font-medium mb-1"
          >
            <span className="text-lg font-semibold">Veg</span>{" "}
            <span className="text-[10px] font-light relative"> mode</span>
          </Label>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isVegMode ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setIsVegMode(!isVegMode)}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                isVegMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* banner */}
      

      <div className="container bg-gray-50 mx-auto p-2">
        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Best Sellers</h2>
            <div className="flex overflow-x-auto space-x-2 custom-scroll">
              {bestSellers.map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Must Try Section */}
        {mustTry.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Must Try</h2>
            <div className="flex overflow-x-auto space-x-2 custom-scroll">
              {mustTry.map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Today's Special Section */}
        {todaysSpecial.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Today's Special</h2>
            <div className="flex overflow-x-auto space-x-2 custom-scroll">
              {todaysSpecial.map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Regular Menu Sections */}
        {segments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {segment.sectionName}
            </h2>
            <div className="flex overflow-x-auto space-x-2 custom-scroll">
              {segment.dishes.map(renderDishCard)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
