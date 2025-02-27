import { connectMongoDB } from "@/lib/mongodb";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { restaurantId, sections, totalbs, totalts, totalmt } =
    await request.json();
  await connectMongoDB();
  await Menu.create({ restaurantId, sections, totalbs, totalts, totalmt });
  return NextResponse.json({ message: "Menu Created" }, { status: 201 });
}

export async function PATCH(request) {
  const { restaurantId, sections, totalbs, totalts, totalmt } =
    await request.json();
  await connectMongoDB();

  try {
    const updatedMenu = await Menu.findOneAndUpdate(
      { restaurantId },
      { sections },
      { totalbs },
      { totalts },
      { totalmt },
      { new: true }
    );

    if (!updatedMenu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Menu updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

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
    const menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      return NextResponse.json({ message: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(
      { sections: menu.sections,  totalbs: menu.totalbs ,
       totalts: menu.totalts ,
       totalmt: menu.totalmt },
    
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
