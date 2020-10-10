## redux 中的 reducer

-   不要再 reducer 外部声明变量并引用，应该把变量放在 state 里面

```jsx
// bad xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
let count = 1;
function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return { count: count + 1 };
        default:
            return state;
    }
}
```

-   有任何数据更新应该返回新的对象

```jsx
function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD":
            // 返回一个新的对象
            return {
                // ...
            };
        default:
            return state;
    }
}
```

-   拆分 reducer

```jsx
import {combineReducers} from 'redux'

const counterState = {}
const userState = {}
function counterReducer(state, action) {
    ...
}
function userReducer(state, action) {
    ...
}

const allReducers = combineReducers({
    counter: counterReducer,
    user: userReducer
})

const store = createStore(allReducers, {
    counter: counterState,
    user: userState
})
...
```
