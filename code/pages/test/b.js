import React, { useState, useReducer, useEffect } from 'react';


function countReducer(state, action) {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}

function MyCountFunc() {

    // 声明变量
    // const [count, setCount] = useState(0)
    const [count, dispatchCount] = useReducer(countReducer, 0)

    useEffect(() => {
        // 组件挂载完成执行
        const interval = setInterval(() => {
            dispatchCount({ type: 'add' })
        }, 1000)
        // return 方法在组件被销毁执行
        return () => clearInterval(interval)
    }, [])

    return <span>{count}</span>
}
export default MyCountFunc