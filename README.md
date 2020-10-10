## [Hooks 渲染优化](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

-   当依赖数据发生变化时，不相关的 hooks 不重新渲染

-   useMemo 组件优化使用

```jsx
import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
    useRef,
    memo,
    useMemo,
} from "react";

const Child = memo(function Child({ onButtonClick, config }) {
    console.log("child render");
    return (
        <button onClick={onButtonClick} style={{ color: config.color }}>
            {config.text}
        </button>
    );
});
```

-   useCallback 对方法优化使用

```jsx
<Child
    onButtonClick={useCallback(() => dispatchCount({ type: "add" }), [])}
></Child>
```

详见：test/c.js
