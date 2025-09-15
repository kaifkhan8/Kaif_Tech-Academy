'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AcademicCapIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Kaif Tech Academy</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-4"
          >
            <ShieldCheckIcon className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100"
          >
            Last updated: January 1, 2024
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-8 prose prose-lg max-w-none"
          >
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Course progress and completion data</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>Information about how you use our website and services</li>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Course engagement and learning analytics</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Track your learning progress and provide personalized recommendations</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with vendors and service providers who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
            </p>

            <h2>Your Rights and Choices</h2>
            <h3>Account Information</h3>
            <p>You may update or correct your account information at any time by logging into your account.</p>

            <h3>Marketing Communications</h3>
            <p>You may opt out of receiving promotional emails from us by following the instructions in those emails.</p>

            <h3>Data Access and Deletion</h3>
            <p>You may request access to or deletion of your personal information by contacting us at mdkaif0611@gmail.com.</p>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to collect and track information and to improve our services. 
              You can control cookies through your browser settings.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your residence. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: mdkaif0611@gmail.com</li>
              <li>Phone: +91 8269887132</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AcademicCapIcon className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">Kaif Tech Academy</span>
          </div>
          <p className="text-gray-400">
            © 2024 Kaif Tech Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}