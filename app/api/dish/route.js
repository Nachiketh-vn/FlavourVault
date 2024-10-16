import { connectMongoDB } from "@/lib/mongodb";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dishId = searchParams.get("id");
  const restaurantId = searchParams.get("restaurantId");

  if (!dishId || !restaurantId) {
    return NextResponse.json(
      { message: "Dish ID and Restaurant ID are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    // Find the dish by its ID within the menu's sections
    const dish = menu.sections
      .flatMap((section) => section.dishes)
      .find((dish) => dish._id.toString() === dishId);

    if (!dish) {
      return NextResponse.json({ message: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json(dish, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
