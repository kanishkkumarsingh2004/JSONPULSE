"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { Code2, LogOut, User, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("user");
      setUser(null);
      setIsMobileMenuOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/editor", label: "Editor" },
    { href: "/files", label: "Files" },
    { href: "/api-keys", label: "API Keys" },
    { href: "/docs", label: "Docs" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-black/80 border-b border-white/[0.05] backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold z-50">
            <Code2 className="w-6 h-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-blue-400 transition-all duration-300 ${
                  pathname === link.href ? "text-blue-500 font-semibold" : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-700">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-dark-700">
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-50 p-2 text-gray-300 hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "64px" }}
      >
        <div className="container bg-black mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`py-3 px-4 rounded-lg transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/[0.05] my-2"></div>

            {user ? (
              <>
                <div className="flex items-center gap-2 text-gray-400 py-3 px-4 text-sm border border-white/[0.05] rounded-lg">
                  <User className="w-5 h-5" />
                  <span>Logged in as {user.firstName} {user.lastName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 text-red-400 hover:bg-red-900/20 py-3 px-4 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="text-center text-gray-300 hover:bg-white/5 py-3 px-4 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="text-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
