import React, { useState, FormEvent } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={e => setPasswordOne(e.target.value)}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={e => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={
                passwordOne !== passwordTwo ||
                passwordOne === ''
            }
                type="submit"
            >
                Reset My Password
                </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

export default withFirebase(PasswordChangeForm);