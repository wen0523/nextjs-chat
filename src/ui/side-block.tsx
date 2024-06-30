'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import CloseLargeLine from "@/icon/close-large-line"

export default function SideBlock() {
    const [isVisible, setIsVisible] = useState(true)

    function hideSideBlock() {
        setIsVisible(false)
    }

    function showSideBlock() {
        setIsVisible(true)
    }

    return (
        <motion.div className="bg-gray-50 w-1/5 h-screen px-3 py-1.5"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        >
            <div className='bg-blue-900 w-full'>
                <button radius="md" className="bg-transparent" 
                onClick={hideSideBlock}>
                    <CloseLargeLine />
                </button>
            </div>
            <div className='bg-blue-200 w-full flex flex-col my-3'>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
            </div>
            <div className='bg-blue-900 w-full h-3/4 flex flex-col my-5'>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
            </div>
        </motion.div>
    )
}