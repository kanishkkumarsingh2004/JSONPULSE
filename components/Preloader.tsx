"use client";

import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Remove from DOM after fade out
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <div className="relative mb-8">
          {/* Main icon with glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-2xl shadow-blue-500/50">
              <Code2 className="w-16 h-16 text-white" />
            </div>
          </div>
          
          {/* Ping effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-blue-500/30 rounded-2xl animate-ping"></div>
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
          JsonPulse
        </h1>

        {/* Loading dots */}
        <div className="flex gap-2 justify-center mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg shadow-blue-500/50" style={{ animationDelay: "300ms" }}></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm font-medium">Loading your workspace...</p>
      </div>
    </div>
  );
}
