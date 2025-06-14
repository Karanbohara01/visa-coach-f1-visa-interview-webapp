'use client'
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import React from 'react'
import FormContainer from './_components/FormContainer';
import QuestionsList from './_components/QuestionsList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [interviewId, setInterviewId] = useState();
    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        console.log("FormData:", formData)
    }

    const onGoToNext = () => {
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type) {
            // show toast
            toast("Please fill all the fields!")
            return;
        }
        else {
            setStep(step + 1);


        }

    }
    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(3); // Directly set step to 3 when a link is created
    };

    return (
        <div className='  px-10 md:px-24 lg:px-44 xl:px-56'>
            <div className='flex gap-5 items-center'>
                <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
                <h2 className='font-bold text-2xl'>
                    Create Interveiw
                </h2>
            </div>
            <Progress value={step * 33.33} className='my-5' />
            {step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()} />
                : step == 2 ? <QuestionsList formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} /> : step == 3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null
            }

        </div>
    )
}

export default CreateInterview
