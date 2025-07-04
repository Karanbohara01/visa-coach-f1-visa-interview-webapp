'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon, Laptop, Check, Palette } from 'lucide-react'

export default function AppearanceSettings() {
    const { theme, setTheme } = useTheme()

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
                <label className="block text-sm font-medium mb-3">Theme</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {themeOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setTheme(option.value)}
                            className={`flex items-center gap-3 p-4 border rounded-md transition-colors ${theme === option.value
                                ? 'border-purple-500 bg-purple-50 dark:bg-gray-800'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            {option.icon}
                            <span>{option.label}</span>
                            {theme === option.value && <Check className="ml-auto w-4 h-4 text-purple-500" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}