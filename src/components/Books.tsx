import React, { useEffect, ChangeEvent} from 'react'
import { connect } from 'react-redux'
import { fetchBooks as fetchBooksAction, searchBooks as searchBooksAction } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import { bindActionCreators } from 'redux'
import Book from '../interfaces/Book'

interface MyPropType {
    books: Book[],
    pending: boolean,
    error: Error,
    fetchBooks: Function,
    searchBooks: Function,
}

function Books({ books, pending, error, fetchBooks, searchBooks }: MyPropType) {

    useEffect(()=> {
        fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target.value)
        searchBooks(e.target.value);
    }   

    return (
        <div>
            <h1>HELLO THERE!!</h1>
            <form>
                <input type="search" onChange={handleChange}/>
            </form>
            { 
                !!books.length && books.map(book => (
                    <h2 key={book.workid}>{book.titleshort}</h2>
                )) 
            }
        </div>
    )
}
const mapStateToProps = (state: RootState) => ({
    error: state.books.error,
    books: state.books.books,
    pending: state.books.pending,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchBooks: fetchBooksAction,
    searchBooks: searchBooksAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Books)
