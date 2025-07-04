'use client'

import { supabase } from '@/services/supabaseClient'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// UI Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Icons
import {
  Bell,
  Check,
  CreditCard,
  Globe,
  Laptop,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Moon,
  Palette,
  Settings,
  Sun,
  User
} from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('account')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@university.edu',
    password: '',
    notifications: true,
    notificationTypes: {
      reminders: true,
      announcements: true,
      security: true,
      reports: true
    },
    language: 'en',
    currency: 'USD',
    theme: 'system',
    syncInterval: 30,
    dataSaver: false,
    devices: [
      { id: 1, name: 'MacBook Pro', type: 'laptop', lastActive: '2 hours ago', current: true },
      { id: 2, name: 'iPhone 13', type: 'mobile', lastActive: '5 minutes ago', current: false }
    ],
    subscription: {
      plan: 'Premium',
      status: 'active',
      renewal: '2023-12-15',
      paymentMethod: 'visa'
    }
  })

  // Navigation tabs
  const tabs = [
    { id: 'account', icon: <User size={18} />, label: 'Account' },
    { id: 'appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'preferences', icon: <Globe size={18} />, label: 'Preferences' },
    { id: 'advanced', icon: <Settings size={18} />, label: 'Advanced' },
    { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing' }
  ]

  // Theme options
  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { value: 'system', label: 'System', icon: <Laptop size={16} /> }
  ]

  // Language options
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' }
  ]

  // Currency options
  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ]

  // Payment methods
  const paymentMethods = [
    { id: 'visa', label: 'Visa ending in 4242', icon: 'visa' },
    { id: 'mastercard', label: 'Mastercard ending in 1234', icon: 'mastercard' },
    { id: 'paypal', label: 'PayPal', icon: 'paypal' }
  ]

  useEffect(() => {
    setMounted(true)
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // const response = await fetch('/api/settings')
      // const data = await response.json()
      // setFormData(data)
    } catch (error) {
      console.error('Failed to load settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'theme') {
      setTheme(value)
    }
  }

  const handleNotificationTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notificationTypes: {
        ...prev.notificationTypes,
        [type]: !prev.notificationTypes[type]
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // await fetch('/api/settings', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // })
      toast.success('Settings saved successfully')
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const revokeDevice = (deviceId) => {
    setFormData(prev => ({
      ...prev,
      devices: prev.devices.filter(device => device.id !== deviceId)
    }))
    toast.success('Device revoked')
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Logged out successfully')
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Logout failed. Please try again.')
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h1>

          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 mt-8"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10">
              <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <User className="w-5 h-5" />
                Account Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                    />
                    <Mail className="text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                    <Lock className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <Palette className="w-5 h-5" />
                Appearance
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {themeOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, theme: option.value }))
                          setTheme(option.value)
                        }}
                        className={`flex items-center gap-3 p-4 border rounded-md transition-colors ${formData.theme === option.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-gray-800'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {option.icon}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {option.label}
                        </span>
                        {formData.theme === option.value && (
                          <span className="ml-auto text-purple-500">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would follow the same pattern */}
          {/* You can extract these into separate components for better organization */}
        </div>
      </div>
    </div>
  )
}
