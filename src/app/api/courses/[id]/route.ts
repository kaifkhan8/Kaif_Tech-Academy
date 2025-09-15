import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
        isPublished: true
      },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: {
                order: 'asc'
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        },
        reviews: {
          take: 5,
          orderBy: {
            createdAt: 'desc'
          }
        },
        enrollments: true
      }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Calculate additional fields
    const totalStudents = course.enrollments.length
    const totalReviews = course.reviews.length
    const averageRating = totalReviews > 0 
      ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    // Transform the data to match frontend expectations
    const transformedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      originalPrice: course.originalPrice,
      category: course.category,
      level: course.level,
      duration: course.duration,
      language: course.language,
      totalStudents,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        lessons: module.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration || 0,
          type: lesson.type,
          isPreview: lesson.isPreview
        }))
      }))
    }

    return NextResponse.json(transformedCourse)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}