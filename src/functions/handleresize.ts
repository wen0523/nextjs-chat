//store
import { toggleVisibility_minMenu } from '../redux-store/store'; // 导入 toggleVisibility action

const handleResize = (dispatch) => {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (clientWidth > 750) {
        dispatch(toggleVisibility_minMenu());
        removeHandleResize(dispatch)
    }
}

const removeHandleResize = (dispatch) => {
    window.removeEventListener('resize', (event) => {
        handleResize(dispatch)
    })
}

export default handleResize
