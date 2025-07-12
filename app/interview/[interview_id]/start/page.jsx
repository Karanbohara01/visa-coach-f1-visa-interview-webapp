// "use client";

// import { InterviewDataContext } from "@/context/InterviewDataContext";
// import AlertConfirmation from "./_components/AlertConfirmation";
// import { supabase } from "@/services/supabaseClient";
// import Vapi from "@vapi-ai/web";
// import axios from "axios";
// import { Loader2Icon, Mic, PhoneOff, Timer } from "lucide-react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useContext, useEffect, useRef, useState } from "react";
// import { toast } from "sonner";

// function StartInterview() {
//     const vapiRef = useRef(null);
//     const { interviewInfo } = useContext(InterviewDataContext);
//     const [activeUser, setActiveUser] = useState(false);
//     const [isStopping, setIsStopping] = useState(false);
//     const [startTime, setStartTime] = useState(null);
//     const [conversationMessages, setConversationMessages] = useState([]);
//     const { interview_id } = useParams();
//     const router = useRouter();
//     const [elapsedTime, setElapsedTime] = useState("00:00:00");
//     const [loading, setLoading] = useState(false);

//     const handleMessage = (message) => {
//         console.log("VAPI Message received:", message);

//         if (message?.type === "transcript" && message?.payload?.text) {
//             const role = message.payload.role || "user"; // usually 'user' or 'assistant'
//             const text = message.payload.text;

//             setConversationMessages((prev) => [...prev, { role, text }]);
//         }
//     };

//     const handleCallStart = () => console.log("Call has started.");
//     const handleSpeechStart = () => setActiveUser(false);
//     const handleSpeechEnd = () => setActiveUser(true);

//     const handleCallEnd = async () => {
//         setLoading(true);
//         console.log("Call ended event triggered.");
//         await generateFeedback();
//     };

//     useEffect(() => {
//         if (!vapiRef.current) {
//             console.log("Initializing VAPI...");
//             const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
//             vapiRef.current = vapi;

//             vapi.on("message", handleMessage);
//             vapi.on("call-start", handleCallStart);
//             vapi.on("speech-start", handleSpeechStart);
//             vapi.on("speech-end", handleSpeechEnd);
//             vapi.on("call-end", handleCallEnd);

//             return () => {
//                 vapi.off("message", handleMessage);
//                 vapi.off("call-start", handleCallStart);
//                 vapi.off("speech-start", handleSpeechStart);
//                 vapi.off("speech-end", handleSpeechEnd);
//                 vapi.off("call-end", handleCallEnd);
//             };
//         }
//     }, []);

//     useEffect(() => {
//         if (interviewInfo && !startTime) {
//             console.log("Starting call with interview info:", interviewInfo);
//             startCall();
//         }
//     }, [interviewInfo]);

//     useEffect(() => {
//         if (startTime) {
//             const timer = setInterval(() => {
//                 const elapsed = Math.floor((Date.now() - startTime) / 1000);
//                 const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
//                 const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
//                 const seconds = String(elapsed % 60).padStart(2, "0");
//                 setElapsedTime(`${hours}:${minutes}:${seconds}`);
//             }, 1000);

//             return () => clearInterval(timer);
//         }
//     }, [startTime]);

//     const startCall = async () => {
//         const questions = interviewInfo?.interviewdata?.questionList || [];
//         if (!questions.length) {
//             console.error("No questions available for the interview.");
//             return;
//         }

//         const questionListString = questions.map(q => q.question).join(", ");

//         const assistantOptions = {
//             name: "AI Recruiter",
//             firstMessage: `Hi ${interviewInfo?.userName || "Candidate"}, how are you? Ready for your interview on ${interviewInfo?.interviewdata?.jobPosition || "the role"}?`,

//             voice: {
//                 provider: "vapi",
//                 voiceId: "neha",
//             },

//             transcriber: {
//                 provider: "deepgram",
//                 model: "nova-2",
//                 language: "en",
//             },

//             model: {
//                 provider: "openai",
//                 model: "gpt-4o-mini-cluster",
//                 messages: [
//                     {
//                         role: "system",
//                         content: `
// You are an AI voice assistant conducting interviews.
// Ask the candidate the following questions one at a time and wait for their response before proceeding.
// Questions: ${questionListString}

// If the candidate struggles, provide helpful hints or rephrase the question without revealing the answer.
// Give positive or constructive feedback based on their answers.
// After about 5-7 questions, summarize the candidate's performance and end on a positive note.
// Keep the conversation natural, friendly, and professional.
// `.trim(),
//                     },
//                 ],
//             },
//         };

//         try {
//             await vapiRef.current.start(assistantOptions);
//             setStartTime(Date.now());
//         } catch (error) {
//             console.error("Error starting interview:", error);
//             toast.error("Failed to start the interview.");
//         }
//     };

//     const stopInterview = async () => {
//         if (isStopping || !vapiRef.current) return;

//         setIsStopping(true);
//         try {
//             await vapiRef.current.stop();
//             setStartTime(null);
//             toast.success("Interview stopped successfully.");
//             await handleCallEnd();
//         } catch (error) {
//             console.error("Error stopping interview:", error);
//             toast.error("Failed to stop the interview.");
//         } finally {
//             setIsStopping(false);
//         }
//     };

//     const extractJSONBlock = (text) => {
//         try {
//             return JSON.parse(text);
//         } catch {
//             const match = text.match(/{[\s\S]+}/);
//             if (match) {
//                 try {
//                     return JSON.parse(match[0]);
//                 } catch (err) {
//                     console.warn("Fallback JSON parse failed:", err);
//                 }
//             }
//         }
//         return null;
//     };

//     const generateFeedback = async () => {
//         console.log("generateFeedback function called");

//         const compiledConversation = conversationMessages
//             .map(msg => `${msg.role.toUpperCase()}: ${msg.text}`)
//             .join("\n");

//         console.log("Compiled conversation:\n", compiledConversation);

//         if (!compiledConversation || compiledConversation.length < 50) {
//             toast.error("Conversation data is too short or empty.");
//             console.warn("❌ Not enough content to evaluate.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("/api/ai-feedback", {
//                 conversation: compiledConversation,
//             });

//             const rawFeedback = response.data.feedback;
//             if (!rawFeedback) throw new Error("No feedback received from API.");

//             const feedbackObj = extractJSONBlock(rawFeedback);

//             if (
//                 !feedbackObj?.feedback ||
//                 Object.values(feedbackObj.feedback.rating || {}).every(val => val === 0)
//             ) {
//                 toast.error("AI feedback is too generic. Try again with a better interview session.");
//                 console.warn("⚠️ Empty or invalid feedback:", feedbackObj);
//                 setLoading(false);
//                 return;
//             }

//             const feedback = feedbackObj.feedback;

//             const { data, error } = await supabase
//                 .from("interview-feedback")
//                 .insert([{
//                     userName: interviewInfo?.userName,
//                     userEmail: interviewInfo?.userEmail,
//                     interview_id: interview_id,
//                     feedback,
//                     recommended: feedback?.Recommendation ?? false,
//                 }])
//                 .select();

//             if (error) throw error;

//             console.log("✅ Feedback saved:", data);
//             await router.replace(`/interview/${interview_id}/completed`);
//         } catch (error) {
//             console.error("Error generating feedback:", error);
//             toast.error("Failed to generate feedback.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-20 lg:px-48 xl:px-56">
//             <h2 className="font-bold text-xl flex justify-between">
//                 AI Interview Session
//                 <span className="flex gap-2 items-center">
//                     <Timer />
//                     {elapsedTime}
//                 </span>
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
//                 {/* AI */}
//                 <div className="bg-gray-300 h-[400px] rounded-lg border flex flex-col items-center justify-center">
//                     <div className="relative flex items-center justify-center">
//                         {!activeUser && (
//                             <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-md animate-pulse"></span>
//                         )}
//                         <Image src="/ai.png" alt="AI" height={100} width={100} className="h-[60px] w-[60px] rounded-full object-cover" />
//                     </div>
//                     <h2 className="font-bold mt-8">AI Visa Officer</h2>
//                 </div>

//                 {/* User */}
//                 <div className="bg-gray-300 h-[400px] rounded-lg border flex flex-col items-center justify-center">
//                     <div className="relative flex items-center justify-center">
//                         {activeUser && (
//                             <span className="absolute inset-0 rounded-full bg-primary opacity-30 blur-md animate-pulse"></span>
//                         )}
//                         <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full">
//                             {interviewInfo?.userName?.[0] || "U"}
//                         </h2>
//                     </div>
//                     <h2 className="font-bold text-center mt-2">{interviewInfo?.userName || "User"}</h2>
//                 </div>
//             </div>

//             <div className="flex items-center justify-center mt-10 gap-4">
//                 <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full cursor-pointer text-white" />
//                 {!loading ? (
//                     <AlertConfirmation stopInterview={stopInterview}>
//                         <PhoneOff className="h-12 w-12 p-3 bg-red-700 rounded-full text-white cursor-pointer" />
//                     </AlertConfirmation>
//                 ) : (
//                     <Loader2Icon className="animate-spin" />
//                 )}
//             </div>

//             <p className="text-sm text-gray-500 text-center mt-2">Interview progress...</p>
//         </div>
//     );
// }

// export default StartInterview;
//final code

"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { supabase } from "@/services/supabaseClient";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import { Loader2Icon, Mic, PhoneOff, Timer } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import AlertConfirmation from "./_components/AlertConfirmation";


function StartInterview() {
    const vapiRef = useRef(null);
    const { interviewInfo } = useContext(InterviewDataContext);
    const [activeUser, setActiveUser] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [conversationLog, setConversationLog] = useState([]);
    const [elapsedTime, setElapsedTime] = useState("00:00:00");
    const [loading, setLoading] = useState(false);

    const { interview_id } = useParams();
    const router = useRouter();

    // Handle transcription message updates
    const handleMessage = (message) => {
        console.log("📨 VAPI Message:", message);

        if (message?.type === "transcription" && message.transcription?.text) {
            const speaker = message.transcription.speaker || "unknown";
            const text = message.transcription.text;
            setConversationLog((prev) => [...prev, { speaker, text }]);
        }

        if (message?.conversation) {
            console.log("🧠 Full conversation object:", message.conversation);
        }
    };

    const handleCallStart = () => console.log("✅ Call started");
    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);

    const handleCallEnd = async () => {
        console.log("📞 Call ended");
        toast("Interview ended.");
        setLoading(true);
        await generateFeedback();
    };

    // Respond to assistant's tool call
    const handleFunctionCall = useCallback(async (functionCall) => {
        if (functionCall.functionCall.name === "getInterviewQuestions") {
            const questions = interviewInfo?.interviewdata?.questionList || [];

            const questionList = questions.map((q) => ({
                question: q.question,
                type: q.type,
            }));

            vapiRef.current?.send({
                type: "function-response",
                functionResponse: {
                    name: "getInterviewQuestions",
                    result: questionList,
                },
            });
        }
    }, [interviewInfo]);

    useEffect(() => {
        if (!vapiRef.current) {
            console.log("🚀 Initializing VAPI...");
            const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
            vapiRef.current = vapi;

            vapi.on("message", handleMessage);
            vapi.on("call-start", handleCallStart);
            vapi.on("speech-start", handleSpeechStart);
            vapi.on("speech-end", handleSpeechEnd);
            vapi.on("call-end", handleCallEnd);
            vapi.on("function-call", handleFunctionCall);

            return () => {
                vapi.off("message", handleMessage);
                vapi.off("call-start", handleCallStart);
                vapi.off("speech-start", handleSpeechStart);
                vapi.off("speech-end", handleSpeechEnd);
                vapi.off("call-end", handleCallEnd);
                vapi.off("function-call", handleFunctionCall);
            };
        }
    }, [handleFunctionCall]);

    useEffect(() => {
        if (interviewInfo && !startTime) {
            startCall();
        }
    }, [interviewInfo]);

    useEffect(() => {
        if (startTime) {
            const timer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
                const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
                const seconds = String(elapsed % 60).padStart(2, "0");
                setElapsedTime(`${hours}:${minutes}:${seconds}`);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [startTime]);

    const startCall = async () => {
        const questions = interviewInfo?.interviewdata?.questionList || [];
        if (!questions.length) {
            console.error("❌ No questions available.");
            return;
        }

        setConversationLog([]); // Reset before starting

        const assistantConfig = {
            name: "AI Visa Officer",
            firstMessage: `Hi ${interviewInfo?.userName || "Candidate"}, welcome to your visa interview simulation. Are you ready to begin?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-3",
                language: "en-US",
            },
            voice: {
                provider: "vapi",
                voiceId: "Elliot",
            },
            model: {
                provider: "openai",
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI visa officer named Harry. First, call the `getInterviewQuestions` function. Then ask the questions one by one, waiting for a response after each. Remain formal and helpful throughout.",
                    },
                ],
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "getInterviewQuestions",
                            description: "Returns a list of interview questions",
                            parameters: { type: "object", properties: {} },
                        },
                    },
                ],
            },
        };

        try {
            await vapiRef.current.start(assistantConfig);
            setStartTime(Date.now());
        } catch (error) {
            console.error("❌ Error starting call:", error);
            toast.error("Failed to start the interview");
        }
    };

    const stopInterview = async () => {
        if (isStopping || !vapiRef.current) return;
        setIsStopping(true);

        try {
            await vapiRef.current.stop();
            setStartTime(null);
            toast.success("Interview stopped");
            await handleCallEnd();
        } catch (error) {
            console.error("❌ Error stopping interview:", error);
            toast.error("Failed to stop the interview");
        } finally {
            setIsStopping(false);
        }
    };

    const generateFeedback = async () => {
        try {
            const formattedConversation = conversationLog
                .map((msg) => `${msg.speaker}: ${msg.text}`)
                .join("\n");

            const response = await axios.post("/api/ai-feedback", {
                conversation: formattedConversation,
            });

            const rawFeedback = response.data.feedback;

            let feedback;
            try {
                const cleaned = rawFeedback
                    .replace(/^```json/, "")
                    .replace(/```$/, "")
                    .trim();

                const parsed = JSON.parse(cleaned);
                feedback = parsed?.feedback || parsed;
            } catch (err) {
                console.warn("⚠️ Not valid JSON. Saving fallback.");
                feedback = { summery: rawFeedback };
            }

            const { data, error } = await supabase
                .from("interview-feedback")
                .insert([
                    {
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        interview_id,
                        feedback,
                        recommended: false,
                    },
                ])
                .select();

            if (error) throw error;

            console.log("✅ Feedback saved:", data);
            await router.replace(`/interview/${interview_id}/completed`);
        } catch (error) {
            console.error("❌ Error generating feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-20 lg:px-48 xl:px-56">
            <h2 className="font-bold text-xl flex justify-between">
                AI Interview Session
                <span className="flex gap-2 items-center">
                    <Timer />
                    {elapsedTime}
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
                {/* AI Avatar */}
                <div className="bg-gray-300 h-[400px] rounded-lg border flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {!activeUser && (
                            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-md animate-pulse"></span>
                        )}
                        <Image
                            src="/ai.png"
                            alt="AI"
                            height={100}
                            width={100}
                            className="h-[60px] w-[60px] rounded-full object-cover"
                        />
                    </div>
                    <h2 className="font-bold mt-8">AI Visa Officer</h2>
                </div>

                {/* User Avatar */}
                <div className="bg-gray-300 h-[400px] rounded-lg border flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {activeUser && (
                            <span className="absolute inset-0 rounded-full bg-primary opacity-30 blur-md animate-pulse"></span>
                        )}
                        <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full">
                            {interviewInfo?.userName?.[0] || "U"}
                        </h2>
                    </div>
                    <h2 className="font-bold text-center mt-2">
                        {interviewInfo?.userName || "User"}
                    </h2>
                </div>
            </div>

            {/* <div className="flex items-center justify-center mt-10 gap-4">
                <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white" />
                {!loading ? (
                    <PhoneOff
                        className="h-12 w-12 p-3 bg-red-700 rounded-full text-white cursor-pointer"
                        onClick={stopInterview}
                    />
                ) : (
                    <Loader2Icon className="animate-spin h-12 w-12 text-gray-600" />
                )}
            </div> */}

            {/* <div className="flex items-center justify-center mt-10 gap-4">
                <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white" />

                {!loading ? (
                    <AlertConfirmation stopInterview={stopInterview}>
                        <PhoneOff
                            className="h-12 w-12 p-3 bg-red-700 rounded-full text-white cursor-pointer hover:bg-red-800 transition"
                        />
                    </AlertConfirmation>
                ) : (
                    <Loader2Icon className="animate-spin h-12 w-12 text-gray-600" />
                )}
            </div> */}

            <div className="flex flex-col items-center justify-center mt-10 gap-2">
                <div className="flex items-center justify-center gap-4">
                    <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full text-white" />

                    {!loading ? (
                        <AlertConfirmation stopInterview={stopInterview}>
                            <PhoneOff
                                className="h-12 w-12 p-3 bg-red-700 rounded-full text-white cursor-pointer hover:bg-red-800 transition"
                            />
                        </AlertConfirmation>
                    ) : (
                        <Loader2Icon className="animate-spin h-12 w-12 text-gray-600" />
                    )}
                </div>

                {loading && (
                    <p className="text-sm text-gray-500 mt-2 animate-pulse">
                        Generating feedback… Please wait
                    </p>
                )}
            </div>



            <p className="text-sm text-gray-500 text-center mt-2">
                Interview progress...
            </p>
        </div>
    );
}

export default StartInterview;
