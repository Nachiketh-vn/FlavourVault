"use client";
import { useEffect, useState } from "react";

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
      <div key={dish._id.$oid} className="p-4 min-w-[200px]">
        <h3 className="text-lg font-bold mb-2">{dish.dishName}</h3>
        <p className="text-orange-500 font-semibold">{displayPrice}</p>
      </div>
    );
  };

  return (
    <div className="container bg-white mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {menuData?.restaurantName || "Restaurant Menu"}
      </h1>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Best Sellers</h2>
          <div className="flex overflow-x-auto space-x-4 custom-scroll">
            {bestSellers.map(renderDishCard)}
          </div>
        </div>
      )}

      {/* Must Try Section */}
      {mustTry.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Must Try</h2>
          <div className="flex overflow-x-auto space-x-4 custom-scroll">
            {mustTry.map(renderDishCard)}
          </div>
        </div>
      )}

      {/* Today's Special Section */}
      {todaysSpecial.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Special</h2>
          <div className="flex overflow-x-auto space-x-4 custom-scroll">
            {todaysSpecial.map(renderDishCard)}
          </div>
        </div>
      )}

      {/* Regular Menu Sections */}
      {segments.map((segment, segmentIndex) => (
        <div key={segmentIndex} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{segment.sectionName}</h2>
          <div className="flex overflow-x-auto space-x-4 custom-scroll">
            {segment.dishes.map(renderDishCard)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
