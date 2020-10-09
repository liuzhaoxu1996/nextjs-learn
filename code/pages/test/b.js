import React, { useState, useEffect } from 'react';


function MyCountFunc() {
    // 声明变量
    const [count, setCount] = useState(0)

    useEffect(() => {
        // 组件挂载完成执行
        const interval = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)
        // return 方法在组件被销毁执行
        return () => clearInterval(interval)
    }, [])

    return <span>{count}</span>
}
export default MyCountFunc