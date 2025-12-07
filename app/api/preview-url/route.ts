import { NextRequest, NextResponse } from "next/server";
import { userDb } from "@/lib/supabase-db";
import { getAuthUser } from "@/lib/auth";

// GET - Get user's preview URL
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await userDb.findById(user.id);

    return NextResponse.json({ previewUrl: userData?.previewUrl || null });
  } catch (error) {
    console.error("Get preview URL error:", error);
    return NextResponse.json(
      { error: "Failed to get preview URL" },
      { status: 500 }
    );
  }
}

// POST - Save user's preview URL
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { previewUrl } = await request.json();

    // Validate URL
    if (previewUrl && !isValidUrl(previewUrl)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    await userDb.update(user.id, { previewUrl: previewUrl || null });

    return NextResponse.json({ success: true, previewUrl });
  } catch (error) {
    console.error("Save preview URL error:", error);
    return NextResponse.json(
      { error: "Failed to save preview URL" },
      { status: 500 }
    );
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
