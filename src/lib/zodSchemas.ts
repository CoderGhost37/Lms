import z from 'zod'

export const courseLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const
export const courseStatus = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const

export const courseCategories = [
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Mobile Development',
  'Game Development',
  'Cloud Computing',
  'Cyber Security',
  'DevOps',
  'Blockchain',
  'Artificial Intelligence',
  'Fitness',
  'Design',
  'Photography',
  'Music',
  'Writing',
  'Business',
  'Marketing',
  'Personal Development',
  'Language Learning',
  'Cooking',
  'Travel',
  'Health & Wellness',
  'Finance',
] as const

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be atleast 3 characters long')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be atleast 10 characters long')
    .max(2500, 'Description must be less than 2500 characters'),
  fileKey: z.string().min(1, { message: 'File key is required' }),
  price: z.coerce.number().min(1, 'Price must be a positive number'),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 hour'),
  level: z.enum(courseLevels, {
    message: 'Level is required',
  }),
  category: z.enum(courseCategories, {
    message: 'Category is required',
  }),
  smallDescription: z.string().max(200, 'Small description must be less than 200 characters'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .max(100, 'Slug must be less than 100 characters'),
  status: z
    .enum(courseStatus, {
      message: 'Status is required',
    })
    .default('DRAFT'),
})

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be atleast 3 characters long')
    .max(100, 'Name must be less than 100 characters'),
  courseId: z.string().uuid('Course ID must be a valid UUID'),
})

export type CourseSchemaType = z.infer<typeof courseSchema>
export type ChapterSchemaType = z.infer<typeof chapterSchema>
