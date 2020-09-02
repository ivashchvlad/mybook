import { ADD_BOOKS, FETCH_BOOKS_ERROR, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_PENDING } from "../types/bookTypes"

const initialState = {
    pending: false,
    books: [],
    error: null,
}

function bookReducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_BOOKS: 
            return {...state, books: 'newBook'};
        case FETCH_BOOKS_PENDING:
            return {...state, pending: true};
        case FETCH_BOOKS_SUCCESS:
            return {...state, pending: false, books: action.books};
        case FETCH_BOOKS_ERROR: 
            return {...state, pending: false, error: action.error};
        default : return state;
    }
}

export default bookReducer