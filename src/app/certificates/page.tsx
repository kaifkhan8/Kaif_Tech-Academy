'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AcademicCapIcon,
  TrophyIcon,
  CalendarIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  PrinterIcon
} from '@heroicons/react/24/outline'

interface Certificate {
  id: string
  issuedAt: string
  course: {
    title: string
    category: string
    level: string
    duration: number
  }
  user: {
    name: string
    email: string
  }
}

export default function CertificatesPage() {
  const { data: session } = useSession()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchCertificates()
    }
  }, [session])

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates')
      if (response.ok) {
        const data = await response.json()
        setCertificates(data)
      }
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateCertificate = async (courseId: string) => {
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      })

      if (response.ok) {
        const result = await response.json()
        alert('Certificate generated successfully!')
        fetchCertificates() // Refresh list
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to generate certificate')
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('Failed to generate certificate')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">My Certificates</span>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Certificates</h1>
          <p className="text-xl text-gray-600">
            Showcase your achievements and completed courses
          </p>
        </motion.div>

        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <DocumentIcon className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Certificates Yet</h3>
            <p className="text-gray-600 mb-8">
              Complete courses to earn your certificates and showcase your skills
            </p>
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CertificateCard({ certificate, index }: { certificate: Certificate, index: number }) {
  const downloadCertificate = () => {
    // In a real implementation, this would generate and download a PDF
    alert('Certificate download feature will be implemented with PDF generation')
  }

  const printCertificate = () => {
    window.print()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white relative">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <TrophyIcon className="h-16 w-16" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <AcademicCapIcon className="h-12 w-12" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Certificate of Completion</h3>
            <div className="w-16 h-1 bg-white/50 mx-auto"></div>
          </div>

          <div className="text-center mb-6">
            <p className="text-blue-100 mb-2">This is to certify that</p>
            <h4 className="text-xl font-bold">{certificate.user.name}</h4>
            <p className="text-blue-100 mt-2">has successfully completed</p>
          </div>

          <div className="text-center">
            <h5 className="text-lg font-semibold mb-2">{certificate.course.title}</h5>
            <div className="flex justify-center space-x-4 text-sm text-blue-100">
              <span>{certificate.course.level}</span>
              <span>•</span>
              <span>{certificate.course.duration} hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Issued: {new Date(certificate.issuedAt).toLocaleDateString()}
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
            Verified
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p><strong>Category:</strong> {certificate.course.category}</p>
          <p><strong>Certificate ID:</strong> {certificate.id.slice(0, 8).toUpperCase()}</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={downloadCertificate}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Download
          </button>
          <button
            onClick={printCertificate}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>
    </motion.div>
  )
}