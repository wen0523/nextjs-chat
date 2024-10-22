//store
import { Dispatch } from 'redux'; // 从 redux 导入 Dispatch 类型
import { toggleVisibility_minMenu } from './store'; // 导入 toggleVisibility action

const handleResize = (dispatch: Dispatch) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth > 750) {
        dispatch(toggleVisibility_minMenu());
        console.log(toggleVisibility_minMenu());
        removeHandleResize(dispatch)
    }
}

const removeHandleResize = (dispatch: Dispatch) => {
    console.log('removeHandleResize')
    window.removeEventListener('resize', (event) => {
        handleResize(dispatch)
    })
}

export default handleResize
