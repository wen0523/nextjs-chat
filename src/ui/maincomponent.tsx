'use client'

import { motion } from "framer-motion"
import Input from "./input"
import ArrowDownSLine from "@/icon/arrow-down-s-line"
import MenuIcon from "@/icon/menuicon"
import EditIcon from '@/icon/edit';
import ChangeTheme from "./changeTheme"

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility, toggleVisibility_minMenu, RootState } from '../redux-store/store'; // 导入 toggleVisibility action

//handleResize
import handleResize from '../functions/handleresize'

//display
import Display from "./display"

export default function MainComponent() {
    const isVisible = useSelector((state: RootState) => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态
    const isVisible_minMenu = useSelector((state: RootState) => state.isVisible_minMenu);
    const dispatch = useDispatch(); // 获取 dispatch 函数，用于派发 action

    // 切换 isVisible 状态的函数
    function showSideBlock() {
        dispatch(toggleVisibility()); // 派发 toggleVisibility action
    };

    function showSideBlock_minMenu() {
        dispatch(toggleVisibility_minMenu());
    };

    function showAllSideBlock() {
        const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        //显示屏幕大于750px的菜单栏
        if (clientWidth > 750) {
            showSideBlock()
        } else {//显示屏幕小于750px的菜单栏
            showSideBlock_minMenu()
            window.addEventListener('resize', (event) => {
                handleResize(dispatch)
            })
        }
    }

    return (
        //maincomponent
        <div
            id={isVisible ? 'maincomponent' : 'normalMaincomponent'}
            className="h-screen flex flex-col items-center"
        >

            {/* top*/}
            <div className="bg-base-200 w-full h-14 flex flex-row justify-between">
                <div className="bg-transparent h-full flex items-center">
                    <div className="h-full flex items-center"
                        id={isVisible ? 'showMenuIcon' : 'normalMenuIcon'}
                    >
                        <button className="bg-transparent m-2"
                            onClick={showAllSideBlock}
                        >
                            <MenuIcon />
                        </button>
                        <button className="bg-transparent m-2" >
                            <EditIcon />
                        </button>
                    </div>
                    <span className="text-2xl ml-5"> My Chat</span>
                    <ArrowDownSLine />
                </div>
                <div className="h-full w-44 flex justify-center items-center">
                    <ChangeTheme />
                    <div className="avatar">
                        <div className="overflow-hidden ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                            {/* <img src="../../../public/images.jpg" className="w-full h-full"/> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* middle */}
            {/* 用于显示上传的问题及回答的答案 */}
            {/* flex-auto的作用是可以填满剩余的部分（在y轴方向上），
            正常情况下是填充x轴剩余部分，由于父组件设置为flex-col，所以改变收缩方向 */}
            <div
                style={{ height: 'calc(100vh - 136px)' }}
                className="w-full overflow-y-auto flex-auto flex justify-center"
            >
                <div
                    id="communicationArea"
                    style={{ display:"none"}}
                    className="mx-5 w-[750px]"
                ></div>
                <Display />
            </div>

            {/* bottom */}
            <div className="w-full flex flex-wrap">
                {/* 在Input中使用w-full和flex来满足收缩 */}
                <div className="bg-transparent w-full flex justify-center">{/* 居中Input组件 */}
                    <Input />
                </div>
                <span className="bg-transparent w-full text-center py-0.5">Welcome to use my Chat</span>
            </div>
        </div>
    )
}