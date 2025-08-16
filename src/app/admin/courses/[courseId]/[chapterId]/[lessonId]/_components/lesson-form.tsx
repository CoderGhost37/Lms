'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { type Resolver, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { AdminLessonType } from '@/app/data/admin/admin-get-lesson'
import { Uploader } from '@/components/file-uploader/uploader'
import { RichTextEditor } from '@/components/rich-text-editor/editor'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { updateLesson } from '../actions'

interface LessonFormProps {
  data: AdminLessonType
  courseId: string
  chapterId: string
  lessonId: string
}

export function LessonForm({ data, courseId, chapterId, lessonId }: LessonFormProps) {
  const _router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema) as Resolver<LessonSchemaType>,
    defaultValues: {
      name: data.title,
      chapterId: chapterId,
      courseId: courseId,
      description: data.description ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
      videoKey: data.videoKey ?? undefined,
    },
  })

  function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(updateLesson(lessonId, values))
      if (error) {
        toast.error('An unexpected error occurred while updating the lesson.')
        return
      }

      if (result.status === 'error') {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      // router.push('/admin/courses')
    })
  }

  return (
    <div className="">
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className={buttonVariants({ variant: 'outline', className: 'mb-6' })}
      >
        <ArrowLeftIcon className="size-4" />
        Go Back
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>Configure the video and description for the lesson.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Uploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" loading={isPending}>
                <PlusIcon className="mr-2 size-4" />
                Update Lesson
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
