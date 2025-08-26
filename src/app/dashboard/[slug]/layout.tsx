import type { Metadata } from 'next'
import { getCourseBySlug } from '@/app/data/course/get-course-by-slug'
import { getCourseSidebarData } from '@/app/data/course/get-course-sidebar-data'
import { CourseSidebar } from './_components/course-sidebar'

interface CourseLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  return {
    title: course.title,
    description: course.smallDescription,
  }
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
  const { slug } = await params
  const { course } = await getCourseSidebarData(slug)

  return (
    <div className="flex flex-1">
      <div className="w-80 border-r border-border shrink-0">
        <CourseSidebar course={course} />
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
