// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url('/assets/parallaximg.png')` }}
    >
      <div className="bg-[linear-gradient(to_bottom,rgba(255,190,152,0.95),rgba(255,187,233,0.95),rgba(44,165,141,0.95))] 
                      p-8 md:p-12 rounded-3xl max-w-4xl w-full shadow-xl border border-white/20 font-lora max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-teal mb-4 font-lora">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal information on KalaSangam.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Information You Provide</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, or phone number when you register</li>
                  <li><strong>Profile Information:</strong> Profile pictures, bio, artistic interests, and preferences</li>
                  <li><strong>Content:</strong> Artwork uploads, comments, reviews, and other user-generated content</li>
                  <li><strong>Communications:</strong> Messages you send through our contact forms or support channels</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Information Collected Automatically</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the platform</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                  <li><strong>Cookies:</strong> We use essential cookies for functionality and analytics (see Cookie Policy below)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">2. How We Use Your Information</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">We use your information to:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Provide and maintain KalaSangam's services and features</li>
                <li>Authenticate your identity and secure your account</li>
                <li>Display your profile and content to other users (with your consent)</li>
                <li>Recommend relevant art forms, artists, and content based on your interests</li>
                <li>Communicate with you about updates, events, and platform notifications</li>
                <li>Improve our platform through analytics and user feedback</li>
                <li>Ensure compliance with our Terms of Service and Community Guidelines</li>
                <li>Respond to your inquiries and provide customer support</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">3. Information Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>We do not sell your personal information.</strong> We may share information in the following circumstances:
              </p>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Public Content:</strong> Content you choose to make public (artwork, comments, profile information) 
                  will be visible to other users and may be indexed by search engines.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Service Providers:</strong> We may share information with trusted third-party services that help 
                  us operate the platform (hosting, analytics, email services), bound by confidentiality agreements.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Legal Requirements:</strong> We may disclose information when required by law, court order, 
                  or to protect our rights and the safety of our users.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, 
                  user information may be transferred as part of that transaction.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">4. Data Security</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Password encryption using industry-standard hashing algorithms</li>
                <li>Secure data transmission using SSL/TLS encryption</li>
                <li>Regular security audits and updates</li>
                <li>Access controls limiting who can view your personal information</li>
                <li>Secure data storage with reputable cloud providers</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security 
                but are committed to protecting your information using reasonable safeguards.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">5. Your Rights and Choices</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">You have the following rights regarding your personal information:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information in your profile</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional emails and notifications</li>
                <li><strong>Privacy Settings:</strong> Control who can see your profile and content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us through our support channels. We will respond within a reasonable timeframe.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">6. Cookie Policy</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">KalaSangam uses cookies and similar technologies:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality (login, security)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can manage cookie preferences in your browser settings, though disabling essential cookies 
                may affect platform functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              KalaSangam is designed for users of all ages interested in traditional Indian arts. For users under 13, 
              we require parental consent before collecting personal information. Parents can review, modify, or 
              delete their child's information by contacting us. We are committed to protecting children's privacy 
              in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">8. International Users</h2>
            <p className="text-gray-700 leading-relaxed">
              KalaSangam is operated from India and serves users worldwide. By using our platform, you consent to 
              the transfer and processing of your information in India and other countries where our service providers operate. 
              We ensure appropriate safeguards are in place for international data transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">9. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and fulfill the 
              purposes described in this policy. When you delete your account, we will delete or anonymize your 
              personal information, though some information may be retained for legal or legitimate business purposes. 
              Public content you've shared may remain on the platform unless specifically requested for removal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of significant changes via email or platform notifications. The "Last updated" date at 
              the top indicates when this policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-deep-teal mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Through our <Link to="/about" className="text-coral-red hover:underline">contact page</Link></li>
              <li>Email our privacy team (contact information available on our About page)</li>
              <li>For specific privacy requests, please include "Privacy Request" in your subject line</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Your trust is important to us. We're committed to protecting your privacy while you explore India's beautiful artistic heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/terms-of-service" 
                className="inline-flex items-center px-6 py-3 bg-white border border-deep-teal text-deep-teal font-semibold rounded-xl hover:bg-deep-teal hover:text-white transition-colors duration-300"
              >
                View Terms of Service
              </Link>
              <Link 
                to="/home" 
                className="inline-flex items-center px-6 py-3 bg-deep-teal text-off-white font-semibold rounded-xl hover:bg-coral-red transition-colors duration-300"
              >
                Return to KalaSangam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
