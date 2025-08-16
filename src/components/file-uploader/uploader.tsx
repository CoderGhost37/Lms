'use client'

import { useCallback, useEffect, useState } from 'react'
import { type FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useConstructUrl } from '@/hooks/use-construct-url'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from './render-state'

interface UploaderState {
  id: string | null
  file: File | null
  uploading: boolean
  key?: string
  isDeleting: boolean
  error: boolean
  objectUrl?: string
  fileType: 'image' | 'video'
  progress: number
}

interface UploaderProps {
  value?: string
  onChange?: (value: string) => void
  fileTypeAccepted: 'image' | 'video'
}

export function Uploader({ value, onChange, fileTypeAccepted }: UploaderProps) {
  const fileUrl = useConstructUrl(value || '')
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    error: false,
    file: null,
    fileType: fileTypeAccepted,
    isDeleting: false,
    key: value,
    objectUrl: value ? fileUrl : undefined,
    uploading: false,
    progress: 0,
  })

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(fileState.objectUrl)
      }
    }
  }, [fileState.objectUrl])

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
      }))

      try {
        // get presigned URL from the server
        const preSignedResponse = await fetch('/api/s3/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: fileTypeAccepted === 'image',
          }),
        })

        if (!preSignedResponse.ok) {
          toast.error('Failed to get presigned URL')
          setFileState((prev) => ({
            ...prev,
            uploading: false,
            progress: 0,
            error: true,
          }))

          return
        }

        const { presignedUrl, key } = await preSignedResponse.json()

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100)
              setFileState((prev) => ({
                ...prev,
                progress: percentComplete,
              }))
            }
          }

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              resolve()
              setFileState((prev) => ({
                ...prev,
                uploading: false,
                progress: 100,
                id: uuidv4(),
                key,
                objectUrl: URL.createObjectURL(file),
                file,
                error: false,
              }))
              onChange?.(key)
              toast.success('File uploaded successfully')
            } else {
              reject(new Error('Upload failed'))
              setFileState((prev) => ({
                ...prev,
                uploading: false,
                progress: 0,
                error: true,
              }))
              toast.error('Failed to upload file')
            }
          }

          xhr.onerror = () => {
            reject(new Error('Upload failed'))
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 0,
              error: true,
            }))
            toast.error('Failed to upload file')
          }

          xhr.open('PUT', presignedUrl)
          xhr.setRequestHeader('Content-Type', file.type)
          xhr.send(file)
        })
      } catch {
        toast.error('Something went wrong while uploading the file.')
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }))
      }
    },
    [fileTypeAccepted, onChange]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error('No files were selected.')
        return
      }

      const file = acceptedFiles[0]
      if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(fileState.objectUrl)
      }

      setFileState({
        file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: fileTypeAccepted,
      })

      uploadFile(file)
    },
    [fileState.objectUrl, fileTypeAccepted, uploadFile]
  )

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }))

      const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: fileState.key }),
      })

      if (!response.ok) {
        toast.error('Failed to delete file')
        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }))
        return
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(fileState.objectUrl)
      }

      onChange?.('')

      setFileState({
        isDeleting: false,
        objectUrl: undefined,
        error: false,
        uploading: false,
        progress: 0,
        fileType: fileTypeAccepted,
        file: null,
        id: null,
      })

      toast.success('File removed successfully')
    } catch {
      toast.error('Error removing file')
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }))
    }
  }

  function rejectFiles(fileRejections: FileRejection[]) {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === 'too-many-files'
      )
      if (tooManyFiles) {
        toast.error('You can only upload one file at a time.')
        return
      }

      const fileSizeTooBig = fileRejections.find(
        (rejection) => rejection.errors[0].code === 'file-too-large'
      )
      if (fileSizeTooBig) {
        toast.error('File size exceeds the limit of 5MB.')
        return
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypeAccepted === 'image' ? { 'image/*': [] } : { 'video/*': [] },
    maxFiles: 1,
    multiple: false,
    maxSize: fileTypeAccepted === 'image' ? 5 * 1024 * 1024 : 5000 * 1024 * 1024, // 5 MB for images, 30 MB for videos
    onDropRejected: rejectFiles,
    disabled: fileState.uploading || !!fileState.objectUrl || fileState.isDeleting,
  })

  function RenderContent() {
    if (fileState.uploading) {
      return <RenderUploadingState progress={fileState.progress} file={fileState.file as File} />
    }

    if (fileState.error) {
      return <RenderErrorState />
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          handleRemoveFile={handleRemoveFile}
          isDeleting={fileState.isDeleting}
          fileType={fileState.fileType}
        />
      )
    }

    return <RenderEmptyState isDragActive={isDragActive} />
  }

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'relative border-2 border-dashed transition-colors duration-200 w-full h-64 rounded-lg',
        isDragActive
          ? 'border-primary bg-primary/10 border-solid'
          : 'border-border hover:border-primary'
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        <RenderContent />
      </CardContent>
    </Card>
  )
}
