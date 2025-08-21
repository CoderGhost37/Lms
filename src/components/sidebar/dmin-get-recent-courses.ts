import { requireAdmin } from '@/app/data/admin/require-admin'
import { prisma } from '@/lib/db'

export async function getAdminRecentCourses() {
  await requireAdmin()

  try {
    const data = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 2,
      select: {
        id: true,
        title: true,
        smallDescription: true,
        slug: true,
        price: true,
        duration: true,
        level: true,
        status: true,
        fileKey: true,
      },
    })

    return data
  } catch (error) {
    console.error('Error fetching recent courses:', error)
    return []
  }
}
