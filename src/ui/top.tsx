'use client'

import ArrowDownSLine from "@/icon/arrow-down-s-line"
import MenuIcon from "@/icon/menuicon"
import EditIcon from '@/icon/edit';
import ChangeTheme from "./changeTheme"

//store
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility, toggleVisibility_minMenu, RootState } from '../redux-store/store'; // 导入 toggleVisibility action

//handleResize
import handleResize from '../functions/handleresize'

export default function Top() {
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
        < div className = "bg-base-200 w-full h-14 flex flex-row justify-between" >{/* top*/ }
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
        </div >
    )
}