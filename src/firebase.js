import app from 'firebase/app'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }
    // *** Auth API ***     
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    addBookToList = (id, book) => {
        this.db.collection('lists').doc(id).update({
            books: firebase.firestore.FieldValue.arrayUnion(book),
        })
    }

    deleteBookFromList = (listId, bookId) => {
        this.db.collection('lists').doc(listId).update({
            books: firebase.firestore.FieldValue.arrayRemove(bookId),
        })
    }

    user = uid => this.db.collection('users').doc(uid);

    users = () => this.db.collection('users');

    list = id => this.db.collection('lists').doc(id);

    lists = () => this.db.collection('lists');
}
export default Firebase;