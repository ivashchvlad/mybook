import React from 'react';
import Firebase from '../firebase'

const FirebaseContext = React.createContext({})

const withFirebase = (Component: any) => (props: any)=> (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext
export { Firebase, withFirebase }