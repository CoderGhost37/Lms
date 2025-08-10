'use server'

import { request } from '@arcjet/next'
import { requireAdmin } from '@/app/data/admin/require-admin'
import arcjet, { detectBot, fixedWindow } from '@/lib/arcjet'
import { prisma } from '@/lib/db'
import type { ApiResponse } from '@/lib/types'
import { type CourseSchemaType, courseSchema } from '@/lib/zodSchemas'

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

export async function createCourse(values: CourseSchemaType): Promise<ApiResponse> {
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
