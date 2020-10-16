import React, { FunctionComponent } from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import Page from './Page';

interface PrivatePageProps extends RouteProps {
    component: any,
    isLoggedIn: boolean,
    title: string,
}


const PrivatePage: FunctionComponent<PrivatePageProps> = ({
    component: Component, 
    isLoggedIn, 
    ...rest
}) => {
    return (
        <Page 
            {...rest}
            title = {rest.title}
            render={props => isLoggedIn? (
                <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )}
        />
    )
}

function mapStateToProps(state: any){
    console.log(state);
    return {
        isLoggedIn: state.session.authUser,
    };
}

export default connect(mapStateToProps)(PrivatePage)
