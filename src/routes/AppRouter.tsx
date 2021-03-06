import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Page from './Page'
import PrivatePage from './PrivatePage'
import App from '../App'
import Books from '../components/Books'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Account from './Account'
import PassForget from './PassForget'
import Navigation from '../components/Navigation'
import {withAuthentification} from '../components/AuthUserContext'
import Search from './Search'


function AppRouter() {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Page path="/books" title="MyBookList">
                    <Books />
                </Page>
                <Page path="/search" title="Search">
                    <Search />
                </Page>
                <Page path="/signin" title="SignIn">
                    <SignIn />
                </Page>
                <Page path="/signup" title="SignUp">
                    <SignUp />
                </Page>
                <PrivatePage path="/account" title="Account"
                component={Account}/>
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

export default withAuthentification(AppRouter)
