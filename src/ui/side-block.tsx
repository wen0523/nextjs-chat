'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

//import { useState } from 'react';
import CloseLargeLine from "@/icon/close-large-line"
import EditIcon from '@/icon/edit';

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '../redux-store/store'; // 导入 toggleVisibility action

export default function SideBlock() {
    const isVisible = useSelector(state => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态
    const dispatch = useDispatch(); // 获取 dispatch 函数，用于派发 action
    const [theAnimation,settheAnimation] = useState({})

    //存储在两个屏幕下的状态
    const [largeScreen, setLargeScreen] = useState(true);
    const [smallScreen, setSmallScreen] = useState(false);

    // 切换 isVisible 状态的函数
    function hideSideBlock() {
        dispatch(toggleVisibility()); // 派发 toggleVisibility action
        if (window.innerWidth >= 768) {
            setLargeScreen(isVisible);
        }else{
            setSmallScreen(isVisible);
        }
    };

    //对窗口进行监听，设置合适的动画
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) {
            if (largeScreen !== isVisible) {
                hideSideBlock();
            }
            settheAnimation({
              width: isVisible ? "20%" : "0%",
              marginLeft: isVisible ? "12px" : "0px",
              marginRight: isVisible ? "12px" : "0px",
              opacity: isVisible ? 1 : 0,
            });
          } else {
            if (smallScreen !== isVisible) {
                hideSideBlock();
            }
            settheAnimation({
              width: isVisible ? "20%" : "0%",
              marginLeft: isVisible ? "0px" : "0px",
              marginRight: isVisible ? "0px" : "0px",
              opacity: isVisible ? 1 : 0,
              zIndex: isVisible ? 100 : -1,
            });
          }
        };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially to set the state

    return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <motion.div className="bg-yellow-500 h-screen py-1.5"
        style={{transformOrigin: 'left'}}
        initial={false}
        animate={theAnimation}
        transition={{ duration: 0.5 }}
        >
            <div className='bg-blue-900 w-full flex justify-between'>
                <button className="bg-transparent m-2" 
                onClick={hideSideBlock}>
                    <CloseLargeLine />
                </button>
                <button className="bg-transparent m-2" >
                    <EditIcon />
                </button>
            </div>
            <div className='bg-blue-200 w-full flex flex-col my-3'>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hello</label>
            </div>
            <div className='bg-blue-900 w-full h-3/4 flex flex-col my-5'>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hellasdas</label>
                <label className='bg-blue-500 py-2 px-3 rounded-lg'>Hell</label>
            </div>
        </motion.div>
    )
}