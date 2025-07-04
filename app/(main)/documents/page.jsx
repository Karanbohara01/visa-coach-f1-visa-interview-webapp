// app/(main)/documents/page.jsx
'use client'
import { supabase } from '@/services/supabaseClient'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FileCheck2, Loader2 } from 'lucide-react'
import DocumentItem from './_components/DocumentItem'
import { F1_DOCUMENTS } from '@/lib/documentsData' // We will create this file next

export default function DocumentsPage() {
    const [documents, setDocuments] = useState(F1_DOCUMENTS)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUserChecklist = async () => {
            setIsLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('document_checklist')
                    .eq('id', user.id)
                    .single();

                // This improved error check ignores the "No rows found" error, which is normal for a new user.
                if (error && error.code !== 'PGRST116') {
                    toast.error('Could not load your saved checklist.');
                    console.error(error);
                } else if (profile?.document_checklist) {
                    setDocuments(docs =>
                        docs.map(doc => ({
                            ...doc,
                            checked: profile.document_checklist[doc.id] || false,
                        }))
                    );
                }
            }
            setIsLoading(false);
        }
        fetchUserChecklist();
    }, []);

    const handleToggleDocument = async (docId, isChecked) => {
        // Optimistically update the UI
        setDocuments(docs =>
            docs.map(doc => (doc.id === docId ? { ...doc, checked: isChecked } : doc))
        )

        // Prepare data for Supabase
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch current checklist to merge, not overwrite
        const { data: profile } = await supabase.from('profiles').select('document_checklist').eq('id', user.id).single()
        const currentChecklist = profile?.document_checklist || {}

        const updatedChecklist = {
            ...currentChecklist,
            [docId]: isChecked,
        }

        // Save the updated object to Supabase
        const { error } = await supabase
            .from('profiles')
            .update({ document_checklist: updatedChecklist })
            .eq('id', user.id)

        if (error) {
            toast.error('Could not save your changes.')
            // Revert optimistic update on error
            setDocuments(docs =>
                docs.map(doc => (doc.id === docId ? { ...doc, checked: !isChecked } : doc))
            )
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        )
    }

    const requiredDocs = documents.filter(d => d.category === 'Required')
    const recommendedDocs = documents.filter(d => d.category === 'Recommended')

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <FileCheck2 />
                F-1 Visa Document Checklist
            </h1>

            <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Required Documents</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {requiredDocs.map(doc => (
                        <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Recommended Supporting Documents</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {recommendedDocs.map(doc => (
                        <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
                    ))}
                </div>
            </section>
        </div>
    )
}