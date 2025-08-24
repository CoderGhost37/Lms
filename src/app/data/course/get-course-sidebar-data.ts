import 'server-only'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireUser } from '../user/require-user'

export async function getCourseSidebarData(slug: string) {
  const user = await requireUser()

  try {
    const course = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        title: true,
        duration: true,
        level: true,
        category: true,
        slug: true,
        fileKey: true,
        chapters: {
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            title: true,
            position: true,
            lessons: {
              orderBy: {
                position: 'asc',
              },
              select: {
                id: true,
                title: true,
                description: true,
                position: true,
              },
            },
          },
        },
      },
    })

    if (!course) {
      return notFound()
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    })

    if (!enrollment || enrollment.status !== 'Active') {
      return notFound()
    }

    return { course }
  } catch (error) {
    console.log(error)
    return notFound()
  }
}

export type CourseSidebarDataType = Awaited<ReturnType<typeof getCourseSidebarData>>
