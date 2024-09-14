'use client'

import { useEffect, useState } from 'react';

//import { useState } from 'react';
import CloseLargeLine from "@/icon/close-large-line"
import EditIcon from '@/icon/edit';

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility, toggleVisibility_minMenu, RootState } from '../redux-store/store'; // 导入 toggleVisibility action

//handleSize
import handleResize from '@/functions/handleresize';

import Link from 'next/link';

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
                className="bg-base-200 h-screen py-1.5 flex flex-col"
            >
                <div id='SideIcon' className='flex justify-between mx-4'>
                    <button className="bg-transparent m-2"
                        onClick={hideSideBlock}>
                        <CloseLargeLine />
                    </button>
                    <button className="bg-transparent m-2" >
                        <EditIcon />
                    </button>
                </div>
                <div className='flex flex-col my-3 mx-4'>
                    <label className='py-2 px-3 rounded-lg hover:bg-base-300'>New Chat</label>
                    <label className='py-2 px-3 rounded-lg hover:bg-base-300'>Hello</label>
                </div>
                <div className='flex-auto flex flex-col my-5 mx-4'>
                    <Link className='bg-blue-200 py-2 px-3 rounded-lg' href='/chat/one'>Hello</Link>
                    <label className='py-2 px-3 rounded-lg'>Hello</label>
                </div>
            </div>
            {/* 屏幕宽度小于750px时显示的菜单栏 */}
            <div
                id={isVisible_minMenu ? 'yes' : 'no'}
                className='bg-base-200 absolute h-screen w-screen flex'
            >
                <div
                    className="w-[300px] flex-none h-screen py-1.5 flex flex-col"
                >
                    <div className='flex justify-between mx-4'>
                        <button className="bg-transparent m-2"
                            onClick={hideSideBlock_minMenu}>
                            <CloseLargeLine />
                        </button>
                        <button className="bg-transparent m-2" >
                            <EditIcon />
                        </button>
                    </div>
                    <div className='flex flex-col my-3 mx-4'>
                        <label className='py-2 px-3 rounded-lg'>Hello</label>
                        <label className='py-2 px-3 rounded-lg'>Hello</label>
                    </div>
                    <div id='answerList' className='flex-auto flex flex-col my-5 mx-4'>

                        <Link className='bg-blue-200 w-full h-full' href='/chat/one'>Hllo</Link>

                        <label className='py-2 px-3 rounded-lg'>Hello</label>
                    </div>
                </div>
                <div className='h-full flex-auto bg-gray-800 opacity-90'>

                </div>
            </div>
        </>
    )
}