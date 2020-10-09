## Effect Hooks

-   useEffect

如果 useEffect 不传参数，只要数据发生变化，就会重新执行 useEffect

```jsx
// 示例
function MyCountFunc() {
    const [count, dispatchCount] = useReducer(countReducer, 0);
    const [name, setName] = useState("jocky");

    useEffect(() => {
        console.log("effect invoked");

        return () => console.log("effect deteched");
    });

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => dispatchCount({ type: "add" })}>
                {count}
            </button>
        </div>
    );
}
```

如果 useEffect 传参数，传入的数据发生变化，才会重新执行 useEffect

```jsx
// 示例
function MyCountFunc() {
    ...
    useEffect(() => {
        console.log('effect invoked')

        return () => console.log('effect deteched')
    }, [name])
    ...
}
```

-   useLayoutEffect: 组件没有挂载之前执行，不常用
