'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

export default function HelpPage() {
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: LightBulbIcon,
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on "Get Started" or "Sign Up" button and fill in your details. You\'ll receive a confirmation email to verify your account.'
        },
        {
          q: 'Are the courses really free to start?',
          a: 'Yes! You can browse course content and watch preview lessons for free. Full course access requires enrollment.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway.'
        }
      ]
    },
    {
      title: 'Courses & Learning',
      icon: AcademicCapIcon,
      questions: [
        {
          q: 'How long do I have access to a course?',
          a: 'Once you enroll in a course, you have lifetime access to all course materials and updates.'
        },
        {
          q: 'Can I download course videos?',
          a: 'Course videos are available for streaming only to protect our content. However, you can access them anytime with an internet connection.'
        },
        {
          q: 'Do you provide certificates?',
          a: 'Yes! You\'ll receive a certificate of completion after finishing a course and passing the final assessment.'
        },
        {
          q: 'Can I learn at my own pace?',
          a: 'Absolutely! Our courses are self-paced, so you can learn whenever it\'s convenient for you.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: QuestionMarkCircleIcon,
      questions: [
        {
          q: 'I\'m having trouble accessing my course',
          a: 'First, make sure you\'re logged in with the correct account. If the issue persists, contact our support team.'
        },
        {
          q: 'The video won\'t play',
          a: 'Check your internet connection and try refreshing the page. Clear your browser cache if the problem continues.'
        },
        {
          q: 'I forgot my password',
          a: 'Click on "Forgot Password" on the login page and follow the instructions to reset your password.'
        }
      ]
    }
  ]

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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Help Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100"
          >
            Find answers to common questions and get the help you need
          </motion.p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us directly for urgent issues</p>
              <Link href="/contact" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block">
                +91 8269887132
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Ticket</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Link href="/contact" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block">
                Contact Form
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * categoryIndex }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/courses"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
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