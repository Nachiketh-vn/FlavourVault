"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Define the shape of the restaurant details state
interface RestaurantDetails {
  restaurantName: string;
  ownerName: string;
  city: string;
  restaurantContact: string;
  ownerContact: string;
  restaurantEmail: string;
  restaurantAddress: string;
}

const RestaurantForm: React.FC = () => {
  // State to store restaurant details
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails>(
    {
      restaurantName: "",
      ownerName: "",
      city: "",
      restaurantContact: "",
      ownerContact: "",
      restaurantEmail: "",
      restaurantAddress: "",
    }
  );

  // Handler for form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(restaurantDetails); // Can be sent to the backend here
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <BackgroundBeams />
      <div className="container mx-auto py-4 pb-8 px-4">
        <h1 className="text-4xl text-center font-bold text-emerald-600 mb-6">
          Register Your Restaurant
        </h1>

        {/* Restaurant Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-neutral-900 border-[1.5px] border-white p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Restaurant Name */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold mb-2"
              htmlFor="restaurantName"
            >
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              type="text"
              value={restaurantDetails.restaurantName}
              onChange={handleChange}
              placeholder="Enter your restaurant name"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Owner Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="ownerName">
              Owner Name
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              value={restaurantDetails.ownerName}
              onChange={handleChange}
              placeholder="Enter owner's name"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={restaurantDetails.city}
              onChange={handleChange}
              placeholder="Enter the city"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Restaurant Contact Number */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold mb-2"
              htmlFor="restaurantContact"
            >
              Restaurant Contact Number
            </label>
            <input
              id="restaurantContact"
              name="restaurantContact"
              type="tel"
              value={restaurantDetails.restaurantContact}
              onChange={handleChange}
              placeholder="Enter restaurant contact number"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Owner Contact Number */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold mb-2"
              htmlFor="ownerContact"
            >
              Owner Contact Number
            </label>
            <input
              id="ownerContact"
              name="ownerContact"
              type="tel"
              value={restaurantDetails.ownerContact}
              onChange={handleChange}
              placeholder="Enter owner's contact number"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Restaurant Email */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold mb-2"
              htmlFor="restaurantEmail"
            >
              Restaurant Email
            </label>
            <input
              id="restaurantEmail"
              name="restaurantEmail"
              type="email"
              value={restaurantDetails.restaurantEmail}
              onChange={handleChange}
              placeholder="Enter restaurant email"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Restaurant Address */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold mb-2"
              htmlFor="restaurantAddress"
            >
              Restaurant Address
            </label>
            <textarea
              id="restaurantAddress"
              name="restaurantAddress"
              value={restaurantDetails.restaurantAddress}
              onChange={handleChange}
              placeholder="Enter restaurant address"
              className="px-4 py-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition ease-in-out"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantForm;
