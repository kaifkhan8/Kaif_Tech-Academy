import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/certificates - Generate certificate for completed course
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Check if user completed the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      },
      include: {
        course: true
      }
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 404 })
    }

    if (enrollment.progress < 100) {
      return NextResponse.json({ 
        error: 'Course not completed. Complete all lessons to get certificate.' 
      }, { status: 400 })
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: session.user.id,
        courseId
      }
    })

    if (existingCertificate) {
      return NextResponse.json({ 
        message: 'Certificate already issued',
        certificate: existingCertificate 
      })
    }

    // Generate certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Certificate generated successfully',
      certificate
    })
  } catch (error) {
    console.error('Error generating certificate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/certificates - Get user certificates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const certificates = await prisma.certificate.findMany({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { issuedAt: 'desc' }
    })

    // Get course details for each certificate
    const certificatesWithCourses = await Promise.all(
      certificates.map(async (cert) => {
        const course = await prisma.course.findUnique({
          where: { id: cert.courseId },
          select: {
            title: true,
            category: true,
            level: true,
            duration: true
          }
        })
        
        return {
          ...cert,
          course
        }
      })
    )

    return NextResponse.json(certificatesWithCourses)
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/certificates/[id] - Get specific certificate
export async function GET_SINGLE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const certificateId = params.id

    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: certificate.courseId },
      select: {
        title: true,
        category: true,
        level: true,
        duration: true
      }
    })

    return NextResponse.json({
      ...certificate,
      course
    })
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}