"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Code2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!userData);
  }, []);

  return (
    <footer className="bg-black border-t border-white/[0.05] mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold mb-3 md:mb-4">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 max-w-md">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/editor" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  Editor
                </Link>
              </li>
              <li>
                <Link href="/files" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  Files
                </Link>
              </li>
              <li>
                <Link href="/api-keys" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  API Keys
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${siteConfig.contact.support}`} className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  Contact Support
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                  Help Center
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link href="/login" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
