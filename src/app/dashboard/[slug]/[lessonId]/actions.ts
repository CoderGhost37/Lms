'use server'

import { revalidatePath } from 'next/cache'
import { requireUser } from '@/app/data/user/require-user'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'

export async function markLessonAsCompleted(lessonId: string, slug: string): Promise<ApiResponse> {
  const user = await requireUser()

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: user.id,
        lessonId,
        completed: true,
      },
    })

    revalidatePath(`/dashboard/${slug}`)
    return {
      status: 'success',
      message: 'Lesson marked as completed.',
    }
  } catch (_error) {
    return {
      status: 'error',
      message: 'Failed to mark lesson as completed.',
    }
  }
}
