import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Code2, Database, Zap, Shield, ArrowRight, Sparkles } from "lucide-react";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background Grid */}
      <AnimatedGridBackground />
      
      {/* Blue Glow Effects */}
      <BlurOrbs />
      
      <div className="relative container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 mb-6 md:mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">JSON Hosting Made Simple</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.tagline}
          </p>
          
          <p className="text-base md:text-lg text-gray-500 mb-10 md:mb-12 max-w-2xl mx-auto px-4">
            {siteConfig.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/editor"
              className="group relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] overflow-hidden animate-pulse hover:animate-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/docs"
              className="group bg-transparent hover:bg-white/5 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-gray-800 hover:border-blue-500/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Documentation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          <FeatureCard
            icon={<Code2 className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />}
            title="JSON Editor"
            description="Built-in code editor with syntax highlighting and validation"
            delay="0"
          />
          <FeatureCard
            icon={<Database className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />}
            title="Instant API"
            description="Access your JSON data via RESTful API endpoints"
            delay="100"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />}
            title="Fast Deploy"
            description="Deploy your JSON files with a single click"
            delay="200"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />}
            title="Secure Storage"
            description="Your data is stored securely in our database"
            delay="300"
          />
        </div>

        {/* How It Works */}
        <div className="relative bg-zinc-900/30 rounded-2xl p-8 md:p-12 mb-16 md:mb-24 border border-white/[0.05] backdrop-blur-sm animate-slide-up">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <Step number="1" title="Create" description="Write or paste your JSON data in the editor" />
              <Step number="2" title="Deploy" description="Click deploy to save your JSON file" />
              <Step number="3" title="Access" description="Use the API endpoint to fetch your data" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative text-center bg-zinc-900/30 rounded-2xl p-10 md:p-16 border border-blue-500/10 animate-fade-in overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to get started?
            </h2>
            <p className="text-gray-400 text-lg mb-8">Start hosting your JSON data today</p>
            <Link
              href="/editor"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] animate-pulse hover:animate-none"
            >
              Create Your First File
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: string }) {
  return (
    <div 
      className="group relative bg-zinc-900/50 p-6 md:p-8 rounded-xl border border-white/[0.05] hover:border-blue-500/30 transition-all duration-500 hover:scale-105 backdrop-blur-sm animate-slide-up overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-blue-500/5 animate-pulse opacity-0 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 p-3 bg-blue-900/20 rounded-lg w-fit transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm md:text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center group relative">
      <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:animate-pulse">
          {number}
        </div>
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-sm md:text-base text-gray-500">{description}</p>
    </div>
  );
}
