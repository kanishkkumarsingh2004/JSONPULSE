import { NextRequest, NextResponse } from "next/server";
import { userDb, fileDb } from "@/lib/supabase-db";

export async function GET(
  request: NextRequest,
  { params }: { params: { apiKey: string } }
) {
  try {
    const { apiKey } = params;

    // Find user by API key
    const user = await userDb.findByApiKey(apiKey);

    if (!user) {
      return NextResponse.json(
        { 
          error: "Invalid API key",
          message: "Use /api/data/key/{apiKey}/{fileName} to access specific files"
        },
        { status: 404 }
      );
    }

    // Get user's files
    const files = await fileDb.findByUser(user.id);

    if (files.length === 0) {
      return NextResponse.json(
        { 
          error: "No files found for this API key",
          message: "Use /api/data/key/{apiKey}/{fileName} to access specific files"
        },
        { status: 404 }
      );
    }

    // Return list of available files
    return NextResponse.json({
      apiKey,
      fileCount: files.length,
      files: files.map((f: any) => ({
        fileName: f.fileName,
        url: `/api/data/key/${apiKey}/${f.fileName}`,
        views: f.views,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      })),
      message: "Use /api/data/key/{apiKey}/{fileName} to access specific file content"
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
