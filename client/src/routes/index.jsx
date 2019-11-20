import React, { Component, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import LazyLoadingHOC from '@hoc/LazyLoading'
import auth from './Auth'

const MainContainer = lazy(() => import('@components/MainContainer'))
const TestComponent = lazy(() => import('@components/TestComponent'))
const AuthComponent = lazy(() => import('@components/AuthComponent'))
const Posts = lazy(() => import('@components/Posts'))
const Error404Component = lazy(() => import('@components/Error404Component'))
const Timeline = lazy(() => import('@components/Timeline'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        true
            ? <Component {...props} {...rest} />
            : (<Redirect to={'/auth'} />)
    )} />
)

export default class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/auth" name="Auth" component={LazyLoadingHOC(AuthComponent)} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <MainContainer>
                            <PrivateRoute exact path="/" name="Posts" component={LazyLoadingHOC(Posts)} />
                            <PrivateRoute exact path="/timeline" name="Timeline" component={LazyLoadingHOC(Timeline)} />
                        </MainContainer>
                    </Suspense>
                    <Route path="*" name="Error 404" component={LazyLoadingHOC(Error404Component)} />
                </Switch>
            </React.Fragment>
        )
    }
}