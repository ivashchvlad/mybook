import React from 'react';
import { withFirebase } from './FirebaseContext'
import Firebase from '../firebase'

const SignOut = ({ firebase }: {firebase: Firebase}) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOut);
