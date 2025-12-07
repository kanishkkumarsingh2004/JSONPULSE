import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const key = new TextEncoder().encode(JWT_SECRET);

export interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: any; // Allow other properties
}

export async function generateToken(user: UserPayload): Promise<string> {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(request: NextRequest): Promise<UserPayload | null> {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

export function setAuthCookie(token: string) {
  return {
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  };
}

export function clearAuthCookie() {
  return {
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
  };
}
