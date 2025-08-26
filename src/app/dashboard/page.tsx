import type { Metadata } from 'next'
import { EmptyState } from '@/components/empty-state/empty-state'
import { PublicCourseCard } from '../(public)/courses/_components/public-course-card'
import { getAllCourses } from '../data/course/get-all-courses'
import { getEnrolledCourses } from '../data/user/get-enrolled-courses'
import { CourseProgressCard } from './_components/course-progress-card'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard for managing courses and progress',
}

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([getAllCourses(), getEnrolledCourses()])

  const availableCourses = courses.filter(
    (course) => !enrolledCourses.some(({ course: enrolled }) => enrolled.id === course.id)
  )

  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
        <p className="text-3xl font-bold">Enrolled Courses</p>
        <p className="text-muted-foreground">Here you can see all the courses you have access to</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You have not purchased any courses yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.course.id} course={course.course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <p className="text-3xl font-bold">Available Courses</p>
          <p className="text-muted-foreground">Here you can see all the courses you can purchase</p>
        </div>

        {availableCourses.length === 0 ? (
          <EmptyState
            title="No courses available"
            description="You have already purchased all available courses."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
