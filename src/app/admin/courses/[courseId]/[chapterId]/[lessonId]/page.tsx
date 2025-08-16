import { adminGetLesson } from '@/app/data/admin/admin-get-lesson'
import { LessonForm } from './_components/lesson-form'

type Params = Promise<{
  courseId: string
  chapterId: string
  lessonId: string
}>

export default async function LessonPage({ params }: { params: Params }) {
  const { courseId, chapterId, lessonId } = await params
  const data = await adminGetLesson(lessonId)

  return <LessonForm data={data} chapterId={chapterId} courseId={courseId} lessonId={lessonId} />
}
