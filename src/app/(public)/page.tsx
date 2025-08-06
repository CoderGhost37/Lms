import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureProps {
  title: string
  description: string
  icon: string
}

const features: FeatureProps[] = [
  {
    title: 'Comprehensive Courses',
    description: 'Access a wide range of courses covering various subjects and skills.',
    icon: '📚',
  },
  {
    title: 'Interactive Learning',
    description:
      'Engage with interactive content, quizzes, and assignments to enhance your understanding.',
    icon: '🖥️',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your progress with detailed analytics and insights.',
    icon: '📈',
  },
  {
    title: 'Community Support',
    description: 'Connect with fellow learners and instructors for guidance and collaboration.',
    icon: '🤝',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Badge variant="outline">The Future of Online Education</Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover new way to learn with our modern, interactive learning management system.
            Access high-quality courses anytime, anywhere
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Link
              href="/courses"
              className={buttonVariants({
                size: 'lg',
              })}
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">
                {feature.icon} {feature.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  )
}
