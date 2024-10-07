import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Define the type for the request body
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  contact_number: number; // Add contact_number field
}

export async function POST(req: Request) {
  try {
    const { name, contact_number, email, password, }: RegisterRequest =
      await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({
      name,
      contact_number,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
