'use client'

import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'An interactive area chart'

const chartConfig = {
  enrollments: {
    label: 'Enrollments',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  chartData: { date: string; enrollments: number }[]
}

export function ChartAreaInteractive({ chartData }: ChartAreaInteractiveProps) {
  const totalEnrollments = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.enrollments, 0)
  }, [chartData])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollment for the last 30 days: {totalEnrollments}
          </span>
          <span className="@[540px]/card:hidden">Last 30 days: 1200</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart margin={{ left: 12, right: 12 }} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={'preserveStartEnd'}
              tickFormatter={(val) => {
                const date = new Date(val)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(val) => {
                    const date = new Date(val)
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar
              dataKey="enrollments"
              stroke={chartConfig.enrollments.color}
              fill="var(--color-enrollments)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
