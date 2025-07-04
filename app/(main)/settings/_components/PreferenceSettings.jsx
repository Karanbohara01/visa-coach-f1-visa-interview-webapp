'use client'
import { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PreferenceSettings({ userProfile }) {
    const [language, setLanguage] = useState(userProfile.language || 'en')
    const [isSaving, setIsSaving] = useState(false)

    const languages = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
    ]

    const handleSave = async () => {
        setIsSaving(true)
        const { error } = await supabase
            .from('profiles')
            .update({ language })
            .eq('id', userProfile.id)

        if (error) {
            toast.error("Failed to save preferences.")
        } else {
            toast.success("Preferences saved!")
        }
        setIsSaving(false)
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Globe /> Preferences</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <p className="text-sm text-gray-500 mb-2">Choose the language you want to experience the app in.</p>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map(lang => (
                                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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