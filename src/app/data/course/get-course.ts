import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      fileKey: true,
      description: true,
      price: true,
      duration: true,
      level: true,
      category: true,
      smallDescription: true,
      chapters: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              title: 'asc',
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      },
    },
  })

  if (!course) {
    return notFound()
  }

  return course
}
