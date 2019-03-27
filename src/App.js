
import {Route, Switch} from 'react-router-dom';
import React from 'react';

import LoginForm from './component/LoginForm';
import Home from './component/Home';
import SignupForm from './component/SignupForm';

export default class App extends React.Component {
    render() {
        const App = () => (
          <div>
            <Switch>
              <Route exact path='/' component ={LoginForm}/>
              <Route exact path='/signup' component ={SignupForm}/>
              <Route exact path='/home' component ={Home}/>
            </Switch>
          </div>
        )
        return (
          <Switch>
            <App/>
          </Switch>
        )
    }
}

