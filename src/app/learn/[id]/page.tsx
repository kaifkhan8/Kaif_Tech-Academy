'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  PlayIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline'

interface CourseContent {
  id: string
  title: string
  description: string
  modules: Module[]
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  duration: number
  type: string
  progress: {
    completed: boolean
    watchTime: number
    completedAt?: string
  } | null
}

export default function CoursePlayerPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [course, setCourse] = useState<CourseContent | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchCourseContent()
    }
  }, [params.id, session])

  const fetchCourseContent = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}/content`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data)
        
        // Set first lesson as current
        if (data.modules.length > 0 && data.modules[0].lessons.length > 0) {
          setCurrentLesson(data.modules[0].lessons[0])
        }
      }
    } catch (error) {
      console.error('Error fetching course content:', error)
    } finally {
      setLoading(false)
    }
  }

  const markLessonComplete = async (lessonId: string) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          completed: true,
          watchTime: currentLesson?.duration ? currentLesson.duration * 60 : 0
        })
      })

      // Update local state
      if (course) {
        const updatedCourse = { ...course }
        updatedCourse.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            if (lesson.id === lessonId) {
              lesson.progress = {
                completed: true,
                watchTime: lesson.duration * 60,
                completedAt: new Date().toISOString()
              }
            }
          })
        })
        setCourse(updatedCourse)
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error)
    }
  }

  const getTotalProgress = () => {
    if (!course) return 0
    
    const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0)
    const completedLessons = course.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => lesson.progress?.completed).length, 0
    )
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
  }

  const getNextLesson = () => {
    if (!course || !currentLesson) return null
    
    let found = false
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (found) return lesson
        if (lesson.id === currentLesson.id) found = true
      }
    }
    return null
  }

  const getPreviousLesson = () => {
    if (!course || !currentLesson) return null
    
    let previous = null
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLesson.id) return previous
        previous = lesson
      }
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const totalProgress = getTotalProgress()
  const nextLesson = getNextLesson()
  const previousLesson = getPreviousLesson()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              <AcademicCapIcon className="h-8 w-8" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{course.title}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{Math.round(totalProgress)}% Complete</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-80' : 'w-0'
        } overflow-hidden`}>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Course Content</h3>
            
            <div className="space-y-2">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id}>
                  <div className="text-sm font-medium text-gray-300 mb-2">
                    Module {moduleIndex + 1}: {module.title}
                  </div>
                  
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentLesson.id === lesson.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {lesson.progress?.completed ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-400" />
                          ) : (
                            <PlayIcon className="h-5 w-5" />
                          )}
                          <div>
                            <div className="text-sm font-medium">{lesson.title}</div>
                            <div className="text-xs text-gray-400">{lesson.duration} min</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video/Content Area */}
          <div className="flex-1 bg-black">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {currentLesson.videoUrl ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <PlayIcon className="h-20 w-20 text-white mx-auto mb-4" />
                    <p className="text-gray-300">Video Player (URL: {currentLesson.videoUrl})</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <BookOpenIcon className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Text-based lesson</p>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                <div className="flex items-center space-x-4 text-gray-400 mt-2">
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {currentLesson.duration} minutes
                  </span>
                  <span className="capitalize">{currentLesson.type}</span>
                </div>
              </div>

              {!currentLesson.progress?.completed && (
                <button
                  onClick={() => markLessonComplete(currentLesson.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Mark Complete
                </button>
              )}
            </div>

            {/* Lesson Content */}
            {currentLesson.content && (
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div 
                  className="text-gray-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => previousLesson && setCurrentLesson(previousLesson)}
                disabled={!previousLesson}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  previousLesson
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => nextLesson && setCurrentLesson(nextLesson)}
                disabled={!nextLesson}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  nextLesson
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}