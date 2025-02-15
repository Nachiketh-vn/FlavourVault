"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GiKnifeFork } from "react-icons/gi";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Page({ params }) {
  const { id: restaurantId } = params;
  // const table = searchParams.table;
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [isVegMode, setIsVegMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
           console.log(menuData);

          setMenuData(data);
          setSegments(data.sections || []);

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

  const filterDishes = (dishes) => {
    return isVegMode ? dishes.filter((dish) => dish.isVeg) : dishes;
  };

  const filterBySearch = (dishes) => {
    if (!searchQuery) return dishes;
    return dishes.filter((dish) =>
      dish.dishName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filterSegmentsBySearch = (segments) => {
    if (!searchQuery) return segments;
    return segments.filter(
      (segment) =>
        segment.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.dishes.some((dish) =>
          dish.dishName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
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
    <div className="bg-gray-50">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 rounded-b-2xl w-full p-4 ">
        <div className="bg-gray-50 gap-2 p-2 pl-4 h-12 rounded-full border border-gray-400 flex items-center w-full">
          <IoIosSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 focus:outline-none ml-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className=" bg-gray-50 px-2 pb-4">
        {/* Today's Special Section */}
        {filterBySearch(filterDishes(todaysSpecial)).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Todays Special
            </h2>
            <div className="flex gap-2 overflow-x-auto custom-scroll">
              {filterBySearch(filterDishes(todaysSpecial)).map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Bestsellers Section */}
        {filterBySearch(filterDishes(bestSellers)).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bestsellers
            </h2>
            <div className="flex gap-2 overflow-x-auto custom-scroll">
              {filterBySearch(filterDishes(bestSellers)).map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Must Try Section */}
        {filterBySearch(filterDishes(mustTry)).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Must Try
            </h2>
            <div className="flex gap-2 overflow-x-auto custom-scroll">
              {filterBySearch(filterDishes(mustTry)).map(renderDishCard)}
            </div>
          </div>
        )}

        {/* Regular Menu Sections */}
        <div className="pb-6">
          {filterSegmentsBySearch(segments).map((segment) => {
            const filteredDishes = filterBySearch(filterDishes(segment.dishes));
            return (
              filteredDishes.length > 0 && (
                <div key={segment.sectionName} className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-gray-800 font-semibold">
                      {segment.sectionName}
                    </h2>
                    <Link
                      href={`/showMenu/showSegment/${segment._id}?restaurantId=${restaurantId}`}
                    >
                      <p className="text-sm text-blue-500">See All</p>
                    </Link>
                  </div>
                  <div className="flex gap-2 overflow-x-auto custom-scroll">
                    {filteredDishes.map(renderDishCard)}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-4 left-0 w-full flex justify-center">
        <div className="bg-white rounded-full shadow-lg flex border border-gray-300 w-11/12 max-w-md justify-around p-2">
          <div className="w-full text-center p-2 cursor-pointer">
            <Link href={`/addReview/${restaurantId}`}>
              <p className="text-gray-800 font-medium">Give Review</p>
            </Link>
          </div>
          <div className="border-l border-gray-300 h-full" />{" "}
          {/* Vertical line separator */}
          <div className="w-full text-center p-2 cursor-pointer">
            <p className="text-gray-800 font-medium">Call Waiter</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
