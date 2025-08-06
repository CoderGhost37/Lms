'use client'

import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { authClient } from '@/lib/auth-client'
import { UserDropdown } from './user-dropdown'

const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Courses',
    href: '/courses',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
]

export function Navbar() {
  const { data: session, isPending } = authClient.useSession()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 mr-4">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="size-9" />
          <span className="font-bold">Cinnavo</span>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:justify-between md:items-center">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={session.user.name || 'User'}
                email={session.user.email}
                image={session.user.image || ''}
              />
            ) : (
              <>
                <Link href="/login" className={buttonVariants({ variant: 'secondary' })}>
                  Log in
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
