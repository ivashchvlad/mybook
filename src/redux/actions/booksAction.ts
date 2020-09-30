import { 
    FETCH_BOOKS_ERROR, 
    FETCH_BOOKS_PENDING, 
    FETCH_BOOKS_SUCCESS, 
    FETCH_BOOK_SUCCESS,
    SEARCH_BOOKS_SUCCESS,
    CLEAR_BOOKS,
} from '../types/bookTypes'
import Book from '../../interfaces/Book'
import { AppThunk } from "../store"
import axios from "axios"


export function fetchBooksPending () {
    return {
        type: FETCH_BOOKS_PENDING
    }
}

export function fetchBooksSuccess(books: Book[]) {
    return {
        type: FETCH_BOOKS_SUCCESS,
        books,
    }
}

// adding single book to state
export function fetchBookSuccess(book: Book) {
    return {
        type: FETCH_BOOK_SUCCESS,
        book,
    }
}

export function fetchBooksError(error: Error) {
    console.log(error);
    return {
        type: FETCH_BOOKS_ERROR,
        error,
    }
}

export function searchBooksSuccess(books: Book[]) {
    return {
        type: SEARCH_BOOKS_SUCCESS,
        books,
    }
}

export function clearBooks(): AppThunk {
    return (dispatch) => {
        dispatch({
            type: CLEAR_BOOKS
        })
    }
}

export function fetchBooks(): AppThunk{
    return (dispatch) => {
        dispatch(fetchBooksPending);
        axios.get('https://reststop.randomhouse.com/resources/works/', {
            params: {
                max: 10,
                search: "Pynchon",
            },
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            if (!res.data.work) {
                return;
            }
            dispatch(fetchBooksSuccess(res.data.work))
        }).catch(error => fetchBooksError(error));
    }
}

export function searchBooks(search: string): AppThunk{
    return (dispatch) => {
        dispatch(fetchBooksPending);
        axios.get('https://reststop.randomhouse.com/resources/titles/', {
            params: {
                max: 5,
                search,
            },
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            if (!res.data.title) {
                return;
            }
            dispatch(searchBooksSuccess(res.data.title))
        }).catch(error => fetchBooksError(error));
    }
}

export function getBookById(bookId: string): AppThunk {
    return (dispatch) => {
        dispatch(fetchBooksPending); 
        axios.get(`https://reststop.randomhouse.com/resources/titles/${bookId}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            if(!res.data) {
                console.log('NO DATA!')
                return;
            }
            dispatch(fetchBookSuccess(res.data))
        }).catch(error => fetchBooksError(error));
    }
}