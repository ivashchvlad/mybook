import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchBooks as fetchBooksAction, clearBooks as clearBooksAction } from '../redux/actions/booksAction'
import { RootState } from '../redux/store'
import { bindActionCreators } from 'redux'
import Book from '../interfaces/Book'
import { withFirebase } from '../components/FirebaseContext'
import { compose } from 'redux'
import Firebase from '../firebase'
import BookView from './BookView'
import Loader from 'react-loader-spinner'
import {Container} from '../components/styledComponents'

interface MyPropType {
    books: Book[],
    pending: boolean,
    error: Error,
    fetchBooks: Function,
    clearBooks: Function,
    firebase: Firebase,
}

function Books({ firebase, clearBooks }: MyPropType) {
    const [list, setList] = useState<any>();

    useEffect(() => {
        firebase.list("7hC2oIreSfL7Tyvazida").get().then((doc) => {
            if (doc.exists) {
                setList(doc.data());
            } else
                console.log('doc not found')
        })
        return () => {
            clearBooks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <h1>Your Book List</h1>
            {
                !list? (
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs

                    />
                ) : list.books.map((bookId: string) => (
                    <BookView id={bookId} key={bookId} />
                ))
            }
        </Container>
    )
}

const mapStateToProps = (state: RootState) => ({
    error: state.books.error,
    books: state.books.books,
    pending: state.books.pending,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    fetchBooks: fetchBooksAction,
    clearBooks: clearBooksAction,
}, dispatch)

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(Books)
