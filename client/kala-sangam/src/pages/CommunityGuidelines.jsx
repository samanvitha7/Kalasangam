// src/pages/CommunityGuidelines.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CommunityGuidelines() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url('/assets/parallaximg.png')` }}
    >
      <div className="bg-[linear-gradient(to_bottom,rgba(255,190,152,0.95),rgba(255,187,233,0.95),rgba(44,165,141,0.95))] 
                      p-8 md:p-12 rounded-3xl max-w-4xl w-full shadow-xl border border-white/20 font-lora max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-tealblue mb-4 font-lora">
            Community Guidelines
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These guidelines ensure a respectful and creative community at KalaSangam. Please follow them while participating in our platform.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">1. Be Respectful and Inclusive</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                KalaSangam celebrates the diversity of Indian arts and welcomes artists, enthusiasts, and learners from all backgrounds. Treat everyone with respect, kindness, and dignity.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Use respectful language in all interactions</li>
                <li>Embrace cultural diversity and different artistic perspectives</li>
                <li>Avoid discriminatory, offensive, or harmful content</li>
                <li>Be mindful of cultural sensitivity when discussing traditional arts</li>
                <li>Support and encourage fellow community members</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">2. Share Authentic and Relevant Content</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Keep your contributions focused on traditional Indian arts, crafts, music, dance, and cultural heritage.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Share genuine artwork, performances, and cultural insights</li>
                <li>Provide accurate information about art forms and techniques</li>
                <li>Avoid spam, duplicate posts, or off-topic content</li>
                <li>Use appropriate tags and descriptions for your uploads</li>
                <li>Share constructive feedback and meaningful commentary</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">3. Respect Intellectual Property and Attribution</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Honor the creative rights of artists and the cultural heritage of traditional art forms.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Only share content you have permission to use</li>
                <li>Credit original artists, teachers, and cultural sources</li>
                <li>Respect traditional knowledge and cultural practices</li>
                <li>Report any copyright violations or unauthorized use</li>
                <li>Acknowledge the cultural origins of art forms you practice or share</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">4. Maintain a Safe and Supportive Environment</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Help create a welcoming space where artists and enthusiasts can learn, share, and grow together.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Provide constructive feedback and helpful suggestions</li>
                <li>Encourage beginners and support their learning journey</li>
                <li>Avoid harassment, bullying, or intimidating behavior</li>
                <li>Respect different skill levels and artistic interpretations</li>
                <li>Create an inclusive environment for all community members</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">5. Protect Your Account and Privacy</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Keep your account secure and be mindful of the personal information you share.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Use strong, unique passwords for your account</li>
                <li>Don't share your login credentials with others</li>
                <li>Be cautious about sharing personal contact information publicly</li>
                <li>Report suspicious activity or potential security threats</li>
                <li>Regularly review your privacy settings and preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">6. Report Violations and Seek Help</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Help us maintain community standards by reporting inappropriate content or behavior.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Use the report feature to flag violations of these guidelines</li>
                <li>Contact our support team for assistance with serious issues</li>
                <li>Provide detailed information when reporting problems</li>
                <li>Don't engage in public arguments - let moderators handle disputes</li>
                <li>Reach out if you need help understanding platform features</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-blue mb-4">7. Consequences of Violations</h2>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                Violations of these guidelines may result in:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Content removal or modification requests</li>
                <li>Temporary restrictions on posting or commenting</li>
                <li>Account warnings and educational guidance</li>
                <li>Temporary or permanent account suspension</li>
                <li>Reporting to relevant authorities for serious violations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We prefer education over punishment and will work with users to address concerns constructively.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Thank you for helping make KalaSangam a vibrant, respectful, and inspiring community for everyone who loves traditional Indian arts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/terms-of-service" 
                className="inline-flex items-center px-6 py-3 bg-white border border-teal-blue text-teal-blue font-semibold rounded-xl hover:bg-teal-blue hover:text-white transition-colors duration-300"
              >
                View Terms of Service
              </Link>
              <Link 
                to="/privacy-policy" 
                className="inline-flex items-center px-6 py-3 bg-white border border-coral-red text-coral-red font-semibold rounded-xl hover:bg-coral-red hover:text-white transition-colors duration-300"
              >
                View Privacy Policy
              </Link>
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
    </div>
  );
}
