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

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Extract the restaurantId from the request's query parameters
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
      return NextResponse.json(
        { error: "restaurantId is required" },
        { status: 400 }
      );
    }

    // Fetch the menu for the specified restaurant
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    // Return the menu as a response
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
