const Koa = require('koa')
const Router = require('@koa/router')
const session = require('koa-session')
const next = require('next') // next作为中间件
const auth = require('./server/auth')

const Redis = require('ioredis')
const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler() // 处理http请求
const redis = new Redis()
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.keys = ['github-app']
    const SESSION_CONFIG = {
        key: 'jid',
        store: new RedisSessionStore(redis),
        maxAge: 10 * 1000
    }

    server.use(session(SESSION_CONFIG, server))

    auth(server)

    server.use(async (ctx, next) => {
        // console.log(ctx.session)
        await next()
    })

    router.get('/api/user/info', async (ctx) => {
        const user = ctx.session.userInfo
        if (!user) {
            ctx.status = 401
            ctx.body = 'need login'
        } else {
            ctx.body = user
            ctx.set('Content-Type', 'application/json')
        }
    })

    server.use(router.routes())

    server.use(async (ctx, next) => {
        ctx.req.session = ctx.session
        // next渲染
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(18801, () => {
        console.log('koa server listening on 18801')
    })
})