import { userDb, fileDb } from "@/lib/supabase-db";
import Link from "next/link";
import { FileJson, Eye, Calendar } from "lucide-react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export const dynamic = "force-dynamic";

export default async function FilesPage() {
  // Get authenticated user
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  
  if (!token) {
    redirect("/login");
  }

  const user = await verifyToken(token);
  
  if (!user) {
    redirect("/login");
  }

  // Get user with API key
  const userData = await userDb.findById(user.id);

  if (!userData) {
    redirect("/login");
  }

  // Fetch files for this user
  const files = await fileDb.findByUser(user.id);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedGridBackground />
      <BlurOrbs />
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Your Files
        </h1>
        <p className="text-sm md:text-base text-gray-400">Manage your deployed JSON files</p>
      </div>

      {files.length === 0 ? (
        <div className="bg-white/[0.02] rounded-xl p-8 md:p-12 text-center border border-white/[0.05] animate-fade-in backdrop-blur-sm">
          <FileJson className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-semibold mb-2">No files yet</h2>
          <p className="text-sm md:text-base text-gray-400 mb-6">Create your first JSON file to get started</p>
          <Link
            href="/editor"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Create File
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {files.map((file: any, index: number) => (
            <div
              key={file.id}
              className="bg-white/[0.02] rounded-xl p-5 md:p-6 border border-white/[0.05] hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 animate-slide-up backdrop-blur-sm flex flex-col"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileJson className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2 break-words">{file.fileName}</h3>
                  </div>
                </div>
                <Link
                  href={`/api/data/key/${userData.apiKey}/${file.fileName}`}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                  title="View API"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(file.updatedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {file.views} views
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
