import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/supabase-db";
import { getAuthUser } from "@/lib/auth";

function generateApiKey(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';
  for (let i = 0; i < 20; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return apiKey;
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Generate new API key (will overwrite existing one if present)
    const apiKey = generateApiKey();

    // Update user with new API key
    const updatedUser = await userDb.update(user.id, { apiKey });

    return NextResponse.json({
      success: true,
      apiKey: updatedUser.apiKey,
    });
  } catch (error) {
    console.error("Generate API key error:", error);
    return NextResponse.json(
      { error: "Failed to generate API key" },
      { status: 500 }
    );
  }
}
