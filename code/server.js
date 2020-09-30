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