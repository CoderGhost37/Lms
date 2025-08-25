'use client'

import { CheckCircle } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import type { lessonContentType } from '@/app/data/course/get-lesson-content'
import { RenderDescription } from '@/components/rich-text-editor/render-description'
import { Button } from '@/components/ui/button'
import { tryCatch } from '@/hooks/try-catch'
import { markLessonAsCompleted } from '../actions'
import { VideoPlayer } from './video-player'

interface CourseContentProps {
  data: lessonContentType
}

export function CourseContent({ data }: CourseContentProps) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const { data: res, error } = await tryCatch(
        markLessonAsCompleted(data.id, data.chapter.course.slug)
      )

      if (error) {
        toast.error('An unexpected error occurred. Please try again later.')
      }

      if (res?.status === 'success') {
        toast.success(res?.message)
      } else {
        toast.error(res?.message)
      }
    })
  }

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer thumbnailKey={data.thumbnailKey ?? ''} videoKey={data.videoKey ?? ''} />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button variant="outline" className="bg-green-500/10 text-green-500 hover:text-green-600">
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={handleClick} loading={isPending}>
            <CheckCircle className="size-4 mr-2 text-green-500" />
            Mark as Complete
          </Button>
        )}
      </div>

      <div className="">
        <h1 className="font-bold text-3xl  tracking-tight text-foreground">{data.title}</h1>

        {data.description && <RenderDescription json={JSON.parse(data.description)} />}
      </div>
    </div>
  )
}
