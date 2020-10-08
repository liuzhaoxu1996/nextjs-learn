## 路由映射

- Link写法

```javascript
import {Button} from 'antd';
import Link from 'next/link';
export default () => (
    <Link href='/api/hello?id=1' as="/api/hello/1" title='AAA'>
        <Button>Index</Button>
    </Link>
)

```

- router写法

```js
// or
import {Button} from 'antd';
import Router from 'next/router';
export default () => {
    function gotoTestB() {
        Router.push({
            pathname: '/test/b',
            query: {
                id: 1
            }
        }, "/test/b/1")
    }
    return (
        <>
            <Button onClick={gotoTestB}>Index</Button>
        </>
    )
}
```

- 强刷新页面会导致404

需要配合koa，对路由进行配置
```js
const Koa = require('koa')
const Router = require('@koa/router')
const next = require('next') // next作为中间件
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler() // 处理http请求

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.get("/", async (ctx) => {
        await app.render(ctx.req, ctx.res, '/', ctx.query)
        ctx.respond = false
    });

    router.get("/test", async (ctx) => {
        await app.render(ctx.req, ctx.res, '/test', ctx.query)
        ctx.respond = false
    });

    router.get("/test/a/:id", async (ctx) => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/test/a',
            query: {
                id
            }
        })
        ctx.respond = false
    });

    router.all('*', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    
    server.use(router.routes())
    
    server.listen(3000, () => {
        console.log('koa server listening on 3000')
    })
})


```