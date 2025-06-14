 
'use client'
import { FaMicrophoneAlt } from 'react-icons/fa'

function Logo() {
    return (
        <div>

            <div className="flex items-center justify-center space-x-2 p-2">
                <FaMicrophoneAlt className="text-primary text-xl" />
                <h1 className="text-lg font-semibold text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    VisaCoach
                </h1>
            </div>
        </div>
    )
}

export default Logo