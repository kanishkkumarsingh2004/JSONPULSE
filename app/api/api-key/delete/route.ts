import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/supabase-db";
import { getAuthUser } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update user to remove API key
    await userDb.update(user.id, { apiKey: null });

    return NextResponse.json({
      success: true,
      message: "API key deleted successfully",
    });
  } catch (error) {
    console.error("Delete API key error:", error);
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}
