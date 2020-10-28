import React, { useState, FormEvent } from 'react';
import { Form, Input, Button} from '../components/styledComponents'
import { withFirebase } from '../components/FirebaseContext';


function PasswordChangeForm({ firebase }: any) {
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [error, setError] = useState<Error>()


    const handleSubmit = (e: FormEvent) => {
        firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                setPasswordOne('');
                setPasswordTwo('');
                setError(undefined);
            })
            .catch((error: Error) => {
                setError(error);
            });

        e.preventDefault();
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name="passwordOne"
                value={passwordOne}
                onChange={e => setPasswordOne(e.target.value)}
                type="password"
                placeholder="New Password"
            />
            <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={e => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <Button disabled={
                passwordOne !== passwordTwo ||
                passwordOne === ''
            }
                type="submit"
            >
                Reset My Password
            </Button>

            {error && <p>{error.message}</p>}
        </Form>
    );
}

export default withFirebase(PasswordChangeForm);