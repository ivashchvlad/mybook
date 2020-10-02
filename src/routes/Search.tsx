import React, { useCallback, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchBooks as searchBooksAction } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import Book from '../interfaces/Book'
import BookView from '../components/BookView'
import { debounce } from "lodash"

interface MyPropType {
    searchBooks: Function;
    books: Book[];
}

function Search({ searchBooks, books }: MyPropType) {
    const handleCallBack = useCallback(debounce((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target)
            searchBooks(e.target.value);
        else console.log(e)
    }, 500), []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.persist();
        handleCallBack(e);
    }

    return (
        <div>
            <h1>Search</h1>
            <form action="">
                <input type="type" name="book" id="search" onChange={handleChange} />
            </form>
            {
                books.length ? books.map((book: Book) => (
                    <BookView id={book.isbn} key={book.isbn} add={true} />
                )) : ''
            }
        </div>
    )
}

const mapState = (state: RootState) => ({
    books: state.books.books,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    searchBooks: searchBooksAction,
}, dispatch)

export default connect(mapState, mapDispatchToProps)(Search)