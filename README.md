## Link

- 路由跳转

```js
import {Button} from 'antd';
import Link from 'next/link';
export default () => (
    <Link href='/api/hello'>
        // 只能是一个节点
        <Button>Index</Button>
    </Link>
)
```

- 需要指定渲染内容（Link标签本身不会渲染成dom元素）


## Router

```js
import {Button} from 'antd';
import Router from 'next/router';
export default () => {
    function gotoTestB() {
        Router.push('/test/b')
    }
    return (
        <>
            <Button onClick={gotoTestB}>Index</Button>
        </>
    )
}

```