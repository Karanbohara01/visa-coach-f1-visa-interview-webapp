// // app/(main)/documents/page.jsx
// 'use client'
// import { supabase } from '@/services/supabaseClient'
// import { useEffect, useState } from 'react'
// import { toast } from 'sonner'
// import { FileCheck2, Loader2 } from 'lucide-react'
// import DocumentItem from './_components/DocumentItem'
// import { F1_DOCUMENTS } from '@/lib/documentsData' // We will create this file next

// export default function DocumentsPage() {
//     const [documents, setDocuments] = useState(F1_DOCUMENTS)
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         const fetchUserChecklist = async () => {
//             setIsLoading(true);
//             const { data: { user } } = await supabase.auth.getUser();

//             if (user) {
//                 const { data: profile, error } = await supabase
//                     .from('profiles')
//                     .select('document_checklist')
//                     .eq('id', user.id)
//                     .single();

//                 // This improved error check ignores the "No rows found" error, which is normal for a new user.
//                 if (error && error.code !== 'PGRST116') {
//                     toast.error('Could not load your saved checklist.');
//                     console.error(error);
//                 } else if (profile?.document_checklist) {
//                     setDocuments(docs =>
//                         docs.map(doc => ({
//                             ...doc,
//                             checked: profile.document_checklist[doc.id] || false,
//                         }))
//                     );
//                 }
//             }
//             setIsLoading(false);
//         }
//         fetchUserChecklist();
//     }, []);

//     const handleToggleDocument = async (docId, isChecked) => {
//         // Optimistically update the UI
//         setDocuments(docs =>
//             docs.map(doc => (doc.id === docId ? { ...doc, checked: isChecked } : doc))
//         )

//         // Prepare data for Supabase
//         const { data: { user } } = await supabase.auth.getUser()
//         if (!user) return

//         // Fetch current checklist to merge, not overwrite
//         const { data: profile } = await supabase.from('profiles').select('document_checklist').eq('id', user.id).single()
//         const currentChecklist = profile?.document_checklist || {}

//         const updatedChecklist = {
//             ...currentChecklist,
//             [docId]: isChecked,
//         }

//         // Save the updated object to Supabase
//         const { error } = await supabase
//             .from('profiles')
//             .update({ document_checklist: updatedChecklist })
//             .eq('id', user.id)

//         if (error) {
//             toast.error('Could not save your changes.')
//             // Revert optimistic update on error
//             setDocuments(docs =>
//                 docs.map(doc => (doc.id === docId ? { ...doc, checked: !isChecked } : doc))
//             )
//         }
//     }

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-full">
//                 <Loader2 className="animate-spin h-8 w-8" />
//             </div>
//         )
//     }

//     const requiredDocs = documents.filter(d => d.category === 'Required')
//     const recommendedDocs = documents.filter(d => d.category === 'Recommended')

//     return (
//         <div className="p-4 md:p-6">
//             <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
//                 <FileCheck2 />
//                 F-1 Visa Document Checklist
//             </h1>

//             <section>
//                 <h2 className="text-xl font-semibold mb-4 border-b pb-2">Required Documents</h2>
//                 <div className="grid gap-4 md:grid-cols-2">
//                     {requiredDocs.map(doc => (
//                         <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
//                     ))}
//                 </div>
//             </section>

//             <section className="mt-8">
//                 <h2 className="text-xl font-semibold mb-4 border-b pb-2">Recommended Supporting Documents</h2>
//                 <div className="grid gap-4 md:grid-cols-2">
//                     {recommendedDocs.map(doc => (
//                         <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
//                     ))}
//                 </div>
//             </section>
//         </div>
//     )
// }

'use client'

import { supabase } from '@/services/supabaseClient'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FileCheck2, Loader2, Shield, CheckCircle2, Clock, AlertCircle, Download, Star } from 'lucide-react'

// Mock DocumentItem component for demonstration
const DocumentItem = ({ document, onToggle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
                group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl 
                border transition-all duration-300 hover:shadow-xl cursor-pointer
                ${document.checked
                    ? 'border-green-300 bg-green-50/80 dark:bg-green-900/20 shadow-green-100/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }
                ${isHovered ? 'scale-[1.02] shadow-lg shadow-primary/10' : ''}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onToggle(document.id, !document.checked)}
        >
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className={`
                        p-2 rounded-xl shrink-0 transition-all duration-300
                        ${document.checked
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-primary/10 group-hover:bg-primary/20'
                        }
                    `}>
                        {document.checked ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                            <FileCheck2 className="h-6 w-6 text-primary" />
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className={`
                                font-semibold transition-colors
                                ${document.checked
                                    ? 'text-green-700 dark:text-green-300'
                                    : 'text-gray-900 dark:text-white group-hover:text-primary'
                                }
                            `}>
                                {document.title}
                            </h3>
                            {document.category === 'Required' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                                    <AlertCircle className="h-3 w-3" />
                                    Required
                                </span>
                            )}
                            {document.category === 'Recommended' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                    <Star className="h-3 w-3" />
                                    Recommended
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                            {document.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className={`
                                text-sm font-medium transition-colors
                                ${document.checked
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-400'
                                }
                            `}>
                                {document.checked ? 'Completed' : 'Pending'}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${document.checked
                                        ? 'bg-green-500 shadow-lg shadow-green-500/30'
                                        : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-primary/50'
                                    }
                                `} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completion overlay */}
            {document.checked && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-2xl pointer-events-none" />
            )}
        </div>
    );
};

// Mock data for demonstration - replace with your actual F1_DOCUMENTS import
const F1_DOCUMENTS = [
    {
        id: 1,
        title: "Valid Passport",
        description: "Your passport must be valid for at least six months beyond your intended stay in the US.",
        category: "Required",
        checked: false
    },
    {
        id: 2,
        title: "Form I-20",
        description: "Certificate of Eligibility issued by your US school. This is your most important document.",
        category: "Required",
        checked: false
    },
    {
        id: 3,
        title: "DS-160 Confirmation Page",
        description: "Online nonimmigrant visa application form confirmation page with barcode.",
        category: "Required",
        checked: false
    },
    {
        id: 4,
        title: "SEVIS Fee Receipt",
        description: "Proof of payment for the SEVIS I-901 fee ($350 for F-1 students).",
        category: "Required",
        checked: false
    },
    {
        id: 5,
        title: "Financial Documents",
        description: "Bank statements, scholarship letters, or sponsor affidavits showing sufficient funds.",
        category: "Required",
        checked: false
    },
    {
        id: 6,
        title: "Academic Transcripts",
        description: "Official transcripts from your previous educational institutions.",
        category: "Required",
        checked: false
    },
    {
        id: 7,
        title: "English Proficiency Test Scores",
        description: "TOEFL, IELTS, or other English proficiency test results if required by your school.",
        category: "Recommended",
        checked: false
    },
    {
        id: 8,
        title: "Resume/CV",
        description: "Current resume highlighting your academic and professional background.",
        category: "Recommended",
        checked: false
    }
];

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
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/20">
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">Loading your document checklist...</p>
                    </div>
                </div>
            </div>
        )
    }

    const requiredDocs = documents.filter(d => d.category === 'Required')
    const recommendedDocs = documents.filter(d => d.category === 'Recommended')
    const completedRequired = requiredDocs.filter(d => d.checked).length
    const completedRecommended = recommendedDocs.filter(d => d.checked).length
    const totalCompleted = documents.filter(d => d.checked).length

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                <div className="relative p-6 md:p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-sm">
                                <FileCheck2 className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl text-primary md:text-xl font-bold text-gray-900 dark:text-white">
                                    F-1 Visa Document Checklist
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                                    Organize and track your visa application documents
                                </p>
                            </div>
                        </div>

                        {/* Progress Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                                <div className="text-2xl font-bold text-primary">{totalCompleted}/{documents.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Progress</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-red-200 dark:border-red-800">
                                <div className="text-2xl font-bold text-red-600">{completedRequired}/{requiredDocs.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Required Done</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                                <div className="text-2xl font-bold text-blue-600">{completedRecommended}/{recommendedDocs.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Recommended Done</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-green-200 dark:border-green-800">
                                <div className="text-2xl font-bold text-green-600">{Math.round((totalCompleted / documents.length) * 100)}%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                                <span className="text-sm font-medium text-primary">{Math.round((totalCompleted / documents.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${(totalCompleted / documents.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 md:p-8">
                {/* Required Documents Section */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                            <Shield className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Required Documents</h2>
                            <p className="text-gray-600 dark:text-gray-400">Essential documents for your F-1 visa application</p>
                        </div>
                        <div className="ml-auto">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium rounded-full">
                                <AlertCircle className="h-4 w-4" />
                                {completedRequired}/{requiredDocs.length} Complete
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {requiredDocs.map(doc => (
                            <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
                        ))}
                    </div>
                </section>

                {/* Recommended Documents Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                            <Star className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Supporting Documents</h2>
                            <p className="text-gray-600 dark:text-gray-400">Additional documents to strengthen your application</p>
                        </div>
                        <div className="ml-auto">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                                <Star className="h-4 w-4" />
                                {completedRecommended}/{recommendedDocs.length} Complete
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {recommendedDocs.map(doc => (
                            <DocumentItem key={doc.id} document={doc} onToggle={handleToggleDocument} />
                        ))}
                    </div>
                </section>

                {/* Completion Celebration */}
                {totalCompleted === documents.length && (
                    <div className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-green-500/10 to-green-600/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
                                Congratulations! All Documents Complete
                            </h3>
                            <p className="text-green-600 dark:text-green-400 mb-6 max-w-2xl mx-auto">
                                You've successfully gathered all the required and recommended documents for your F-1 visa application.
                                You're now ready to schedule your visa interview!
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium rounded-full">
                                    <CheckCircle2 className="h-5 w-5" />
                                    Ready for Interview
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                <div className="mt-12">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-6 border border-primary/20">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Pro Tips
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li>• Keep original documents and make copies for your records</li>
                            <li>• Organize documents in a clear folder for easy access during interview</li>
                            <li>• Double-check all dates and information for accuracy</li>
                            <li>• Recommended documents can significantly strengthen your application</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}