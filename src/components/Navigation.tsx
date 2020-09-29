import React from 'react'
import { Link } from 'react-router-dom'
import { withAuthUser } from '../components/AuthUserContext'

import SignOut from './SignOut';

const Navigation = ({ authUser }: any) => (
    <nav>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </nav>
);
const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={'/'}>Home</Link>
        </li>
        <li>
            <Link to={'/signin'}>Sign In</Link>
        </li>
        <li>
            <Link to={'/signup'}>Sign Up</Link>
        </li>
    </ul>
);

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={'/'}>Home</Link>
        </li>
        <li>
            <Link to={'/account'}>Account</Link>
        </li>
        <li>
            <Link to={'/books'}>Books</Link>
        </li>
        <li>
            <Link to={'/search'}>Search</Link>
        </li>
        <li>
            <SignOut />
        </li>
    </ul>
)

export default withAuthUser(Navigation);