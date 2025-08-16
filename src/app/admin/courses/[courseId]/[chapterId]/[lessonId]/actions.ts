'use server'

import { requireAdmin } from '@/app/data/admin/require-admin'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'
import { type LessonSchemaType, lessonSchema } from '@/lib/zodSchemas'

export async function updateLesson(
  lessonId: string,
  values: LessonSchemaType
): Promise<ApiResponse> {
  await requireAdmin()

  try {
    const validation = lessonSchema.safeParse(values)
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid lesson data.',
      }
    }

    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: validation.data.name,
        description: validation.data.description,
        thumbnailKey: validation.data.thumbnailKey,
        videoKey: validation.data.videoKey,
      },
    })

    return {
      status: 'success',
      message: 'Lesson updated successfully.',
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error',
      message: 'Failed to update the lesson.',
    }
  }
}
