'use client'

import { useRef, useEffect, useState } from 'react'
import axios from 'axios'//请求
//组件
import ArrowUpLineIcon from '../icon/arrow-up-lineIcon.tsx'
import AttachmentIcon from '../icon/attachmenticon';
import Textarea from './textarea'

//markdownParse
import markdownParse from '@/functions/markdownParse.ts';

export default function Input() {
    const marked = markdownParse()
    const [eventSource, setEventSource] = useState<EventSource | null>(null)
    const [theTextArea, setTheTextArea] = useState<HTMLTextAreaElement | null>(null)

    //eventSource是一个浏览器 API,保证在客户端运行
    useEffect(() => {
        const eventSource = new EventSource('http://127.0.0.1:5000/stream');//建立连接（一直保持）
        setEventSource(eventSource)

        //获取文本区域对象
        setTheTextArea(document.getElementById('theTextArea') as HTMLTextAreaElement)

        return () => {
            eventSource.close()//关闭连接
        }
    }, [])//空数组挂载时执行一次

    async function PushManager() {
        if (theTextArea) {//在Textarea中自定义的
            const context = theTextArea.value
            theTextArea.style.height = '32px'
            theTextArea.value = ''

            //ID
            const ID = generateRandomId()
            addAskArea(context)
            addAnswerArea(ID)

            let formData = new FormData()
            formData.append('content', context)
            getResponse(ID)

            const response = await axios.post('http://127.0.0.1:5000/chat', formData)
            // console.log(response.data)输出success表示成功
            // const theaddAnswerArea = document.getElementById(ID); //获取组件
            // theaddAnswerArea.innerHTML = marked.parse(response.data)
        }else {
            console.log('myTextArea.current is null')
        }
    }

    function getResponse(ID: string) {
        const addAnswerArea = document.getElementById(ID); //获取组件
        //流式获取结果，进行markdown解析结果（增量更新，提高性能）
        let result = ''

        if (eventSource&&addAnswerArea) {
            eventSource.onmessage = async function (event) {
                const data = await event.data;
                result = result + data // 更新状态以显示接收到的数据
                addAnswerArea.innerHTML = marked.parse(result)
            };
    
            eventSource.onerror = function (error) {
                console.error('Error occurred:', error);
            };
        }else {
            console.log('eventSource/addAnswerArea is null')
        }
        
    }

    //随机ID
    function generateRandomId() {
        return 'id_' + Date.now().toString();
    }

    //问题区域
    function addAskArea(context: string) {
        //askArea容器
        const askAreaContainer = document.createElement('div')
        askAreaContainer.className = 'w-full py-5 bg-blue-300 flex flex-row justify-end'
        //头像
        const avatar = document.createElement('div')
        avatar.className = 'order-2 size-10 ml-5 rounded-full bg-blue-500 flex-none'
        //askArea
        const askArea = document.createElement('div')
        askArea.className = 'order-1 px-3 py-2 break-all max-w-96 h-fit rounded-[16px] bg-gray-50'
        askArea.innerText = context
        //添加到askAreaContainer
        askAreaContainer.appendChild(avatar)
        askAreaContainer.appendChild(askArea)
        //添加到communicationArea
        const communicationArea = document.getElementById('communicationArea')
        communicationArea.appendChild(askAreaContainer)
    }

    //答案区域（添加框架）
    function addAnswerArea(ID: string) {
        //answerArea容器
        const answerAreaContainer = document.createElement('div')
        answerAreaContainer.className = 'w-full py-5 bg-gray-300 flex flex-row justify-start'
        //头像
        const avatar = document.createElement('div')
        avatar.className = 'order-1 size-10 mr-5 rounded-full bg-blue-500 flex-none'
        //answerArea
        const answerArea = document.createElement('div')
        answerArea.className = 'order-2 px-3 py-2 h-fit w-5/6 rounded-[16px] bg-gray-50'
        answerArea.id = ID
        //添加到answerAreaContainer
        answerAreaContainer.appendChild(answerArea)
        answerAreaContainer.appendChild(avatar)
        //添加到communicationArea
        const communicationArea = document.getElementById('communicationArea')
        communicationArea.appendChild(answerAreaContainer)
    }

    return (
        <div className="bg-gray-100 rounded-[30px] mx-2 w-[750px] flex ">{/* 设置Input组件的大小 */}
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
                <button className='bg-gray-200 
                rounded-[18px] h-9 w-[2.2rem] mx-1 mb-1
                flex items-center justify-center'
                    onClick={PushManager}
                >
                    <ArrowUpLineIcon />
                </button>
            </div>

        </div>
    )
}