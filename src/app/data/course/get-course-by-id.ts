import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function getCourseById(id: string) {
  const course = await prisma.course.findUnique({
    where: {
      id,
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
