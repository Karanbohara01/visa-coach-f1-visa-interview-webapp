'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop, Check, Palette } from 'lucide-react'

export default function AppearanceSettings() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null // Prevent SSR mismatch

    const themeOptions = [
        { value: 'light', label: 'Light', icon: <Sun size={16} /> },
        { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
        { value: 'system', label: 'System', icon: <Laptop size={16} /> }
    ]

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Palette /> Appearance
            </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Theme
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {themeOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setTheme(option.value);
                                console.log(`Theme changed to: ${option.value}`);
                                alert(`Theme changed to: ${option.label}`);
                            }}


                            className={`flex items-center gap-3 p-4 border rounded-md transition-colors ${theme === option.value
                                ? 'border-purple-500 bg-purple-50 dark:bg-gray-800'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            {option.icon}
                            <span className="text-gray-700 dark:text-gray-300">
                                {option.label}
                            </span>
                            {theme === option.value && (
                                <span className="ml-auto text-purple-500">
                                    <Check className="w-4 h-4" />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
