'use server'

import { request } from '@arcjet/next'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/app/data/admin/require-admin'
import arcjet, { detectBot, fixedWindow } from '@/lib/arcjet'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'
import {
  type ChapterSchemaType,
  type CourseSchemaType,
  chapterSchema,
  courseSchema,
  type LessonSchemaType,
  lessonSchema,
} from '@/lib/zodSchemas'

const aj = arcjet
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: 'LIVE',
      window: '1m',
      max: 5,
    })
  )

export async function editCourse(courseId: string, data: CourseSchemaType): Promise<ApiResponse> {
  const session = await requireAdmin()

  try {
    const req = await request()
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    })

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: 'error',
          message: 'Rate limit exceeded. Please try again later.',
        } as ApiResponse
      } else {
        return {
          status: 'error',
          message: 'You are a bot! If this is a mistake, please contact support.',
        } as ApiResponse
      }
    }

    const validation = courseSchema.safeParse(data)
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid course data',
      } as ApiResponse
    }

    await prisma.course.update({
      where: { id: courseId, userId: session.user.id },
      data: {
        ...validation.data,
      },
    })

    return {
      status: 'success',
      message: 'Course updated successfully',
    } as ApiResponse
  } catch {
    return {
      status: 'error',
      message: 'An unexpected error occurred',
    } as ApiResponse
  }
}

export async function reorderLessons(
  courseId: string,
  chapterId: string,
  lessons: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin()
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: 'error',
        message: 'No lessons provided for reordering',
      }
    }

    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    )

    await prisma.$transaction(updates)

    revalidatePath(`/admin/courses/${courseId}/edit`)

    return {
      status: 'success',
      message: 'Lessons reordered successfully',
    }
  } catch (_error) {
    return {
      status: 'error',
      message: 'Failed to reorder lessons',
    } as ApiResponse
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> {
  await requireAdmin()
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: 'error',
        message: 'No chapters provided for reordering',
      }
    }

    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    )

    await prisma.$transaction(updates)

    revalidatePath(`/admin/courses/${courseId}/edit`)

    return {
      status: 'success',
      message: 'Chapters reordered successfully',
    }
  } catch (_error) {
    return {
      status: 'error',
      message: 'Failed to reorder chapters',
    } as ApiResponse
  }
}

export async function createChapter(values: ChapterSchemaType): Promise<ApiResponse> {
  await requireAdmin()
  try {
    const validation = chapterSchema.safeParse(values)
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid chapter data',
      } as ApiResponse
    }

    const { name, courseId } = validation.data

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      })

      await tx.chapter.create({
        data: {
          title: name,
          courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      })
    })

    revalidatePath(`/admin/courses/${courseId}/edit`)

    return {
      status: 'success',
      message: 'Chapter created successfully',
    } as ApiResponse
  } catch {
    return {
      status: 'error',
      message: 'Failed to create chapter',
    }
  }
}

export async function createLesson(values: LessonSchemaType): Promise<ApiResponse> {
  await requireAdmin()
  try {
    const validation = lessonSchema.safeParse(values)
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid lesson data',
      } as ApiResponse
    }

    const { name, description, videoKey, thumbnailKey, courseId, chapterId } = validation.data

    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: 'desc',
        },
      })

      await tx.lesson.create({
        data: {
          title: name,
          description,
          thumbnailKey,
          videoKey,
          chapterId,
          position: (maxPos?.position ?? 0) + 1,
        },
      })
    })

    revalidatePath(`/admin/courses/${courseId}/edit`)

    return {
      status: 'success',
      message: 'Lesson created successfully',
    } as ApiResponse
  } catch {
    return {
      status: 'error',
      message: 'Failed to create lesson',
    }
  }
}
