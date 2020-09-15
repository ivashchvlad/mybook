import { FETCH_BOOKS_ERROR, FETCH_BOOKS_PENDING, FETCH_BOOKS_SUCCESS, FETCH_BOOK_SUCCESS } from '../types/bookTypes'
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
    return {
        type: FETCH_BOOKS_ERROR,
        error,
    }
}

export function fetchBooks(): AppThunk{
    return (dispatch) => {
        dispatch(fetchBooksPending);
        axios.get('https://reststop.randomhouse.com/resources/works/', {
            params: {
                start: 0,
                max: 10,
                expandLevel: 1,
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
        axios.get('https://reststop.randomhouse.com/resources/works/', {
            params: {
                start: 0,
                max: 10,
                expandLevel: 1,
                search,
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

export function getBookById(bookId: string): AppThunk {
    return (dispatch) => {
        dispatch(fetchBooksPending); 
        axios.get(`https://reststop.randomhouse.com/resources/works/${bookId}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            if(!res.data) {
                return;
            }
            dispatch(fetchBookSuccess(res.data))
        }).catch(error => fetchBooksError(error));
    }
}