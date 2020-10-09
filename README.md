## Context Hook

-   useContext

    1.  在\_app.js 引入 lib 定义的全局 context

        ```jsx
        import React from "react";
        export default React.createContext("");
        ```

    2.  通过标签包裹所有页面（组件），注册全局 context

        ```html
        <myContext.Provider value={context}>
            <Component {...pageProps} />
            <button onClick={() => useContext(context + 1)}>Add context</button>
        </myContext.Provider>
        ```

    3.  各个页面通过 useContext 获取全局 context
        ```jsx
        const context = useContext(MyContext);
        ```
