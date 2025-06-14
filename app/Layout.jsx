// app/layout.jsx
import { ThemeProvider } from 'next-themes'

export default function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}