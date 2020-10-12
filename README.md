## 5-5 redux-dev-tool

-   chrome 安装 Redux DevTools

-   `yarn add redux-devtools-extension`

-   store.js

```js
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    initialState,
    // +++++++++++++++
    composeWithDevTools(applyMiddleware(ReduxThunk))
);
```
