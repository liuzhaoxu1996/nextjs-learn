## [Ref Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)

-   class 组件写法

```js
class MyCount extends React.Component {
    constructor() {
        super();
        this.ref = React.createRef();
    }
    componentDidMount() {
        this.ref.current;
    }
    render() {
        return <span ref={this.ref}></span>;
    }
}
```

-   function 组件写法

```js
import React, {
    useState,
    useReducer,
    useContext,
    useEffect,
    useRef,
} from "react";

function MyCountFunc() {
    const inputRef = useRef();
    useEffect(() => {
        console.log(inputRef);
        return () => console.log("effect deteched");
    });
    return (
        <div>
            <input ref={inputRef} />
        </div>
    );
}
export default MyCountFunc;
```
