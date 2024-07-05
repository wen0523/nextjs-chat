// store.js

import { createStore } from 'redux';

// 初始状态
const initialState = {
  isVisible: true, // 初始值为 true
};

// Action Types
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

// Action Creator
export const toggleVisibility = () => ({
    type: TOGGLE_VISIBILITY,
  });

// Reducer 函数
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible, // 切换 isVisible 的值
      };
    default:
      return state;
  }
};

// 创建 Redux store
const store = createStore(reducer);

export default store;
