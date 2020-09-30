// koa demo
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next') // next作为中间件

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const server = new Koa()
const router = new Router()

router.get('/test', (ctx) => {
    ctx.body = '<p>123123</p>'
})

server.use(async (ctx, next) => {
    await next()
})

server.use(router.routes())

server.listen(3000, () => {
    console.log('koa server listening on 3000')
})