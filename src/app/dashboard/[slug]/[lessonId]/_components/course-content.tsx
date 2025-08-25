import { CheckCircle } from 'lucide-react'
import type { lessonContentType } from '@/app/data/course/get-lesson-content'
import { RenderDescription } from '@/components/rich-text-editor/render-description'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from './video-player'

interface CourseContentProps {
  data: lessonContentType
}

export function CourseContent({ data }: CourseContentProps) {
  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer thumbnailKey={data.thumbnailKey ?? ''} videoKey={data.videoKey ?? ''} />

      <div className="py-4 border-b">
        <Button variant="outline">
          <CheckCircle className="size-4 mr-2 text-green-500" />
          Mark as Complete
        </Button>
      </div>

      <div className="">
        <h1 className="font-bold text-3xl  tracking-tight text-foreground">{data.title}</h1>

        {data.description && <RenderDescription json={JSON.parse(data.description)} />}
      </div>
    </div>
  )
}
