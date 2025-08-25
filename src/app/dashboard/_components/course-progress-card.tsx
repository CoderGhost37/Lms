'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { EnrolledCourseType } from '@/app/data/user/get-enrolled-courses'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useConstructUrl } from '@/hooks/use-construct-url'
import { useCourseProgress } from '@/hooks/use-course-progress'

interface PublicCourseCardProps {
  course: EnrolledCourseType['course']
}

export function CourseProgressCard({ course }: PublicCourseCardProps) {
  const { totalLessons, completedLessons, progressPercentage } = useCourseProgress({
    courseData: course as any,
  })
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{course.level}</Badge>
      <Image
        src={useConstructUrl(course.fileKey)}
        alt={course.title}
        width={600}
        height={400}
        className="object-cover w-full h-full aspect-video rounded-t-lg group-hover:opacity-80 transition-opacity duration-300"
      />
      <CardContent className="p-4">
        <Link
          href={`/dashboard/${course.slug}`}
          className="text-lg font-semibold line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>

        <p className="line-clamp-2 text-muted-foreground text-sm leading-tight mt-2">
          {course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress: </span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs mt-1 text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${course.slug}`}
          className={buttonVariants({
            variant: 'outline',
            className: 'mt-4 w-full justify-center',
          })}
        >
          Learn More <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  )
}

export function PublicCourseCardSkeleton() {
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
