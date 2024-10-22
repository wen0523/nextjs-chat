'use client'

//初始化界面

//chat
import PushManager from "@/lib/chat"

//鼠标点击事件
import { MouseEvent } from 'react';
import { useRef } from "react";

//router
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        const text = (e.target as HTMLElement).innerText
        sessionStorage.setItem('text', text)
        const routerID = Date.now().toString()
        router.push(`${routerID}`)
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div>
                <label className="text-4xl font-bold">Welcome to my chat</label>
            </div>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-36 h-24 rounded-[10px]" onClick={handleClick}>
                    <label id='cardText1'>请返回Markdown的所有类型....</label>
                </div>
                <div className="p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-36 h-24 rounded-[10px]" onClick={handleClick}>
                    <label id='cardText1'>请返回嵌套列表（ol and ul）</label>
                </div>
                <div className="p-1 bg-base-200 border-4 border-base-300 hover:bg-base-300 hover:border-base-200 w-36 h-24 rounded-[10px]" onClick={handleClick}>
                    <label id='cardText1'>ose shoes does he choose?</label>
                </div>
            </div>

        </div>
    )
}