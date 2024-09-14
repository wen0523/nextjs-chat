import Input from "./input"
export default function Bottom() {
    return (
         <div className="w-full flex flex-wrap">{/* bottom */}
            {/* 在Input中使用w-full和flex来满足收缩 */}
            <div className="bg-transparent w-full flex justify-center">
                {/* 居中Input组件 */}
                <Input />
            </div>
            <span className="bg-transparent w-full text-center py-0.5">Welcome to use my Chat</span>
        </div>
    )
}