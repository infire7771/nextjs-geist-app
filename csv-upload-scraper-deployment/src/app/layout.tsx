import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSV Upload & Scraper",
  description: "Upload and process CSV files",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="min-h-screen py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
