import React, { useState, useEffect, FormEvent } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase, Firebase } from '../components/FirebaseContext'
import { History } from 'history'
import { PasswordForgetLink } from './PassForget'

interface myProps {
    firebase: Firebase,
    history: History,
}

function SignIn({ firebase, history }: myProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<Error>()
    const [isInvalid, setIsInvalid] = useState(false)

    useEffect(() => {
        setIsInvalid(
            password === '' || email === ''
        )
    }, [email, password])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        firebase.doSignInWithEmailAndPassword(email, password)
            .then((authUser: any) => {
                setEmail('');
                setError(undefined);
                history.push('/');
            })
            .catch((error: Error) => {
                setError(error);
            });
        e.preventDefault();
    };

    return (
        <div>
            <h1>SignIn</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
            <PasswordForgetLink />
        </div>
    )
}

export default withRouter(withFirebase(SignIn))