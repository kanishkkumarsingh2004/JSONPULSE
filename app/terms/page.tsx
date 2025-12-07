import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BlurOrbs from "@/components/BlurOrbs";

export default function TermsAndConditions() {
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
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] rounded-xl p-6 md:p-8 border border-white/[0.05] backdrop-blur-sm space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using JsonPulse ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">2. Use License</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                Permission is granted to temporarily use JsonPulse for personal or commercial purposes. This is the 
                grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without proper attribution</li>
                <li>Attempt to decompile or reverse engineer any software contained on JsonPulse</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p className="leading-relaxed mt-3">
                This license shall automatically terminate if you violate any of these restrictions and may be 
                terminated by JsonPulse at any time.
              </p>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3. Account Registration</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                To use certain features of the Service, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept all responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You may not use another person's account without permission. We reserve the right to refuse service, 
                terminate accounts, or remove or edit content at our sole discretion.
              </p>
            </div>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">4. User Content and Conduct</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                You retain all rights to the JSON files and content you upload to JsonPulse. By uploading content, 
                you grant us a license to store, process, and display your content as necessary to provide the Service.
              </p>
              <p className="leading-relaxed font-semibold text-white">You agree NOT to upload or share content that:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Is illegal, harmful, threatening, abusive, or harassing</li>
                <li>Violates any intellectual property rights</li>
                <li>Contains viruses, malware, or malicious code</li>
                <li>Impersonates any person or entity</li>
                <li>Contains personal information of others without consent</li>
                <li>Is spam or unsolicited promotional material</li>
                <li>Violates any applicable laws or regulations</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We reserve the right to remove any content that violates these terms without prior notice.
              </p>
            </div>
          </section>

          {/* API Usage */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">5. API Usage and Rate Limits</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                When using our API service, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Keep your API key confidential and secure</li>
                <li>Not share your API key with unauthorized parties</li>
                <li>Not exceed reasonable rate limits (subject to change)</li>
                <li>Not use the API to harm or disrupt the service</li>
                <li>Not attempt to bypass security measures or access restrictions</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We reserve the right to revoke API access or impose rate limits at any time to ensure service quality 
                and security for all users.
              </p>
            </div>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">6. Service Availability</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                We strive to provide reliable service, but we do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from using the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time 
                with or without notice. We will not be liable to you or any third party for any modification, suspension, 
                or discontinuance of the Service.
              </p>
            </div>
          </section>

          {/* Data Backup */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">7. Data Backup and Loss</h2>
            <p className="text-gray-300 leading-relaxed">
              While we take reasonable measures to protect your data, you are responsible for maintaining your own 
              backups of your JSON files and content. We are not responsible for any loss or corruption of your data, 
              or any costs or expenses associated with backing up or restoring any of your data.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                The Service and its original content (excluding user-uploaded content), features, and functionality 
                are and will remain the exclusive property of JsonPulse and its licensors. The Service is protected 
                by copyright, trademark, and other laws.
              </p>
              <p className="leading-relaxed">
                Our trademarks and trade dress may not be used in connection with any product or service without 
                the prior written consent of JsonPulse.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">9. Disclaimer of Warranties</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed font-semibold text-white">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND.
              </p>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, JsonPulse disclaims all warranties, express or implied, 
                including but not limited to implied warranties of merchantability, fitness for a particular purpose, 
                and non-infringement. We do not warrant that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The Service will meet your requirements</li>
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from using the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                To the maximum extent permitted by law, JsonPulse shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">11. Indemnification</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to defend, indemnify, and hold harmless JsonPulse and its licensors, employees, contractors, 
              agents, officers, and directors from and against any and all claims, damages, obligations, losses, 
              liabilities, costs, or debt, and expenses arising from: (i) your use of the Service; (ii) your violation 
              of these Terms; (iii) your violation of any third party right, including intellectual property rights; 
              or (iv) any harmful act toward any other user of the Service.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">12. Termination</h2>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice 
                or liability, for any reason, including without limitation if you breach these Terms.
              </p>
              <p className="leading-relaxed">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your 
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              <p className="leading-relaxed">
                All provisions of these Terms which by their nature should survive termination shall survive, including 
                ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">13. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without 
              regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms 
              will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">14. Dispute Resolution</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any concern or dispute about the Service, you agree to first try to resolve the dispute 
              informally by contacting us at support@jsonpulse.com. We will work with you in good faith to resolve 
              any disputes.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">15. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision 
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What 
              constitutes a material change will be determined at our sole discretion. By continuing to access or use 
              our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">16. Severability</h2>
            <p className="text-gray-300 leading-relaxed">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed 
              and interpreted to accomplish the objectives of such provision to the greatest extent possible under 
              applicable law, and the remaining provisions will continue in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">17. Entire Agreement</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms constitute the entire agreement between you and JsonPulse regarding the use of the Service, 
              superseding any prior agreements between you and JsonPulse relating to your use of the Service.
            </p>
          </section>

          {/* Acceptance */}
          <section className="border-t border-white/[0.1] pt-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              By using JsonPulse, you acknowledge that you have read, understood, and agree to be bound by these 
              Terms and Conditions. If you do not agree to these terms, please do not use our Service.
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
