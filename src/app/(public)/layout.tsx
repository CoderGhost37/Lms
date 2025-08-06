import { Navbar } from './_components/navbar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <h1>FOOTER</h1>
    </div>
  )
}
