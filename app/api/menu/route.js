import { connectMongoDB } from "@/lib/mongodb";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { restaurantId, sections } = await request.json();
  await connectMongoDB();
  await Menu.create({ restaurantId, sections });
  return NextResponse.json({ message: "Menu Created" }, { status: 201 });
}

