'use client'

import Input from "./input"

export default function MainComponent() {
    return (
        <div className="w-4/5 h-screen flex flex-col">
            <div className="bg-blue-500 w-full h-14 flex flex-row justify-between">
                <div className="bg-blue-900 h-full w-10"></div>
                <div className="bg-blue-400 h-full w-10"></div>
            </div>
            <div className="bg-blue-100 w-full flex-1 flex justify-center">
                <div className="bg-blue-800 h-full w-3/4"></div>
            </div>
            <div className="bg-blue-200 w-full flex flex-col items-center">
                <Input />
                <label className="bg-transparent opacity-25 w-fit py-0.5">Welcome to use</label>
            </div>
        </div>  
    )
}