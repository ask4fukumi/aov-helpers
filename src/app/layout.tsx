import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./_site/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arena Of Valor helpers",
  description: "",
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
