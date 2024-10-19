// Updated API route
import { connectMongoDB } from "@/lib/mongodb";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const segmentId = searchParams.get("id");
  const restaurantId = searchParams.get("restaurantId");

  if (!segmentId || !restaurantId) {
    return NextResponse.json(
      { message: "Segment ID and Restaurant ID are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    // Find the segment by its ID
    const segment = menu.sections.find(
      (section) => section._id.toString() === segmentId
    );

    if (!segment) {
      return NextResponse.json(
        { message: "Segment not found" },
        { status: 404 }
      );
    }

    // Return the segment name and the list of dishes
    return NextResponse.json(
      { segmentName: segment.sectionName, dishes: segment.dishes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
