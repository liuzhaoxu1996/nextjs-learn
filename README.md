## 7-9.github 接口代理

原因: 请求 github 接口，需要传用户的 token, 客户端不安全，需要服务端请求 github 接口

## 如何代理 github 接口

1. koa 拦截 /github/ 路径的请求
2. 然后在服务端请求 github 的真实路径，并带上参数
3. 详细看/server/api.js

## 获取 url 参数

```jsx
import { withRouter } from "next/router";

const Demo = ({ router }) => {
    // router.query: 参数
    // router.query.query: query参数
    console.log(router.query.query);
};

export default withRouter(Demo);
```

## router

示例：http://localhost:18801/search?query=react

-   pathname: /search 获取当前相对路径不带参数
-   asPath: /search?query=react 浏览器中显示的实际路径
-   query: {query: "react"} 参数对象
