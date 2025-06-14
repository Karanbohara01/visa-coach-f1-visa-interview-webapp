
'use client'

import { Phone, Video } from 'lucide-react';
import Link from 'next/link';


function CreateOptions() {

    return (
        <div className="grid grid-cols-2 gap-4">
            <Link href={'/dashboard/create-interview'} className="bg-white border border-gray-300 rounded-md p-4  ">
                <Video className="p-2 text-primary bg-blue-50 h-10 w-10 rounded-md" />
                <h2 className="mt-2 text-lg font-semibold text-gray-800">Create New Interview</h2>
                <p className="mt-1 text-sm text-gray-500">Schedule AI-powered interviews with students</p>
            </Link>
            <div className="bg-white border border-gray-300 rounded-md p-4   ">
                <Phone className="p-2 text-primary bg-blue-50 h-10 w-10 rounded-md" />
                <h2 className="mt-2 text-lg font-semibold text-gray-800">Create Phone Screening</h2>
                <p className="mt-1 text-sm text-gray-500">Arrange phone screening calls with candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions