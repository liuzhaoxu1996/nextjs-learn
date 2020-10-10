## 创建一个 store

-   安装

```bash
yarn add redux
```

-   示例

```jsx
// store/store.js
import { createStore } from "redux";

const initialState = {
    count: 0,
};

// 创建一个reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return { count: state.count + 1 };
        default:
            return state;
    }
}

// 生成store
const store = createStore(reducer, initialState);

// 监听数据变化
store.subscribe(() => {
    console.log("subscribe changed", store.getState());
});

// 派发action，修改数据
store.dispatch({ type: "ADD" });

export default store;
```
