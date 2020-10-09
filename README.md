## nextjs 自定义样式

-   特性

    -   组件样式隔离

-   写法

```js
// 例如：test/a.js
import { withRouter } from "next/router";

const A = ({ router, name }) => (
    <>
        <a className="link">query: {router.query.id}</a>
        <style jsx>{`
            a {
                color: blue;
            }
            .link {
                color: red;
            }
        `}</style>
    </>
);

A.getInitialProps = async () => {
    return {
        name: "A",
    };
};

export default withRouter(A);
```

-   定义 global 样式

```js
const A = ({ router, name }) => (
    <>
        <a className="link">query: {router.query.id}</a>
        <style jsx global>{`
            a {
                color: blue;
            }
            .link {
                color: red;
            }
        `}</style>
    </>
);
```
