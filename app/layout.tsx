import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gami-Pack",
  description: "Producent opakowań z tektury falistej",
  metadataBase: new URL("https://gamipack.netlify.app/"),
  openGraph: {
    type: "website",
    url: "/",
    locale: "pl_PL",
    siteName: "Gami-Pack",
    title: "Gami-Pack",
    description: "Producent opakowań z tektury falistej",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" suppressHydrationWarning className={"antialiased"}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
