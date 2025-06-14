import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon, LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';

function QuestionsList({ formData, onCreateLink }) {
    const [loading, setLoading] = useState(false);
    const [questionList, setQuestionList] = useState([]);
    const { user } = useUser();
    const [saveloading, setSavaLoading] = useState(false);



    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData]); // ✅ run only when formData changes


    const onFinish = async () => {
        setSavaLoading(true)
        if (!formData || questionList.length === 0) {
            toast.error("Form data or questions are missing.");
            return;
        }

        try {
            const interview_id = uuidv4();

            const { data, error } = await supabase
                .from('interviews')
                .insert([
                    {
                        ...formData,
                        questionList: questionList, // Ensure questionList can be stored as JSON
                        userEmail: user?.email || "guest@example.com", // Handle missing user email
                        interview_id: interview_id
                    }
                ])
                .select();

            if (error) {
                throw error;
            }

            console.log("Interview saved successfully:", data);
            toast.success("Interview saved successfully!");
            setSavaLoading(false);
            onCreateLink(interview_id)


        } catch (err) {
            console.error("Error saving interview:", err);
            toast.error("Failed to save the interview. Please try again.");
        }
    };


    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            });

            const raw = result.data.content;
            console.log(raw);

            // Extract everything between the first `[` and last `]`
            const arrayMatch = raw.match(/\[\s*{[\s\S]*?}\s*\]/);

            if (!arrayMatch) {
                throw new Error("Failed to extract array from response");
            }

            const questionArray = JSON.parse(arrayMatch[0]);
            setQuestionList(questionArray);
            console.log(questionArray);
        } catch (e) {
            console.error("Error parsing question list:", e);
            toast("Failed to generate questions. Please try again.");
        } finally {
            setLoading(false);
        }
    };





    return (
        <div >
            {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center '>
                <Loader2Icon className='animate-spin' />
                <div >
                    <h2 className='font-medium'>Generating Interview Questions.</h2>
                    <p className='text-primary'>Our AI is crafting personalized questions based on your position.</p>
                </div>

            </div>}
            {questionList?.length > 0 && (
                <div className="p-6 border border-gray-200 rounded-md  space-y-4 bg-white">
                    <QuestionListContainer questionList={questionList} />
                </div>
            )}

            <div className='flex justify-end mt-5'>
                <Button onClick={() => onFinish()} disabled={saveloading}>
                    {saveloading && <Loader2Icon className='animate-spin' />}
                    Create Interview Link & Finish</Button>
            </div>


        </div>
    )
}

export default QuestionsList
