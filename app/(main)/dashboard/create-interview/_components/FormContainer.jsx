import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { InterviewType } from '@/services/Constant'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'




function FormContainer({ onHandleInputChange, GoToNext }) {

    const [interviewType, setInterviewType] = useState([]);
    useEffect(() => {
        if (interviewType) {
            onHandleInputChange('type', interviewType)

        }

    }, [interviewType])
    const AddInterviewType = (type) => {
        setInterviewType((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
        );
    };

    return (
        <div className='bg-white rounded-xl p-5'>
            <div>
                <h2 className='text-sm font-medium'> Interview Format
                </h2>
                <Input className='mt-2' placeholder="e.g. F1 visa interviewr."
                    onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'> Interview Description
                </h2>
                <Textarea placeholder='Enter interview  description' className='h-[200px] mt-2'
                    onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}

                />

            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'> Interview Duration
                </h2>
                <Select onValueChange={(value) => onHandleInputChange('duration', value)} className='mt-2'>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 min</SelectItem>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                    </SelectContent>
                </Select>

                <div className='mt-5'>
                    <h2 className='text-sm font-medium'> Interview Type
                    </h2>
                    <div className='flex gap-3 justify-center  mt-2 flex-wrap'>
                        {InterviewType.map((type, index) => (
                            <div key={index} className={`flex cursor-pointer items-center gap-2 p-1 bg-white border border-gray-300 rounded-2xl
                            ${interviewType.includes(type.title) && "bg-blue-50 text-primary"}`}

                                onClick={() => AddInterviewType(type.title)}
                            >
                                <type.icon />
                                <span>
                                    {type.title}
                                </span>
                            </div>

                        ))}
                    </div>
                </div>



            </div>
            <div onClick={() => GoToNext()} className='flex justify-end mt-10 cursor-pointer'>
                <Button>Generate Questions <ArrowRight />
                </Button>
            </div>
        </div >
    )
}

export default FormContainer
