import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
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

export function add(num) {
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

export default function initializeStore(state) {
    const store = createStore(
        reducer,
        Object.assign({}, initialState, state),
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )
    return store
}