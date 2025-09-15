import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/progress - Update lesson progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { lessonId, completed, watchTime } = await request.json()

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Check if user is enrolled in the course
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                enrollments: {
                  where: { userId: session.user.id }
                }
              }
            }
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    if (lesson.module.course.enrollments.length === 0) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId
        }
      },
      update: {
        completed: completed ?? undefined,
        watchTime: watchTime ?? undefined,
        completedAt: completed ? new Date() : undefined
      },
      create: {
        userId: session.user.id,
        lessonId,
        completed: completed ?? false,
        watchTime: watchTime ?? 0,
        completedAt: completed ? new Date() : undefined
      }
    })

    // Update overall course progress
    const courseId = lesson.module.courseId
    await updateCourseProgress(session.user.id, courseId)

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/progress/[courseId] - Get course progress
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const courseId = url.pathname.split('/').pop()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Get all lessons in the course with progress
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: {
                  where: { userId: session.user.id }
                }
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const progressData = {
      courseId,
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        lessons: module.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          type: lesson.type,
          progress: lesson.progress[0] || null
        }))
      }))
    }

    return NextResponse.json(progressData)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to update course progress
async function updateCourseProgress(userId: string, courseId: string) {
  try {
    // Get total lessons in course
    const totalLessons = await prisma.lesson.count({
      where: {
        module: {
          courseId
        }
      }
    })

    // Get completed lessons
    const completedLessons = await prisma.progress.count({
      where: {
        userId,
        completed: true,
        lesson: {
          module: {
            courseId
          }
        }
      }
    })

    // Calculate progress percentage
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    // Update enrollment progress
    await prisma.enrollment.updateMany({
      where: {
        userId,
        courseId
      },
      data: {
        progress: Math.round(progressPercentage),
        completedAt: progressPercentage === 100 ? new Date() : null
      }
    })

    return progressPercentage
  } catch (error) {
    console.error('Error updating course progress:', error)
    return 0
  }
}