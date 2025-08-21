'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { tryCatch } from '@/hooks/try-catch'
import { enrollInCourse } from '../actions'

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(enrollInCourse(courseId))

      if (error) {
        toast.error('An unexpected error occurred. Please try again later.')
      }

      if (result?.status === 'success') {
        toast.success(result.message)
      } else {
        toast.error(result?.message)
      }
    })
  }
  return (
    <Button className="w-full" onClick={handleClick} loading={isPending}>
      Enroll Now
    </Button>
  )
}
