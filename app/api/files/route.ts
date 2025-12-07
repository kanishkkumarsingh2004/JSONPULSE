import { NextRequest, NextResponse } from "next/server";
import { fileDb } from "@/lib/supabase-db";
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

    // Fetch files for this user
    const files = await fileDb.findByUser(user.id);

    return NextResponse.json({ 
      files: files.map(f => ({
        id: f.id,
        fileName: f.fileName,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
        views: f.views,
      }))
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
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

    const body = await request.json();
    const { fileName, content } = body;

    if (!fileName || !content) {
      return NextResponse.json(
        { error: "fileName and content are required" },
        { status: 400 }
      );
    }

    // Validate JSON
    try {
      JSON.parse(content);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Check if file exists for this user with this fileName
    const existingFile = await fileDb.findByFileName(user.id, fileName);

    let file;
    if (existingFile) {
      // Update existing file
      file = await fileDb.update(existingFile.id, { 
        content, 
        updatedAt: new Date().toISOString() 
      });
    } else {
      // Create new file
      file = await fileDb.create({ 
        fileName, 
        content, 
        userId: user.id 
      });
    }

    return NextResponse.json({
      success: true,
      file: {
        id: file.id,
        fileName: file.fileName,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Failed to save file" },
      { status: 500 }
    );
  }
}
