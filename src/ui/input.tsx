'use client'

import { useState } from 'react'
import axios from 'axios'
import ArrowUpLineIcon from '../icon/arrow-up-lineIcon.tsx'
import AttachmentIcon from '../icon/attachmenticon';
import Textarea from './textarea'

export default function Input() {
    
    const [value, setValue] = useState('')
    const [role, setRole] = useState('')

    async function PushManager() {
        let formData = new FormData()
        formData.append('roleSystem', '你是一名'+role)
        formData.append('roleUser', value)
        let url = 'http://127.0.0.1:5000/chat'
        const result=await axios.post(url,formData)
        console.log(result)
    }
    return (
        <div className= "bg-gray-50 w-4/5 rounded-[24px] flex items-center">
            <div className='bg-transparent rounded-[18px] h-9 w-[2.6rem] mx-1 flex items-center justify-center'>
                <AttachmentIcon />
            </div>
            <Textarea />

            <div className='bg-yellow-200 rounded-[18px] h-9 w-[2.6rem] mx-1 flex items-center justify-center' onClick={PushManager}>
                <ArrowUpLineIcon />
            </div>
        </div>
    )
}