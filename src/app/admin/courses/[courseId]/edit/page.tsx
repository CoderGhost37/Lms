import type { Metadata } from 'next'
import { adminGetCourse } from '@/app/data/admin/admin-get-course'
import { getCourseById } from '@/app/data/course/get-course-by-id'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CourseStructure } from './_components/course-structure'
import { EditCourseForm } from './_components/edit-course-form'

type Params = Promise<{ courseId: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { courseId } = await params
  const course = await getCourseById(courseId)

  return {
    title: `Edit - ${course.title}`,
    description: course.smallDescription,
  }
}

export default async function EditCoursePage({ params }: { params: Params }) {
  const { courseId } = await params
  const data = await adminGetCourse(courseId)
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8">
        Edit Course: <span className="text-primary underline">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info">
        <TabsList className="w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Edit basic information about your course</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm courseId={courseId} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>Edit the structure of your course</CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
