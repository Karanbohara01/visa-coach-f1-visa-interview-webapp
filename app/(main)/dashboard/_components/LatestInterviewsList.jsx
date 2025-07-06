
'use client'
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Plus, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import InterviewCard from './InterviewCard';

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewAll, setViewAll] = useState(false); // State to toggle "View All" or "View Less"
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user, viewAll]);

    const GetInterviewList = async () => {
        setIsLoading(true);
        let query = supabase
            .from('interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false });

        if (!viewAll) {
            query = query.limit(4); // Limit to 2 interviews if not viewing all
        }

        const { data: interviews, error } = await query;

        if (!error) {
            setInterviewList(interviews);
        } else {
            toast.error('Failed to fetch interviews');
        }

        setIsLoading(false);
    };

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-primary mb-5">Previously Created Interviews</h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <>
                    {interviewList?.length === 0 ? (
                        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white border border-gray-300 rounded-md">
                            <Video className="p-1 text-primary bg-blue-50 h-10 w-10 rounded-md" />
                            <h2>You don't have any interviews created.</h2>
                            <Button>
                                <Plus /> Create New Interview
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                            {interviewList.map((interview, index) => (
                                <InterviewCard interview={interview} key={index} />
                            ))}
                        </div>
                    )}
                    <div className="mt-5  flex justify-center">
                        {viewAll ? (
                            <Button className='w-1/4 cursor-pointer ' onClick={() => setViewAll(false)}>View Less</Button>
                        ) : (
                            <Button className='w-1/4 cursor-pointer' onClick={() => setViewAll(true)}>View All Interviews</Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default LatestInterviewsList;
