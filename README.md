## 2-8.nodejs 连接数据库

### 使用 nodejs 的 redis 库：ioredis

```js
// 引入ioredis模块
const Redis = require("ioredis");

// 实例化redis
const redis = new Redis({
    port: 6379,
});

// 设置值
await redis.set("b", 123);

// setex 设置过期时间为10s
await redis.setex("d", 10, 123);

// 获取所有keys
const keys = await redis.keys("*");

// 获取值
console.log(await redis.get("b"));
```
