import { siteConfig } from "@/config/site.config";
import { Code, FileJson, Zap, Key, Shield, RefreshCw, Eye, Upload, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="mb-10 md:mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-gray-400 text-lg">Complete guide to using {siteConfig.name} for hosting and managing your JSON data</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Getting Started */}
        <Section icon={<Zap className="w-6 h-6" />} title="Getting Started">
          <p className="mb-4 text-gray-300">
            {siteConfig.name} is a secure platform for hosting JSON files with authenticated API access.
            Get started in minutes:
          </p>
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">1</span>
              <span><Link href="/signup" className="text-blue-400 font-semibold hover:underline">Create an account</Link> - Sign up with your email to get started</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">2</span>
              <span>Generate your <Link href="/api-keys" className="text-blue-400 font-semibold hover:underline">API Key</Link> - Required for accessing your files via API</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">3</span>
              <span>Go to the <Link href="/editor" className="text-blue-400 font-semibold hover:underline">Editor</Link> - Create and edit your JSON files with our Monaco-powered editor</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">4</span>
              <span>Write your JSON content and click <span className="text-blue-400 font-semibold">Deploy JSON</span></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">5</span>
              <span>Access your files securely using your API key!</span>
            </li>
          </ol>
        </Section>

        {/* Authentication & API Keys */}
        <Section icon={<Key className="w-6 h-6" />} title="API Keys">
          <p className="mb-4 text-gray-300">
            API Keys allow you to access your files programmatically and list all your files via the API.
          </p>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5 mb-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-2">Important Security Notes:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Each user can have only <strong>one API key</strong></li>
                  <li>• Generate your key in the <Link href="/api-keys" className="text-blue-400 underline hover:text-blue-300">API Keys</Link> section</li>
                  <li>• Keep your API key secret - never share it publicly</li>
                  <li>• Regenerate your key if it&apos;s compromised (old key stops working immediately)</li>
                  <li>• API keys are 20-character alphanumeric strings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              Regenerating Your API Key
            </h4>
            <p className="text-sm text-gray-400">
              You can regenerate your API key at any time. The old key will stop working immediately, and all API requests must use the new key.
            </p>
          </div>
        </Section>

        {/* API Reference */}
        <Section icon={<Code className="w-6 h-6" />} title="API Reference">
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-2">Authentication Required</p>
                <p className="text-sm text-gray-300">
                  All API endpoints require authentication using your API key. Generate your API key in the{" "}
                  <Link href="/api-keys" className="text-blue-400 underline hover:text-blue-300">API Keys</Link> section.
                </p>
              </div>
            </div>
          </div>

          {/* List Files */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-3">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-lg border border-blue-500/30 font-bold">GET</span>
              List All Your Files
            </h3>
            <p className="mb-3 text-gray-400">Get a list of all your files using your API Key.</p>
            <CodeBlock>GET /api/data/key/[apiKey]</CodeBlock>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-gray-300">Parameters:</p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• <code className="text-blue-400">apiKey</code> - Your unique API key (20 characters)</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-300 mb-2">Example Response:</p>
              <CodeBlock>
{`{
  "apiKey": "abc123xyz789...",
  "fileCount": 3,
  "files": [
    {
      "fileName": "config",
      "url": "/api/data/key/abc123xyz789.../config",
      "views": 42,
      "createdAt": "2024-12-07T10:30:00.000Z",
      "updatedAt": "2024-12-07T12:15:00.000Z"
    },
    {
      "fileName": "users",
      "url": "/api/data/key/abc123xyz789.../users",
      "views": 128,
      "createdAt": "2024-12-06T08:00:00.000Z",
      "updatedAt": "2024-12-07T09:45:00.000Z"
    }
  ]
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Get File Content */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-3">
              <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-lg border border-blue-500/30 font-bold">GET</span>
              Get File Content
            </h3>
            <p className="mb-3 text-gray-400">Access a specific file using your API Key.</p>
            <CodeBlock>GET /api/data/key/[apiKey]/[fileName]</CodeBlock>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-gray-300">Parameters:</p>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• <code className="text-blue-400">apiKey</code> - Your unique API key</li>
                <li>• <code className="text-blue-400">fileName</code> - The name of your JSON file</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-300 mb-2">Example Request:</p>
              <CodeBlock>
{`fetch('${typeof window !== 'undefined' ? window.location.origin : 'https://jsonpulse.com'}/api/data/key/YOUR_API_KEY/config')
  .then(res => res.json())
  .then(data => console.log(data));`}
              </CodeBlock>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-300 mb-2">Example Response:</p>
              <CodeBlock>
{`{
  "name": "JsonPulse",
  "version": "1.0.0",
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}`}
              </CodeBlock>
            </div>
          </div>

          {/* View Tracking */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-purple-300 font-semibold mb-2">View Tracking</p>
                <p className="text-sm text-gray-300">
                  Every time a file is accessed via the API, the view count is automatically incremented. 
                  You can see the total views for each file in the <Link href="/files" className="text-purple-400 underline hover:text-purple-300">Files</Link> page.
                </p>
              </div>
            </div>
          </div>

        </Section>

        {/* Features */}
        <Section icon={<FileJson className="w-6 h-6" />} title="Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<Upload className="w-5 h-5" />}
              title="Monaco Editor"
              description="Professional code editor with syntax highlighting and validation"
            />
            <FeatureCard 
              icon={<Eye className="w-5 h-5" />}
              title="View Tracking"
              description="Automatic tracking of file access and view counts"
            />
            <FeatureCard 
              icon={<RefreshCw className="w-5 h-5" />}
              title="Real-time Updates"
              description="Edit and deploy files instantly with live updates"
            />
            <FeatureCard 
              icon={<Shield className="w-5 h-5" />}
              title="Secure Storage"
              description="JWT authentication and secure API key management"
            />
            <FeatureCard 
              icon={<Key className="w-5 h-5" />}
              title="API Access"
              description="RESTful API for programmatic file access"
            />
            <FeatureCard 
              icon={<Trash2 className="w-5 h-5" />}
              title="File Management"
              description="Easy file creation, editing, and deletion"
            />
          </div>
        </Section>

        {/* Limits */}
        <Section icon={<Shield className="w-6 h-6" />} title="Limits & Specifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4">
              <p className="text-blue-400 font-semibold mb-2">File Limits</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Max file size: {(siteConfig.features.maxFileSize / 1024 / 1024).toFixed(0)}MB
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Max files per user: {siteConfig.features.maxFilesPerUser}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Valid JSON format required
                </li>
              </ul>
            </div>

            <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4">
              <p className="text-purple-400 font-semibold mb-2">API Specifications</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  One API key per user
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  20-character alphanumeric keys
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Instant key regeneration
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Best Practices */}
        <Section icon={<Shield className="w-6 h-6" />} title="Best Practices">
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 font-semibold mb-2">✓ Do</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Keep your API key secure and private</li>
                <li>• Use descriptive file names for easy identification</li>
                <li>• Validate your JSON before deploying</li>
                <li>• Regenerate your API key if compromised</li>
                <li>• Monitor file view counts for usage insights</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 font-semibold mb-2">✗ Don&apos;t</p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Share your API key publicly or in client-side code</li>
                <li>• Store sensitive personal data in JSON files</li>
                <li>• Use special characters in file names</li>
                <li>• Deploy invalid JSON (it will be rejected)</li>
                <li>• Expose your API key in frontend applications</li>
              </ul>
            </div>
          </div>
        </Section>
      </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-black/30 border border-white/[0.05] rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          {icon}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-1">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl p-6 md:p-8 border border-white/[0.08] backdrop-blur-md hover:border-blue-500/20 transition-all duration-300 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-black/50 p-4 md:p-5 rounded-xl overflow-x-auto border border-white/[0.08] font-mono text-xs md:text-sm shadow-inner">
      <code className="text-blue-300">{children}</code>
    </pre>
  );
}
