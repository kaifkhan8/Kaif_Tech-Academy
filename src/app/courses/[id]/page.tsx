'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PaymentModal from '@/components/PaymentModal'
import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  BookOpenIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface Course {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  level: string
  duration: number
  language: string
  totalStudents: number
  averageRating: number
  totalReviews: number
  modules: Module[]
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  duration: number
  type: string
  isPreview: boolean
}

export default function CourseDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    fetchCourse()
    if (session?.user?.id) {
      checkEnrollment()
    }
  }, [params.id, session])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkEnrollment = async () => {
    try {
      const response = await fetch('/api/enrollments')
      if (response.ok) {
        const enrollments = await response.json()
        const isEnrolled = enrollments.some((e: any) => e.courseId === params.id)
        setEnrolled(isEnrolled)
      }
    } catch (error) {
      console.error('Error checking enrollment:', error)
    }
  }

  const handleEnrollment = async () => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    if (course?.price === 0) {
      // Free course - direct enrollment
      await enrollInCourse()
    } else {
      // Paid course - show payment modal
      setShowPaymentModal(true)
    }
  }

  const enrollInCourse = async () => {
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: params.id })
      })

      if (response.ok) {
        setEnrolled(true)
        alert('Successfully enrolled in the course!')
      } else {
        const error = await response.json()
        alert(error.message || 'Enrollment failed')
      }
    } catch (error) {
      console.error('Error enrolling:', error)
      alert('Enrollment failed')
    }
  }

  const handlePaymentSuccess = async () => {
    await enrollInCourse()
    setShowPaymentModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700">
            ← Back to courses
          </Link>
        </div>
      </div>
    )
  }

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Kaif Tech Academy</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
              {session ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              ) : (
                <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600">Sign In</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8 mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                    {course.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid md:grid-cols-4 gap-6 py-6 border-t border-gray-200">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-gray-900 font-medium">{course.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({course.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{course.totalStudents.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{course.duration} hours</span>
                </div>
                <div className="flex items-center">
                  <BookOpenIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{totalLessons} lessons</span>
                </div>
              </div>
            </motion.div>

            {/* Course Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{module.lessons.length} lessons</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <PlayIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <span className="text-gray-900">{lesson.title}</span>
                              {lesson.isPreview && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs rounded">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration} min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-8"
            >
              {/* Video Preview */}
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
                <PlayIcon className="h-16 w-16 text-white" />
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">₹{course.originalPrice}</span>
                  )}
                </div>
                {course.originalPrice && (
                  <span className="text-green-600 font-medium">
                    Save ₹{course.originalPrice - course.price}
                  </span>
                )}
              </div>

              {/* Enroll Button */}
              {enrolled ? (
                <Link
                  href={`/learn/${course.id}`}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold text-center block hover:bg-green-700 transition-colors"
                >
                  Continue Learning
                </Link>
              ) : (
                <button
                  onClick={handleEnrollment}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                </button>
              )}

              {/* Course Info */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime Access:</span>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && course && (
        <PaymentModal
          course={{
            id: course.id,
            title: course.title,
            price: course.price,
            originalPrice: course.originalPrice
          }}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}