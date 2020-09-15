import React, { useEffect } from 'react'
import { withFirebase } from '../components/FirebaseContext'
import { connect } from 'react-redux'
import { compose } from 'redux'


const AuthUserContext = React.createContext(undefined);

const withAuthentification = (Component: any) => {
    function WithAuth(props: any) {
        useEffect(() => {
            props.firebase.auth.onAuthStateChanged((authUser: any) => {
                props.onSetAuthUser(authUser);
            }, () => {
                props.onSetAuthUser(null);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (<Component {...props} />)
    }
    const mapDispatchToProps = (dispatch: any) => ({
        onSetAuthUser: (authUser: any) =>
            dispatch({ type: 'AUTH_USER_SET', authUser }),
    });
    return compose(
        withFirebase,
        connect(null, mapDispatchToProps)
    )(WithAuth);
}

const withAuthUser = (Component: any) => {
    const mapStateToProps = (state: any) => ({
        authUser: state.session.authUser,
    })

    return connect(mapStateToProps)((props: any) => (
        <Component authUser={props.authUser} {...props} />
    ))
}



export default AuthUserContext
export { withAuthentification, withAuthUser }

