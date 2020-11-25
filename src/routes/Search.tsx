import React, { useState, useCallback, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchBooks, clearBooks } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import Book from '../interfaces/Book'
import BookView from '../components/BookView'
import { debounce } from "lodash"
import Loader from 'react-loader-spinner'
import { Form, Input, Container, Label } from '../components/styledComponents'



function Search() {
    const [input, SetInput] = useState('');
    const books = useSelector((state: RootState) =>
        state.books.books
    );
    const pending = useSelector((state: RootState) =>
        state.books.pending
    );

    const dispatch = useDispatch();

    const handleCallBack = useCallback(
        debounce(
            (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target){
                    e.target.value? 
                    dispatch(searchBooks(e.target.value)) :
                    dispatch(clearBooks())
                    ;
                }
                else console.log(e)
            }, 300
        ), []
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.persist();
        SetInput(e.target.value);
        handleCallBack(e);
    }

    return (
        <Container>
            <h1>Search</h1>
            <Form action="">
                <Input type="type" name="book" id="search" onChange={handleChange} />
            </Form>
            {
                pending &&
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            }

            {
                !input && <Label>No searches yet...</Label>
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