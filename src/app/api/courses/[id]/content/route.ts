import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/courses/[id]/content - Get course content
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courseId = params.id

    // Check if user is enrolled or is admin
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    const isAdmin = session.user.role === 'ADMIN'

    if (!enrollment && !isAdmin) {
      return NextResponse.json({ 
        error: 'You must be enrolled in this course to access content' 
      }, { status: 403 })
    }

    // Get course with full content
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: enrollment ? {
                  where: { userId: session.user.id }
                } : false
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        enrollments: enrollment ? {
          where: { userId: session.user.id }
        } : false
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Format response with progress data
    const courseContent = {
      id: course.id,
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      language: course.language,
      enrollment: enrollment,
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        order: module.order,
        lessons: module.lessons.map(lesson => {
          const userProgress = lesson.progress?.[0]
          
          return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            videoUrl: lesson.videoUrl,
            duration: lesson.duration,
            order: lesson.order,
            type: lesson.type,
            isPreview: lesson.isPreview,
            progress: userProgress ? {
              completed: userProgress.completed,
              watchTime: userProgress.watchTime,
              completedAt: userProgress.completedAt
            } : null
          }
        })
      }))
    }

    return NextResponse.json(courseContent)
  } catch (error) {
    console.error('Error fetching course content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/lessons/[id] - Get specific lesson content
export async function GET_LESSON(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lessonId = params.id

    // Get lesson with course info
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
        },
        progress: {
          where: { userId: session.user.id }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Check access permissions
    const isEnrolled = lesson.module.course.enrollments.length > 0
    const isAdmin = session.user.role === 'ADMIN'
    const isPreview = lesson.isPreview

    if (!isEnrolled && !isAdmin && !isPreview) {
      return NextResponse.json({ 
        error: 'You must be enrolled to access this lesson' 
      }, { status: 403 })
    }

    // Get next and previous lessons
    const [nextLesson, prevLesson] = await Promise.all([
      prisma.lesson.findFirst({
        where: {
          moduleId: lesson.moduleId,
          order: { gt: lesson.order }
        },
        orderBy: { order: 'asc' },
        select: { id: true, title: true }
      }),
      prisma.lesson.findFirst({
        where: {
          moduleId: lesson.moduleId,
          order: { lt: lesson.order }
        },
        orderBy: { order: 'desc' },
        select: { id: true, title: true }
      })
    ])

    const lessonData = {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      duration: lesson.duration,
      type: lesson.type,
      course: {
        id: lesson.module.course.id,
        title: lesson.module.course.title
      },
      module: {
        id: lesson.module.id,
        title: lesson.module.title
      },
      progress: lesson.progress[0] || null,
      navigation: {
        next: nextLesson,
        previous: prevLesson
      }
    }

    return NextResponse.json(lessonData)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}