'use client'
import { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, User, Mail, Lock } from 'lucide-react'

export default function AccountSettings({ userAuth, userProfile }) {
    const [formData, setFormData] = useState({
        full_name: userProfile.full_name || '',
        email: userAuth.email
    })
    const [password, setPassword] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)

        // Update profile information
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ full_name: formData.full_name })
            .eq('id', userAuth.id)

        if (profileError) {
            toast.error('Failed to update profile: ' + profileError.message)
        } else {
            toast.success('Profile updated successfully!')
        }

        // Update password if a new one is entered
        if (password) {
            const { error: passwordError } = await supabase.auth.updateUser({ password })
            if (passwordError) {
                toast.error('Failed to update password: ' + passwordError.message)
            } else {
                toast.success('Password updated successfully!')
                setPassword('')
            }
        }

        setIsSaving(false)
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <User /> Account Information
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                        <Input value={formData.email} disabled />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <div className="relative">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep current password"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
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