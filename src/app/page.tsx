'use client'

import SideBlock from "@/ui/side-block";
import MainComponent from "@/ui/maincomponent";
import Test from "@/ui/test";

//store 
import { Provider } from 'react-redux';
import store from '../redux-store/store'; // 导入上面创建的 Redux store

export default function Page() {
  return (
    <Provider store={store}>
        <div className="flex flex-row">
            <SideBlock />
            <MainComponent />
        </div>
    </Provider>
  )
}