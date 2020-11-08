import { createStore, applyMiddleware, combineReducers, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'

import bookReducer from './reducers/booksReducer'
import sessionReducer from './reducers/sessionReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    books: bookReducer,
    user: userReducer,
    session: sessionReducer,
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