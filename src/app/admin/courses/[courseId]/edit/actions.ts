'use server'

import { requireAdmin } from '@/app/data/admin/require-admin'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'
import { type CourseSchemaType, courseSchema } from '@/lib/zodSchemas'

export async function editCourse(courseId: string, data: CourseSchemaType): Promise<ApiResponse> {
  const session = await requireAdmin()

  try {
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
