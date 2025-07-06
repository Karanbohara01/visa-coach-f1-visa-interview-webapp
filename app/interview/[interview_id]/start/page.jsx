
"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import AlertConfirmation from "./_components/AlertConfirmation";
import { supabase } from "@/services/supabaseClient";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import { Loader2Icon, Mic, PhoneOff, Timer } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function StartInterview() {
    const vapiRef = useRef(null);
    const { interviewInfo } = useContext(InterviewDataContext);
    const [activeUser, setActiveUser] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [conversation, setConversation] = useState("");
    const { interview_id } = useParams();
    const [elapsedTime, setElapsedTime] = useState("00:00:00");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleMessage = (message) => {
        console.log("VAPI Message received:", message);
        if (message?.conversation) {
            const convoString = JSON.stringify(message.conversation);
            console.log("Conversation string:", convoString);
            setConversation(convoString);
        }
    };

    const handleCallStart = () => console.log("Call has started.");
    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);
    const handleCallEnd = async () => {
        setLoading(true); // 👈 **Set loading to true when the interview ends**
        console.log("Call ended event triggered.");
        // toast("Interview ended. Generating feedback...");
        await generateFeedback();
    };

    useEffect(() => {
        if (!vapiRef.current) {
            console.log("Initializing VAPI...");
            const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
            vapiRef.current = vapi;

            vapi.on("message", handleMessage);
            vapi.on("call-start", handleCallStart);
            vapi.on("speech-start", handleSpeechStart);
            vapi.on("speech-end", handleSpeechEnd);
            vapi.on("call-end", handleCallEnd);

            return () => {
                vapi.off("message", handleMessage);
                vapi.off("call-start", handleCallStart);
                vapi.off("speech-start", handleSpeechStart);
                vapi.off("speech-end", handleSpeechEnd);
                vapi.off("call-end", handleCallEnd);
            };
        }
    }, []);

    useEffect(() => {
        if (interviewInfo && !startTime) {
            console.log("Starting call with interview info:", interviewInfo);
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
            console.error("No questions available for the interview.");
            return;
        }

        const questionListString = questions.map((q) => q.question).join(", ");
        console.log("Question list:", questionListString);

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${interviewInfo?.userName || "Candidate"}, how are you? Ready for your interview on ${interviewInfo?.interviewdata?.jobPosition || "the role"
                }?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `You are an AI voice assistant conducting interviews.
                            Ask the candidate the following questions one at a time and wait for their response before proceeding.
                            Questions: ${questionListString}

                            If the candidate struggles, provide helpful hints or rephrase the question without revealing the answer.
                            Give positive or constructive feedback based on their answers.
                            After about 5-7 questions, summarize the candidate's performance and end on a positive note.
                            Keep the conversation natural, friendly, and professional.`.trim(),
                    },
                ],
            },
        };

        try {
            await vapiRef.current.start(assistantOptions);
            setStartTime(Date.now());
        } catch (error) {
            console.error("Error starting interview:", error);
            toast.error("Failed to start the interview");
        }
    };

    const stopInterview = async () => {
        if (isStopping || !vapiRef.current) return;

        setIsStopping(true);
        try {
            await vapiRef.current.stop();
            console.log("Vapi state after stop:", vapiRef.current);
            setStartTime(null);
            toast.success("Interview stopped successfully");

            // Manually trigger the call-end logic
            await handleCallEnd();
        } catch (error) {
            console.error("Error stopping interview:", error);
            toast.error("Failed to stop the interview");
        } finally {
            setIsStopping(false);
        }
    };

    const generateFeedback = async () => {
        console.log("generateFeedback function called");
        try {
            console.log("Conversation being sent:", conversation);

            const response = await axios.post("/api/ai-feedback", { conversation });
            const rawFeedback = response.data.feedback;
            if (!rawFeedback) throw new Error("No feedback found in API response");

            // ✅ Extract JSON block from messy response using regex
            const match = rawFeedback.match(/```json\s*([\s\S]*?)\s*```/);
            let content = match ? match[1].trim() : null;

            if (!content) {
                console.warn("⚠️ No valid JSON block found. Raw fallback:");
                console.warn(rawFeedback);
                toast.error("AI response was not in valid JSON format.");
                setLoading(false);
                return;
            }

            let feedback;
            try {
                feedback = JSON.parse(content);
            } catch (err) {
                console.error("❌ JSON parse failed. Extracted content:", content);
                toast.error("Failed to parse AI feedback. Please try again.");
                setLoading(false);
                return;
            }

            // ✅ Insert to Supabase
            const { data, error } = await supabase
                .from("interview-feedback")
                .insert([
                    {
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        interview_id: interview_id,
                        feedback,
                        recommended: feedback?.Recommendation ?? false,
                    },
                ])
                .select();

            if (error) {
                console.error("Error inserting into Supabase:", error);
                throw error;
            }

            console.log("✅ Feedback saved in Supabase:", data);
            await router.replace(`/interview/${interview_id}/completed`);
        } catch (error) {
            console.error("Error in generateFeedback:", error);
            toast.error("Something went wrong during feedback processing.");
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
                <div className="bg-gray-300 h-[400px] rounded-lg border flex-col flex items-center justify-center">
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
                <div className="bg-gray-300 h-[400px] rounded-lg border flex-col flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {activeUser && (
                            <span className="absolute inset-0 rounded-full bg-primary opacity-30 blur-md animate-pulse"></span>
                        )}
                        <h2 className="text-2xl bg-primary text-white p-3 px-5 rounded-full">
                            {interviewInfo?.userName?.[0] || "U"}
                        </h2>
                    </div>
                    <h2 className="font-bold text-center mt-2">{interviewInfo?.userName || "User"}</h2>
                </div>
            </div>
            <div className="flex items-center justify-center mt-10 gap-4">
                <Mic className="h-12 w-12 p-3 bg-gray-500 rounded-full cursor-pointer text-white" />
                {!loading ? (
                    <AlertConfirmation stopInterview={stopInterview}>
                        <PhoneOff
                            className="h-12 w-12 p-3 bg-red-700 rounded-full text-white cursor-pointer"
                        />
                    </AlertConfirmation>
                ) : (
                    <Loader2Icon className="animate-spin" />
                )}
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">Interview progress...</p>
        </div>
    );
}

export default StartInterview;

