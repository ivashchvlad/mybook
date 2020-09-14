import React, { FunctionComponent, useEffect } from 'react'
import { Route, RouteProps } from 'react-router-dom'

interface PageProps extends RouteProps {
    title: string;
}

const Page: FunctionComponent<PageProps> = props => {
    useEffect(() => {
        document.title = "MyBookList | " + props.title;
    });

    const { title, ...rest } = props;
    return <Route { ...rest } />;
};

export default Page;