"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GiKnifeFork } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";

function Page({ params }) {
  const { id: restaurantId } = params;
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [todaysSpecial, setTodaysSpecial] = useState([]);

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
        className=" p-2  border-[1.5px] border-gray-200 rounded-lg min-w-[160px] max-w-[160px]"
      >
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
        <div className="flex  flex-col px-1">
          <h3 className="text-balance mt-2 text-gray-700 font-medium">
            {dish.dishName}
          </h3>
          <div className="flex justify-between">
            <p className="text-gray-900 font-bold">{displayPrice}</p>
            <div className="relative flex top-1 pr-4">
              <FaBookmark className="absolute text-gray-200 scale-125" />
              <CiBookmark className="absolute text-gray-500 scale-150 stroke-[1.01]" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container bg-gray-50 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {menuData?.restaurantName || "Restaurant Menu"}
      </h1>

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
          <h2 className="text-xl font-semibold mb-4">{segment.sectionName}</h2>
          <div className="flex overflow-x-auto space-x-2 custom-scroll">
            {segment.dishes.map(renderDishCard)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
