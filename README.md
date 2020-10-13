## 接入 github OAuth

服务端通过获取 cookie 的值，获取 user 信息，存放在 session 中

-   cookie: 存放用户的通行证
-   session: 存放用户信息

1. 安装 koa-session

`yarn add koa-session`

2. 配置 koa-session

```js
server.keys = ["github-app"];
const SESSION_CONFIG = {
    key: "jid", // 存到cookie里的key
    store: new RedisSessionStore(redis), // 信息存到redis
    maxAge: 10 * 1000, // 过期时间
};
```

3. 编写 store

```js
function getRedisSessionId(sid) {
    return `ssid:${sid}`;
}
class RedisSessionStore {
    constructor(client) {
        this.client = client;
    }
    //  获取redis存储的session数据
    async get(sid) {
        console.log("get session", sid);
        const id = getRedisSessionId(sid);
        const data = await this.client.get(id);
        if (!data) {
            return null;
        }
        try {
            const result = JSON.parse(data);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    // 存储session数据到redis
    async set(sid, sess, ttl) {
        console.log("set session", sid);

        const id = getRedisSessionId(sid);
        if (typeof ttl === "number") {
            ttl = Math.ceil(ttl / 1000);
        }
        try {
            const sessStr = JSON.stringify(sess);
            if (ttl) {
                await this.client.setex(id, ttl, sessStr);
            } else {
                await this.client.set(id, sessStr);
            }
        } catch (err) {}
    }

    // 从redis当中删除某个session
    async destroy(sid) {
        console.log("destory session", sid);
        const id = getRedisSessionId(sid);
        await this.client.del(id);
    }
}

module.exports = RedisSessionStore;
```

4. 编写路由，设置或删除 session

```js
router.get("/set/user", async (ctx) => {
    ctx.session.user = {
        name: "jocky",
        age: 18,
    };
    ctx.body = "set session success";
});

router.get("/delete/user", async (ctx) => {
    ctx.session = null;
    ctx.body = "delete session success";
});
```

5. 使用 github oAuth

    - 引入 axios `yarn add axios`

6. 通过 code 获取用户信息，并保存到 session 中

```js
// auth.js
const axios = require("axios");
const config = require("../config");

const { client_id, client_secret, request_token_url } = config.github;

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === "/auth") {
            const code = ctx.query.code;
            if (!code) {
                ctx.body = "code not exist";
                return;
            }
            const result = await axios({
                method: "POST",
                url: request_token_url,
                data: {
                    client_id,
                    client_secret,
                    code,
                },
                headers: {
                    Accept: "application/json",
                },
            });
            if (result.status === 200 && result.data && !result.data.error) {
                ctx.session.githubAuth = result.data;
                const { access_token, token_type } = result.data;
                const userInfoResp = await axios({
                    method: "GET",
                    url: "https://api.github.com/user",
                    headers: {
                        Authorization: `${token_type} ${access_token}`,
                    },
                });
                ctx.session.userInfo = userInfoResp.data;
                ctx.redirect("/");
            } else {
                const errorMsg = result.data && result.data.error;
                ctx.body = `request token failed ${errorMsg}`;
            }
            console.log(result.status, result.data);
        } else {
            await next();
        }
    });
};
```
