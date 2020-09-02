import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchBooks as fetchBooksAction } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import { bindActionCreators } from 'redux'
import Book from '../interfaces/Book'

interface MyPropType {
    books: Book[],
    pending: boolean,
    error: Error,
    fetchBooks: Function,
}

function Books({ books, pending, error, fetchBooks }: MyPropType) {
    
    useEffect(()=> {
        fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>HELLO THERE!!</h1>
            { 
                !!books.length && books.map(book => (
                    <h2>{book.titleshort}</h2>
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
    fetchBooks: fetchBooksAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Books)
