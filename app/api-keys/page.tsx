"use client";

import { useState, useEffect } from "react";
import { Key, Copy, Plus, AlertCircle, CheckCircle, Shield, ExternalLink, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Fetch user's API key
  const fetchApiKey = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/api-key");
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      toast.error("Failed to load API key");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  // Update localStorage with new API key
  const updateLocalStorageApiKey = (newApiKey: string) => {
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      userData.apiKey = newApiKey;
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  // Generate new API key
  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/api-key/generate", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setApiKey(data.apiKey);
        updateLocalStorageApiKey(data.apiKey);
        toast.success("API key generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate API key");
      }
    } catch (error) {
      console.error("Error generating API key:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  // Regenerate API key (overwrites existing one)
  const handleRegenerate = async () => {
    if (!confirm("Are you sure you want to regenerate your API key? The old key will stop working immediately.")) {
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/api-key/generate", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setApiKey(data.apiKey);
        updateLocalStorageApiKey(data.apiKey);
        toast.success("API key regenerated successfully!");
      } else {
        toast.error(data.error || "Failed to regenerate API key");
      }
    } catch (error) {
      console.error("Error regenerating API key:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  // Copy API key
  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("API key copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedGridBackground />
      <BlurOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            API Key Management
          </h1>
          <p className="text-gray-400 text-lg">Manage your API key to access your JSON files programmatically</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.05] backdrop-blur-sm overflow-hidden animate-slide-up">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading...</p>
            </div>
          ) : apiKey ? (
            /* Has API Key */
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">Active API Key</h2>
                  <p className="text-gray-400">Your API key is active and ready to use</p>
                </div>
              </div>

              {/* API Key Display */}
              <div className="bg-black/50 border border-white/[0.05] rounded-xl p-6 mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-300 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  Your API Key
                </label>
                <div className="flex gap-3">
                  <code className="flex-1 bg-black/50 border border-white/[0.05] rounded-lg px-4 py-3 text-blue-400 font-mono text-sm md:text-base break-all">
                    {apiKey}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-3 transition-all duration-300 hover:scale-105 flex-shrink-0"
                    title="Copy API Key"
                  >
                    <Copy className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Usage Example */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                  API Endpoint
                </h3>
                <p className="text-gray-400 text-sm mb-3">Access your files using this endpoint:</p>
                <code className="block bg-black/50 border border-white/[0.05] rounded-lg px-4 py-3 text-blue-400 font-mono text-xs md:text-sm break-all">
                  /api/data/key/{apiKey}/&#123;fileName&#125;
                </code>
              </div>

              {/* Regenerate Button */}
              <button
                onClick={handleRegenerate}
                disabled={generating}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <RefreshCw className={`w-5 h-5 relative z-10 ${generating ? 'animate-spin' : ''}`} />
                <span className="relative z-10">{generating ? "Regenerating..." : "Regenerate API Key"}</span>
              </button>
            </div>
          ) : (
            /* No API Key */
            <div className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">No API Key Yet</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Generate your unique API key to start accessing your JSON files programmatically
              </p>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
                {generating ? "Generating..." : "Generate API Key"}
              </button>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Security Info */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Keep your API key secret</li>
                  <li>• Don&apos;t share it publicly</li>
                  <li>• Regenerate if compromised</li>
                  <li>• One key per account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Info */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Important</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• You can only have one API key</li>
                  <li>• Regenerate to get a new key instantly</li>
                  <li>• Old key stops working after regeneration</li>
                  <li>• 20-character alphanumeric key</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
