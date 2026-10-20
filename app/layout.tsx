import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Geist_Mono, Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={cn("font-sans antialiased", fontMono.variable, inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
