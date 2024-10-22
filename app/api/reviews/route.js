import { connectMongoDB } from "@/lib/mongodb";
import Review from "@/models/review";
import { NextResponse } from "next/server";

// Create a new review
export async function POST(request) {
  const {
    restaurantId,
    stars,
    experience,
    suggestions,
    reviewerName,
    reviewerEmail,
  } = await request.json();

  await connectMongoDB();

  try {
    await Review.create({
      restaurantId,
      stars,
      experience,
      suggestions,
      reviewerName,
      reviewerEmail,
      date: new Date(),
    });
    return NextResponse.json({ message: "Review Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Get all reviews for a specific restaurant
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json(
      { message: "restaurantId is required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const reviews = await Review.find({ restaurantId });
    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
