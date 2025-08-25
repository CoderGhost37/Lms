'use client'

import { useMemo } from 'react'
import type { CourseSidebarDataType } from '@/app/data/course/get-course-sidebar-data'

interface CourseProgressProps {
  courseData: CourseSidebarDataType['course']
}

interface CourseProgressResults {
  totalLessons: number
  completedLessons: number
  progressPercentage: number
}

export function useCourseProgress({ courseData }: CourseProgressProps): CourseProgressResults {
  return useMemo(() => {
    let totalLessons = 0
    let completedLessons = 0

    courseData.chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++

        const isCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        )
        if (isCompleted) {
          completedLessons++
        }
      })
    })

    const progressPercentage =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return { totalLessons, completedLessons, progressPercentage }
  }, [courseData])
}
