'use client'

import { GithubIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'

export function LoginForm() {
  const router = useRouter()
  const [githubPending, startGithubTransition] = useTransition()
  const [emailPending, startEmailTransition] = useTransition()
  const [email, setEmail] = useState('')

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in with Github, you will be redirected...')
          },
          onError: (_error) => {
            toast.error('Something went wrong!')
          },
        },
      })
    })
  }

  function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Verification email sent, please check your inbox!')
            router.push(`/verify-request?email=${email}`)
          },
          onError: (_error) => {
            toast.error('Error sending verification email, please try again.')
          },
        },
      })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>Login with your Github or Email Account</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={signInWithGithub}
          loading={githubPending}
        >
          <GithubIcon className="size-4" />
          Sign in with Github
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-sm text-muted-foreground">
            Or continue with
          </span>
        </div>

        <form onSubmit={signInWithEmail} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" loading={emailPending}>
            Continue with Email
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
