import React from 'react'

import PassForget from './PassForget'
import PassChange from './PassChange'

import { Container } from '../components/styledComponents'


const Account = () => (
    <Container>
        <h1>Account Page</h1>
        <PassForget />
        <PassChange />
    </Container>
);

export default Account;