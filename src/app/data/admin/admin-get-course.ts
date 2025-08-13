import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin } from './require-admin'

export async function adminGetCourse(courseId: string) {
  await requireAdmin()

  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      smallDescription: true,
      slug: true,
      status: true,
      createdAt: true,
      chapters: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              videoKey: true,
              position: true,
            },
          },
        },
      },
    },
  })

  if (!data) {
    return notFound()
  }

  return data
}

export type AdminCourseSingularType = Awaited<ReturnType<typeof adminGetCourse>>
