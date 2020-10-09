## LazyLoading

-   异步加载模块

```js
A.getInitialProps = async (ctx) => {
    // ++++++++++++++++++++++++++++++++++
    const moment = await import("moment");
    return {
        name: "A",
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
    };
};
```

-   异步加载组件

```js
import dynamic from "next/dynamic";
const Comp = dynamic(import("../../components/comp"));

...

// 详见 a.js
```
