"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import CopyButton from "./CopyButton";

interface ApiEndpointDisplayProps {
  apiKey: string;
}

export default function ApiEndpointDisplay({ apiKey }: ApiEndpointDisplayProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Get the URL on the client side
    setUrl(`${window.location.origin}/api/data/key/${apiKey}`);
  }, [apiKey]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={url}
        readOnly
        placeholder="Loading..."
        className="flex-1 bg-black/50 border border-white/[0.05] rounded-lg px-4 py-2 text-gray-300 font-mono text-sm"
      />
      {url && (
        <>
          <CopyButton text={url} label="Copy URL" />
          <a
            href={`/api/data/key/${apiKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/50 border border-white/[0.05] hover:border-blue-500 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" />
            Test
          </a>
        </>
      )}
    </div>
  );
}
