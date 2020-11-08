import React, { useEffect, MouseEvent, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { getBookById } from '../redux/actions/booksAction'
import Book from '../interfaces/Book'
import Firebase from '../firebase'
import { withFirebase } from '../components/FirebaseContext'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { Button } from '../components/styledComponents'
import { useSpring, animated } from 'react-spring'


export const Article = styled(animated.article)`
    background: #191b21;
    color: white;
    min-height: 200px;
    width: 1200px;
    padding: 2%;
    margin: 2% 5% 2% 5%;
`

interface MyOwnProps {
    id: string,
    add?: boolean,
    firebase?: Firebase
}

function BookView({ id, add, firebase }: MyOwnProps) {
    const book = useSelector((state: RootState) =>
        state.books.books.find((book: Book) =>
            book.isbn === id
        )
    )

    const dispatch = useDispatch()

    const [spring, setOpacity] = useSpring(() => ({
        config: { mass: 5, tension: 500, friction: 80 },
        from: { opacity: 0 },
        to: {}
    }))

    useEffect(() => {
        if (!book) dispatch(getBookById(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (book) {
            setOpacity({to: {opacity: 1}})
        }
        console.log(spring);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book])

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        add ?
            firebase?.addBookToList('7hC2oIreSfL7Tyvazida', book.isbn) :
            firebase?.deleteBookFromList('7hC2oIreSfL7Tyvazida', book.isbn);
    }
    return (
        <Article id={id} className="book" style={spring}>
            { !book ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs

                /> :
                (
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
                <Button onClick={handleClick}>
                    {add ? "ADD this to the list" : "Delete this from my list"}
                </Button>
            }
        </Article>
    )
}

export default withFirebase(memo(BookView));