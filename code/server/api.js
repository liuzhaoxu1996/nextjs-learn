const axios = require('axios')
const { github } = require('../config')
const { requestGithub } = require('../lib/api')

const github_base_url = 'https://api.github.com'
module.exports = (server) => {
    server.use(async (ctx, next) => {
        const path = ctx.path
        if (path.startsWith('/github/')) {
            const session = ctx.session
            const githubAuth = session && session.githubAuth
            const headers = {}
            if (githubAuth && githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
            }
            const result = await requestGithub(method, ctx.url.replace('/github/', '/'), {}, headers)
            ctx.status = result.status
            ctx.body = result.body
        } else {
            await next()
        }
    })
}