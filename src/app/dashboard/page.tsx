'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  PlayIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const enrolledCourses = [
  {
    id: 1,
    title: 'Complete Web Development',
    progress: 75,
    totalLessons: 40,
    completedLessons: 30,
    lastAccessed: '2 hours ago',
    thumbnail: '/course1.jpg'
  },
  {
    id: 2,
    title: 'Python Programming',
    progress: 45,
    totalLessons: 35,
    completedLessons: 16,
    lastAccessed: '1 day ago',
    thumbnail: '/course2.jpg'
  }
]

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    totalCourses: 2,
    completedCourses: 0,
    totalHours: 45,
    certificates: 1
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Kaif Tech Academy</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session?.user?.name || 'Student'}</span>
              <UserIcon className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: BookOpenIcon, label: 'Enrolled Courses', value: stats.totalCourses, color: 'blue' },
            { icon: TrophyIcon, label: 'Completed', value: stats.completedCourses, color: 'green' },
            { icon: ClockIcon, label: 'Learning Hours', value: stats.totalHours, color: 'purple' },
            { icon: AcademicCapIcon, label: 'Certificates', value: stats.certificates, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
          <div className="grid gap-6">
            {enrolledCourses.map((course, index) => (
              <div key={course.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <PlayIcon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-2">Last accessed</p>
                  <p className="text-sm font-medium text-gray-900">{course.lastAccessed}</p>
                  <Link 
                    href={`/learn/${course.id}`}
                    className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Courses</h3>
            <p className="text-gray-600 mb-4">Discover new courses to expand your skills</p>
            <Link 
              href="/courses"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Courses
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Certificates</h3>
            <p className="text-gray-600 mb-4">View and download your earned certificates</p>
            <Link 
              href="/certificates"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Certificates
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}