import React, { useState, useEffect, FormEvent } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase, Firebase } from '../components/FirebaseContext'
import { History } from 'history'
import { PasswordForgetLink } from './PassForget'
import styled from 'styled-components'

const Form = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Input = styled.input`
    width: 100%;
    height: 36px;
    margin-bottom: 25px;
    border: 2px solid #61dafb;
    border-radius: 10px;
    background-color: #282c34;
    color: #61dafb;
    font-size: 1em;
    padding-left: 5px;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #5d8996;
    }
    :-ms-input-placeholder {
        color: #5d8996;
    }
`
const Button = styled.button`
    width: 100%;
    height: 36px;
    border: 2px solid #61dafb;
    border-radius: 10px;
    background-color: #282c34;
    color: #61dafb;
    text-align: center;
    font-size: 1em;
    :hover {
        border-width: 3px;
    }
`

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