'use client';
import Logo from '@/app/auth/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { supabase } from '@/services/supabaseClient';
import { CheckCircle, Clock, Loader2Icon, Video } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

function Interview() {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);


    const router = useRouter();

    console.log(interviewData);


    // Fetch interview details
    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            const { data: interviews, error } = await supabase
                .from('interviews')
                .select('jobPosition, jobDescription, duration, type')
                .eq('interview_id', interview_id);

            if (error) throw error;

            if (interviews && interviews.length > 0) {
                setInterviewData(interviews[0]);
                toast.success('Interview details loaded successfully.');
                console.log(interviews[0])
            } else {
                toast.error('Invalid Interview ID. No interview found.');
            }
        } catch (error) {
            toast.error('Error fetching interview details. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (interview_id) {
            GetInterviewDetails();
        } else {
            toast.error('Interview ID is missing.');
        }
    }, [interview_id]);



    const onJoinInterview = async () => {
        setLoading(true);

        try {
            const { data: interviews, error } = await supabase
                .from('interviews')
                .select('*')
                .eq('interview_id', interview_id);

            if (error) {
                toast.error('Failed to fetch interview details.');
                console.error('Error:', error);
                return;
            }

            if (interviews && interviews.length > 0) {
                console.log(interviews[0]);
                setInterviewInfo({
                    userName: userName,
                    userEmail: userEmail,
                    interviewdata: interviews[0], // Fixed reference
                });
                router.push(`/interview/${interview_id}/start`);
            } else {
                toast.error('No interview found for the given ID.');
            }
        } catch (err) {
            console.error('Error during interview join:', err);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center   from-blue-50 to-gray-100 px-6 md:px-16">
            <div className="w-full max-w-xl m-10 p-8 lg:p-12 border rounded-lg  bg-white">
                <div className="flex flex-col items-center">


                    <Logo />


                    <h2 className="text-xl font-bold text-gray-800 mt-4">AI-Powered Interview Platform</h2>
                    <Image
                        src="/interview.png"
                        height={500}
                        width={500}
                        className="w-[280px] my-6 "
                        alt="Interview Illustration"
                    />
                    <h2 className="font-semibold text-xl text-gray-700">{interviewData?.jobPosition}</h2>
                    <h2 className="flex gap-2 items-center mt-4 text-gray-600">
                        <Clock className="h-5 w-5 text-gray-500" /> {interviewData?.duration} minutes
                    </h2>
                </div>
                <div className="mt-8 w-full">
                    <h2 className="text-gray-800 font-medium mb-2">Enter your full name</h2>
                    <Input
                        placeholder="e.g. Karan Bohara"
                        className="w-full border-gray-300 rounded-lg focus:border-blue-500
                         focus:ring focus:ring-blue-100"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="mt-2 w-full">
                    <h2 className="text-gray-800 font-medium mb-2">Enter your email address</h2>
                    <Input
                        placeholder="e.g. karanbohara216@gmail.com"
                        className="w-full border-gray-300 rounded-lg focus:border-blue-500
                         focus:ring focus:ring-blue-100"
                        onChange={(event) => setUserEmail(event.target.value)}
                    />
                </div>
                {/* Checklist */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 my-3">Before you start check</h3>
                    <div className="space-y-2">
                        {[
                            'Camera and microphone are working',
                            'Stable internet connection',
                            'Quiet environment ready'
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-gray-600">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button onClick={() => onJoinInterview()}
                    className="w-full cursor-pointer mt-8  text-white   flex items-center 
                justify-center gap-2 py-3 rounded-lg shadow" disabled={loading || !userName}>
                    <Video className="h-5 w-5" /> {loading && <Loader2Icon />} Join Interview
                </Button>
            </div>
        </div>
    );
}

export default Interview;
