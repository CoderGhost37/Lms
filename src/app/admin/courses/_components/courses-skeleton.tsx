import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CoursesSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseSkeleton key={index} />
      ))}
    </div>
  )
}

function CourseSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="w-full relative">
        <Skeleton className="h-[250px] rounded-t-lg aspect-video object-cover w-full rounded-md" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md mb-4" />
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
