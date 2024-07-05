'use client'

import { useRef,useState,useEffect } from 'react'
import axios from 'axios'
import ArrowUpLineIcon from '../icon/arrow-up-lineIcon.tsx'
import AttachmentIcon from '../icon/attachmenticon';
import Textarea from './textarea'

export default function Input() {
    const myTextArea = useRef<HTMLTextAreaElement>(null)
    const [value, setValue] = useState('')
    const [role, setRole] = useState('')

    async function PushManager() {
        let formData = new FormData()
        formData.append('roleSystem', '你是一名' + role)
        formData.append('roleUser', value)
        let url = 'http://127.0.0.1:5000/chat'
        const result = await axios.post(url, formData)
        console.log(result)
    }

    useEffect(() => {
        // 确保在客户端渲染时进行操作
        if (typeof window !== 'undefined') {
            const communicationArea = document.getElementById('communicationArea')
        }
      }, []); // 空数组作为依赖，表示只在组件挂载时执行一次
    

    function addAskArea(context: string) {
        //askArea容器
        const askAreaContainer = document.createElement('div')
        askAreaContainer.className = 'w-3/4 bg-blue-300 flex flex-row justify-end'
        //头像
        const avatar = document.createElement('div')
        avatar.className = 'w-9 h-9 mx-3 rounded-full bg-blue-500'
        //askArea
        const askArea = document.createElement('div')
        askArea.className = 'p-2 break-all max-w-96 rounded-[24px] bg-gray-50'
        askArea.innerText = context
        //添加到askAreaContainer
        askAreaContainer.appendChild(askArea)
        askAreaContainer.appendChild(avatar)
        //添加到communicationArea
        communicationArea.appendChild(askAreaContainer)
    }

    function Test(){
        const context=myTextArea.current.value
        myTextArea.current.height=32 
        myTextArea.current.value=''
        console.log(context)
        addAskArea(context)
    }

    return (
        <div className="bg-gray-50 w-4/5 rounded-[24px] flex items-center">
            <div className='bg-transparent h-full pb-1 rounded-l-[24px] flex items-end'>
                <div className='bg-transparent 
                rounded-[18px] h-9 w-[2.6rem] mx-1 
                flex items-center justify-center'
                >
                    <AttachmentIcon />
                </div>
            </div>
            <Textarea ref={myTextArea} />
            <div className='bg-transparent h-full pb-1 rounded-l-[24px] flex items-end'>
                <button className='bg-yellow-200 
                rounded-[18px] h-9 w-[2.2rem] mx-1 
                flex items-center justify-center'
                    onClick={Test}
                >
                    <ArrowUpLineIcon />
                </button>
            </div>
        </div>
    )
}