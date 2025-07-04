// // app/layout.jsx
// import { ThemeProvider } from 'next-themes'

// export default function Layout({ children }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system">
//       {children}
//     </ThemeProvider>
//   )
// }

// app/layout.jsx
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}