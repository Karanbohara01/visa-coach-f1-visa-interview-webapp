

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Send, X, Mic, Volume2, VolumeX, User, Bot, BotIcon } from 'lucide-react';

// // Suggested prompts for common university-related questions
// const suggestedPrompts = [
//     'What are the top universities in the US for computer science?',
//     'How do I apply for scholarships as an international student?',
//     'What are the visa requirements for studying in the US?',
//     'Tell me about campus life at Harvard University.',
//     'What is the cost of studying at a US university?',
// ];

// export default function UniversityChatBot() {
//     const [chatInput, setChatInput] = useState('');
//     const [conversation, setConversation] = useState([]);
//     const [chatLoading, setChatLoading] = useState(false);
//     const [showSuggestions, setShowSuggestions] = useState(true);
//     const [isListening, setIsListening] = useState(false);
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
//     const [speechError, setSpeechError] = useState(null);
//     const chatContainerRef = useRef(null);
//     const recognitionRef = useRef(null);

//     // Initialize SpeechRecognition
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             recognitionRef.current = new SpeechRecognition();
//             recognitionRef.current.continuous = false;
//             recognitionRef.current.interimResults = true;
//             recognitionRef.current.lang = 'en-US';

//             recognitionRef.current.onresult = (event) => {
//                 const transcript = Array.from(event.results)
//                     .map((result) => result[0].transcript)
//                     .join('');
//                 setChatInput(transcript);
//             };

//             recognitionRef.current.onerror = (event) => {
//                 setSpeechError(`Speech recognition error: ${event.error}`);
//                 setIsListening(false);
//             };

//             recognitionRef.current.onend = () => {
//                 setIsListening(false);
//                 if (chatInput.trim()) {
//                     handleChat();
//                 }
//             };
//         } else {
//             setSpeechError('Speech recognition is not supported in this browser.');
//         }

//         // Cleanup
//         return () => {
//             if (recognitionRef.current) {
//                 recognitionRef.current.stop();
//             }
//         };
//     }, [chatInput]);

//     // Scroll to the bottom of the chat container
//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [conversation]);

//     // Speak the latest bot response
//     useEffect(() => {
//         if (voiceOutputEnabled && conversation.length > 0) {
//             const latestMessage = conversation[conversation.length - 1];
//             if (latestMessage.role === 'bot' && !chatLoading && !isSpeaking) {
//                 const utterance = new SpeechSynthesisUtterance(latestMessage.content);
//                 utterance.lang = 'en-US';
//                 utterance.onstart = () => setIsSpeaking(true);
//                 utterance.onend = () => setIsSpeaking(false);
//                 window.speechSynthesis.speak(utterance);
//             }
//         }
//     }, [conversation, voiceOutputEnabled, chatLoading]);

//     // Handle basic intents locally
//     const handleBasicIntents = (input) => {
//         const lowerInput = input.toLowerCase().trim();
//         if (['hi', 'hello', 'hey'].includes(lowerInput)) {
//             return 'Hello! I’m here to help with your questions about studying in the US. Try asking about universities, scholarships, visas, or campus life!';
//         }
//         if (['help', 'what can you do'].includes(lowerInput)) {
//             return 'I can answer questions about US universities, applications, scholarships, visas, and more. Try one of these: ' +
//                 suggestedPrompts.join(', ');
//         }
//         return null;
//     };

//     // Handle chat submission
//     const handleChat = async (prompt = chatInput) => {
//         if (!prompt.trim()) return;

//         const userMessage = { role: 'user', content: prompt };
//         setConversation((prev) => [...prev, userMessage]);
//         setChatInput('');
//         setChatLoading(true);
//         setShowSuggestions(false);

//         const basicResponse = handleBasicIntents(prompt);
//         if (basicResponse) {
//             setConversation((prev) => [...prev, { role: 'bot', content: basicResponse }]);
//             setChatLoading(false);
//             return;
//         }

//         try {
//             const res = await fetch('/api/chat', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     prompt,
//                     conversation: conversation.filter((msg) => msg.role === 'user').map((msg) => msg.content),
//                 }),
//             });
//             if (!res.ok) throw new Error('API request failed');
//             const data = await res.json();
//             const botResponse = data.response || 'Sorry, I couldn’t process that. Please try again.';
//             setConversation((prev) => [...prev, { role: 'bot', content: botResponse }]);
//         } catch (err) {
//             setConversation((prev) => [
//                 ...prev,
//                 { role: 'bot', content: 'Something went wrong. Please try again.' },
//             ]);
//         } finally {
//             setChatLoading(false);
//         }
//     };

//     // Handle suggested prompt click
//     const handleSuggestedPrompt = (prompt) => {
//         setChatInput(prompt);
//         handleChat(prompt);
//     };

//     // Toggle speech recognition
//     const toggleListening = () => {
//         if (!recognitionRef.current) {
//             setSpeechError('Speech recognition is not supported in this browser.');
//             return;
//         }

//         if (isListening) {
//             recognitionRef.current.stop();
//         } else {
//             try {
//                 recognitionRef.current.start();
//                 setIsListening(true);
//                 setSpeechError(null);
//             } catch (err) {
//                 setSpeechError('Failed to start speech recognition. Please check microphone permissions.');
//                 setIsListening(false);
//             }
//         }
//     };

//     // Toggle voice output
//     const toggleVoiceOutput = () => {
//         if (isSpeaking) {
//             window.speechSynthesis.cancel();
//             setIsSpeaking(false);
//         }
//         setVoiceOutputEnabled((prev) => !prev);
//     };

//     // Clear conversation
//     const clearConversation = () => {
//         window.speechSynthesis.cancel(); // Stop any ongoing speech
//         setConversation([]);
//         setChatInput('');
//         setShowSuggestions(true);
//         setSpeechError(null);
//         setIsListening(false);
//     };


//     return (
//         <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-12">
//             <div className="max-w-3xl mx-auto">
//                 <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
//                     {/* Header */}
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-2xl font-bold text-purple-700 flex items-center">
//                             <BotIcon className="w-6 h-6 mr-2" />
//                             VisaCoach
//                         </h2>
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={toggleVoiceOutput}
//                                 className={`p-2 rounded-full transition ${voiceOutputEnabled ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'}`}
//                                 title={voiceOutputEnabled ? 'Disable voice output' : 'Enable voice output'}
//                             >
//                                 {voiceOutputEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
//                             </button>
//                             {conversation.length > 0 && (
//                                 <button
//                                     onClick={clearConversation}
//                                     className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
//                                     title="Clear conversation"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Intro Text */}
//                     <p className="text-gray-600 mb-6 text-sm">
//                         Ask anything about studying in the US — from applications and scholarships to campus life and visas.
//                         Use the microphone to speak your question!
//                     </p>

//                     {/* Chat Container */}
//                     <div
//                         ref={chatContainerRef}
//                         className="h-[400px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
//                     >
//                         {conversation.length === 0 && !chatLoading && showSuggestions && (
//                             <div className="space-y-2">
//                                 <p className="text-sm text-gray-500">Suggested questions:</p>
//                                 {suggestedPrompts.map((prompt, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleSuggestedPrompt(prompt)}
//                                         className="block w-full text-left text-sm text-purple-600 hover:bg-purple-100 p-2 rounded-lg transition"
//                                     >
//                                         {prompt}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                         {conversation.map((message, index) => (
//                             <div
//                                 key={index}
//                                 className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                             >
//                                 <div className={`flex items-end gap-2 max-w-[80%]`}>
//                                     {message.role === 'bot' && (
//                                         <div className="flex-shrink-0">
//                                             <Bot className="w-5 h-5 text-purple-500" />
//                                         </div>
//                                     )}
//                                     <div
//                                         className={`px-4 py-2 rounded-xl text-sm shadow-sm relative ${message.role === 'user'
//                                             ? 'bg-purple-600 text-white rounded-br-none'
//                                             : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
//                                             }`}
//                                     >
//                                         <p>{message.content}</p>
//                                         <div className="absolute bottom-[-1.2rem] right-2 text-[10px] text-gray-400">
//                                             {message.timestamp}
//                                         </div>
//                                     </div>
//                                     {message.role === 'user' && (
//                                         <div className="flex-shrink-0">
//                                             <User className="w-5 h-5 text-purple-300" />
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}

//                         {isListening && (
//                             <div className="flex justify-start mb-4">
//                                 <div className="p-3 bg-blue-100 rounded-lg text-sm text-blue-500 animate-pulse">
//                                     <Mic className="inline-block mr-1 w-4 h-4" />
//                                     Listening...
//                                 </div>
//                             </div>
//                         )}

//                         {chatLoading && (
//                             <div className="flex justify-start mb-4">
//                                 <div className="p-3 bg-purple-100 rounded-lg text-sm text-purple-500 flex items-center gap-1">
//                                     <Bot className="w-4 h-4" />
//                                     VisaCoach is thinking...
//                                 </div>
//                             </div>
//                         )}

//                         {speechError && (
//                             <div className="flex justify-start mb-4">
//                                 <div className="p-3 bg-red-100 rounded-lg text-sm text-red-600">
//                                     {speechError}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Input Area */}
//                     <div className="flex gap-2">
//                         <input
//                             value={chatInput}
//                             onChange={(e) => setChatInput(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && handleChat()}
//                             placeholder="Type or speak your question..."
//                             className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
//                         />
//                         <button
//                             onClick={toggleListening}
//                             className={`p-2 rounded-lg transition ${isListening ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
//                                 } hover:bg-blue-600 hover:text-white`}
//                             title={isListening ? 'Stop listening' : 'Start listening'}
//                         >
//                             <Mic className="h-4 w-4" />
//                         </button>
//                         <button
//                             onClick={() => handleChat()}
//                             disabled={chatLoading || !chatInput.trim()}
//                             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition"
//                         >
//                             <Send className="h-4 w-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Send, X, Mic, Volume2, VolumeX, User, BotIcon, ClipboardCopy, CheckCircle
} from 'lucide-react';

const suggestedPrompts = [
    'What are the top universities in the US for computer science?',
    'How do I apply for scholarships as an international student?',
    'What are the visa requirements for studying in the US?',
    'Tell me about campus life at Harvard University.',
    'What is the cost of studying at a US university?',
];

export default function UniversityChatBot() {
    const [chatInput, setChatInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
    const [speechError, setSpeechError] = useState(null);
    const chatContainerRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
                setChatInput(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                setSpeechError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                if (chatInput.trim()) handleChat();
            };
        } else {
            setSpeechError('Speech recognition not supported in this browser.');
        }

        return () => recognitionRef.current?.stop();
    }, [chatInput]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [conversation]);

    useEffect(() => {
        if (voiceOutputEnabled && conversation.length > 0) {
            const latest = conversation[conversation.length - 1];
            if (latest.role === 'bot' && !chatLoading && !isSpeaking) {
                const utterance = new SpeechSynthesisUtterance(latest.content);
                utterance.lang = 'en-US';
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
            }
        }
    }, [conversation, voiceOutputEnabled, chatLoading]);

    const handleChat = async (prompt = chatInput) => {
        if (!prompt.trim()) return;

        setChatInput('');
        setChatLoading(true);
        setShowSuggestions(false);

        // Push the user message
        setConversation(prev => [...prev, { role: 'user', content: prompt }]);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();
            const { question, feedback } = data.response || {};

            if (question) {
                setConversation(prev => [...prev, { role: 'bot', content: question }]);
            }

            if (feedback) {
                setConversation(prev => [...prev, { role: 'bot', content: feedback }]);
            }

        } catch (error) {
            console.error(error);
            setConversation(prev => [...prev, { role: 'bot', content: 'Something went wrong. Try again.' }]);
        } finally {
            setChatLoading(false);
        }
    };


    const toggleListening = () => {
        if (!recognitionRef.current) return setSpeechError('Speech recognition unavailable.');
        if (isListening) recognitionRef.current.stop();
        else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setSpeechError(null);
            } catch {
                setSpeechError('Mic permission denied.');
            }
        }
    };

    const clearConversation = () => {
        window.speechSynthesis.cancel();
        setConversation([]);
        setChatInput('');
        setShowSuggestions(true);
        setSpeechError(null);
        setIsListening(false);
    };

    const sessionProgress = Math.min(100, conversation.filter(m => m.role === 'user').length * 15);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-12">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Live Demo</h2>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Active Session
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={chatContainerRef} className="h-[400px] overflow-y-auto space-y-4">
                    {conversation.length === 0 && showSuggestions && (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 space-y-2">
                            <p className="text-sm text-gray-500">Try asking:</p>
                            {suggestedPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleChat(prompt)}
                                    className="block text-left text-sm text-purple-600 hover:bg-purple-100 p-2 rounded-lg"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}

                    {conversation.map((msg, i) => {
                        const prev = conversation[i - 1];

                        if (msg.role === 'bot' && (!prev || prev.role === 'user')) {
                            return (
                                <div key={i} className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        }

                        if (msg.role === 'user') {
                            return (
                                <div key={i} className="flex items-start space-x-3 justify-end">
                                    <div className="bg-purple-600 text-white p-3 rounded-lg relative max-w-sm">
                                        <p className="text-sm">{msg.content}</p>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(msg.content)}
                                            className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100"
                                            title="Copy"
                                        >
                                            <ClipboardCopy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        }

                        if (msg.role === 'bot' && prev?.role === 'user') {
                            return (
                                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-medium text-green-800">AI Feedback</span>
                                    </div>
                                    <p className="text-sm text-green-700">{msg.content}</p>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>

               

                {/* Input */}
                <div className="flex gap-2">
                    <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                        placeholder="Type or speak your question..."
                        className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        onClick={toggleListening}
                        className={`p-2 rounded-lg ${isListening ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-blue-600 hover:text-white`}
                        title={isListening ? 'Stop Listening' : 'Start Listening'}
                    >
                        <Mic className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleChat()}
                        disabled={chatLoading || !chatInput.trim()}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                    <button
                        onClick={clearConversation}
                        className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                        title="Clear"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
