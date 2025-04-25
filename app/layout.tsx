import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutClientWrapper from "@/components/layout-client-wrapper"
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Blaide | Innovation Consulting",
  description:
    "Blaide innovation labs - Transforming ideas into impactful solutions through strategic innovation consulting.",
    generator: 'v0.dev'
}

const RESEARCH_HOSTNAME = 'research.blaidelabs.com';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const host = headersList.get('host')

  let initialVariant: 'main' | 'research' = 'main';
  if (host === RESEARCH_HOSTNAME) {
    initialVariant = 'research';
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LayoutClientWrapper initialVariant={initialVariant}>
            {children}
          </LayoutClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}