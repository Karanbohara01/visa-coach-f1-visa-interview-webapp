'use client'
import { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Bell, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotificationSettings({ userProfile }) {
    const [notifications, setNotifications] = useState(
        userProfile.notifications || { reminders: true, announcements: true, security: true }
    )
    const [isSaving, setIsSaving] = useState(false)

    const handleToggle = (type) => {
        setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        const { error } = await supabase
            .from('profiles')
            .update({ notifications })
            .eq('id', userProfile.id)

        if (error) {
            toast.error("Failed to save notification settings.")
        } else {
            toast.success("Notification settings saved!")
        }
        setIsSaving(false)
    }

    const notificationTypes = [
        { id: 'reminders', label: 'Interview Reminders', description: 'Get notified about your upcoming interviews.' },
        { id: 'announcements', label: 'Announcements', description: 'Receive news about new features and updates.' },
        { id: 'security', label: 'Security Alerts', description: 'Get alerted about unusual activity on your account.' }
    ]

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Bell /> Notifications</h2>
            <div className="space-y-4">
                {notificationTypes.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-md border dark:border-gray-700">
                        <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <Switch
                            checked={notifications[item.id]}
                            onCheckedChange={() => handleToggle(item.id)}
                        />
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Save Changes
                </Button>
            </div>
        </div>
    )
}