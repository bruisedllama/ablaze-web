import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'carbon-components-react'
import $ from 'jquery';
import Home from './components/Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import UserApp from './components/UserApp'
import Navbar from './components/Navbar'
import PartnerHome from './components/PartnerHome'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      name: "Tester"
    }
  }

  componentDidMount() {
    //get user data & login status from API
  } 
  
  render() {
    return (
      <Router>
        <div id="body">
          <Navbar loggedIn={this.state.loggedIn} name={this.state.name}/>
          <div id="main">
            {/* APP ROUTES */ }
            <Route path="/" exact component={Home} />
            <Route
              path='/login'
              render={(props) => <LogIn {...props} loggedIn={this.state.loggedIn} />}
            />
            <Route
              path='/register'
              render={(props) => <Register {...props} loggedIn={this.state.loggedIn} />}
            />
            <Route
              path='/app'
              render={(props) => <UserApp {...props} loggedIn={this.state.loggedIn} />}
            />
            <Route path="/partner" component={PartnerHome}/> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App