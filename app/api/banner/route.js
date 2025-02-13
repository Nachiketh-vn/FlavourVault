import { connectMongoDB } from "@/lib/mongodb";
import Banner from "@/models/banner"; // Assuming you have a banner model
import { NextResponse } from "next/server";

// Get the banner details
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");
  const bannerNumber = searchParams.get("bannerNumber");

  if (!restaurantId || !bannerNumber) {
    return NextResponse.json(
      { message: "restaurantId and bannerNumber are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const banner = await Banner.findOne({ restaurantId, bannerNumber });

    if (banner) {
      return NextResponse.json({ publicId: banner.publicId }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Update the banner
export async function PATCH(request) {
  const { restaurantId, bannerNumber, publicId } = await request.json();

  if (!restaurantId || !bannerNumber || !publicId) {
    return NextResponse.json(
      { message: "restaurantId, bannerNumber, and publicId are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    //  const banner = await Banner.findOneAndUpdate(
    //   { restaurantId, bannerNumber },
    //   { publicId },
    //   { new: true, upsert: true }
    // );

    return NextResponse.json(
      { message: `Banner ${bannerNumber} updated successfully!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Set publicId to null (delete the banner image)
export async function DELETE(request) {
  const { restaurantId, bannerNumber } = await request.json();

  if (!restaurantId || !bannerNumber) {
    return NextResponse.json(
      { message: "restaurantId and bannerNumber are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    const banner = await Banner.findOneAndUpdate(
      { restaurantId, bannerNumber },
      { publicId: null },
      { new: true }
    );

    if (banner) {
      return NextResponse.json(
        { message: `Banner ${bannerNumber} deleted successfully!` },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Banner not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
