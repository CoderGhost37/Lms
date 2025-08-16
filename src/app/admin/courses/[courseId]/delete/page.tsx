'use client'

import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { tryCatch } from '@/hooks/try-catch'
import { deleteCourse } from './actions'

export default function DeleteCoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId))

      if (error) {
        toast.error('An error occurred while deleting the course')
      }

      if (result?.status === 'success') {
        toast.success(result?.message)
        router.push(`/admin/courses`)
      } else {
        toast.error(result?.message)
      }
    })
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. All associated chapters and lessons will also be deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-end gap-4">
          <Link href={`/admin/courses`} className={buttonVariants({ variant: 'outline' })}>
            Cancel
          </Link>
          <Button variant="destructive" onClick={onSubmit} loading={isPending}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
