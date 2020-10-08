## 动态路由

- 只能通过query

```javascript
import {Button} from 'antd';
import Link from 'next/link';
export default () => (
    <Link href='/api/hello?id=1' title='AAA'>
        <Button>Index</Button>
    </Link>
)

// or
import {Button} from 'antd';
import Router from 'next/router';
export default () => {
    function gotoTestB() {
        Router.push('/test/b?id=1')
    }
    return (
        <>
            <Button onClick={gotoTestB}>Index</Button>
        </>
    )   
}

```

- 另一种写法

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
        })
    }
    return (
        <>
            <Button onClick={gotoTestB}>Index</Button>
        </>
    )
}
```

- 指定页面获取query

```js

// 指定页面下：例如 a.js 
// 使用 withRouter 包装组件，即可拿到当前页面的query参数
import Comp from '../../components/comp'
import {withRouter} from 'next/router'

const A = ({router}) => (
    <>
        <Comp>Page: A</Comp>
        <Comp>{router.query.id}</Comp>
    </>
)
export default withRouter(A)
```