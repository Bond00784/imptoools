import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Click Tool - Online Utilities for Digital Tasks",
  description:
    "Transform your digital tasks with Click Tool: Merge PDF Tool, Compound Interest Calculator, Article Prompt Generator, and 20+ professional-grade utilities.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}



import './globals.css'