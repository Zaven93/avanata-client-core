import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import Auth from './pages/Auth'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'
import QrGenerator from './pages/QrGenerator'
import OrdersHistory from './pages/OrdersHistory'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Auth} />
                    <Route path="/services" component={Services} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/code" component={QrGenerator} />
                    <Route path="/orders" component={OrdersHistory} />
                </Switch>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

export default App
