async function test() {
    const Redis = require('ioredis');

    const redis = new Redis({
        port: 6379
    })

    // 设置值
    await redis.set('b', 123)

    // setex 设置过期时间为10s
    await redis.setex('d', 10, 123)

    const keys = await redis.keys('*')

    console.log(await redis.get('b'))
}
test()