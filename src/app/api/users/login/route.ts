import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//connect to Mongoose database
connect();

//POST /api/users/login    - login a user
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  console.log(reqBody);
  // Check if all fields are entered
  if (!email || !password) {
    return NextResponse.json(
      { error: "Please enter all fields" },
      { status: 400 }
    );
  }
  // Check if user exists
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }
  // Validate password
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
  // Create JWT Payload
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  // Sign token
  const token = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: "12h",
  });
  //Create and return response
  const response = NextResponse.json({
    message: "Login successful",
    success: true,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
  });
  return response;
}
