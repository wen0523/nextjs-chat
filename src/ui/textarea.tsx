'use client'

import { useRef, useImperativeHandle,forwardRef } from "react";

// 定义 TextareaProps 接口，描述组件接受的属性
interface TextareaProps {
    onChange?: () => void; // 可选的 onChange 回调函数
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const myRef = useRef<HTMLTextAreaElement>(null)

    // useImperativeHandle 用来定义对外暴露的接口
    useImperativeHandle(ref, () => ({
        // 定义 get 方法，外部可以通过 ref.current.value 获取 <textarea> 的值
        get value() {
            return myRef.current?.value || "";
        },
        // 定义 set 方法，外部可以通过 ref.current.value = newValue 来设置 <textarea> 的值
        set value(val: string) {
            if (myRef.current) {
                myRef.current.value = val;
            }
        },
        //提交问题后重新设置高度
        set height(val: number) {
            if (myRef.current) {
                myRef.current.style.height = val + 'px';
            }
        }
    }));


    function heightChange() {
        const theTextarea = myRef.current;

        if (theTextarea) {
            if (theTextarea.scrollHeight <= 176) {
                theTextarea.style.height = 32 + 'px';
                theTextarea.style.height = theTextarea.scrollHeight + 'px';
            } else {
                if (theTextarea.clientHeight < 176) {
                    theTextarea.style.height = 176 + 'px';
                }
                theTextarea.scrollTop = theTextarea.scrollHeight;
            }
        }
    }

    return (
        <div className='bg-transparent w-full flex'>
            <textarea
                ref={myRef}
                style={{ resize: 'none', outline: 'none', whiteSpace: 'pre-wrap' }}
                className="bg-transparent w-full py-1 h-8 my-2.5 mx-1"
                placeholder="Type your message here..."
                onChange={heightChange}
            >
            </textarea>
        </div>
    )
});

export default Textarea;