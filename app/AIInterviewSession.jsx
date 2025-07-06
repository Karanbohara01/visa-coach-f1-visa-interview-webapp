

// 'use client'
// import React, { useState, useEffect } from 'react'
// import { Mic, MicOff } from 'lucide-react'

// export default function AllInterviewSession() {
//     const [isRecording, setIsRecording] = useState(false)
//     const [timeElapsed, setTimeElapsed] = useState(2)

//     useEffect(() => {
//         const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000)
//         return () => clearInterval(timer)
//     }, [])

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60)
//         const secs = seconds % 60
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//     }

//     const toggleRecording = () => {
//         setIsRecording(prev => !prev)
//     }

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md w-full max-w-2xl mx-auto">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-8">
//                     <h1 className="text-2xl font-semibold text-gray-900">AI Interview Session</h1>
//                     <div className="flex items-center space-x-2">
//                         <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                         <span className="text-lg font-mono text-gray-700">

//                             00:{formatTime(timeElapsed)}
//                         </span>
//                     </div>               </div>

//                 {/* Main Interview Area */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     {/* AI Visa Officer */}
//                     <div className="bg-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-96">
//                         <div className="w-24 h-24 bg-blue-100 rounded-full mb-6 flex items-center justify-center overflow-hidden">
//                             <img
//                                 src="https://np.usembassy.gov/wp-content/uploads/sites/27/2022/10/Amb-Thompson-300-300.jpg"
//                                 alt="AI Visa Officer"
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <h2 className="text-xl font-semibold text-gray-900">AI Visa Officer</h2>
//                     </div>

//                     {/* Karan Bohara */}
//                     <div className="bg-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-96">
//                         <div className="w-24 h-24 bg-purple-600 rounded-full mb-6 flex items-center justify-center">
//                             <span className="text-white text-2xl font-bold">K</span>
//                         </div>
//                         <h2 className="text-xl font-semibold text-gray-900">Karan Bohara</h2>
//                     </div>
//                 </div>

//                 {/* Control Panel */}
//                 <div className="flex items-center justify-center space-x-4">
//                     {/* Microphone Button */}
//                     <button
//                         onClick={toggleRecording}
//                         className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${isRecording
//                             ? 'bg-gray-600 hover:bg-gray-700'
//                             : 'bg-gray-500 hover:bg-gray-600'
//                             }`}
//                     >
//                         <Mic className="w-6 h-6 text-white" />
//                     </button>

//                     {/* End Call Button */}
//                     <button className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200">
//                         <MicOff className="w-6 h-6 text-white" />
//                     </button>
//                 </div>

//                 {/* Status Text */}
//                 <div className="text-center mt-4">
//                     <p className="text-gray-600">Interview progress...</p>
//                 </div>
//             </div>
//         </div>
//     )
// }


'use client'
import React, { useState, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function AllInterviewSession() {
    const [isRecording, setIsRecording] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(2)

    useEffect(() => {
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const toggleRecording = () => setIsRecording(prev => !prev)

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Interview</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono text-gray-700">{formatTime(timeElapsed)}</span>
                </div>
            </div>

            {/* Interview Avatars */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* AI */}
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
                    <img
                        src="https://np.usembassy.gov/wp-content/uploads/sites/27/2022/10/Amb-Thompson-300-300.jpg"
                        alt="AI Officer"
                        className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                    <h3 className="text-sm font-medium text-gray-800">AI Officer</h3>
                </div>

                {/* User */}
                <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold mb-2">
                        K
                    </div>
                    <h3 className="text-sm font-medium text-gray-800">Karan Bohara</h3>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-2">
                <button
                    onClick={toggleRecording}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isRecording ? 'bg-gray-600' : 'bg-gray-500'
                        } hover:opacity-90`}
                >
                    <Mic className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition">
                    <MicOff className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Status */}
            <p className="text-center text-sm text-gray-500 mt-3">Interview in progress...</p>
        </div>
    )
}
