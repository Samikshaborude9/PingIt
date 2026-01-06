import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db"

export async function POST(req: Request){
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if(!user){
        return NextResponse.json({message: "Invalid Credentials"}, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return NextResponse.json({ message: "Invalid credentials "}, {status: 401});
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET!,
        {expiresIn: "7d"}
    );
    const res = NextResponse.json({message: "Login successful"});
    res.cookies.set("token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

    return res;
}