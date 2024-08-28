'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

//import { useState } from 'react';
import CloseLargeLine from "@/icon/close-large-line"
import EditIcon from '@/icon/edit';

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility, toggleVisibility_minMenu, RootState } from '../redux-store/store'; // 导入 toggleVisibility action

//handleSize
import handleResize from '@/functions/handleresize';

export default function SideBlock() {
    const isVisible = useSelector((state: RootState) => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态
    const isVisible_minMenu = useSelector((state: RootState) => state.isVisible_minMenu);
    const dispatch = useDispatch(); // 获取 dispatch 函数，用于派发 action

    // 切换 isVisible 状态的函数
    function hideSideBlock() {
        dispatch(toggleVisibility()); // 派发 toggleVisibility action
    };

    function hideSideBlock_minMenu() {
        dispatch(toggleVisibility_minMenu());
        window.removeEventListener('resize', (event) => {
            handleResize(dispatch)
        })
    };

    return (
        <>
            <div
                id={isVisible ? 'side-block' : 'normalSide-block'}
                className="bg-yellow-500 h-screen py-1.5 flex flex-col"
            >
                <div className='bg-blue-900 flex justify-between mx-4'>
                    <button className="bg-transparent m-2"
                        onClick={hideSideBlock}>
                        <CloseLargeLine />
                    </button>
                    <button className="bg-transparent m-2" >
                        <EditIcon />
                    </button>
                </div>
                <div className='bg-blue-200 flex flex-col my-3 mx-4'>
                    <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                    <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                </div>
                <div className='bg-blue-900 flex-auto flex flex-col my-5 mx-4'>
                    <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                    <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                </div>
            </div>
            {/* 屏幕宽度小于750px时显示的菜单栏 */}
            <div
                id={isVisible_minMenu ? 'yes' : 'no'}
                className='absolute h-screen w-screen flex'
            >
                <div
                    className="bg-yellow-500 w-[300px] flex-none h-screen py-1.5 flex flex-col"
                >
                    <div className='bg-blue-900 flex justify-between mx-4'>
                        <button className="bg-transparent m-2"
                            onClick={hideSideBlock_minMenu}>
                            <CloseLargeLine />
                        </button>
                        <button className="bg-transparent m-2" >
                            <EditIcon />
                        </button>
                    </div>
                    <div className='bg-blue-200 flex flex-col my-3 mx-4'>
                        <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                        <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                    </div>
                    <div className='bg-blue-900 flex-auto flex flex-col my-5 mx-4'>
                        <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                        <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                    </div>
                </div>
                <div className='h-full flex-auto bg-gray-800 opacity-90'>
                    
                </div>
            </div>
        </>
    )
}