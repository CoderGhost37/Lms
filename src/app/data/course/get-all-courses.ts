import 'server-only'
import { prisma } from '@/lib/db'

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      price: true,
      fileKey: true,
      level: true,
      duration: true,
      category: true,
    },
  })

  return data
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0]
