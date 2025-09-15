const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample courses
  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world projects and launch your career as a full-stack developer.',
      shortDesc: 'Master modern web development with React, Node.js, and MongoDB',
      price: 999,
      originalPrice: 2999,
      category: 'Web Development',
      level: 'ADVANCED',
      duration: 40,
      language: 'English',
      isPublished: true,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Python Programming Masterclass',
      description: 'Learn Python from scratch to advanced level with real projects. Perfect for beginners and those looking to advance their programming skills.',
      shortDesc: 'Learn Python from scratch to advanced level with real projects',
      price: 799,
      originalPrice: 2499,
      category: 'Programming',
      level: 'BEGINNER',
      duration: 35,
      language: 'English',
      isPublished: true,
      isFeatured: true
    },
    {
      id: '3',
      title: 'Data Science & AI',
      description: 'Complete Data Science and Machine Learning course. Learn Python, pandas, scikit-learn, and build AI projects.',
      shortDesc: 'Complete Data Science and Machine Learning course',
      price: 1299,
      originalPrice: 3999,
      category: 'Data Science',
      level: 'INTERMEDIATE',
      duration: 50,
      language: 'English',
      isPublished: true,
      isFeatured: true
    }
  ]

  // Create courses with modules and lessons
  for (let i = 0; i < courses.length; i++) {
    const courseData = courses[i]
    console.log(`Creating course: ${courseData.title}`)
    
    const course = await prisma.course.create({
      data: courseData
    })

    // Add modules for each course
    const modules = [
      {
        title: 'Getting Started',
        description: 'Introduction to the course',
        order: 1,
        courseId: course.id
      },
      {
        title: 'Core Concepts',
        description: 'Master the fundamental concepts',
        order: 2,
        courseId: course.id
      }
    ]

    for (const moduleData of modules) {
      const module = await prisma.module.create({
        data: moduleData
      })

      // Add lessons for each module
      const lessons = [
        {
          title: 'Introduction',
          content: `<p>Welcome to ${courseData.title}! This lesson will give you an overview of what you'll learn.</p>`,
          duration: 15,
          order: 1,
          moduleId: module.id,
          type: 'VIDEO',
          isPreview: true
        },
        {
          title: 'Basic Concepts',
          content: `<p>In this lesson, we'll cover the basic concepts you need to know.</p>`,
          duration: 25,
          order: 2,
          moduleId: module.id,
          type: 'VIDEO',
          isPreview: false
        }
      ]

      for (const lessonData of lessons) {
        await prisma.lesson.create({
          data: lessonData
        })
      }
    }
  }

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })