// app/(main)/documents/_components/DocumentItem.jsx
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export default function DocumentItem({ document, onToggle }) {
    return (
        <Card className={`transition-all ${document.checked ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
            <CardContent className="p-4 flex items-start gap-4">
                <Checkbox
                    id={document.id}
                    checked={document.checked}
                    onCheckedChange={isChecked => onToggle(document.id, isChecked)}
                    className="mt-1"
                />
                <div className="flex-1">
                    <label htmlFor={document.id} className="font-semibold cursor-pointer">{document.title}</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{document.description}</p>
                    {document.link && (
                        <a
                            href={document.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline flex items-center gap-1 mt-2"
                        >
                            Learn More <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}