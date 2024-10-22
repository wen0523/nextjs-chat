//用于chat请求等功能

import axios from 'axios'//请求

//markdownParse
import markdownParse from '@/lib/markdownParse.ts';

//store
import store from '@/lib/store'
import { Children } from 'react';

export default async function PushManager(theTextArea: HTMLTextAreaElement | string) {
    try {//在Textarea中自定义的
        let context = ''
        if (typeof theTextArea != 'string') {
            context = theTextArea.value
            theTextArea.style.height = '32px'
            theTextArea.value = ''
        } else {
            context = theTextArea
        }

        //添加区域（问题和回答区域）
        addAskArea(context)
        const answerArea = addAnswerArea()

        let formData = new FormData()
        formData.append('content', context)
        getResponse(answerArea)

        const response = await axios.post('http://127.0.0.1:5000/chat', formData)
        //缓存，添加数据库
        setOuterHtml()

        // // console.log(response.data)输出success表示成功
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

function setOuterHtml() {
    const routerID = sessionStorage.getItem('now') || ''
    const Area = document.getElementById(routerID)
    if (Area) {
        //获取outerHTML
        const ChildrenList = Array.from(Area.children).slice(-2)
        const AskHtml = ChildrenList[0].outerHTML
        const AnswerHtml = ChildrenList[1].outerHTML
        //缓存(按块)
        let CacheCount = sessionStorage.getItem(routerID)
        if(CacheCount === null){
            sessionStorage.setItem(routerID+'1',JSON.stringify([AskHtml,AnswerHtml]))
            sessionStorage.setItem(routerID,'1')
        }else{
            CacheCount = (parseInt(CacheCount)+1).toString()
            sessionStorage.setItem(routerID+CacheCount,JSON.stringify([AskHtml,AnswerHtml]))
            sessionStorage.setItem(routerID,CacheCount)
        }
        //添加到数据库
        const formData = new FormData()
        formData.append('routerID',routerID)
        formData.append('ask',AskHtml)
        formData.append('request',AnswerHtml)

        axios.post('http://127.0.0.1:5000/setContent',formData)

    } else {
        console.log('Area is null')
    }
}

function getResponse(answerArea: HTMLDivElement) {
    //getEventSource
    const eventSource = store.getState().eventSource
    //parse
    const marked = markdownParse()
    //流式获取结果，进行markdown解析结果（增量更新，提高性能）
    let result = ''
    if (eventSource !== null && answerArea) {
        // 使用类型断言，确保 eventSource 是 EventSource 类型
        const eventSourceInstance = eventSource as EventSource;
        eventSourceInstance.onmessage = async function (event) {
            const data =event.data
            const message = JSON.parse(data).content
            result = result + message
            answerArea.innerHTML = await marked.parse(result)//等待解析完再赋值
        };

        eventSourceInstance.onerror = function (error) {
            console.error('Error occurred:', error);
        };
    } else {
        console.log('eventSource/answerArea is null')
    }

}

//问题区域
function addAskArea(context: string) {
    //askArea容器
    const askAreaContainer = document.createElement('div')
    askAreaContainer.className = 'w-full py-5 flex flex-row justify-end'
    //头像
    const avatar = document.createElement('div')
    avatar.className = 'order-2 size-10 mr-3 ml-5 rounded-full bg-blue-500 flex-none'
    //askArea
    const askArea = document.createElement('div')
    askArea.className = 'order-1 px-3 py-2 break-all max-w-96 h-fit rounded-[16px] bg-base-200'
    askArea.innerText = context
    //添加到askAreaContainer
    askAreaContainer.appendChild(avatar)
    askAreaContainer.appendChild(askArea)
    //添加到communicationArea
    const routerID = sessionStorage.getItem('now')
    if (routerID) {
        const communicationArea = document.getElementById(routerID)
        communicationArea?.appendChild(askAreaContainer)
    } else {
        console.log('routerID is null')
    }
}

//答案区域（添加框架）
function addAnswerArea() {
    //answerArea容器
    const answerAreaContainer = document.createElement('div')
    answerAreaContainer.className = 'w-full py-5 flex flex-row justify-start'
    //头像
    const avatar = document.createElement('div')
    avatar.className = 'order-1 size-10 ml-3 mr-5 rounded-full bg-blue-500 flex-none'
    //answerArea
    const answerArea = document.createElement('div')
    answerArea.style.width = 'calc(100% - 143px)'
    answerArea.className = 'order-2 px-3 py-2 h-fit rounded-[16px] bg-base-200'
    //loading
    const loading = document.createElement('span')
    loading.className = 'loading loading-spinner loading-xs'
    //添加到answerArea
    answerArea.appendChild(loading)
    //添加到answerAreaContainer
    answerAreaContainer.appendChild(answerArea)
    answerAreaContainer.appendChild(avatar)
    //添加到communicationArea
    const routerID = sessionStorage.getItem('now')
    if (routerID) {
        const communicationArea = document.getElementById(routerID)
        communicationArea?.appendChild(answerAreaContainer)
    } else {
        console.log('routerID is null')
    }

    return answerArea
}