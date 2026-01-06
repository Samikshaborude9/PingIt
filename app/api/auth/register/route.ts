import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db"

export async function POST(req: Request){
    await connectDB();
    const { email, password } = await req.json();

    const existing = await User.findOne({email});
    if(existing){
        return NextResponse.json({
            message: "User already exist"
        },
    {
        status: 400
    })
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({email, password: hashed});

    return NextResponse.json({ message: "Registered successfully"});
}
