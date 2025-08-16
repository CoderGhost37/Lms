import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin } from './require-admin'

export async function adminGetLesson(lessonId: string) {
  await requireAdmin()

  const data = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      thumbnailKey: true,
      videoKey: true,
      description: true,
      position: true,
      createdAt: true,
    },
  })

  if (!data) {
    return notFound()
  }

  return data
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>
