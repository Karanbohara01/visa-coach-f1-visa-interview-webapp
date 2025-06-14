import Logo from '@/app/auth/Logo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function InterviewHeader() {
    return (
        <div className='p-3 shadow-sm'>
            <div className=' flex  cursor-pointer '> <Link href={'/dashboard'}> <Logo /></Link></div>
        </div>
    )
}

export default InterviewHeader
