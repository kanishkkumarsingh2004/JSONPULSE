import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/supabase-db";
import bcrypt from "bcryptjs";
import { generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, mobile, password, type } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate user type if provided
    const validTypes = ['user', 'admin'];
    const userType = type && validTypes.includes(type) ? type : 'user';

    // Check if user already exists
    const existingUser = await userDb.findByEmail(email.toLowerCase());

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with type (defaults to 'free')
    const user = await userDb.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      mobile: mobile || undefined,
      password: hashedPassword,
      type: userType,
    });

    // Generate JWT token
    const userPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
    };
    const token = await generateToken(userPayload);

    // Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        ...userPayload,
        apiKey: user.apiKey,
      },
    });

    const cookieOptions = setAuthCookie(token);
    response.cookies.set(cookieOptions);

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
