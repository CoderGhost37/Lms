import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireUser } from '../user/require-user'

export async function getLessonContent(lessonId: string) {
  const user = await requireUser()

  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnailKey: true,
        videoKey: true,
        position: true,
        chapter: {
          select: {
            courseId: true,
          },
        },
      },
    })

    if (!lesson) {
      return notFound()
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.chapter.courseId,
        },
      },
      select: {
        status: true,
      },
    })

    if (!enrollment || enrollment.status !== 'Active') {
      return notFound()
    }

    return lesson
  } catch (error) {
    console.error(error)
    return notFound()
  }
}

export type lessonContentType = Awaited<ReturnType<typeof getLessonContent>>
