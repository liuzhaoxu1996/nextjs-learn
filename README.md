## redux 中的 action

-   action 中处理异步 redux-thunk

```bash
yarn add redux-thunk
```

```jsx
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

function add(num) {
    return {
        type: "ADD",
        num,
    };
}

function addAsync(num) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(add(num));
        }, 1000);
    };
}
// 执行dispatch时，判断传入是否为函数，如果是函数则执行，并传入dispatch和getState作为参数
store.dispatch(addAsync(6));
```
