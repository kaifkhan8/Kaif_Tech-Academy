'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AcademicCapIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function RefundPage() {
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
            <CurrencyDollarIcon className="h-12 w-12" />
            <h1 className="text-4xl font-bold">Refund Policy</h1>
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

      {/* Refund Timeline */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Refund Timeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">0-7 Days</h3>
              <p className="text-green-700">Full refund available with no questions asked</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-50 rounded-xl p-6 text-center border-2 border-yellow-200"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">8-30 Days</h3>
              <p className="text-yellow-700">Partial refund available (less than 20% course completed)</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-xl p-6 text-center border-2 border-red-200"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">30+ Days</h3>
              <p className="text-red-700">No refund available after 30 days</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-8 prose prose-lg max-w-none"
          >
            <h2>Refund Eligibility</h2>
            <p>
              At Kaif Tech Academy, we want you to be completely satisfied with your learning experience. 
              Our refund policy is designed to be fair and transparent.
            </p>

            <h3>Full Refund (0-7 Days)</h3>
            <ul>
              <li>Available for any reason within 7 days of enrollment</li>
              <li>No questions asked</li>
              <li>Processing time: 5-10 business days</li>
            </ul>

            <h3>Partial Refund (8-30 Days)</h3>
            <ul>
              <li>Available if less than 20% of course content has been completed</li>
              <li>Refund amount: 70% of the original payment</li>
              <li>Must provide a reason for the refund request</li>
              <li>Processing time: 7-14 business days</li>
            </ul>

            <h2>Non-Refundable Situations</h2>
            <p>Refunds will not be provided in the following cases:</p>
            <ul>
              <li>More than 30 days have passed since enrollment</li>
              <li>More than 20% of the course content has been completed</li>
              <li>Course completion certificate has been issued</li>
              <li>Violation of our Terms of Service</li>
              <li>Fraudulent or abusive behavior</li>
            </ul>

            <h2>How to Request a Refund</h2>
            <p>To request a refund, please follow these steps:</p>
            <ol>
              <li>Contact our support team at mdkaif0611@gmail.com</li>
              <li>Include your order number and reason for refund</li>
              <li>Our team will review your request within 48 hours</li>
              <li>If approved, refund will be processed to your original payment method</li>
            </ol>

            <h2>Special Circumstances</h2>
            <h3>Technical Issues</h3>
            <p>
              If you experience persistent technical issues that prevent you from accessing the course content, 
              we will work with you to resolve the issue or provide a full refund regardless of the time elapsed.
            </p>

            <h3>Course Cancellation</h3>
            <p>
              In the rare event that we cancel a course, all enrolled students will receive a full refund 
              within 14 business days.
            </p>

            <h2>Refund Processing</h2>
            <ul>
              <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
              <li><strong>UPI/Net Banking:</strong> 3-7 business days</li>
              <li><strong>Wallet Payments:</strong> 1-3 business days</li>
            </ul>

            <h2>Alternative Solutions</h2>
            <p>
              Before requesting a refund, consider these alternatives:
            </p>
            <ul>
              <li><strong>Course Transfer:</strong> Switch to a different course of equal or lesser value</li>
              <li><strong>Extended Access:</strong> Get additional time to complete your course</li>
              <li><strong>Technical Support:</strong> Our team can help resolve any technical issues</li>
            </ul>

            <h2>Contact Information</h2>
            <p>
              For refund requests or questions about this policy, contact us:
            </p>
            <ul>
              <li>Email: mdkaif0611@gmail.com</li>
              <li>Phone: +91 8269887132</li>
              <li>Support Hours: Monday-Friday, 9:00 AM - 6:00 PM IST</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-blue-700 font-medium">
                <strong>Note:</strong> This refund policy applies to paid courses only. Free courses and promotional content are not eligible for refunds.
              </p>
            </div>
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