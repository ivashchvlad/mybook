import React, { useState, useEffect, FormEvent } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../components/FirebaseContext'
import { Form, Input, Button, Container } from '../components/styledComponents'

function SignUp({firebase, history}: any) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [error, setError] = useState<Error>()
    const [isInvalid, setIsInvalid] = useState(false)

    useEffect(() => {
      setIsInvalid(
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === ''
      )
    }, [username, email, passwordOne, passwordTwo])
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        firebase.user(authUser.user.uid).set({
          username,
          email,
        });
        setUsername('');
        setEmail('');
        setError(undefined);
        history.push('/');
      })
      .catch((error: Error) => {
        setError(error);
        console.log(error);
      });
        e.preventDefault();
    };

    return (
        <Container>
            <h1>Sign up</h1>
            <Form onSubmit={handleSubmit}>
              <Input
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                placeholder="Full Name"
              />
              <Input
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
              />
              <Input
                name="passwordOne"
                value={passwordOne}
                onChange={e => setPasswordOne(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={e => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              <Button disabled={isInvalid} type="submit">
                Sign Up
              </Button>

              {error && <p>{error.message}</p>}
            </Form>
        </Container>
    )
}

export default withRouter(withFirebase(SignUp));

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to='signup'>Sign Up</Link>
    </p>
);
