"use client";

import { useState, useEffect, useRef } from "react";
import { RefreshCw, ExternalLink, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export default function PreviewPage() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIframeUrl, setCurrentIframeUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load preview URL from database and localStorage iframe state
  useEffect(() => {
    const loadPreviewUrl = async () => {
      try {
        const response = await fetch("/api/preview-url");
        if (response.ok) {
          const data = await response.json();
          if (data.previewUrl) {
            setPreviewUrl(data.previewUrl);
            setInputUrl(data.previewUrl);
            
            // Check if there's a saved iframe URL in localStorage
            const savedIframeUrl = localStorage.getItem("iframeCurrentUrl");
            if (savedIframeUrl) {
              setCurrentIframeUrl(savedIframeUrl);
            } else {
              setCurrentIframeUrl(data.previewUrl);
            }
          }
        }
      } catch (error) {
        console.error("Error loading preview URL:", error);
        toast.error("Failed to load preview URL");
      } finally {
        setIsLoading(false);
      }
    };

    loadPreviewUrl();
  }, []);

  // Save current iframe URL to localStorage when it changes
  useEffect(() => {
    if (currentIframeUrl) {
      localStorage.setItem("iframeCurrentUrl", currentIframeUrl);
    }
  }, [currentIframeUrl]);

  // Listen to iframe navigation changes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the iframe's origin
      if (event.data && event.data.type === "navigation") {
        setCurrentIframeUrl(event.data.url);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSaveUrl = async () => {
    if (!inputUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    // Validate URL format
    try {
      new URL(inputUrl);
    } catch {
      toast.error("Invalid URL format");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/preview-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ previewUrl: inputUrl }),
      });

      if (response.ok) {
        setPreviewUrl(inputUrl);
        setCurrentIframeUrl(inputUrl);
        localStorage.setItem("iframeCurrentUrl", inputUrl);
        toast.success("Preview URL saved successfully!");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save URL");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      toast.success("Preview refreshed");
    }
  };

  const handleOpenInNewTab = () => {
    if (currentIframeUrl) {
      window.open(currentIframeUrl, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedGridBackground />
      <BlurOrbs />
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 md:px-6 py-5 md:py-7 border-b border-white/[0.05] backdrop-blur-sm bg-black/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-1">
                Live Preview
              </h1>
              <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                Preview your website in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-400">Loading preview...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* URL Input Section */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 md:p-6 rounded-2xl border border-white/[0.08] backdrop-blur-md hover:border-blue-500/30 transition-all duration-300">
                <label className="block text-sm font-semibold mb-3 text-white">
                  Website URL
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 bg-black/40 border border-white/[0.08] rounded-xl px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:border-blue-500/60 focus:ring-blue-500/20 hover:border-white/[0.12] transition-all duration-300"
                  />
                  <button
                    onClick={handleSaveUrl}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white px-6 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2 min-w-[120px]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save URL</span>
                      </>
                    )}
                  </button>
                </div>
                {previewUrl && (
                  <p className="mt-3 text-xs text-gray-400">
                    Current URL: <code className="text-blue-400 font-mono bg-black/30 px-2 py-1 rounded">{previewUrl}</code>
                  </p>
                )}
              </div>

              {/* Preview Section */}
              {previewUrl ? (
                <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/[0.08] backdrop-blur-md overflow-hidden">
                  {/* Preview Controls */}
                  <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/[0.05] bg-black/20">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 flex-1 min-w-0">
                      <span className="font-semibold text-white">Viewing:</span>
                      <span className="truncate">{currentIframeUrl}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={handleRefresh}
                        className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                        title="Refresh Preview"
                      >
                        <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </button>
                      <button
                        onClick={handleOpenInNewTab}
                        className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                        title="Open in New Tab"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Iframe */}
                  <div className="relative" style={{ height: "calc(100vh - 320px)", minHeight: "500px" }}>
                    <iframe
                      ref={iframeRef}
                      src={currentIframeUrl}
                      className="w-full h-full bg-white"
                      title="Website Preview"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl border border-white/[0.08] backdrop-blur-md p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <ExternalLink className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Preview URL Set</h3>
                  <p className="text-gray-400 text-sm">
                    Enter a website URL above to start previewing
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
