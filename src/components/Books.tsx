import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearBooks } from '../redux/actions/booksAction'
import { withFirebase } from '../components/FirebaseContext'
import Firebase from '../firebase'
import BookView from './BookView'
import Loader from 'react-loader-spinner'
import {Container} from '../components/styledComponents'

interface MyPropType {
    firebase: Firebase,
}

function Books({ firebase }: MyPropType) {
    const [list, setList] = useState<any>();
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.list("7hC2oIreSfL7Tyvazida").get().then((doc) => {
            if (doc.exists) {
                setList(doc.data());
            } else
                console.log('doc not found')
        })
        return () => {
            dispatch(clearBooks());
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

export default withFirebase(Books)
