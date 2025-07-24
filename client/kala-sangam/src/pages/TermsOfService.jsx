// src/pages/TermsOfService.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-tealblue mb-4 font-lora">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to KalaSangam! These terms govern your use of our platform dedicated to preserving and celebrating traditional Indian arts.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using KalaSangam ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these terms, please do not use our platform. These terms apply to all users, including 
              visitors, registered users, artists, and contributors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">2. About KalaSangam</h2>
            <p className="text-gray-700 leading-relaxed">
              KalaSangam is a digital platform dedicated to preserving, promoting, and celebrating traditional Indian arts, 
              crafts, music, dance, and cultural heritage. We provide a space for artists, enthusiasts, and learners to 
              connect, share knowledge, and explore India's rich artistic traditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">3. User Accounts and Registration</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>Account Creation:</strong> You may create an account using either your email address or phone number. 
                You are responsible for maintaining the security of your account credentials.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Accurate Information:</strong> You must provide accurate, current, and complete information during 
                registration and keep your account information updated.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Account Security:</strong> You are solely responsible for all activities under your account. 
                Notify us immediately of any unauthorized use.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">4. User Content and Conduct</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>Content Guidelines:</strong> When sharing content (artwork, videos, comments, etc.), you must ensure it:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Relates to traditional Indian arts and culture</li>
                <li>Is respectful and appropriate for all audiences</li>
                <li>Does not infringe on others' intellectual property rights</li>
                <li>Does not contain offensive, discriminatory, or harmful content</li>
                <li>Follows our Community Guidelines</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Prohibited Activities:</strong> You agree not to use the platform to:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Upload malicious software or spam</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate others or provide false information</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to the platform</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">5. Intellectual Property Rights</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>Your Content:</strong> You retain ownership of content you create and share on KalaSangam. 
                By uploading content, you grant us a non-exclusive, worldwide license to display, distribute, 
                and promote your content on the platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Platform Content:</strong> KalaSangam's design, features, and curated content are protected 
                by copyright and other intellectual property laws. You may not copy, modify, or distribute our 
                platform content without permission.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Traditional Arts:</strong> We respect that traditional art forms are part of cultural heritage. 
                When sharing traditional techniques or knowledge, we encourage proper attribution and cultural sensitivity.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">6. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our <Link to="/privacy-policy" className="text-coral-red hover:underline">Privacy Policy</Link> 
              to understand how we collect, use, and protect your personal information. By using KalaSangam, 
              you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">7. Platform Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to keep KalaSangam available 24/7, but we do not guarantee uninterrupted access. 
              We may temporarily suspend the platform for maintenance, updates, or other technical reasons. 
              We reserve the right to modify or discontinue features with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              KalaSangam is provided "as is" without warranties of any kind. We are not liable for any damages 
              arising from your use of the platform, including but not limited to direct, indirect, incidental, 
              or consequential damages. Your use of the platform is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              Either party may terminate your account at any time. We may suspend or terminate accounts that 
              violate these terms or our Community Guidelines. Upon termination, your right to use the platform 
              ceases immediately, though certain provisions of these terms will survive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms of Service from time to time. We will notify users of significant changes 
              via email or platform notifications. Your continued use of KalaSangam after changes constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms of Service, please contact us through our 
              <Link to="/about" className="text-coral-red hover:underline"> contact page</Link> or reach out to our support team.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Thank you for being part of the KalaSangam community and helping preserve India's rich cultural heritage!
            </p>
            <Link 
              to="/home" 
              className="inline-flex items-center px-6 py-3 bg-teal-blue text-off-white font-semibold rounded-xl hover:bg-coral-red transition-colors duration-300"
            >
              Return to KalaSangam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
