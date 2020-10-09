## 什么是 Hooks

让函数组件具有类组件的能力

```jsx
// test/b.js
import React, { useState, useEffect } from "react";

function MyCountFunc() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // 组件挂载完成执行
        const interval = setInterval(() => {
            setCount((c) => c + 1);
        }, 1000);
        // return 方法在组件被销毁执行
        return () => clearInterval(interval);
    }, []);
    return <span>{count}</span>;
}
export default MyCountFunc;
```
