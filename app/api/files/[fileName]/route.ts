import { NextRequest, NextResponse } from "next/server";
import { fileDb } from "@/lib/supabase-db";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { fileName } = params;

    // Find file for this user
    const file = await fileDb.findByFileName(user.id, fileName);

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Parse JSON content
    const jsonContent = JSON.parse(file.content);

    return NextResponse.json({
      id: file.id,
      fileName: file.fileName,
      content: jsonContent,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      views: file.views,
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  try {
    // Get authenticated user
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { fileName } = params;

    // Find file for this user
    const file = await fileDb.findByFileName(user.id, fileName);

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    await fileDb.delete(file.id);

    return NextResponse.json({
      success: true,
      message: `File "${fileName}" deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
