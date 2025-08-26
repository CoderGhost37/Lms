import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function getCourseBySlug(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
    },
  })

  if (!course) {
    return notFound()
  }

  return course
}
