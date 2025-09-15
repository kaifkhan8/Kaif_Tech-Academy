import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses - Get all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const featured = searchParams.get('featured')

    let whereClause: any = { isPublished: true }
    
    if (category) whereClause.category = category
    if (level) whereClause.level = level
    if (featured) whereClause.isFeatured = featured === 'true'

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        modules: {
          include: {
            lessons: true
          }
        },
        enrollments: true,
        reviews: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate average rating for each course
    const coursesWithStats = courses.map(course => {
      const totalReviews = course.reviews.length
      const averageRating = totalReviews > 0 
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
        : 0

      return {
        ...course,
        totalStudents: course.enrollments.length,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews
      }
    })

    return NextResponse.json(coursesWithStats)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      shortDesc,
      thumbnail,
      price,
      originalPrice,
      category,
      level,
      duration,
      language
    } = await request.json()

    const course = await prisma.course.create({
      data: {
        title,
        description,
        shortDesc,
        thumbnail,
        price,
        originalPrice,
        category,
        level,
        duration,
        language: language || 'Hindi'
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}