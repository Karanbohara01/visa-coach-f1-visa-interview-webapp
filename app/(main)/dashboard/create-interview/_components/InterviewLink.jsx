import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Clock, Copy, List, Mail, Slack } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
    const GetInterviewUrl = () => {
        return url;
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast("Link Copied");
    }




    return (
        <div className='flex  flex-col items-center w-full justify-center mt-10 '>
            <Image src={'/check.png'} alt='check' height={200} width={200}
                className='w-[50px] h-[50px]'
            />
            <h2 className='font-bold text-lg mt-4'>You Interview is ready</h2>
            <p className='mt-3'>Share this link with you candidates to start the interview</p>

            <div className='w-full p-7 mt-6 rounded-xl bg-white'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold'>Interview Link</h2>
                    <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-xl'>Valid for 30 days</h2>

                </div>
                <div className='flex   mt-3 gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} />
                    <Button onClick={() => onCopyLink()} className="cursor-pointer "> <Copy /> Copy Link </Button>

                </div>
                <hr className='my-7' />
                <div className='flex gap-5'>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4' />{formData.duration}</h2>
                    <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4' />10 Questions</h2>

                </div>
            </div>
            <div className='mt-7 bg-white p-5 rounded-lg w-full'>
                <h2 className='font-bold'>Share via</h2>
                <div className='flex gap-5 mt-2'>
                    <Button className="cursor-pointer" variant={'outline'}><Mail />Email</Button>
                    <Button className="cursor-pointer" variant={'outline'}><FaWhatsapp />Whatsapp</Button>
                    <Button className="cursor-pointer" variant={'outline'}><Slack />Slack</Button>

                </div>
                <div className='flex w-full gap-5  justify-between mt-10'>
                    <Link href={'/dashboard'}>                    <Button className='cursor-pointer' variant={'outline'} > <ArrowLeft /> Back to Dashboard</Button>
                    </Link>
                    <Link href={'/dashboard/create-interview'}>                    <Button className='cursor-pointer' variant={'outline'} >  Create new Interview <ArrowRight /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InterviewLink
