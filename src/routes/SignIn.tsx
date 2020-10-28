import React, { useState, useEffect, FormEvent } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase, Firebase } from '../components/FirebaseContext'
import { History } from 'history'
import { PasswordForgetLink } from './PassForget'
import { Form, Input, Button} from '../components/styledComponents'

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email Address"
                />
                <Input
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <Button disabled={isInvalid} type="submit">
                    Sign In
                </Button>

                {error && <p>{error.message}</p>}
                <PasswordForgetLink />
            </Form>
        </div>
    )
}

export default withRouter(withFirebase(SignIn))