import React from 'react'

import PassForget from './PassForget'
import PassChange from './PassChange'

import { Container } from '../components/styledComponents'
import styled from 'styled-components'


const MyContainer = styled(Container)`
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content 1fr; 
    width: 900px;
    align-items: start;
`

const Title = styled.h1`
    grid-column: span 2;
`


const Account = () => (
    <MyContainer>
        <Title>Account Page</Title>
        <PassForget />
        <PassChange />
    </MyContainer>
);

export default Account;