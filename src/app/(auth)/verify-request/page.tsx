import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { VerifyForm } from './_components/verify-form'

export const metadata: Metadata = {
  title: 'Verify Request',
  description: 'Verify your email address to continue using Cinnavo',
}

export default async function VerifyRequestPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (session) {
    return redirect('/')
  }

  return <VerifyForm />
}
