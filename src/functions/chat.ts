//用于chat请求等功能

import axios from 'axios'//请求

//markdownParse
import markdownParse from '@/functions/markdownParse.ts';

//store
import store from '@/redux-store/store'

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

        //ID
        const ID = generateRandomId()
        addAskArea(context)
        addAnswerArea(ID)

        let formData = new FormData()
        formData.append('content', context)
        getResponse(ID)

        const response = await axios.post('http://127.0.0.1:5000/chat', formData)
        // console.log(response.data)输出success表示成功
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

function getResponse(ID: string) {
    //getEventSource
    const eventSource = store.getState().eventSource

    const marked = markdownParse()
    const addAnswerArea = document.getElementById(ID); //获取组件
    //流式获取结果，进行markdown解析结果（增量更新，提高性能）
    let result = ''

    if (eventSource !== null && addAnswerArea) {
        // 使用类型断言，确保 eventSource 是 EventSource 类型
        const eventSourceInstance = eventSource as EventSource;
        eventSourceInstance.onmessage = async function (event) {
            const data = event.data
            addAnswerArea.innerHTML = await marked.parse(data)//等待解析完再赋值
        };

        eventSourceInstance.onerror = function (error) {
            console.error('Error occurred:', error);
        };
    } else {
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
    askAreaContainer.className = 'w-full py-5 flex flex-row justify-end'
    //头像
    const avatar = document.createElement('div')
    avatar.className = 'order-2 size-10 ml-5 rounded-full bg-blue-500 flex-none'
    //askArea
    const askArea = document.createElement('div')
    askArea.className = 'order-1 px-3 py-2 break-all max-w-96 h-fit rounded-[16px] bg-base-200'
    askArea.innerText = context
    //添加到askAreaContainer
    askAreaContainer.appendChild(avatar)
    askAreaContainer.appendChild(askArea)
    //添加到communicationArea
    const communicationArea = document.getElementById('communicationArea')
    communicationArea?.appendChild(askAreaContainer)
}

//答案区域（添加框架）
function addAnswerArea(ID: string) {
    //answerArea容器
    const answerAreaContainer = document.createElement('div')
    answerAreaContainer.className = 'w-full py-5 flex flex-row justify-start'
    //头像
    const avatar = document.createElement('div')
    avatar.className = 'order-1 size-10 mr-5 rounded-full bg-blue-500 flex-none'
    //answerArea
    const answerArea = document.createElement('div')
    answerArea.className = 'order-2 px-3 py-2 h-fit w-5/6 rounded-[16px] bg-base-200'
    answerArea.id = ID
    //loading
    const loading = document.createElement('span')
    loading.className = 'loading loading-spinner loading-xs'
    //添加到answerArea
    answerArea.appendChild(loading)
    //添加到answerAreaContainer
    answerAreaContainer.appendChild(answerArea)
    answerAreaContainer.appendChild(avatar)
    //添加到communicationArea
    const communicationArea = document.getElementById('communicationArea')
    communicationArea?.appendChild(answerAreaContainer)
}