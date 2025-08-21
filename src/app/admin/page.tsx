import Link from 'next/link'
import { Suspense } from 'react'
import { EmptyState } from '@/components/empty-state/empty-state'
import { ChartAreaInteractive } from '@/components/sidebar/chart-area-interactive'
import { getAdminRecentCourses } from '@/components/sidebar/dmin-get-recent-courses'
import { SectionCards } from '@/components/sidebar/section-cards'
import { buttonVariants } from '@/components/ui/button'
import { getAdminEnrollmentStats } from '../data/admin/get-admin-enrollment-stats'
import { AdminCourseCard } from './courses/_components/admin-course-card'
import { CoursesSkeletonLayout } from './courses/_components/courses-skeleton'

export default async function AnalyticsPage() {
  const enrollmentStats = await getAdminEnrollmentStats()

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive chartData={enrollmentStats} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Courses</h2>
          <Link href="/admin/courses" className={buttonVariants({ variant: 'outline' })}>
            View all Courses
          </Link>
        </div>

        <Suspense fallback={<CoursesSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  )
}

async function RenderRecentCourses() {
  const data = await getAdminRecentCourses()

  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create new course"
        description="You don't have any courses. Create some to see them here."
        title="You don't have any courses yet!"
        href="/admin/courses/create"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  )
}
