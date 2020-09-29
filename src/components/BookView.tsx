import React, { useEffect, MouseEvent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/store'
import { getBookById as getBookByIdAction} from '../redux/actions/booksAction'
import Book from '../interfaces/Book'
import Firebase from '../firebase'
import { withFirebase } from '../components/FirebaseContext'
import { compose } from 'redux'

interface MyOwnProps {
    book: Book,
    id: string,
    getBookById: Function,
    add? : boolean,
    firebase?: Firebase
}

function BookView({book, id, getBookById, add, firebase}: MyOwnProps) {
    useEffect(() => {
        if(!book) getBookById(id);
        console.log('ok?')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        firebase?.addBookToList('7hC2oIreSfL7Tyvazida', book.isbn)
    }
    return (
        <div className="book">
            { !!book && (
                <>
                    <h3>{book.titleweb}</h3>
                    <h4>{book.authorweb}</h4>
                    <div 
                        dangerouslySetInnerHTML={
                            {
                                __html: book.flapcopy
                            }
                        }></div>
                </>
            )}
            {
                (add) && (
                    <button onClick={handleClick}>ADD this to the list</button>
                )
            }
        </div>
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