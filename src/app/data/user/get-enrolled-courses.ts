import 'server-only'
import { prisma } from '@/lib/db'
import { requireUser } from './require-user'

export async function getEnrolledCourses() {
  const user = await requireUser()

  try {
    const data = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
        status: 'Active',
      },
      select: {
        course: {
          select: {
            id: true,
            slug: true,
            title: true,
            smallDescription: true,
            fileKey: true,
            level: true,
            duration: true,
            chapters: {
              select: {
                id: true,
                lessons: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
