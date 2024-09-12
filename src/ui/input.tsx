'use client'

import { useRef, useEffect, useState } from 'react'
//组件
import ArrowUpLineIcon from '../icon/arrow-up-lineIcon.tsx'
import AttachmentIcon from '../icon/attachmenticon';
import Textarea from './textarea'

//chat
import PushManager from '@/functions/chat.ts';

//store
import { useDispatch } from 'react-redux';
import { setEventSource } from '@/redux-store/store.ts';

export default function Input() {
    //const [eventSource, setEventSource] = useState<EventSource | null>(null)
    const [theTextArea, setTheTextArea] = useState<HTMLTextAreaElement | null>(null)
    const [communicationArea, setCommunicationArea] = useState<HTMLDivElement | null>(null)
    const [Display, setDisplay] = useState<HTMLDivElement | null>(null)

    //store
    const dispatch = useDispatch()

    //eventSource是一个浏览器 API,保证在客户端运行
    useEffect(() => {
        const eventSource = new EventSource('http://127.0.0.1:5000/stream');//建立连接（一直保持）

        dispatch(setEventSource(eventSource))//将eventSource存入store

        //maincomponent中的两个对象
        setCommunicationArea(document.getElementById('communicationArea') as HTMLDivElement)
        setDisplay(document.getElementById('display') as HTMLDivElement)

        //获取文本区域对象
        setTheTextArea(document.getElementById('theTextArea') as HTMLTextAreaElement)

        return () => {
            eventSource.close()//关闭连接
        }
    }, [dispatch])//空数组挂载时执行一次,加dispatch防止ESLint 警告

    function Chat() {
        if (communicationArea && Display && Display.style.display != 'none') {
            communicationArea.style.display = ''
            Display.style.display = 'none'
        }
        if(theTextArea){
            PushManager(theTextArea)
        }else {
            alert('theTextArea is null')
        }
    }

    return (
        <div className="bg-base-200 rounded-[30px] mx-2 w-[750px] flex ">{/* 设置Input组件的大小 */}
            {/* button one */}
            <div className='bg-transparent h-full pb-1 rounded-l-[30px] flex items-end'>
                <div className='bg-transparent 
                rounded-[18px] h-9 w-[2.2rem] mx-1 mb-1
                flex items-center justify-center'
                >
                    <AttachmentIcon />
                </div>
            </div>

            {/* 文本区域 */}
            <Textarea />

            {/* button two */}
            <div className='bg-transparent h-full pb-1 rounded-l-[30px] flex items-end'>
                <button className='bg-base-300 
                rounded-[18px] h-9 w-[2.2rem] mx-1 mb-1
                flex items-center justify-center'
                    onClick={Chat}
                >
                    <ArrowUpLineIcon />
                </button>
            </div>

        </div>
    )
}