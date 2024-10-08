import { connectMongoDB } from "@/lib/mongodb";
import Restaurant from "@/models/restaurant"; // Assuming you have a Restaurant model created
import { NextResponse } from "next/server";

// Handle POST request to register a restaurant
export async function POST(request: Request) {
  try {
    const {
      restaurantName,
      ownerName,
      city,
      restaurantContact,
      ownerContact,
      restaurantEmail,
      restaurantAddress,
      userEmail, // This comes from session in frontend
    } = await request.json();

    // Connect to the MongoDB database
    await connectMongoDB();

    // Create the restaurant entry in MongoDB
    await Restaurant.create({
      restaurantName,
      ownerName,
      city,
      restaurantContact,
      ownerContact,
      restaurantEmail,
      restaurantAddress,
      userEmail,
    });

    return NextResponse.json(
      { message: "Restaurant Registered" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register restaurant" },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch restaurants based on user email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    console.log("Received email:", email); // Log the received email

    // Connect to the MongoDB database
    await connectMongoDB();

    // Fetch restaurants based on the user email
    const restaurants = await Restaurant.find({ userEmail: email }).select(
      "_id restaurantName"
    );

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}