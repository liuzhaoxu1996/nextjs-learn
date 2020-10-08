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

需要server.js配置
```


```