// store.js

import { createStore } from 'redux';

// 初始状态
const initialState = {
  isVisible: true, // 初始值为 true
  isVisible_minMenu: false,//初始为false，屏幕小于750px显示的菜单。
};

// Action Types
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const TOGGLE_VISIBILITY_MINMENU = 'TOGGLE_VISIBILITY_MINMENU';

// Action Creator
export const toggleVisibility = () => ({
    type: TOGGLE_VISIBILITY,
  });

export const toggleVisibility_minMenu = () =>({
    type: TOGGLE_VISIBILITY_MINMENU,
  });

// Reducer 函数
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible, // 切换 isVisible 的值
      };
    case TOGGLE_VISIBILITY_MINMENU:
      return {
        ...state,
        isVisible_minMenu: !state.isVisible_minMenu
      };
    default:
      return state;
  }
};

// 创建 Redux store
const store = createStore(reducer);

export default store;
