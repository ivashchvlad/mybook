import React, { useEffect } from 'react'
import { withFirebase } from '../components/FirebaseContext'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'


const AuthUserContext = React.createContext(undefined);

const withAuthentification = (Component: any) => {
    function WithAuth(props: any) {
        const dispatch = useDispatch();
        useEffect(() => {
            props.firebase.auth.onAuthStateChanged((authUser: any) => {
                dispatch({ type: 'AUTH_USER_SET', authUser });
            }, () => {
                props.onSetAuthUser(null);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (<Component {...props} />)
    }
    
    return withFirebase(WithAuth);
}

const withAuthUser = (Component: any) => (props: any) => {
    const authUser = useSelector((state: RootState) => 
        state.session.authUser
    )


    return <Component authUser={authUser} {...props} />
}



export default AuthUserContext
export { withAuthentification, withAuthUser }

