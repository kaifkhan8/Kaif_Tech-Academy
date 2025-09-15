import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Kaif Tech Academy - Learn Coding & Technology Skills Online",
    template: "%s | Kaif Tech Academy"
  },
  description: "Master programming, web development, data science & more with India's leading online tech academy. Expert instructors, hands-on projects, lifetime access.",
  keywords: [
    "online coding courses",
    "programming tutorials",
    "web development",
    "python programming",
    "data science",
    "tech education",
    "kaif tech academy",
    "learn coding online",
    "software development"
  ],
  authors: [{ name: "MD Kaif", url: "https://kaiftechacademy.com" }],
  creator: "MD Kaif",
  publisher: "Kaif Tech Academy",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaiftechacademy.com',
    title: 'Kaif Tech Academy - Learn Coding & Technology Skills Online',
    description: 'Master programming, web development, data science & more with expert instructors.',
    siteName: 'Kaif Tech Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaif Tech Academy - Learn Coding & Technology Skills Online',
    description: 'Master programming, web development, data science & more.',
    creator: '@kaiftechacademy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
