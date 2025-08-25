import { BookIcon } from 'lucide-react'
import { useConstructUrl } from '@/hooks/use-construct-url'

interface VideoPlayerProps {
  thumbnailKey: string
  videoKey: string
}

export function VideoPlayer({ thumbnailKey, videoKey }: VideoPlayerProps) {
  const videoUrl = useConstructUrl(videoKey)
  const thumbnailUrl = useConstructUrl(thumbnailKey)

  if (!videoKey) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
        <BookIcon className="size-16 text-muted-foreground mx-auto mb-4" />
        <span className="text-muted">This lesson does not have a video</span>
      </div>
    )
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      {/** biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video poster={thumbnailUrl} controls className="w-full h-full object-cover">
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
      </video>
    </div>
  )
}
