import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearBooks } from '../redux/actions/booksAction'
import { withFirebase } from '../components/FirebaseContext'
import { withAuthUser } from '../components/AuthUserContext'
import Firebase from '../firebase'
import BookView from './BookView'
import Loader from 'react-loader-spinner'
import {Container} from '../components/styledComponents'

interface MyPropType {
    firebase: Firebase,
    authUser: any,
}

function Books({ firebase, authUser }: MyPropType) {
    const [list, setList] = useState<any>();
    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchData () {
            const user = await firebase.user(authUser.uid).get();
            if (user.exists) {
                let list = await firebase.list(user?.data()?.lists[0]).get();
                if (list.exists) setList(list.data());
                else console.log('Doc is not found');
            }
            else {
                console.log('User is not found!');
            }
        };

        if(authUser) fetchData();

        return () => {
            dispatch(clearBooks());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])

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

export default withAuthUser(withFirebase(Books))
