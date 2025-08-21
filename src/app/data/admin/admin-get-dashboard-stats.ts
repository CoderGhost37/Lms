import 'server-only'
import { prisma } from '@/lib/db'
import { requireAdmin } from './require-admin'

export async function getAdminDashboardStats() {
  await requireAdmin()

  const [userCount, customerCount, courseCount, lessonCount] = await Promise.all([
    // total users
    prisma.user.count(),

    // total customers
    prisma.user.count({
      where: {
        enrollments: {
          some: {},
        },
      },
    }),

    // total courses
    prisma.course.count(),

    // total lessons
    prisma.lesson.count(),
  ])

  return {
    userCount,
    customerCount,
    courseCount,
    lessonCount,
  }
}
