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
import { Motion, spring } from 'react-motion'


export const Article = styled.article`
    background: #191b21;
    color: white;
    min-height: 200px;
    width: 1000px;
    padding: 2%;
    margin: 2% 6% 2% 6%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const BookButton = styled(Button)`
    margin-top: 20px;
    width: 220px;
`

interface MyOwnProps {
    id: string,
    add?: boolean,
    firebase?: Firebase
}

function BookView({ id, add, firebase }: MyOwnProps) {

    const [opacity, setOpacity] = React.useState<any>(0)

    const book = useSelector((state: RootState) =>
        state.books.books.find((book: Book) =>
            book.isbn === id
        )
    )

    const dispatch = useDispatch()

    useEffect(() => {
        if (!book) dispatch(getBookById(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (book) {
            setOpacity((1))
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
        <Motion style={{ _opacity: spring(opacity ? 1 : 0) }}>
            { ({ _opacity }) => (
                <Article id={id} className="book"
                    style={{ opacity: _opacity }}>
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
                        <BookButton onClick={handleClick} >
                            {add ? "Add this to the list" : "Delete this from my list"}
                        </BookButton>
                    }
                </Article>)}
        </Motion>
    )
}

export default withFirebase(memo(BookView));