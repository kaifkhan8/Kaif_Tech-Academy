import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'mdkaif0611@gmail.com' },
    update: {},
    create: {
      email: 'mdkaif0611@gmail.com',
      name: 'MD Kaif',
      phone: '+918269887132',
      password: adminPassword,
      role: 'ADMIN',
      isVerified: true
    }
  })

  // Create sample courses
  const courses = [
    {
      title: 'Complete Web Development Bootcamp',
      description: 'Master modern web development with React, Node.js, and MongoDB',
      shortDesc: 'Full-stack web development course',
      price: 999,
      originalPrice: 2999,
      category: 'Web Development',
      level: 'BEGINNER',
      duration: 40,
      language: 'Hindi',
      isPublished: true,
      isFeatured: true
    },
    {
      title: 'Python Programming Masterclass',
      description: 'Learn Python from scratch to advanced level with real projects',
      shortDesc: 'Complete Python programming course',
      price: 799,
      originalPrice: 2499,
      category: 'Python',
      level: 'BEGINNER',
      duration: 35,
      language: 'Hindi',
      isPublished: true,
      isFeatured: true
    },
    {
      title: 'Data Science & Machine Learning',
      description: 'Complete Data Science and Machine Learning course with Python',
      shortDesc: 'Data Science and AI course',
      price: 1299,
      originalPrice: 3999,
      category: 'Data Science',
      level: 'INTERMEDIATE',
      duration: 50,
      language: 'Hindi',
      isPublished: true,
      isFeatured: true
    }
  ]

  for (const courseData of courses) {
    await prisma.course.create({
      data: {
        ...courseData,
        level: courseData.level as any
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })