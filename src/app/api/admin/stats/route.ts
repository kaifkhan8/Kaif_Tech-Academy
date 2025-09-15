import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get statistics
    const [
      totalStudents,
      totalCourses,
      totalEnrollments,
      totalRevenue,
      recentStudents,
      topCourses
    ] = await Promise.all([
      // Total students
      prisma.user.count({
        where: { role: 'STUDENT' }
      }),

      // Total active courses
      prisma.course.count({
        where: { isPublished: true }
      }),

      // Total enrollments
      prisma.enrollment.count(),

      // Total revenue (calculated separately)
      calculateTotalRevenue(),

      // Recent students (last 10)
      prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          _count: {
            select: {
              enrollments: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),

      // Top courses by enrollment
      prisma.course.findMany({
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          price: true,
          _count: {
            select: {
              enrollments: true
            }
          }
        },
        orderBy: {
          enrollments: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ])

    // Calculate estimated revenue
    const estimatedRevenue = await calculateTotalRevenue()

    const stats = {
      totalStudents,
      totalCourses,
      totalEnrollments,
      estimatedRevenue,
      recentStudents: recentStudents.map(student => ({
        ...student,
        enrolledCourses: student._count.enrollments
      })),
      topCourses: topCourses.map(course => ({
        ...course,
        totalStudents: course._count.enrollments,
        estimatedRevenue: course.price * course._count.enrollments
      }))
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to calculate total revenue
async function calculateTotalRevenue() {
  try {
    const enrollmentsWithCourses = await prisma.enrollment.findMany({
      include: {
        course: {
          select: {
            price: true
          }
        }
      }
    })

    const totalRevenue = enrollmentsWithCourses.reduce((sum, enrollment) => {
      return sum + enrollment.course.price
    }, 0)

    return totalRevenue
  } catch (error) {
    console.error('Error calculating revenue:', error)
    return 0
  }
}