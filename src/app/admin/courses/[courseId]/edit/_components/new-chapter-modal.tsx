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
import { type ChapterSchemaType, chapterSchema } from '@/lib/zodSchemas'
import { createChapter } from '../actions'

export function NewChapterModal({ courseId }: { courseId: string }) {
  const [isOpen, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: '',
      courseId: courseId,
    },
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) form.reset()
    setOpen(open)
  }

  function onSubmit(values: z.infer<typeof chapterSchema>) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createChapter(values))

      if (error) {
        toast.error('An unexpected error occurred. Please try again later.')
        return
      }

      if (result.status === 'success') {
        toast.success('Chapter created successfully!')
        setOpen(false)
        form.reset()
      } else {
        toast.error(result.message || 'Failed to create chapter')
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="size-4" />
          New Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new chapter</DialogTitle>
          <DialogDescription>What would you like to name this chapter?</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter Name" {...field} />
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
