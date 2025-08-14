'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { tryCatch } from '@/hooks/try-catch'
import { type LessonSchemaType, lessonSchema } from '@/lib/zodSchemas'
import { createLesson } from '../actions'

export function NewLessonModal({ courseId, chapterId }: { courseId: string; chapterId: string }) {
  const [isOpen, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: '',
      courseId: courseId,
      chapterId: chapterId,
    },
  })

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  function onSubmit(values: z.infer<typeof lessonSchema>) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values))

      if (error) {
        toast.error('An unexpected error occurred. Please try again later.')
        return
      }

      if (result.status === 'success') {
        toast.success('Lesson created successfully!')
        setOpen(false)
        form.reset()
      } else {
        toast.error(result.message || 'Failed to create lesson')
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-full">
          <Plus className="size-4" />
          Create New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new lesson</DialogTitle>
          <DialogDescription>What would you like to name this lesson?</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lesson Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" loading={isPending}>
                Save Change
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
