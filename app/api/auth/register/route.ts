import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const {
    name,
    email,
    phone,
    password,
    password_confirmation,
  } = await req.json();

  //backend validation
  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  //Password confirmation
  if (password !== password_confirmation) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }

  //Check existing user
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create user
  await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    isVerified: false,
  });

  return NextResponse.json({
    message: "Registered successfully. Please verify your email.",
  });
}
