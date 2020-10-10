import { createStore } from 'redux'

const initialState = {
    count: 0
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 }
        default:
            return state
    }
}

const store = createStore(reducer, initialState)

store.subscribe(() => { console.log('subscribe changed', store.getState()) })

store.dispatch({ type: 'ADD' })

export default store