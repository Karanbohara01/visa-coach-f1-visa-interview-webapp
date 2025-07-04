

'use client';
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Plus, Video } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import InterviewCard from '../dashboard/_components/InterviewCard';
import AssistantFloatingButton from '../dashboard/_components/AssistantFloatingButton';

function AllInterview() {
    const [interviewList, setInterviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    const GetInterviewList = useCallback(async () => {
        setIsLoading(true);
        const { data: interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching interviews:', error);
        } else {
            setInterviewList(interviews);
        }
        setIsLoading(false);
    }, [user?.email]);

    useEffect(() => {
        if (user) {
            const timeout = setTimeout(() => GetInterviewList(), 300);
            return () => clearTimeout(timeout);
        }
    }, [user, GetInterviewList]);

    if (!user) {
        return (
            <div className="text-center p-4">
                <p className="text-sm sm:text-base">Please log in to view your interviews.</p>
            </div>
        );
    }

    return (
        <div className="my-5 px-4 sm:px-6 lg:px-8">
            <AssistantFloatingButton />
            <h2 className="font-bold text-xl sm:text-2xl text-primary mb-5">All Previously Created Interviews</h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <ClipLoader color="#3498db" loading={isLoading} size={50} />
                </div>
            ) : (
                <>
                    {interviewList?.length === 0 ? (
                        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white border border-gray-300 rounded-md">
                            <Video className="p-1 text-primary bg-blue-50 h-10 w-10 rounded-md" />
                            <h2 className="text-sm sm:text-base text-center">You don't have any interviews created.</h2>
                            <Button aria-label="Create new interview" className="text-sm sm:text-base">
                                <Plus className="mr-2" /> Create New Interview
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {interviewList.map((interview, index) => (
                                <InterviewCard interview={interview} key={index} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AllInterview;
