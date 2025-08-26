# Cinnavo LMS

Cinnavo LMS is a full-featured Learning Management System (LMS) built using Next.js 15, designed to provide a seamless experience for both learners and administrators. The platform supports two types of users — users, who can browse, purchase, and learn from courses with progress tracking and a custom video player, and admins, who can create, edit, and delete courses, manage chapters and lessons, and monitor performance through an intuitive admin dashboard.

The system includes secure authentication with Better-Auth (Email OTP & GitHub OAuth), Arcjet Security to protect against common attacks, Stripe integration for payments, S3 file uploads, and detailed analytics for insights. Additional features like lesson completion tracking, drag-and-drop course structuring, a custom rich-text editor, and a modern UI built with Tailwind CSS & Shadcn UI make it both powerful and user-friendly. The backend is powered by Neon Postgres with Prisma ORM, ensuring scalability and reliability, while deployment on Vercel makes it production-ready.

Live Url: https://lms.kushagramathur.com/

<img width="939" height="440" alt="Screenshot 2025-08-26 125523" src="https://github.com/user-attachments/assets/fff8b821-e61c-4455-913b-794684fd58c2" />


<img width="941" height="440" alt="Screenshot 2025-08-26 125434" src="https://github.com/user-attachments/assets/60878840-56f6-4b10-a3f2-c4e888e757aa" />


<img width="765" height="440" alt="Screenshot 2025-08-26 125346" src="https://github.com/user-attachments/assets/e9f6677f-ce7f-43e9-b57d-f9e70d65ce0c" />


<img width="794" height="418" alt="Screenshot 2025-08-26 125304" src="https://github.com/user-attachments/assets/52472082-0551-4762-a93d-947ce7fabbd2" />


<img width="941" height="434" alt="Screenshot 2025-08-26 125200" src="https://github.com/user-attachments/assets/7f216044-0634-4242-8441-7e03e4cd3f44" />


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
