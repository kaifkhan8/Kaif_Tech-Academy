'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AcademicCapIcon, DocumentTextIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Web Development in 2024',
      excerpt: 'A comprehensive guide to beginning your web development journey with modern tools and frameworks.',
      author: 'MD Kaif',
      date: '2024-01-15',
      category: 'Web Development',
      readTime: '5 min read',
      image: '/blog/web-dev-2024.jpg'
    },
    {
      id: 2,
      title: 'Python vs JavaScript: Which Should You Learn First?',
      excerpt: 'Compare the pros and cons of starting with Python or JavaScript as your first programming language.',
      author: 'MD Kaif',
      date: '2024-01-10',
      category: 'Programming',
      readTime: '7 min read',
      image: '/blog/python-vs-js.jpg'
    },
    {
      id: 3,
      title: 'The Future of AI in Education',
      excerpt: 'Exploring how artificial intelligence is transforming the way we learn and teach technology.',
      author: 'MD Kaif',
      date: '2024-01-05',
      category: 'AI & Technology',
      readTime: '6 min read',
      image: '/blog/ai-education.jpg'
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
            Our Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100"
          >
            Insights, tutorials, and industry updates from the world of technology
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <DocumentTextIcon className="h-16 w-16 text-white" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Coming Soon Message */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">More Posts Coming Soon!</h3>
              <p className="text-gray-600">
                We're working on more exciting content. Stay tuned for updates!
              </p>
            </div>
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