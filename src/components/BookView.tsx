import React, { useEffect, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/store'
import { getBookById } from '../redux/actions/booksAction'
import Book from '../interfaces/Book'
import Firebase from '../firebase'
import { withFirebase } from '../components/FirebaseContext'
import { compose } from 'redux'

import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const Article = styled(animated.article)`
    background: #191b21;
    color: white;
    min-height: 200px;
    padding: 2%;
    margin: 2% 5% 2% 5%;
`

interface MyOwnProps {
    id: string,
    add?: boolean,
    firebase?: Firebase
}

function BookView({ id, add, firebase }: MyOwnProps) {
    const [opacity, setOpacity] = React.useState(0)
    const book = useSelector((state: RootState) => 
        state.books.books.find((book: Book) => 
            book.isbn === id
        )
    )
    const dispatch = useDispatch();
    const props = useSpring({config: {mass: 5, tension: 500, friction: 80},
        opacity: opacity,
    });

    useEffect(() => {
        if (!book) dispatch(getBookById(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(book) {
            setOpacity(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book])

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        add ?
        firebase?.addBookToList('7hC2oIreSfL7Tyvazida', book.isbn) :
        firebase?.deleteBookFromList('7hC2oIreSfL7Tyvazida', book.isbn);
    }
    return (
        <Article className="book" style={props}>
            { !!book && (
                <>
                    <h3>{book.titleweb}</h3>
                    <h4>{book.authorweb}</h4>
                    <div
                        dangerouslySetInnerHTML={
                            {
                                __html: book.flapcopy
                            }
                        }>
                    </div>
                </>
            )}
            {
                    <button onClick={handleClick}>
                        { add ? "ADD this to the list" : "Delete this from my list"}
                    </button>
            }
        </Article>
    )
}

export default withFirebase(BookView)