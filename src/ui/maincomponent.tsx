'use client'

import { motion } from "framer-motion"
import Input from "./input"
import ArrowDownSLine from "@/icon/arrow-down-s-line"
import MenuIcon from "@/icon/menuicon"
import EditIcon from '@/icon/edit';

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '../redux-store/store'; // 导入 toggleVisibility action

export default function MainComponent() {
    const isVisible = useSelector(state => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态
    const dispatch = useDispatch(); // 获取 dispatch 函数，用于派发 action

    // 切换 isVisible 状态的函数
    function showSideBlock() {
        dispatch(toggleVisibility()); // 派发 toggleVisibility action
    };

    return (
        //maincomponent
        <motion.div className="h-screen flex flex-col items-center"
        style={{transformOrigin:"right"}}
        initial={false}
        animate={{ width:isVisible ? "80%" : "100%" }}
        transition={{duration:0.5}}
        >

            {/* top*/}
            <div className="bg-blue-500 w-full h-14 flex flex-row justify-between">
                <div className="bg-transparent h-full flex items-center">
                    <motion.div className="h-full flex items-center"
                    style={{transformOrigin:"right"}}
                    initial={false}
                    animate={{ width: isVisible ? "0%" : "36%", opacity: isVisible ? 0 : 1 }}
                    transition={{duration:0.5}}
                    >
                        <button className="bg-transparent m-2" 
                        onClick={showSideBlock}
                        >
                            <MenuIcon />
                        </button>
                        <button className="bg-transparent m-2" >
                            <EditIcon />
                        </button>
                    </motion.div>
                    <span className="text-2xl ml-5"> My Chat</span>
                    <ArrowDownSLine />
                </div>
                <div className="bg-blue-400 h-full w-10"></div>
            </div>

            {/* middle */}
            <div className="bg-yellow-300 w-full flex-1 flex justify-center">
                <motion.div 
                id="communicationArea"
                className="bg-blue-800 h-full"
                style={{transformOrigin:"right"}}
                initial={false}
                animate={{ width:isVisible ? "75%" : "59.5%" }}
                transition={{duration:0.5}}
                ></motion.div>
            </div>

            {/* bottom */}
            <motion.div className="bg-blue-700 flex flex-col items-center"
            style={{transformOrigin:"right"}}
            initial={false}
            animate={{ width:isVisible ? "100%" : "79.5%" }}
            transition={{duration:0.5}}
            >
                <Input />
                <label className="bg-transparent opacity-25 w-fit py-0.5">Welcome to use</label>
            </motion.div>
        </motion.div>  
    )
}