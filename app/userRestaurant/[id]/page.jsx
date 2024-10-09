"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { id: restaurantId } = params;
  const [loading, setLoading] = useState(true);
  const router = useRouter();



  const [segments, setSegments] = useState([
    {
      name: "",
      menus: [
        {
          name: "",
          prices: [{ quantity: "", price: "", serves: "" }],
          description: "",
          image: "",
          inStock: false, // Added stock status
        },
      ],
    },
  ]);

  const addSegment = () => {
    setSegments([
      ...segments,
      {
        name: "",
        menus: [
          {
            name: "",
            prices: [{ quantity: "", price: "", serves: "" }],
            description: "",
            image: "",
            inStock: false, // Added stock status
          },
        ],
      },
    ]);
  };

  const addMenu = (segmentIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].menus.push({
      name: "",
      prices: [{ quantity: "", price: "", serves: "" }],
      description: "",
      image: "",
      inStock: false, // Added stock status
    });
    setSegments(updatedSegments);
  };

  const addPrice = (segmentIndex, menuIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].menus[menuIndex].prices.push({
      quantity: "",
      price: "",
      serves: "",
    });
    setSegments(updatedSegments);
  };

  const deleteSegment = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    setSegments(updatedSegments);
  };

  const deleteMenu = (segmentIndex, menuIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].menus.splice(menuIndex, 1);
    setSegments(updatedSegments);
  };

  const deletePrice = (segmentIndex, menuIndex, priceIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].menus[menuIndex].prices.splice(priceIndex, 1);
    setSegments(updatedSegments);
  };

    useEffect(() => {
      const checkMenu = async () => {
        try {
          const response = await fetch(
            `/api/menu?restaurantId=${restaurantId}`
          );
          const data = await response.json();

          if (response.ok && data) {
            // If menu exists, redirect to another page
            router.push(`/user/menu/${restaurantId}`);
          } else {
            // If no menu exists, let the user continue on the current page
            setLoading(false); // Stop loading
          }
        } catch (error) {
          console.error("Error checking menu:", error);
          setLoading(false); // Stop loading even if there's an error
        }
      };

      checkMenu();
    }, [router, restaurantId]);

    if (loading) {
      return <div>Loading...</div>; // Show a loading spinner or message
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: restaurantId,
          segments: segments.map((segment) => ({
            name: segment.name,
            dishes: segment.menus.map((menu) => ({
              dishName: menu.name,
              prices: menu.prices.map((price) => ({
                quantity: price.quantity,
                price: price.price,
                serves: price.serves,
              })),
              description: menu.description,
              image: menu.image,
              inStock: menu.inStock, // Include stock status
            })),
          })),
        }),
      });
      const data = await response.json();
      toast.success("Menu has been created Successfully");
      console.log(data);
      router.push(`/user/menu/${restaurantId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black text-gray-200 container mx-auto px-8 py-4 rounded-lg shadow-md">
        <h2
          className="text-5xl -mt-6 text-center md:text-5xl font-bold text-transparent text-emerald-900 mb-8"
          style={{
            WebkitTextStroke: "1px white",
            textStroke: "1px white",
          }}
        >
          Add Menu
        </h2>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Segment and Menu Fields */}
          {segments.map((segment, segmentIndex) => (
            <div
              key={segmentIndex}
              className="border border-gray-600 p-4 rounded-lg mb-6 bg-neutral-800 relative"
            >
              {segments.length > 1 && (
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  type="button"
                  onClick={() => deleteSegment(segmentIndex)}
                >
                  Delete Segment
                </button>
              )}
              <input
                className="border border-gray-400 rounded p-2 w-full mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Segment Name (eg. Startes, Deserts, etc..)"
                value={segment.name}
                onChange={(e) => {
                  const updatedSegments = [...segments];
                  updatedSegments[segmentIndex].name = e.target.value;
                  setSegments(updatedSegments);
                }}
                required
              />
              {segment.menus.map((menu, menuIndex) => (
                <div
                  key={menuIndex}
                  className="border-t border-gray-600 pt-4 mt-4 relative"
                >
                  {segment.menus.length > 1 && (
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      type="button"
                      onClick={() => deleteMenu(segmentIndex, menuIndex)}
                    >
                      Delete Dish
                    </button>
                  )}
                  {/* Dish Name */}
                  <input
                    className="border border-gray-400 rounded p-2 w-full mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Dish Name"
                    value={menu.name}
                    onChange={(e) => {
                      const updatedSegments = [...segments];
                      updatedSegments[segmentIndex].menus[menuIndex].name =
                        e.target.value;
                      setSegments(updatedSegments);
                    }}
                    required
                  />

                  {/* Stock Status */}
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="border-gray-400 rounded text-white cursor-pointer"
                      checked={menu.inStock}
                      onChange={(e) => {
                        const updatedSegments = [...segments];
                        updatedSegments[segmentIndex].menus[menuIndex].inStock =
                          e.target.checked;
                        setSegments(updatedSegments);
                      }}
                    />
                    <span className="ml-2">In Stock</span>
                  </label>

                  {/* Price Options */}
                  {menu.prices.map((price, priceIndex) => (
                    <div
                      key={priceIndex}
                      className="grid grid-cols-3 gap-4 mb-4"
                    >
                      <input
                        className="border border-gray-400 rounded p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Quantity (eg. Full,Half, etc...)"
                        value={price.quantity}
                        onChange={(e) => {
                          const updatedSegments = [...segments];
                          updatedSegments[segmentIndex].menus[menuIndex].prices[
                            priceIndex
                          ].quantity = e.target.value;
                          setSegments(updatedSegments);
                        }}
                        required
                      />
                      <input
                        className="border border-gray-400 rounded p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number"
                        placeholder="Price"
                        value={price.price}
                        onChange={(e) => {
                          const updatedSegments = [...segments];
                          updatedSegments[segmentIndex].menus[menuIndex].prices[
                            priceIndex
                          ].price = e.target.value;
                          setSegments(updatedSegments);
                        }}
                        required
                      />
                      <input
                        className="border border-gray-400 rounded p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Serves (eg. 1,2,...)"
                        value={price.serves}
                        onChange={(e) => {
                          const updatedSegments = [...segments];
                          updatedSegments[segmentIndex].menus[menuIndex].prices[
                            priceIndex
                          ].serves = e.target.value;
                          setSegments(updatedSegments);
                        }}
                      />
                      {menu.prices.length > 1 && (
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          type="button"
                          onClick={() =>
                            deletePrice(segmentIndex, menuIndex, priceIndex)
                          }
                        >
                          Delete Price
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add Price Option */}
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    type="button"
                    onClick={() => addPrice(segmentIndex, menuIndex)}
                  >
                    Add New Price Option
                  </button>

                  {/* Description */}
                  <textarea
                    className="border border-gray-400 rounded p-2 w-full my-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description"
                    value={menu.description}
                    onChange={(e) => {
                      const updatedSegments = [...segments];
                      updatedSegments[segmentIndex].menus[
                        menuIndex
                      ].description = e.target.value;
                      setSegments(updatedSegments);
                    }}
                  />

                  {/* Image URL */}
                  <input
                    className="border border-gray-400 rounded p-2 w-full mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Image URL (Optional)"
                    value={menu.image}
                    onChange={(e) => {
                      const updatedSegments = [...segments];
                      updatedSegments[segmentIndex].menus[menuIndex].image =
                        e.target.value;
                      setSegments(updatedSegments);
                    }}
                  />
                </div>
              ))}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                type="button"
                onClick={() => addMenu(segmentIndex)}
              >
                Add New Dish
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            type="button"
            onClick={addSegment}
          >
            Add New Segment
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            type="submit"
          >
            Submit Menu
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
