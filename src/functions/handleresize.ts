//store
import { Dispatch } from 'redux'; // 从 redux 导入 Dispatch 类型
import { toggleVisibility_minMenu } from '../redux-store/store'; // 导入 toggleVisibility action

const handleResize = (dispatch: Dispatch) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth > 750) {
        dispatch(toggleVisibility_minMenu());
        removeHandleResize(dispatch)
    }
}

const removeHandleResize = (dispatch: Dispatch) => {
    window.removeEventListener('resize', (event) => {
        handleResize(dispatch)
    })
}

export default handleResize
