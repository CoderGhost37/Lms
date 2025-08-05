import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins'
import { PrismaClient } from '@/generated/prisma'
import { env } from './env'
import { resend } from './resend'

const prisma = new PrismaClient()
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: 'Cinnavo <onboarding@resend.dev>',
          to: email,
          subject: `Cinnavo - Verify your email`,
          html: `<p>Hi there,</p>
                 <p>Your verification code is <strong>${otp}</strong>.</p>
                 <p>Thank you for using Cinnavo!</p>`,
        })
      },
    }),
  ],
})
