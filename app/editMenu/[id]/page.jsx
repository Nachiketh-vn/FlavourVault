"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function MenuPage({ params }) {
  const { id: restaurantId } = params;
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const [bestsellerCount, setBestsellerCount] = useState(15);
  const [todaySpecialCount, setTodaySpecialCount] = useState(5);
  const [mustTryCount, setMustTryCount] = useState(15);

  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
          setSegments(data.sections || []);
          setBestsellerCount(data.totalbs);
          setTodaySpecialCount(data.totalts);
          setMustTryCount(data.totalmt);
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
            inStock: true,
            spiciness:"",
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

  const handleDeleteSegment = (segmentIndex) => {
    const updatedSegments = [...segments];
    updatedSegments.splice(segmentIndex, 1);
    setSegments(updatedSegments);
  };

  const handleDeleteDish = (segmentIndex, dishIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].dishes.splice(dishIndex, 1);
    setSegments(updatedSegments);
  };

  const handleDeletePriceOption = (segmentIndex, dishIndex, priceIndex) => {
    const updatedSegments = [...segments];
    updatedSegments[segmentIndex].dishes[dishIndex].prices.splice(
      priceIndex,
      1
    );
    setSegments(updatedSegments);
  };

  const handleChange = (
    e,
    segmentIndex,
    dishIndex,
    field,
    priceIndex = null
  ) => {
    const updatedSegments = [...segments];
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    // Handle top-level fields and check for bestSeller, todaysSpecial, mustTry
    if (["bestSeller", "todaysSpecial", "mustTry"].includes(field)) {
      if (field === "bestSeller") {
        if (value && bestsellerCount > 0) {
          setBestsellerCount(bestsellerCount - 1);
        } else if (!value) {
          setBestsellerCount(bestsellerCount + 1);
        } else {
          alert("Best Seller limit reached");
          return;
        }
      }

      if (field === "todaysSpecial") {
        if (value && todaySpecialCount > 0) {
          setTodaySpecialCount(todaySpecialCount - 1);
        } else if (!value) {
          setTodaySpecialCount(todaySpecialCount + 1);
        } else {
          alert("Today's Special limit reached");
          return;
        }
      }

      if (field === "mustTry") {
        if (value && mustTryCount > 0) {
          setMustTryCount(mustTryCount - 1);
        } else if (!value) {
          setMustTryCount(mustTryCount + 1);
        } else {
          alert("Must Try limit reached");
          return;
        }
      }
      updatedSegments[segmentIndex].dishes[dishIndex][field] = value;
    } else if (priceIndex !== null) {
      // Update nested price fields
      updatedSegments[segmentIndex].dishes[dishIndex].prices[priceIndex][
        field
      ] = value;
    } else {
      // Update dish fields
      updatedSegments[segmentIndex].dishes[dishIndex][field] = value;
    }
    setSegments(updatedSegments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuData = { restaurantId, sections: segments,bestsellerCount,todaySpecialCount,mustTryCount };

    try {
      const response = await fetch("/api/menu", {
        method: "PATCH", // Changed to PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        toast.success("Menu Updated Successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form.Check All Value of serves they should be greater or equal to 1"
      );
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <BackgroundBeams />
      <div className="max-w-3xl mx-auto p-6 rounded-lg bg-gray-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Menu</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {segments.map((segment, segmentIndex) => (
            <div
              key={segmentIndex}
              className="p-4 border border-gray-600 rounded-lg"
            >
              <input
                type="text"
                value={segment.sectionName}
                onChange={(e) => {
                  const updatedSegments = [...segments];
                  updatedSegments[segmentIndex].sectionName = e.target.value;
                  setSegments(updatedSegments);
                }}
                placeholder="Section Name"
                className="w-full mb-4 p-2 rounded"
              />

              {segment.dishes.map((dish, dishIndex) => (
                <div key={dishIndex} className="mb-4">
                  <input
                    type="text"
                    value={dish.dishName}
                    onChange={(e) =>
                      handleChange(e, segmentIndex, dishIndex, "dishName")
                    }
                    placeholder="Dish Name"
                    className="w-full mb-2 p-2 rounded"
                  />

                  <input
                    type="text"
                    value={dish.description}
                    onChange={(e) =>
                      handleChange(e, segmentIndex, dishIndex, "description")
                    }
                    placeholder="Dish Description"
                    className="w-full mb-2 p-2 rounded"
                  />

                  <input
                    type="text"
                    value={dish.image}
                    onChange={(e) =>
                      handleChange(e, segmentIndex, dishIndex, "image")
                    }
                    placeholder="Image Url"
                    className="w-full mb-2 p-2 rounded"
                  />

                  {dish.prices.map((price, priceIndex) => (
                    <div key={priceIndex} className="mb-2">
                      <input
                        type="text"
                        value={price.quantity}
                        onChange={
                          (e) =>
                            handleChange(
                              e,
                              segmentIndex,
                              dishIndex,
                              "quantity",
                              priceIndex
                            ) // Pass priceIndex
                        }
                        placeholder="Quantity"
                        className="w-full mb-2 p-2 rounded"
                      />
                      <input
                        type="text"
                        value={price.price}
                        onChange={
                          (e) =>
                            handleChange(
                              e,
                              segmentIndex,
                              dishIndex,
                              "price",
                              priceIndex
                            ) // Pass priceIndex
                        }
                        placeholder="Price"
                        className="w-full mb-2 p-2 rounded"
                      />
                      <input
                        type="text"
                        value={price.serves}
                        onChange={
                          (e) =>
                            handleChange(
                              e,
                              segmentIndex,
                              dishIndex,
                              "serves",
                              priceIndex
                            ) // Pass priceIndex
                        }
                        placeholder="Serves"
                        className="w-full mb-2 p-2 rounded"
                      />

                      {/* Delete Price Option */}
                      <button
                        type="button"
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          handleDeletePriceOption(
                            segmentIndex,
                            dishIndex,
                            priceIndex
                          )
                        }
                      >
                        Delete Price
                      </button>
                    </div>
                  ))}

                  <input
                    type="text"
                    value={dish.spiciness}
                    onChange={(e) =>
                      handleChange(e, segmentIndex, dishIndex, "spiciness")
                    }
                    placeholder="Spiciness [1-5]"
                    className="w-full mb-2 p-2 rounded"
                  />

                  <div className="flex items-center space-x-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={dish.inStock}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "inStock")
                        }
                      />{" "}
                      In Stock
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={dish.isVeg}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "isVeg")
                        }
                      />{" "}
                      Is Veg
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={dish.bestSeller}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "bestSeller")
                        }
                      />{" "}
                      Best Seller {bestsellerCount}
                    </label>

                    <label>
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
                      />{" "}
                      Today's Special {todaySpecialCount}
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        checked={dish.mustTry}
                        onChange={(e) =>
                          handleChange(e, segmentIndex, dishIndex, "mustTry")
                        }
                      />{" "}
                      Must Try {mustTryCount}
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => addPriceOption(segmentIndex, dishIndex)}
                  >
                    Add Price Option
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteDish(segmentIndex, dishIndex)}
                  >
                    Delete Dish
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => addDish(segmentIndex)}>
                Add Dish
              </button>

              <button
                type="button"
                onClick={() => handleDeleteSegment(segmentIndex)}
              >
                Delete Section
              </button>
            </div>
          ))}

          <button type="button" onClick={addSegment}>
            Add Section
          </button>

          <button type="submit">Save Menu</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
