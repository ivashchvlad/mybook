import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button} from '../components/styledComponents'
import { withFirebase } from '../components/FirebaseContext';

const PassForget = () => (
    <div>
        <h1>Forget Password?</h1>
        <PasswordForgetForm />
    </div>
);

function PasswordForgetFormBase({ firebase }: any) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<Error>()

    const handleSubmit = (e: any) => {
        firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('')
                setError(undefined)
            })
            .catch((error: Error) => {
                setError(error)
            });

        e.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
            />
            <Button disabled={email === ''} type="submit">
                Reset My Password
        </Button>

            {error && <p>{error.message}</p>}
        </Form>
    );
}

const PasswordForgetLink = () => (
    <p>
        <Link to={'/passforget'}>Forgot Password?</Link>
    </p>
);

export default PassForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };