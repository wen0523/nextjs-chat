//用于maincomponent的初始化使得显示

//chat
import PushManager from "@/functions/chat"

//鼠标点击事件
import { MouseEvent } from 'react';

export default function Display() {

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        const text = (e.target as HTMLElement).innerText
        //切换display界面到问题回答界面
        const communicationArea = document.getElementById('communicationArea')
        const Display = document.getElementById('display')
        if (Display && communicationArea) {
            Display.style.display = 'none'//隐藏display
            communicationArea.style.display = ''//回到默认状态
            //调用请求函数
            PushManager(text)
            //new list
            const newList = document.createElement('label')
            newList.innerText = text
            //在side添加一个列表
            const answerList = document.getElementById('answerList')
            answerList?.appendChild(newList)
        } else {
            console.log('Display/communicationArea not found')
        }

    }

    return (
        <div id="display" className="w-full flex flex-col items-center justify-center">
            <div>
                <label className="text-4xl font-bold">Welcome to my chat</label>
            </div>
            <div className="mt-14 flex flex-row justify-center items-center">
                <div className="mx-6 p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-40 h-24 rounded-[10px]" onClick={handleClick}>
                    <label id='cardText1'>请返回Markdown的所有类型</label>
                </div>
                <div className="mx-6 p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-40 h-24 rounded-[10px]">
                    <label id='cardText1'>请返回嵌套列表（ol and ul）</label>
                </div>
                <div className="mx-6 p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-40 h-24 rounded-[10px]">
                    <label id='cardText1'>ose shoes does he choose?</label>
                </div>
            </div>
        </div>
    )
}