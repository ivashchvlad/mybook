import React, { useCallback, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchBooks } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import Book from '../interfaces/Book'
import BookView from '../components/BookView'
import { debounce } from "lodash"
import Loader from 'react-loader-spinner'
import { Form, Input, Container } from '../components/styledComponents'

function Search() {
    const books = useSelector((state: RootState) =>
        state.books.books
    );

    const dispatch = useDispatch();

    const handleCallBack = useCallback(
        debounce(
            (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target)
                    dispatch(searchBooks(e.target.value));
                else console.log(e)
            }, 500
        ), []
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.persist();
        handleCallBack(e);
    }

    return (
        <Container>
            <h1>Search</h1>
            <Form action="">
                <Input type="type" name="book" id="search" onChange={handleChange} />
            </Form>
            {
                !books.length &&
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                />
            }
            {
                books.length ? books.map((book: Book) => (
                    <BookView id={book.isbn} key={book.isbn} add={true} />
                )) : ''
            }
        </Container>
    )
}

export default Search