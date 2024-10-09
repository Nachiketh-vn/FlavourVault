"use client"
import { useEffect, useState } from "react";

// Assuming you are using Next.js dynamic routes like `/menu/[id]`
function MenuPage({ params }) {
  const { id: restaurantId } = params; // Get restaurantId from dynamic route
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu?restaurantId=${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuData(data);
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
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">
        Menu for Restaurant: {restaurantId}
      </h1>
      {menuData ? (
        <div>
          {menuData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.sectionName}</h2>
              <ul>
                {section.dishes.map((dish, dishIndex) => (
                  <li key={dishIndex} className="mb-4">
                    <h3 className="text-xl font-semibold">{dish.dishName}</h3>
                    <p>{dish.description}</p>
                    {dish.prices.map((price, priceIndex) => (
                      <p key={priceIndex}>
                        {price.quantity} - ${price.price} (Serves {price.serves}
                        )
                      </p>
                    ))}
                    <p>
                      Status: {dish.available ? "Available" : "Out of Stock"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No menu available for this restaurant.</p>
      )}
    </div>
  );
}

export default MenuPage;
