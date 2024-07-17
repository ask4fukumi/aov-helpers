import type { Metadata } from "next"

import getBaseURL from "src/utils/funcs/get-base-url"

import { Fira_Sans } from "next/font/google"
import "./globals.css"

const inter = Fira_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

const baseURL = getBaseURL()

export const metadata: Metadata = {
  title: "Arena Of Valor helpers",
  description: "",
  metadataBase: new URL(baseURL),
  icons: {
    icon: new URL("/favicon.ico", baseURL),
    apple: new URL("/favicon.ico", baseURL),
  },
  twitter: {
    images: new URL("/favicon.ico", baseURL),
  },
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="grid-col grid min-h-dvh grid-rows-[auto_1fr_auto]">
          <header></header>
          <main className="flex items-center justify-center">{children}</main>
          <footer></footer>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
