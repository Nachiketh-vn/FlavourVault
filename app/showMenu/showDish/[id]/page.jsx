"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaArrowLeftLong, FaFire } from "react-icons/fa6";
import { GiKnifeFork, GiChiliPepper } from "react-icons/gi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Dishpage from "../../../../components/dishpage";

const SpicinessIndicator = ({ spiciness }) => {
  const maxChilies = 5;
  return (
    <div className="flex items-center border-[1.5px] my-2 border-gray-400 rounded-lg px-1 py-[2px]">
      {[...Array(maxChilies)].map((_, index) => (
        <GiChiliPepper
          key={index}
          className={`w-4 h-4 ${
            index < spiciness ? "text-red-500" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

function Page({ params, searchParams }) {
  const { id: dishId } = params;
  const restaurantId = searchParams.restaurantId;
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!dishId || !restaurantId) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchDishDetails = async () => {
      try {
        const response = await fetch(
          `/api/dish?id=${dishId}&restaurantId=${restaurantId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setDish((prevDish) =>
            JSON.stringify(prevDish) !== JSON.stringify(data) ? data : prevDish
          );
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching dish:", error);
          setError("Failed to load dish details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDishDetails();

    return () => {
      isMounted = false;
    };
  }, [dishId, restaurantId]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!dish) return <div className="p-4 text-center">Dish not found</div>;

  return (
    <div className="bg-gray-50 h-[100vh]">
      <div>
        <button
          onClick={() => router.back()}
          className="text-black px-4 pt-4 pb-2"
        >
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
              priority
            />
          </div>
        ) : (
          <div className="flex justify-center mx-auto">
            <div className="w-72 h-48 flex justify-center rounded-lg items-center bg-gray-200 border-2 border-gray-400">
              <GiKnifeFork className="w-48 h-40 text-gray-500" />
            </div>
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
                <span className="text-base font-medium">
                  {priceDetail.quantity}
                </span>
                :{" "}
                <span className="text-base font-semibold">
                  ₹ {priceDetail.price}
                </span>{" "}
                <span className="text-base font-medium">
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
            {dish.spiciness > 0 && (
              <SpicinessIndicator spiciness={dish.spiciness} />
            )}
          </div>
        </div>
      </div>

      <hr className="border-1 relative border-gray-400 top-2 mx-6" />

      {/* Dishpage is now properly passed a stable prop */}
      {/* <Dishpage key={restaurantId} restaurantId={restaurantId} /> */}
    </div>
  );
}

export default Page;
