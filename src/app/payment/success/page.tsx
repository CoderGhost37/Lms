'use client'

import { ArrowLeft, CheckIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useConfetti } from '@/hooks/use-confetti'

export const metadata: Metadata = {
  title: 'Success',
  description: 'Your payment was successful. You should now have access to the course.',
}

export default function PaymentSuccessfulPage() {
  const { triggerConfetti } = useConfetti()

  useEffect(() => {
    triggerConfetti()
  }, [triggerConfetti])

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardContent>
          <div className="w-full flex items-center justify-center">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Successful</h2>
            <p className="text-sm tracking-tight mt-2 text-muted-foreground text-balance">
              Congrats your payment was successfull. You should now have access to the course!
            </p>

            <Link href="/dashboard" className={buttonVariants({ className: 'w-full mt-5' })}>
              <ArrowLeft className="size-4" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
