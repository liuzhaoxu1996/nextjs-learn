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
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState('jocky')

    useEffect(() => {
        console.log('effect invoked')

        return () => console.log('effect deteched')
    }, [name])

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
        </div>
    )
}
export default MyCountFunc