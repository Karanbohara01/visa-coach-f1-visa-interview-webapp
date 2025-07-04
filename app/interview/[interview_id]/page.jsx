


'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { supabase } from '@/services/supabaseClient';
import { Check, CheckCircle, ChevronRight, Clock, Loader2, Mic, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const Step = ({ stepNumber, title, status }) => {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
        <div className="flex flex-col items-center gap-2 relative">
            {stepNumber > 1 && (
                <div className={`absolute h-0.5 w-12 -left-12 top-4 transition-all duration-300 ${isCompleted || isActive ? 'bg-purple-500' : 'bg-gray-200'
                    }`} />
            )}

            <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200' : ''
                } ${isActive ? 'bg-white border-purple-600 text-purple-600 shadow-lg shadow-purple-200' : ''
                } ${!isCompleted && !isActive ? 'bg-gray-50 border-gray-300 text-gray-400' : ''
                } group-hover:scale-105`}>
                {isCompleted ? (
                    <Check size={18} className="animate-in zoom-in duration-200" />
                ) : (
                    <span className="font-bold text-sm">{stepNumber}</span>
                )}
            </div>
            <span className={`text-xs font-medium transition-colors ${isActive ? 'text-purple-700 font-semibold' : 'text-gray-500'
                }`}>
                {title}
            </span>
        </div>
    );
};

export default function Interview() {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { setInterviewInfo } = useContext(InterviewDataContext);

    const [currentStep, setCurrentStep] = useState(1);
    const [micStatus, setMicStatus] = useState('idle');
    const [micLevel, setMicLevel] = useState(0);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);
    const streamRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const getInterviewDetails = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('interviews')
                    .select('jobPosition, jobDescription, duration, type')
                    .eq('interview_id', interview_id)
                    .single();

                if (error || !data) throw new Error('Interview not found or expired.');
                setInterviewData(data);
            } catch (error) {
                toast.error(error.message);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        if (interview_id) getInterviewDetails();
        return () => stopMicrophoneTest();
    }, [interview_id, router]);

    const onJoinInterview = async () => {
        setLoading(true);
        try {
            const { data: interviews, error } = await supabase
                .from('interviews')
                .select('*')
                .eq('interview_id', interview_id)
                .single();

            if (error || !interviews) throw new Error('Interview details could not be re-fetched.');

            setInterviewInfo({ userName, userEmail, interviewdata: interviews });
            router.push(`/interview/${interview_id}/start`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const stopMicrophoneTest = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
        streamRef.current = null;
    };

    const startMicrophoneTest = async () => {
        stopMicrophoneTest();
        setMicStatus('testing');
        setMicLevel(0);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();

            const analyser = audioContextRef.current.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            let soundDetected = false;

            const checkVolume = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                setMicLevel(average);

                if (average > 5 && !soundDetected) {
                    soundDetected = true;
                    setMicStatus('success');
                    toast.success('Microphone working!');
                    stopMicrophoneTest();
                    return;
                }
                animationFrameRef.current = requestAnimationFrame(checkVolume);
            };

            animationFrameRef.current = requestAnimationFrame(checkVolume);

            setTimeout(() => {
                if (!soundDetected) {
                    setMicStatus('error');
                    toast.error('No sound detected. Please check your microphone.');
                    stopMicrophoneTest();
                }
            }, 5000);

        } catch (error) {
            setMicStatus('error');
            toast.error('Microphone access was denied or failed.');
            console.error('Microphone error:', error);
            stopMicrophoneTest();
        }
    };

    const renderContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Welcome to your interview</h2>
                            <p className="text-sm text-gray-500 mt-1">Let's get you set up</p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    placeholder="Your full name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                            onClick={() => setCurrentStep(2)}
                            disabled={!userName || !userEmail}
                        >
                            Continue <ChevronRight size={18} className="ml-1" />
                        </Button>
                    </div>
                );
            case 2:
                const micStatusIcons = {
                    idle: <Mic size={48} className="text-gray-400" />,
                    testing: (
                        <div className="relative">
                            <Mic size={48} className="text-blue-500 animate-pulse" />
                            <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-75 animate-ping"></div>
                        </div>
                    ),
                    success: <CheckCircle size={48} className="text-green-500" />,
                    error: <X size={48} className="text-red-500" />
                };
                const micStatusText = {
                    idle: "Microphone Check",
                    testing: "Listening... Speak now!",
                    success: "Microphone working!",
                    error: "Microphone not detected"
                };

                return (
                    <div className="text-center space-y-8 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Audio Setup</h2>
                            <p className="text-sm text-gray-500 mt-1">Let's make sure we can hear you clearly</p>
                        </div>

                        <div className={`relative mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${micStatus === 'testing' ? 'bg-blue-50' :
                            micStatus === 'success' ? 'bg-green-50' :
                                micStatus === 'error' ? 'bg-red-50' : 'bg-gray-50'
                            }`}>
                            {micStatusIcons[micStatus]}
                        </div>

                        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-100"
                                style={{ width: `${Math.min(micLevel * 2, 100)}%` }}
                            ></div>
                        </div>

                        <div className="space-y-1">
                            <h3 className={`text-lg font-bold ${micStatus === 'success' ? 'text-green-600' :
                                micStatus === 'error' ? 'text-red-600' : 'text-gray-700'
                                }`}>
                                {micStatusText[micStatus]}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {micStatus === 'idle' ? "We'll test your microphone before starting" :
                                    micStatus === 'testing' ? "We're listening for your voice..." :
                                        micStatus === 'success' ? "Your microphone is ready to go!" :
                                            "Please check your microphone settings"}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                className="w-full h-11"
                                onClick={startMicrophoneTest}
                                disabled={micStatus === 'testing'}
                                variant={micStatus === 'success' ? 'outline' : 'default'}
                            >
                                {micStatus === 'success' ? 'Test Again' : 'Test Microphone'}
                                {micStatus === 'testing' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            </Button>
                            <Button
                                className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                                onClick={() => setCurrentStep(3)}
                                disabled={micStatus !== 'success'}
                            >
                                Continue <ChevronRight size={18} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="text-center space-y-8 animate-in fade-in duration-300">
                        <div className="space-y-2">
                            <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-50 rounded-full">
                                <CheckCircle className="w-10 h-10 text-green-500 animate-in zoom-in" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mt-4">You're all set!</h2>
                            <p className="text-gray-500">Ready to begin your interview</p>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl text-left space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <span>Your details are confirmed</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <span>Microphone is working properly</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <span>Interview details loaded</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>Estimated duration: {interviewData?.duration} minutes</span>
                            </div>
                            <Button
                                size="lg"
                                className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                                onClick={onJoinInterview}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Preparing...
                                    </>
                                ) : 'Start Interview Now'}
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading && !interviewData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto" />
                    <p className="text-gray-600">Loading interview details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 text-center bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                    <h1 className="text-xl font-bold text-gray-800">{interviewData?.jobPosition}</h1>
                    <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {interviewData?.type} Interview
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {interviewData?.duration} mins
                        </span>
                    </div>
                </div>

                <div className="px-8 pt-6 pb-4">
                    <div className="flex justify-between relative">
                        <Step stepNumber={1} title="Details" status={currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending'} />
                        <Step stepNumber={2} title="Audio Check" status={currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending'} />
                        <Step stepNumber={3} title="Ready" status={currentStep === 3 ? 'active' : 'pending'} />
                    </div>
                </div>

                <div className="p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

