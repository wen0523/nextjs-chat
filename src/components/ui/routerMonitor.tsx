import { useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import axios from 'axios';

//chat
import PushManager from "@/lib/chat";

import InsertBefore from '@/lib/insertbefore';

import createDeleteIcon from '@/lib/deleteicon';

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
                    const label = document.createElement('label')
                    label.className = 'py-2 pl-3 pr-2 h-[40px] flex-none flex flex-row rounded-lg hover:bg-base-300'
                    label.id = 'label' + routerID

                    const span = document.createElement('span')
                    span.className = 'h-[24px] w-[168px] flex-none text-nowrap overflow-hidden'
                    span.innerText = text
                    span.onclick = (event) => {
                        router.push('/' + routerID)
                    }

                    const deleteIcon = createDeleteIcon()
                    // 使用 setAttribute 来设置 class
                    deleteIcon.setAttribute('class', 'ml-5 mr-1 my-1 flex-none');
                    deleteIcon.onclick = (event) => {
                        if (event.currentTarget) {
                            const brotherHtml = (event.currentTarget as HTMLElement).previousElementSibling || ''
                            const parentHtml = (event.currentTarget as HTMLElement).parentElement || ''

                            if (brotherHtml && parentHtml) {
                                const formData = new FormData()
                                const id = parentHtml.id.slice(5)
                                formData.append('id', id)
                                const text = (brotherHtml as HTMLElement).innerText
                                const result = confirm(`确定要删除'${text}'对话吗？`)

                                if (result) {
                                    axios.post('http://127.0.0.1:5000/deleteList', formData).then((res) => {
                                        if (res.data == 'success') {
                                            const allList = sessionStorage.getItem('allList')
                                            const allListText = sessionStorage.getItem('allListText')
                                            if (allList && allListText) {
                                                const allListArray = JSON.parse(allList)
                                                const allListTextArray = JSON.parse(allListText)
                                                const index = allListArray.indexOf(id)
                                                if (index > -1) {
                                                    allListArray.splice(index, 1)
                                                    allListTextArray.splice(index, 1)
                                                    sessionStorage.setItem('allList', JSON.stringify(allListArray))
                                                    sessionStorage.setItem('allListText', JSON.stringify(allListTextArray))
                                                }
                                            }
                                            parentHtml.remove()
                                            if (id == sessionStorage.getItem('now')) {
                                                router.push('/')
                                            }
                                        }
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            } else {
                                console.log('brotherHtml/parentHtml不存在')
                            }
                        } else {
                            console.log('event不存在')
                        }
                    }

                    label.appendChild(span)
                    label.appendChild(deleteIcon)

                    //在side添加一个列表
                    const answerList = document.getElementById('answerList')
                    if (answerList) {
                        InsertBefore(answerList, label)
                    } else {
                        console.log('answerList not found')
                    }

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
                } else {
                    console.log('text not found(未获得新建会话窗口标题)')
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName])//只需检查pathName的变化

    return null
}