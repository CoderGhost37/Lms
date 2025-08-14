'use client'

import { Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { tryCatch } from '@/hooks/try-catch'
import { deleteChapter } from '../actions'

export function DeleteChapterModal({
  courseId,
  chapterId,
}: {
  courseId: string
  chapterId: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteChapter(courseId, chapterId))

      if (error) {
        toast.error('An unexpected error occurred. Please try again later.')
        return
      }

      if (result.status === 'success') {
        toast.success(result.message)
        setIsOpen(false)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the chapter.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onSubmit} loading={isPending}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
