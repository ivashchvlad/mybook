import React, { useState, useEffect } from 'react'
import { withFirebase } from '../components/FirebaseContext'
import { connect } from 'react-redux'
import { compose } from 'redux'


const AuthUserContext = React.createContext(undefined);

const withAuthentification = (Component: any) => {
    function WithAuth(props: any) {
        const [authUser, setAuthUser] = useState()
        useEffect(() => {
            props.firebase.auth.onAuthStateChanged((authUser: any) => {
                authUser
                    ? setAuthUser(authUser)
                    : setAuthUser(undefined)
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (
            <AuthUserContext.Provider value={authUser}>
                <Component {...props} />
            </AuthUserContext.Provider>
        )
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

const withAuthUser = (Component: any) => (props: any) => (
    <AuthUserContext.Consumer>
        {authUser => <Component authUser={authUser} {...props} />}
    </AuthUserContext.Consumer>
)

export default AuthUserContext
export { withAuthentification, withAuthUser }