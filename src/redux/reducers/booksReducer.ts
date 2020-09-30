import {
    FETCH_BOOKS_ERROR,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOK_SUCCESS,
    FETCH_BOOKS_PENDING,
    SEARCH_BOOKS_SUCCESS,
    CLEAR_BOOKS,
} from "../types/bookTypes"

const initialState = {
    pending: false,
    books: [],
    error: null,
}

function bookReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_BOOKS_PENDING:
            return { ...state, pending: true }
        case FETCH_BOOKS_SUCCESS:
            return { ...state, pending: false, books: action.books }
        case FETCH_BOOK_SUCCESS:
            return { ...state, pending: false, books: [...state.books, action.book] }
        case FETCH_BOOKS_ERROR:
            return { ...state, pending: false, error: action.error }
        case SEARCH_BOOKS_SUCCESS:
            return { ...state, pending: false, books: action.books }
        case CLEAR_BOOKS:
            return { ...state, books: [] }
        default: return state;
    }
}

export default bookReducer