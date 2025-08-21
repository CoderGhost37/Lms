import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { env } from '@/lib/env'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headerList = await headers()

  const signature = headerList.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.error('Error verifying Stripe webhook:', error)
    return new NextResponse('Invalid webhook signature', { status: 401 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const courseId = session.metadata?.courseId
    const customerId = session.customer as string

    if (!courseId) {
      return new NextResponse('Course ID is missing in session metadata', { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    })

    if (!user) {
      return new NextResponse('User not found for the provided Stripe customer ID', { status: 404 })
    }

    await prisma.enrollment.update({
      where: {
        id: session.metadata?.enrollmentId as string,
      },
      data: {
        userId: user.id,
        courseId: courseId,
        amount: session.amount_total as number,
        status: 'Active',
      },
    })
  }

  return new NextResponse('Webhook received and processed', { status: 200 })
}
