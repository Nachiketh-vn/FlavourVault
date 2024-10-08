// pages/api/menu.js
import { connectMongoDB } from "@/lib/mongodb"; // MongoDB connection utility
import Menu from "@/models/menu"; // Menu model
import { NextResponse } from "next/server";

// Handle POST request to add a menu
export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the request body
    const { restaurantId, segments } = await req.json();

    // Create a new menu document
    const newMenu = new Menu({
      restaurantId,
      sections: segments.map((segment) => ({
        sectionName: segment.name,
        dishes: segment.dishes.map((menu) => ({
          dishName: menu.dishName, // updated to match the dish schema
          description: menu.description,
          prices: menu.prices.map((price) => ({
            quantity: price.quantity,
            price: price.price,
            serves: price.serves,
          })),
          image: menu.image,
          available: menu.inStock, // Include availability status
        })),
      })),
    });

    // Save the new menu to the database
    const savedMenu = await newMenu.save();

    // Return the saved menu as a response
    return NextResponse.json(savedMenu, { status: 201 });
  } catch (error) {
    console.error("Error saving menu:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
