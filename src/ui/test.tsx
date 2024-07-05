'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '../redux-store/store'; // 导入 toggleVisibility action

export default function Test() {
    const isVisible = useSelector(state => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态
    const dispatch = useDispatch(); // 获取 dispatch 函数，用于派发 action

    // 切换 isVisible 状态的函数
    function handleToggleVisibility() {
        dispatch(toggleVisibility()); // 派发 toggleVisibility action
    };

    return (
        <div>
            <motion.div
            className="bg-blue-500 size-32"
            style={{transformOrigin:'left'}}
            initial={{scaleX:0}}
            animate={isVisible ? {scaleX:0} : {scaleX:1}}
            transition={{duration: 0.5}}
            >
                test
            </motion.div>
            <button onClick={handleToggleVisibility} className="bg-yellow-500">
                Button
            </button>
        </div>
    )
}