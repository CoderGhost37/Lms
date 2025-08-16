import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn('size-6 text-muted-foreground', isDragActive && 'text-primary')}
        />
      </div>

      <p className="font-semibold text-foreground">
        Drop your files here or{' '}
        <span className="text-primary font-bold cursor-pointer">Click to upload</span>
      </p>
    </div>
  )
}

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className="size-6 text-destructive" />
      </div>

      <p className="font-semibold">Upload Failed</p>
      <p className="text-sm text-muted-foreground mt-1">Something went wrong</p>

      <div className="mt-4">
        <Button type="button">Click or drag file to retry</Button>
      </div>
    </div>
  )
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string
  isDeleting: boolean
  handleRemoveFile: () => void
  fileType: 'image' | 'video'
}) {
  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      {fileType === 'image' ? (
        <Image src={previewUrl} alt="Uploaded File" fill className="object-contain rounded-lg" />
      ) : (
        // biome-ignore lint/a11y/useMediaCaption: <explanation>
        <video src={previewUrl} controls className="object-contain rounded-md w-full h-full" />
      )}

      <Button
        type="button"
        onClick={handleRemoveFile}
        disabled={isDeleting}
        variant="destructive"
        size="icon"
        className={cn('absolute top-4 right-4')}
      >
        {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <XIcon className="size-4" />}
      </Button>
    </div>
  )
}

export function RenderUploadingState({ progress, file }: { progress: number; file: File }) {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <p>{progress}</p>
      <p className="mt-2 text-sm font-medium">Uploading...</p>
      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
    </div>
  )
}
