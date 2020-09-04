import React, { useState, useEffect, FormEvent } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../components/FirebaseContext'

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
        setUsername('');
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
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
            <input
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={e => setPasswordOne(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withRouter(withFirebase(SignUp));

export const SignUpLink = () => (
    <p>
        Don't have an account? <Link to='signup'>Sign Up</Link>
    </p>
);
