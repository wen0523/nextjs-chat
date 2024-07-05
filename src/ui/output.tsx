'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../module.css/ouput.module.css'

export default function Output() {
    const [receivedData, setReceivedData] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('http://127.0.0.1:5000/stream');

        eventSource.onmessage = function(event) {
            const data = event.data;
            setReceivedData(prev => prev+data); // 更新状态以显示接收到的数据
        };

        eventSource.onerror = function(error) {
            console.error('Error occurred:', error);
        };

        return () => {
            eventSource.close(); // 在组件卸载时关闭 EventSource 连接
        };
    }, []); // 空数组表示只在组件挂载和卸载时执行 useEffect

    return (
        <div className={style.outputDiv}>
            <textarea className={style.outputTextarea}
            value={receivedData}
            readOnly
            />
        </div>
    );
}
