## next 作为 koa 中间件使用

### nextjs 服务器作用

-   nextjs 自身带有服务器，只处理 ssr 渲染
-   处理 http 请求，并根据请求数据返回响应的内容
-   根据域名之类的 host 来定位服务器

### nextjs 服务器无法处理

-   数据接口
-   数据库连接
-   session 状态

### koa 集成 next

-   根目录下新建 server.js

```js
# server.js
const Koa = require('koa')
const next = require('next') // next作为中间件

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler() // 处理http请求

app.prepare().then(() => {
    const server = new Koa()

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('koa server listening on 3000')
    })
})
```

### 修改 package.json

```json
{
  ...
  "scripts": {
    "dev": "node server.js",
  },
  ...
}

```
