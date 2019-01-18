import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'

const Root = ({ }) => (
<Router>
    <Switch>
        <Route 
            path="/:conferenceName" 
            exact
            render = {(props) => <App {...props} />}
         />
        <Route 
            path="/" 
            render = {(props) => <App {...props} />}
        />
    </Switch>
</Router>
)

Root.propTypes = {
}

export default Root