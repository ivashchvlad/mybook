import React from 'react';
import { withFirebase } from './FirebaseContext'
import { withRouter } from 'react-router-dom'
import { History } from 'history'
import Firebase from '../firebase'

const SignOut = ({ firebase, history }: {firebase: Firebase, history: History}) => {
    const signingOut = () => {
        firebase.doSignOut();
        history.push('/');
    }
    return (
    <a href="/" onClick={signingOut}>
        Sign Out
    </a>
    )
};

export default withRouter(withFirebase(SignOut));
