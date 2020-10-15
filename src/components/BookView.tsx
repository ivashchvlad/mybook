import React, { useEffect, MouseEvent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/store'
import { getBookById as getBookByIdAction } from '../redux/actions/booksAction'
import Book from '../interfaces/Book'
import Firebase from '../firebase'
import { withFirebase } from '../components/FirebaseContext'
import { compose } from 'redux'

import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

interface MyOwnProps {
    book: Book,
    id: string,
    getBookById: Function,
    add?: boolean,
    firebase?: Firebase
}

const Article = styled(animated.article)`
    background: #191b21;
    color: white;
    min-height: 200px;
    padding: 2%;
    margin: 2% 5% 2% 5%;
`

function BookView({ book, id, getBookById, add, firebase }: MyOwnProps) {
    const [opacity, setOpacity] = React.useState(0)
    const props = useSpring({config: {mass: 5, tension: 500, friction: 80},
        opacity: opacity,
    });

    useEffect(() => {
        if(book) {
            setOpacity(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [book])

    useEffect(() => {
        if (!book) getBookById(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        firebase?.addBookToList('7hC2oIreSfL7Tyvazida', book.isbn)
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
                (add) && (
                    <button onClick={handleClick}>ADD this to the list</button>
                )
            }
        </Article>
    )
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
    book: state.books.books.find((book: Book) => book.isbn === ownProps.id)
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    getBookById: getBookByIdAction
}, dispatch)

export default compose(
    withFirebase,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(BookView)