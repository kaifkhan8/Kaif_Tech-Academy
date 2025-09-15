import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/reviews - Add course review
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, rating, comment } = await request.json()

    if (!courseId || !rating) {
      return NextResponse.json({ 
        error: 'Course ID and rating are required' 
      }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ 
        error: 'Rating must be between 1 and 5' 
      }, { status: 400 })
    }

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json({ 
        error: 'You must be enrolled in this course to review it' 
      }, { status: 403 })
    }

    // Check if user already reviewed this course
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    if (existingReview) {
      // Update existing review
      const updatedReview = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          rating,
          comment
        },
        include: {
          course: {
            select: {
              title: true
            }
          }
        }
      })

      return NextResponse.json({
        message: 'Review updated successfully',
        review: updatedReview
      })
    } else {
      // Create new review
      const review = await prisma.review.create({
        data: {
          userId: session.user.id,
          courseId,
          rating,
          comment
        },
        include: {
          course: {
            select: {
              title: true
            }
          }
        }
      })

      return NextResponse.json({
        message: 'Review added successfully',
        review
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Error adding review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/reviews/[courseId] - Get course reviews
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const courseId = url.pathname.split('/').pop()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' }
    })

    // Get user info separately for each review
    const reviewsWithUsers = await Promise.all(
      reviews.map(async (review) => {
        const user = await prisma.user.findUnique({
          where: { id: review.userId },
          select: { name: true, avatar: true }
        })
        return { ...review, user }
      })
    )

    // Calculate average rating
    const averageRating = reviewsWithUsers.length > 0 
      ? reviewsWithUsers.reduce((sum, review) => sum + review.rating, 0) / reviewsWithUsers.length
      : 0

    // Rating distribution
    const ratingDistribution = {
      1: reviewsWithUsers.filter(r => r.rating === 1).length,
      2: reviewsWithUsers.filter(r => r.rating === 2).length,
      3: reviewsWithUsers.filter(r => r.rating === 3).length,
      4: reviewsWithUsers.filter(r => r.rating === 4).length,
      5: reviewsWithUsers.filter(r => r.rating === 5).length,
    }

    return NextResponse.json({
      reviews: reviewsWithUsers,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviewsWithUsers.length,
      ratingDistribution
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/reviews/[id] - Delete review (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const reviewId = url.pathname.split('/').pop()

    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 })
    }

    // Check if user is admin or review owner
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    if (review.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ 
        error: 'You can only delete your own reviews' 
      }, { status: 403 })
    }

    await prisma.review.delete({
      where: { id: reviewId }
    })

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}