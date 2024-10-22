// store.js

import { createStore } from 'redux';

// 初始状态
const initialState = {
  isVisible: true, // 初始值为 true
  isVisible_minMenu: false,//初始为false，屏幕小于750px显示的菜单。
  eventSource: null as EventSource | null, // 使用联合类型
};

//state的类型
export type RootState = typeof initialState;

// Action Types
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const TOGGLE_VISIBILITY_MINMENU = 'TOGGLE_VISIBILITY_MINMENU';
const SET_EVENT_SOURCE = 'SET_EVENT_SOURCE';

// Action 类型定义(部署需要)
interface ToggleVisibilityAction {
  type: typeof TOGGLE_VISIBILITY;
}

interface ToggleVisibilityMinMenuAction {
  type: typeof TOGGLE_VISIBILITY_MINMENU;
}

interface SetEventSourceAction {
  type: typeof SET_EVENT_SOURCE;
  payload: EventSource | null; // 修正：添加 payload
}

type Action = ToggleVisibilityAction | ToggleVisibilityMinMenuAction | SetEventSourceAction;

// Action Creator
export const toggleVisibility = () => ({
  type: TOGGLE_VISIBILITY,
});

export const toggleVisibility_minMenu = () => ({
  type: TOGGLE_VISIBILITY_MINMENU,
});

export const setEventSource = (eventSource: EventSource | null) => ({
  type: SET_EVENT_SOURCE,
  payload: eventSource,
})

// Reducer 函数
const reducer = (state = initialState, action: Action) => {
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
    case SET_EVENT_SOURCE:
      return {
        ...state,
        eventSource: action.payload,
      };
    default:
      return state;
  }
};

// 创建 Redux store
const store = createStore(reducer);

export default store;
