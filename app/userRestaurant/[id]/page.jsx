"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { VscPreview } from "react-icons/vsc";
import { BsQrCode } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BiSolidCarousel } from "react-icons/bi";

export default function Page({ params }) {
  const { id } = params;
  // const router = useRouter();
  const restaurantId = id; // Changed to restaurant ID
  const [menuPresent, setMenuPresent] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  // State to track limits
  const [bestsellerCount, setBestsellerCount] = useState(15);
  const [todaySpecialCount, setTodaySpecialCount] = useState(5);
  const [mustTryCount, setMustTryCount] = useState(15);

  useEffect(() => {
    async function fetchMenuSections() {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        const data = await response.json();
        if (data.sections) {
          setMenuPresent(true);
        }
      } catch (error) {
       console.log(error.message);
      }
    }

    fetchMenuSections();
  }, [submitCount, restaurantId]);

  const [segments, setSegments] = useState([
    {
      sectionName: "",
      dishes: [
        {
          dishName: "",
          description: "",
          prices: [{ quantity: "", price: "", serves: "" }],
          image: "", // Image URL
          inStock: true,
          spiciness: "",
          isVeg: true,
          bestSeller: false,
          todaysSpecial: false,
          mustTry: false,
        },
      ],
    },
  ]);

  const addSegment = () => {
    setSegments([
      ...segments,
      {
        sectionName: "",
        dishes: [
          {
            dishName: "",
            description: "",
            prices: [{ quantity: "", price: "", serves: "" }],
            image: "", // Image URL
            inStock: true,
            spiciness: "",
            isVeg: true,
            bestSeller: false,
            todaysSpecial: false,
            mustTry: false,
          },
        ],
      },
    ]);
  };

  const addDish = (segmentIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].dishes.push({
      dishName: "",
      description: "",
      prices: [{ quantity: "", price: "", serves: "" }],
      image: "", // Image URL
      inStock: true,
      spiciness: "",
      isVeg: true,
      bestSeller: false,
      todaysSpecial: false,
      mustTry: false,
    });
    setSegments(updatedSegments);
  };

  const addPriceOption = (segmentIndex, dishIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].dishes[dishIndex].prices.push({
      quantity: "",
      price: "",
      serves: "",
    });
    setSegments(updatedSegments);
  };

  const handleChange = (e, segmentIndex, dishIndex, field) => {
    const updatedSegments = [...segments];
    const isChecked = e.target.checked;

    if (field === "bestSeller") {
      if (isChecked && bestsellerCount > 0) {
        setBestsellerCount(bestsellerCount - 1);
      } else if (!isChecked) {
        setBestsellerCount(bestsellerCount + 1);
      } else {
        alert("Best Seller limit reached");
        return; // Prevent state change if limit is reached
      }
    }

    if (field === "todaysSpecial") {
      if (isChecked && todaySpecialCount > 0) {
        setTodaySpecialCount(todaySpecialCount - 1);
      } else if (!isChecked) {
        setTodaySpecialCount(todaySpecialCount + 1);
      } else {
        alert("Today's Special limit reached");
        return; // Prevent state change if limit is reached
      }
    }

    if (field === "mustTry") {
      if (isChecked && mustTryCount > 0) {
        setMustTryCount(mustTryCount - 1);
      } else if (!isChecked) {
        setMustTryCount(mustTryCount + 1);
      } else {
        alert("Must Try limit reached");
        return; // Prevent state change if limit is reached
      }
    }

    updatedSegments[segmentIndex].dishes[dishIndex][field] = isChecked;
    setSegments(updatedSegments);
  };

  const handleDeleteSegment = (segmentIndex) => {
    if (segments.length > 1) {
      const updatedSegments = [...segments];
      updatedSegments.splice(segmentIndex, 1);
      setSegments(updatedSegments);
    } else {
      alert("Cannot delete the last segment!");
    }
  };

  const handleDeleteDish = (segmentIndex, dishIndex) => {
    if (segments[segmentIndex].dishes.length > 1) {
      const updatedSegments = [...segments];
      updatedSegments[segmentIndex].dishes.splice(dishIndex, 1);
      setSegments(updatedSegments);
    } else {
      alert("Cannot delete the last dish in a segment!");
    }
  };

  const handleDeletePriceOption = (segmentIndex, dishIndex, priceIndex) => {
    if (segments[segmentIndex].dishes[dishIndex].prices.length > 1) {
      const updatedSegments = [...segments];
      updatedSegments[segmentIndex].dishes[dishIndex].prices.splice(
        priceIndex,
        1
      );
      setSegments(updatedSegments);
    } else {
      alert("Cannot delete the last price option!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const menuData = {
      restaurantId,
      sections: segments,
      totalbs: bestsellerCount,
      totalts: todaySpecialCount,
      totalmt: mustTryCount,
    };

    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        // const data = await response.json();
        setSubmitCount(submitCount + 1); // Increment submit count for tracking
        toast.success("Menu Created Successfuly"); // Display success message
        // Optionally reset the form or redirect
      } else {
        // const errorData = await response.json();
        // alert(`Error: ${errorData.message}`); // Display error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form.Check All Value of serves they should be greater or equal to 1"
      );
    }
  };

  return (
    <div>
      <Navbar />
      <BackgroundBeams />

      <div class=" text-white p-6 rounded-lg">
        <h1 class="text-2xl font-bold mb-4 text-orange-500">
          Important Points To Remember:
        </h1>
        <ul class="list-disc list-inside space-y-4">
          <li>
            <span class="font-semibold">Section</span> is the same as
            Categories, and the Section Name is required. Examples of Sections
            are appetizers, salads, entrees, sides, desserts, and beverages.
          </li>
          <li>
            <span class="font-semibold">Dish Name</span> is required. Examples
            of Dish Names are Aloo Gobi, Butter Chicken.
          </li>
          <li>
            The three sections in <span class="font-semibold">Price</span> are
            to add price for the dish based on the quantity served (Full, Half,
            etc.). If you only have one type of quantity for any particular
            dish, name it as Full.
          </li>
          <li>
            <span class="font-semibold">In Stock</span> is important to declare
            correctly. If not checked, the dish will be displayed as out of
            stock.
          </li>
          <li>
            Please mark <span class="font-semibold">Best Seller</span>,{" "}
            <span class="font-semibold">Todays Special</span>, and{" "}
            <span class="font-semibold">Must Try</span> precisely, as you will
            be allowed a maximum of 15, 5, and 15 dishes respectively to display
            as Best Seller.
          </li>
        </ul>
      </div>

      {menuPresent ? (
        <div className="flex flex-row gap-4 pb-4">
          <Link
            href={`/editMenu/${restaurantId}`}
            className="flex flex-col items-center w-40"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <FaEdit className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Edit Menu
              </p>
            </div>
          </Link>
          <Link
            href={`/banner/${restaurantId}`}
            className="flex flex-col items-center w-40"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <BiSolidCarousel className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Banner
              </p>
            </div>
          </Link>
          <Link
            href={`/showMenu/${restaurantId}`}
            className="flex flex-col items-center w-40"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <VscPreview className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Show Preview
              </p>
            </div>
          </Link>
          <Link
            href={`/getQr/${restaurantId}`}
            className="flex flex-col items-center w-40"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <BsQrCode className="text-gray-300 text-4xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Get Qr Code
              </p>
            </div>
          </Link>
          <Link
            href={`/adminDashboard/${restaurantId}`}
            className="flex flex-col items-center w-40"
          >
            <div className="flex flex-col items-center cursor-pointer">
              <div className="h-20 w-20 rounded-lg border-[1.5px] border-white bg-neutral-900 flex justify-center items-center hover:scale-105 transition ease-in">
                <RxDashboard className="text-gray-300 text-5xl" />
              </div>
              <p className="text-md font-semibold text-center text-gray-100 mt-2">
                Dashboard
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-800 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">Add Your Menu</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {segments.map((segment, segmentIndex) => (
              <div
                key={segmentIndex}
                className="p-4 border border-gray-600 rounded-lg relative"
              >
                <input
                  className="p-3 w-full mb-4 border border-gray-600 rounded-lg bg-gray-700"
                  type="text"
                  placeholder="Section Name"
                  value={segment.sectionName}
                  onChange={(e) => {
                    const updatedSegments = [...segments];
                    updatedSegments[segmentIndex].sectionName = e.target.value;
                    setSegments(updatedSegments);
                  }}
                  required
                />
                <button
                  className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => handleDeleteSegment(segmentIndex)}
                >
                  X
                </button>
                {segment.dishes.map((dish, dishIndex) => (
                  <div key={dishIndex} className="mb-4 relative">
                    <input
                      className="p-2 w-full mb-2 border border-gray-600 rounded-lg bg-gray-700"
                      type="text"
                      placeholder="Dish Name"
                      value={dish.dishName}
                      onChange={(e) => {
                        const updatedSegments = [...segments];
                        updatedSegments[segmentIndex].dishes[
                          dishIndex
                        ].dishName = e.target.value;
                        setSegments(updatedSegments);
                      }}
                      required
                    />
                    <textarea
                      className="p-2 w-full mb-2 border border-gray-600 rounded-lg bg-gray-700"
                      placeholder="Description"
                      value={dish.description}
                      onChange={(e) => {
                        const updatedSegments = [...segments];
                        updatedSegments[segmentIndex].dishes[
                          dishIndex
                        ].description = e.target.value;
                        setSegments(updatedSegments);
                      }}
                    />
                    <input
                      className="p-2 w-full mb-2 border border-gray-600 rounded-lg bg-gray-700"
                      type="text"
                      placeholder="Image URL"
                      value={dish.image}
                      onChange={(e) => {
                        const updatedSegments = [...segments];
                        updatedSegments[segmentIndex].dishes[dishIndex].image =
                          e.target.value;
                        setSegments(updatedSegments);
                      }}
                    />
                    {dish.prices.map((priceOption, priceIndex) => (
                      <div
                        key={priceIndex}
                        className="flex flex-wrap gap-2 mb-4 relative"
                      >
                        <input
                          className="p-2 border border-gray-600 rounded-lg bg-gray-700"
                          type="text"
                          placeholder="Quantity"
                          value={priceOption.quantity}
                          onChange={(e) => {
                            const updatedSegments = [...segments];
                            updatedSegments[segmentIndex].dishes[
                              dishIndex
                            ].prices[priceIndex].quantity = e.target.value;
                            setSegments(updatedSegments);
                          }}
                          required
                        />
                        <input
                          className="p-2 border border-gray-600 rounded-lg bg-gray-700"
                          type="number"
                          placeholder="Price"
                          value={priceOption.price}
                          onChange={(e) => {
                            const updatedSegments = [...segments];
                            updatedSegments[segmentIndex].dishes[
                              dishIndex
                            ].prices[priceIndex].price = e.target.value;
                            setSegments(updatedSegments);
                          }}
                          required
                        />
                        <input
                          className="p-2 border border-gray-600 rounded-lg bg-gray-700"
                          type="number"
                          placeholder="Serves"
                          value={priceOption.serves}
                          onChange={(e) => {
                            const updatedSegments = [...segments];
                            updatedSegments[segmentIndex].dishes[
                              dishIndex
                            ].prices[priceIndex].serves = e.target.value;
                            setSegments(updatedSegments);
                          }}
                          required
                        />
                        <button
                          className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          onClick={() =>
                            handleDeletePriceOption(
                              segmentIndex,
                              dishIndex,
                              priceIndex
                            )
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      type="button"
                      onClick={() => addPriceOption(segmentIndex, dishIndex)}
                    >
                      Add Price Option
                    </button>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={dish.inStock}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "inStock")
                        }
                      />
                      <label className="ml-2">In Stock</label>
                    </div>

                    <input
                      className="p-2 w-full mb-2 border border-gray-600 rounded-lg bg-gray-700"
                      type="number"
                      placeholder="Spiciness [1-5]"
                      value={dish.spiciness}
                      onChange={(e) => {
                        const updatedSegments = [...segments];
                        updatedSegments[segmentIndex].dishes[
                          dishIndex
                        ].spiciness = e.target.value;
                        setSegments(updatedSegments);
                      }}
                      required
                    />
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={dish.isVeg}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "isVeg")
                        }
                      />
                      <label className="ml-2">Is Veg</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={dish.bestSeller}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "bestSeller")
                        }
                        disabled={bestsellerCount === 0}
                      />
                      <label className="ml-2">
                        Best Seller {bestsellerCount}
                      </label>
                      {bestsellerCount === 0 && (
                        <span className="text-red-500 ml-2">Limit reached</span>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={dish.todaysSpecial}
                        onChange={(e) =>
                          handleChange(
                            e,
                            segmentIndex,
                            dishIndex,
                            "todaysSpecial"
                          )
                        }
                        disabled={todaySpecialCount === 0}
                      />
                      <label className="ml-2">
                        Todays Special {todaySpecialCount}
                      </label>
                      {todaySpecialCount === 0 && (
                        <span className="text-red-500 ml-2">Limit reached</span>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={dish.mustTry}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "mustTry")
                        }
                        disabled={mustTryCount === 0}
                      />
                      <label className="ml-2">Must Try {mustTryCount}</label>
                      {mustTryCount === 0 && (
                        <span className="text-red-500 ml-2">Limit reached</span>
                      )}
                    </div>
                    <button
                      className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                      type="button"
                      onClick={() => handleDeleteDish(segmentIndex, dishIndex)}
                    >
                      Delete Dish
                    </button>
                  </div>
                ))}
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                  type="button"
                  onClick={() => addDish(segmentIndex)}
                >
                  Add Dish
                </button>
              </div>
            ))}
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              type="button"
              onClick={addSegment}
            >
              Add Section
            </button>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 mt-6"
              type="submit"
            >
              Submit Menu
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
