import { NextRequest, NextResponse } from "next/server";
import { userDb, fileDb } from "@/lib/supabase-db";

export async function GET(
  request: NextRequest,
  { params }: { params: { apiKey: string; fileName: string } }
) {
  try {
    const { apiKey, fileName } = params;

    // Find user by API key
    const user = await userDb.findByApiKey(apiKey);

    if (!user) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Find file by fileName for this user
    const file = await fileDb.findByFileName(user.id, fileName);

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Increment view count
    const currentViews = file.views || 0;
    await fileDb.update(file.id, { views: currentViews + 1 });

    // Parse and return JSON content
    const jsonContent = JSON.parse(file.content);

    return NextResponse.json(jsonContent);
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
