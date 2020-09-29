## next 作为 koa 中间件使用

### nextjs 服务器作用

-   nextjs 自身带有服务器，只处理 ssr 渲染
-   处理 http 请求，并根据请求数据返回响应的内容
-   根据域名之类的 host 来定位服务器

### nextjs 服务器无法处理

-   数据接口
-   数据库连接
-   session 状态
