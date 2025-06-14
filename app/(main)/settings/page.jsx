'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Bell,
  Check,
  Clock3,
  CreditCard,
  Globe,
  Laptop,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Moon, Palette,
  Settings,
  Shield,
  Smartphone,
  Sun,
  User
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { theme, setTheme, systemTheme } = useTheme()
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

  useEffect(() => {
    setMounted(true)
    // Load saved settings from API or localStorage
    const loadSettings = async () => {
      setIsLoading(true)
      try {
        // const response = await fetch('/api/settings')
        // const data = await response.json()
        // setFormData(data)
      } catch (error) {
        console.error('Failed to load settings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

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
      // await fetch('/api/settings', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // })
      // Show success toast
    } catch (error) {
      console.error('Failed to save settings:', error)
      // Show error toast
    } finally {
      setIsLoading(false)
    }
  }

  const revokeDevice = (deviceId) => {
    setFormData(prev => ({
      ...prev,
      devices: prev.devices.filter(device => device.id !== deviceId)
    }))
  }

  const tabs = [
    { id: 'account', icon: <User size={18} />, label: 'Account' },
    { id: 'appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'preferences', icon: <Globe size={18} />, label: 'Preferences' },
    { id: 'advanced', icon: <Settings size={18} />, label: 'Advanced' },
    { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing' }
  ]

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { value: 'system', label: 'System', icon: <Laptop size={16} /> }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' }
  ]

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ]

  const paymentMethods = [
    { id: 'visa', label: 'Visa ending in 4242', icon: 'visa' },
    { id: 'mastercard', label: 'Mastercard ending in 1234', icon: 'mastercard' },
    { id: 'paypal', label: 'PayPal', icon: 'paypal' }
  ]

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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 mt-8">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6">
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
                        className={`flex items-center gap-3 p-4 border rounded-md transition-colors ${
                          formData.theme === option.value
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
                
                <div className="pt-4 border-t dark:border-gray-700">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Accent Color
                  </h3>
                  <div className="flex gap-3">
                    {['purple', 'green', 'purple', 'red', 'orange'].map(color => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full bg-${color}-500 flex items-center justify-center`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      >
                        {formData.accentColor === color && (
                          <Check className="w-5 h-5 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enable Email Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch
                        checked={formData.notifications}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          notifications: checked
                        }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notification Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { id: 'reminders', label: 'Practice Reminders', description: 'Get reminders for your scheduled practice sessions' },
                      { id: 'announcements', label: 'New Feature Announcements', description: 'Be notified about new features and updates' },
                      { id: 'security', label: 'Account Security Alerts', description: 'Receive alerts about important security events' },
                      { id: 'reports', label: 'Weekly Progress Reports', description: 'Get weekly summaries of your progress' }
                    ].map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{item.label}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <Switch
                          checked={formData.notificationTypes[item.id]}
                          onCheckedChange={() => handleNotificationTypeChange(item.id)}
                          disabled={!formData.notifications}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <Globe className="w-5 h-5" />
                Language & Preferences
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Language Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Interface Language
                        </label>
                        <Select
                          value={formData.language}
                          onValueChange={(value) => setFormData(prev => ({
                            ...prev,
                            language: value
                          }))}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map(lang => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Currency
                        </label>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => setFormData(prev => ({
                            ...prev,
                            currency: value
                          }))}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map(currency => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <Settings className="w-5 h-5" />
                Advanced Settings
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sync Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Data Sync Interval
                        </label>
                        <div className="flex items-center gap-4">
                          <Clock3 className="text-gray-400" />
                          <Slider
                            min={5}
                            max={60}
                            step={5}
                            value={[formData.syncInterval]}
                            onValueChange={([value]) => setFormData(prev => ({
                              ...prev,
                              syncInterval: value
                            }))}
                            className="flex-1"
                          />
                          <span className="text-gray-700 dark:text-gray-300 w-12">
                            {formData.syncInterval} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Saver Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Reduce data usage for slower connections
                        </p>
                      </div>
                      <Switch
                        checked={formData.dataSaver}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          dataSaver: checked
                        }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Connected Devices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formData.devices.map(device => (
                        <div key={device.id} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            {device.type === 'laptop' ? (
                              <Laptop className="text-gray-400" />
                            ) : (
                              <Smartphone className="text-gray-400" />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                {device.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last active: {device.lastActive}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {device.current && (
                              <Badge variant="outline">Current Device</Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => revokeDevice(device.id)}
                              disabled={device.current}
                            >
                              Revoke
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                <CreditCard className="w-5 h-5" />
                Billing Information
              </h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subscription Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{formData.subscription.plan} Membership</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formData.subscription.status === 'active' ? (
                            <>Renews on {formData.subscription.renewal}</>
                          ) : (
                            'Expired'
                          )}
                        </p>
                      </div>
                      <Badge variant={formData.subscription.status === 'active' ? 'default' : 'destructive'}>
                        {formData.subscription.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="mr-3">
                      Change Plan
                    </Button>
                    <Button variant="destructive">
                      Cancel Subscription
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                              {method.icon}
                            </div>
                            <span>{method.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {formData.subscription.paymentMethod === method.id && (
                              <Badge variant="outline">Default</Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      Add Payment Method
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2, 3].map(item => (
                        <div key={item} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                          <div>
                            <h4 className="font-medium">Premium Plan Subscription</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item === 1 ? 'Today' : `${item} months ago`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$9.99</p>
                            <p className="text-sm text-green-500">Paid</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">
                      View Full History
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}