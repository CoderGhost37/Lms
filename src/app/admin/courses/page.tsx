import Link from 'next/link'
import { Suspense } from 'react'
import { adminGetCourses } from '@/app/data/admin/admin-get-courses'
import { EmptyState } from '@/components/empty-state/empty-state'
import { buttonVariants } from '@/components/ui/button'
import { AdminCourseCard } from './_components/admin-course-card'
import { CoursesSkeletonLayout } from './_components/courses-skeleton'

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <Suspense fallback={<CoursesSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </>
  )
}

async function RenderCourses() {
  const data = await adminGetCourses()

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          description="Looks like you have no courses yet."
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {data.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  )
}
