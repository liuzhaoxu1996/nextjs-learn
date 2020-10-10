import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
const initialState = {
    count: 0,
}



function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + (action.num || 1) }
        default:
            return state
    }
}

const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk))

store.subscribe(() => { console.log('subscribe changed', store.getState()) })

function add(num) {
    return {
        type: 'ADD',
        num
    }
}

function addAsync(num) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(add(num))
        }, 1000)
    }
}
store.dispatch(addAsync(6))

export default store