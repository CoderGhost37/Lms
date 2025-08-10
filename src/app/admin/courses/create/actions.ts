'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'
import { type CourseSchemaType, courseSchema } from '@/lib/zodSchemas'

export async function createCourse(values: CourseSchemaType): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const validation = courseSchema.safeParse(values)
    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid course data',
      }
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    })

    return {
      status: 'success',
      message: 'Course created successfully',
    }
  } catch (_error) {
    return {
      status: 'error',
      message: 'Failed to create course',
    }
  }
}
