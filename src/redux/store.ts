import { createStore, applyMiddleware, combineReducers, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'

import bookReducer from './reducers/booksReducer';

function counterReducer(state = 0, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const rootReducer = combineReducers({
    counter: counterReducer,
    books: bookReducer
}
)

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>