import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import ErrorBoundary from "@/components/error-boundary"
import "./globals.css"

export const metadata = {
  title: "Tech Blog - Modern Development Insights",
  description: "Exploring the cutting edge of technology, development, and innovation",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
