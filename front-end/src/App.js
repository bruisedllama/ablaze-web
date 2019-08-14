import React, { Component } from "react";
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'carbon-components-react'
import $ from 'jquery';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import Home from './components/Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import UserTerms from './components/UserTerms'
import UserApp from './components/UserApp'
import Navbar from './components/Navbar'
import PartnerHome from './components/PartnerHome'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = './login'
  }
}
class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    //get user data & login status from API
  } 
  
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div id="body">
            <Navbar loggedIn={this.state.loggedIn} name={this.state.name}/>
            <div id="main">
              {/* NAV ROUTES */ }
              <Route
                path='/' exact
                render={(props) => <Home {...props} loggedIn={this.state.loggedIn} />}
              />
              <Route
                path='/login'
                render={(props) => <LogIn {...props} loggedIn={this.state.loggedIn} />}
              />
              <Route
                path='/terms'
                render={(props) => <UserTerms {...props} loggedIn={this.state.loggedIn} />}
              />
              <Route
                path='/register'
                render={(props) => <Register {...props} loggedIn={this.state.loggedIn} />}
              />
              <Route
                path='/app'
                render={(props) => <UserApp {...props} loggedIn={this.state.loggedIn} />}
              />
              <Route path="/partner" exact component={PartnerHome}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App