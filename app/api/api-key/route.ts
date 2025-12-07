import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/supabase-db";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user's API key
    const userData = await userDb.findById(user.id);

    return NextResponse.json({
      apiKey: userData?.apiKey || null,
    });
  } catch (error) {
    console.error("Get API key error:", error);
    return NextResponse.json(
      { error: "Failed to get API key" },
      { status: 500 }
    );
  }
}
