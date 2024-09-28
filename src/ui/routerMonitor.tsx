import { useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import axios from 'axios';

//chat
import PushManager from "@/functions/chat";

export default function RouterMonitor() {
    const pathName = usePathname();
    const router = useRouter();

    //监听路由的变换
    useEffect(() => {
        //处理初始化，根路由下刷新，底层路由切换到根路由
        if (pathName === '/' && sessionStorage.getItem('now') != null && sessionStorage.getItem('now') != '/') {
            sessionStorage.setItem('now', '/')
        } else if (pathName !== '/') {//处理底层目录刷新，根路由切换到底层路由
            const allListJson = sessionStorage.getItem('allList')
            const allListTextJson = sessionStorage.getItem('allListText')
            const routerID = pathName.replace('/', '')
            let allList = []
            let allListText = []
            if (allListJson != null && allListTextJson != null) {
                allList = JSON.parse(allListJson)
                allListText = JSON.parse(allListTextJson)
            }
            if (allList?.includes(routerID)) {//调出历史的会话窗口
                sessionStorage.setItem('now', routerID)
                const CacheCount = sessionStorage.getItem(routerID)
                const answerArea = document.getElementById(routerID)
                if (answerArea) {
                    if (CacheCount != null) {//已经缓存
                        for (let i = 1; i <= parseInt(CacheCount); i++) {
                            const htmlListJson = sessionStorage.getItem(routerID + String(i))
                            if (htmlListJson) {
                                const htmlList = JSON.parse(htmlListJson)
                                answerArea.insertAdjacentHTML('beforeend', htmlList[0]);
                                answerArea.insertAdjacentHTML('beforeend', htmlList[1]);
                            }
                        }
                    } else {//未缓存
                        const formData = new FormData()
                        formData.append('routerID', routerID)

                        axios.post('http://127.0.0.1:5000/getContent', formData).then((res) => {
                            const data = res.data
                            const length = data.length
                            sessionStorage.setItem(routerID, length)
                            for (let i = 0; i <= length; i++) {
                                const htmlList = data[i]
                                if (htmlList) {
                                    answerArea.insertAdjacentHTML('beforeend', htmlList.ask);
                                    answerArea.insertAdjacentHTML('beforeend', htmlList.answer);
                                    sessionStorage.setItem(routerID + String(i + 1), JSON.stringify([htmlList.ask, htmlList.answer]))
                                }
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    sessionStorage.setItem('now', routerID)
                } else {
                    console.log('answerArea not found')
                }
            } else {//新建的会话窗口
                const text = sessionStorage.getItem('text')
                if (text) {
                    //new list
                    const newList = document.createElement('label')
                    newList.className = 'py-2 px-3 text-nowrap overflow-hidden rounded-lg hover:bg-base-300'
                    newList.innerText = text
                    newList.onclick = () => {
                        router.push('/' + routerID)
                    }

                    //在side添加一个列表
                    const answerList = document.getElementById('answerList')
                    answerList?.appendChild(newList)

                    //储存到sessionStorage
                    allList.push(routerID)
                    allListText.push(text)
                    sessionStorage.setItem('now', routerID)
                    sessionStorage.setItem('allList', JSON.stringify(allList))
                    sessionStorage.setItem('allListText', JSON.stringify(allListText))

                    //储存到sql
                    const formData = new FormData()
                    formData.append('routerID', routerID)
                    formData.append('text', text)

                    axios.post('http://127.0.0.1:5000/setallList', formData)

                    //调用请求函数
                    PushManager(text)
                }else{
                    console.log('text not found(未获得新建会话窗口标题)')
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName])//只需检查pathName的变化

    return null
}