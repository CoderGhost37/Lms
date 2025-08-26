import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseCreationForm } from './_components/course-creation-form'

export const metadata: Metadata = {
  title: 'Create Course',
  description: 'Admin page for creating a new course',
}

export default function CourseCreationPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide basic information about the course</CardDescription>
        </CardHeader>
        <CardContent>
          <CourseCreationForm />
        </CardContent>
      </Card>
    </>
  )
}
