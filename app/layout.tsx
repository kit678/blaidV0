import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Blaide | Innovation Consulting",
  description:
    "Blaide innovation labs - Transforming ideas into impactful solutions through strategic innovation consulting.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const host = headersList.get('host')

  const RESEARCH_HOSTNAME = 'research.blaidelabs.com';

  const variant = host === RESEARCH_HOSTNAME
    ? 'research'
    : 'main';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* @ts-ignore TODO: Add variant prop to Header component */}
          <Header variant={variant} />
          <main className="min-h-screen">{children}</main>
          {/* @ts-ignore TODO: Add variant prop to Footer component */}
          <Footer variant={variant} />
        </ThemeProvider>
      </body>
    </html>
  )
}