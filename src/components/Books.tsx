import React, { useState, useEffect, ChangeEvent} from 'react'
import { connect } from 'react-redux'
import { fetchBooks as fetchBooksAction, searchBooks as searchBooksAction } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import { bindActionCreators } from 'redux'
import Book from '../interfaces/Book'
import { withFirebase } from '../components/FirebaseContext'
import { compose } from 'redux'
import Firebase from '../firebase'
import BookView from './BookView'

interface MyPropType {
    books: Book[],
    pending: boolean,
    error: Error,
    fetchBooks: Function,
    searchBooks: Function,
    firebase: Firebase,
}

function Books({ searchBooks, firebase }: MyPropType) {
    const [list, setList] = useState<any>();

    useEffect(()=> {
        firebase.list("7hC2oIreSfL7Tyvazida").get().then((doc) => {
            if (doc.exists) {
                console.log(`${doc.id} => ${doc.data()}`);
                setList(doc.data());
            } else
                console.log('doc not found')
        })
        
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
                !!list && list.books.map((bookId: any) => (
                    <BookView id={bookId} key={bookId}/>
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

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Books)
