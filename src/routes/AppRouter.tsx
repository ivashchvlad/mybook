import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Page from './Page'
import App from '../App'
import Books from '../components/Books'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Account from './Account'
import PassForget from './PassForget'


export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/books">
                    <Books />
                </Route>
                <Page path="/signin" title="SignIn">
                    <SignIn />
                </Page>
                <Page path="/signup" title="SignUp">
                    <SignUp />
                </Page>
                <Page path="/account" title="Account">
                    <Account />
                </Page>
                <Page path="/passforget" title="Forget Password">
                    <PassForget />
                </Page>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
    )
}
