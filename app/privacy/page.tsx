/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AnimatedGridBackground />
      <BlurOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] rounded-xl p-6 md:p-8 border border-white/[0.05] backdrop-blur-sm space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to JsonPulse. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.1 Personal Information</h3>
                <p className="leading-relaxed mb-2">We collect the following personal information when you register:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>First name and last name</li>
                  <li>Email address</li>
                  <li>Mobile number (optional)</li>
                  <li>Password (encrypted)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2.2 Usage Data</h3>
                <p className="leading-relaxed mb-2">We automatically collect certain information when you use our service:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>JSON files you create and store</li>
                  <li>API usage and access logs</li>
                  <li>File view counts</li>
                  <li>Browser type and version</li>
                  <li>IP address</li>
                  <li>Time zone and location data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <div className="text-gray-300 space-y-2">
              <p className="leading-relaxed">We use your personal information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>To provide and maintain our service</li>
                <li>To authenticate your account and manage your access</li>
                <li>To store and manage your JSON files</li>
                <li>To generate and manage your API keys</li>
                <li>To track file views and usage statistics</li>
                <li>To send you service-related notifications</li>
                <li>To improve our service and user experience</li>
                <li>To detect and prevent fraud or abuse</li>
              </ul>
            </div>
          </section>

          {/* Data Storage and Security */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                Your data is stored securely using Supabase (PostgreSQL database) with the following security measures:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Passwords are hashed using bcrypt (10 rounds)</li>
                <li>JWT tokens with 7-day expiration</li>
                <li>HTTP-only cookies to prevent XSS attacks</li>
                <li>Row Level Security (RLS) at database level</li>
                <li>Encrypted connections (HTTPS/SSL)</li>
                <li>Regular security updates and monitoring</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Providers:</strong> We use Supabase for database hosting</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
            <div className="text-gray-300 space-y-2">
              <p className="leading-relaxed">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your JSON files at any time</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Authentication Cookies:</strong> To keep you logged in (HTTP-only, 7 days)</li>
                <li><strong>Local Storage:</strong> To store user preferences and preview URLs</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal data only for as long as necessary to provide you with our service and 
              as described in this privacy policy. We will retain and use your information to the extent necessary 
              to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our service is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and you are aware that your 
              child has provided us with personal data, please contact us.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our privacy policy from time to time. We will notify you of any changes by posting 
              the new privacy policy on this page and updating the "Last updated" date. You are advised to review 
              this privacy policy periodically for any changes.
            </p>
          </section>

        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
