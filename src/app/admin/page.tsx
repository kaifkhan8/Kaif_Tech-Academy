'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const adminStats = [
  { label: 'Total Students', value: '1,234', icon: UserGroupIcon, change: '+12%', color: 'blue' },
  { label: 'Active Courses', value: '45', icon: BookOpenIcon, change: '+5%', color: 'green' },
  { label: 'Revenue', value: '₹2,45,000', icon: CurrencyDollarIcon, change: '+18%', color: 'purple' },
  { label: 'Enrollments', value: '567', icon: AcademicCapIcon, change: '+25%', color: 'orange' }
]

const recentStudents = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', joinDate: '2024-01-15', courses: 3 },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', joinDate: '2024-01-14', courses: 2 },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', joinDate: '2024-01-13', courses: 4 }
]

const courses = [
  { id: 1, title: 'Web Development', students: 245, revenue: '₹98,000', status: 'Active' },
  { id: 2, title: 'Python Programming', students: 189, revenue: '₹75,600', status: 'Active' },
  { id: 3, title: 'Data Science', students: 156, revenue: '₹93,600', status: 'Active' }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">MD Kaif (Admin)</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {['overview', 'students', 'courses', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {adminStats.map((stat, index) => (
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
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{student.courses} courses</p>
                        <p className="text-xs text-gray-500">{student.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Courses</h3>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-600">{course.students} students</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{course.revenue}</p>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {course.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All Students</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Courses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">{student.email}</td>
                      <td className="py-3 px-4">{student.courses}</td>
                      <td className="py-3 px-4">{student.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Course
              </button>
            </div>
            <div className="grid gap-6">
              {courses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                      <p className="text-gray-600 mt-1">{course.students} enrolled students</p>
                      <p className="text-green-600 font-medium mt-2">Revenue: {course.revenue}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                        Edit
                      </button>
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics & Reports</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-16 w-16 text-gray-400" />
                <span className="ml-4 text-gray-600">Revenue Chart</span>
              </div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-16 w-16 text-gray-400" />
                <span className="ml-4 text-gray-600">Enrollment Chart</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}