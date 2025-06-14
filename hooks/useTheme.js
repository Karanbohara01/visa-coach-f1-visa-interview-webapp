// hooks/useTheme.js
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  return { mounted, theme: currentTheme, setTheme }
}