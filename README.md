## Koa

### api

```bash
app.use

ctx

request response req res的关系
```

### 写一个 koa 中间件

```js
// 最简单的中间件
import Koa from "koa";

const server = new Koa();

server.use(async (ctx, next) => {
    ctx.body = "<span>Index</span>";
});

server.listen(3000, () => {
    console.log("koa server listening on 3000");
});
```

### 执行下一个中间件

```js
// 使用 next() 表示执行下一个中间件
server.use(async (ctx, next) => {
    ctx.body = "<span>Index</span>";
    await next();
});

server.use(async (ctx, next) => {
    ctx.body = "<span>Index2</span>";
});
```

### 添加 koa-router

```js
const Router = require("koa-router");

const router = new Router();

router.get("/test", (ctx) => {
    ctx.body = "<p>123123</p>";
});

server.use(router.routes());
```

### 返回 json 对象

```js
router.get("/test/:id", (ctx) => {
    ctx.body = { success: true };
    ctx.set("Content-Type", "application/json");
});
```
