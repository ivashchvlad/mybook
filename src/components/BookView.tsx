import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../redux/store'
import { getBookById as getBookByIdAction} from '../redux/actions/booksAction'
import Book from '../interfaces/Book'

interface MyOwnProps {
    book: Book,
    id: string,
    getBookById: Function
}

function BookView({book, id, getBookById}: MyOwnProps) {
    useEffect(() => {
        getBookById(id);
        console.log('ok?')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
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
        </div>
    )
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
    book: state.books.books.find((book: Book) => book.isbn === ownProps.id)
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    getBookById: getBookByIdAction
}, dispatch)

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BookView)