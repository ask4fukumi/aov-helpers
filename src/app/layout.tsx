import type { Metadata } from "next"

import getBaseURL from "src/utils/funcs/get-base-url"

import ThemeProvider from "./theme-provider"
import ThemeSwitcher from "./theme-switcher"

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex h-dvh w-dvw items-center justify-center">
            {children}
            <ThemeSwitcher />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
