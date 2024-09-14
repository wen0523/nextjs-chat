'use client';

//ui
import Top from "@/ui/top";
import Bottom from "@/ui/bottom";

//store
import { useSelector } from 'react-redux';
import { RootState } from "@/redux-store/store";

//左侧区域
export default function RightArea({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isVisible = useSelector((state: RootState) => state.isVisible); // 从 Redux store 中选择和获取 isVisible 状态

    return (
        < div
            id = { isVisible? 'maincomponent': 'normalMaincomponent' }
            className = "h-screen flex flex-col items-center"
        >
            {/* top */ }
            <Top />
            
            {/* middle */ }
            {/* 用于显示上传的问题及回答的答案 */ }
            {/* flex-auto的作用是可以填满剩余的部分（在y轴方向上），
                            正常情况下是填充x轴剩余部分，由于父组件设置为flex-col，所以改变收缩方向 */}
            <div
                style={{ height: 'calc(100vh - 136px)' }}
                className="w-full overflow-y-auto flex-auto flex justify-center"
            >
                {children}
            </div>

            {/* bottom */ }
            <Bottom />
        </div >
    )
}