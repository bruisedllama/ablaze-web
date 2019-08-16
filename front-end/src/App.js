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
import AppAccount from './components/user-app-components/AppAccount'
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
            <Navbar/>
            <div id="main">
              {/* NAV ROUTES */ }
              <Route
                path='/' exact
                component = {Home}
              />
              <Route
                path='/login'
                component = {LogIn}
              />
              <Route
                path='/terms'
                component = {UserTerms}
              />
              <Route
                path='/register'
                component = {Register}
              />
              <Route
                path='/app'
                component = {UserApp}
              />
              <Route
                path = '/account'
                component = {AppAccount}
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