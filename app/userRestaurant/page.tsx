"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { IoMdAdd } from "react-icons/io";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { FaHotel } from "react-icons/fa";

interface Restaurant {
  _id: string;
  restaurantName: string;
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const Uemail = session?.user?.email || "";
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");

      if (Uemail) {
        try {
          const response = await fetch(`/api/restaurant?email=${Uemail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("No restaurants found for this user.");
            } else {
              throw new Error("Failed to fetch restaurants");
            }
          }

          const data: Restaurant[] = await response.json();
          setRestaurants(data);
        } catch (err) {
          console.error(err);

          const errorMessage =
            err instanceof Error
              ? err.message
              : "An unexpected error occurred.";
          setError(
            errorMessage ||
              "Failed to load restaurants. Please try again later."
          );
        }
      }

      setLoading(false);
    };

    fetchRestaurants();
  }, [Uemail]);

  return (
    <div>
      <Navbar />
      <BackgroundBeams />
      <div className="text-white flex justify-center py-4">
        <h1 className="text-2xl">
          Welcome{" "}
          <span className="text-emerald-600 font-semibold">
            {session?.user?.name}
          </span>
        </h1>
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <h2 className="text-xl text-white mb-4">Manage Your Restaurants</h2>
        <div className="flex flex-wrap items-center gap-4">
          {loading ? (
            <p className="text-gray-400">Loading restaurants...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-4">
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <Link
                    key={restaurant._id}
                    href={`/userRestaurant/${restaurant._id}`}
                    className="flex flex-col items-center w-40"
                  >
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                        <FaHotel className="text-gray-300 text-5xl" />
                      </div>
                      <p className="text-md font-semibold text-center text-gray-100 mt-2">
                        {restaurant.restaurantName}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-emerald-600">No restaurants found. Add One!</p>
              )}
            </div>
          )}
          <Link
            href="/newRestaurant"
            className="flex flex-col items-center w-40 mt-4"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <IoMdAdd className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Add Restaurant
              </p>
            </div>
          </Link>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-300 text-center my-8">
          Steps to Register a Restaurant
        </h1>

        <div className="space-y-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-600">
              1. Click on "Add Restaurant":
            </h2>
            <p className="text-gray-700 mt-2">
              Locate and click the{" "}
              <span className="font-bold">"Add Restaurant"</span> button to
              begin the registration process.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-600">
              2. Fill Out the Required Fields:
            </h2>
            <p className="text-gray-700 mt-2">
              Complete all the necessary fields in the registration form,
              including details such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
              <li>Restaurant Name</li>
              <li>Restaurant Owner</li>
              <li>City</li>
              <li>Restaurant Contact Number</li>
              <li>Owner Contact Number</li>
              <li>Restaurant Email</li>
              <li>Address</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-600">
              3. Click "Submit":
            </h2>
            <p className="text-gray-700 mt-2">
              After filling out all the fields, click the{" "}
              <span className="font-bold">"Submit"</span> button to save your
              restaurant details.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-orange-600">
              4. Manage Your Restaurants:
            </h2>
            <p className="text-gray-700 mt-2">
              Once registered, click on your preferred restaurant from the list
              to make changes or manage its details.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
