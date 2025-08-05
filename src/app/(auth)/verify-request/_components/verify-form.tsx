'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { authClient } from '@/lib/auth-client'

export function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') as string

  const [otp, setOtp] = useState<string>('')
  const [verifyPending, startVerifyTransition] = useTransition()
  const isOtpCompleted = otp.length === 6

  function verifyOTP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startVerifyTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified successfully, redirecting...')
            router.push('/')
          },
          onError: (_error) => {
            toast.error('Invalid OTP, please try again.')
          },
        },
      })
    })
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email to your registered email address. Please open your inbox
          and paste the verification code below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={verifyOTP} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <InputOTP value={otp} onChange={setOtp} maxLength={6} className="gap-2">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your email.
            </p>
          </div>

          <Button
            type="submit"
            loading={verifyPending}
            disabled={verifyPending || !isOtpCompleted}
            className="w-full"
          >
            Verify Request
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
