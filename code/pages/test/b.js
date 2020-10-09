import React, { useState, useReducer, useContext, useEffect, useRef } from 'react';
import MyContext from '../../lib/my-context'


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
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('jocky')
    const inputRef = useRef()
    const context = useContext(MyContext)

    useEffect(() => {
        console.log(inputRef)

        return () => console.log('effect deteched')
    }, [name])

    return (
        <div>
            <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
            <p>{context}</p>
        </div>
    )
}
export default MyCountFunc