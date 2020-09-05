import React, { useState, useEffect } from 'react';
import { withFirebase } from '../components/FirebaseContext'

const AuthUserContext = React.createContext(undefined);

const withAuthentification = (Component: any) => {
    function WithAuth (props: any) {
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
    return withFirebase(WithAuth);
}

const withAuthUser = (Component: any) => (props: any) => (
    <AuthUserContext.Consumer>
        {authUser => <Component authUser={authUser} {...props} />}
    </AuthUserContext.Consumer>
)

export default AuthUserContext
export { withAuthentification, withAuthUser }