## 5-5 react-redux 连接 react 和 redux

-   安装 react-redux

```bash
yarn add react-redux
```

-   \_app.js

```jsx
import { Provider } from "react-redux";
import store from "../store/store.js";

<Provider store={store}>
    <myContext.Provider value={context}>
        <Component {...pageProps} />
    </myContext.Provider>
</Provider>;
```

-   页面或者组件

```jsx
import { connect } from "react-redux";
```

## react-redux 连接 react 和 redux

-   安装

```bash
yarn add react-redux
```

-   react 连接 store

通过 Provider 组件把 store 注入到 react 组件中

```jsx
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({ Component, pageProps }) {
    const [context, useContext] = useState(0);
    return (
        <Layout>
            // +++++++++++++++++++++++++++++++++++
            <Provider store={store}>
                <myContext.Provider value={context}>
                    <Component {...pageProps} />
                    <button onClick={() => useContext(context + 1)}>
                        Add context
                    </button>
                </myContext.Provider>
            </Provider>
        </Layout>
    );
}

export default MyApp;
```

-   页面组件使用 store

```jsx
import { connect } from "react-redux";

const Index = ({ counter, username, rename, add }) => {
    return (
        <>
            <span>{counter}</span>
            <span>{username}</span>
            // 触发：action
            <button onClick={() => add(counter)}>do add</button>
        </>
    );
};

export default connect(
    function mapStateToProps(state) {
        // 获取store中的state数据
        return {
            counter: state.counter.count,
            username: state.user.username,
        };
    },
    function mapDispatchToProps(dispatch) {
        /* 获取action
         */
        return {
            add: (num) => dispatch({ type: "ADD", num: num }),
            rename: (name) => dispatch({ type: "UPDATE_USERNAME", name }),
        };
    }
)(Index);
```
