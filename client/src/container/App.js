import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home/Home'
import  Chat  from '../pages/chat/Chat'
const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/chat" component={Chat} />
                </Switch>
            </Router>
        </div>
    )
}
export default App
