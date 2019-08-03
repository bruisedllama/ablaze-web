import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'carbon-components-react'
import $ from 'jquery';
import Home from './Home'
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
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register}/> 
            <Route path="/app" component={UserApp}/> {/*will have a "user app" & "restaurant app"; must be separate interfaces*/}
            <Route path="/partner" component={PartnerHome}/> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App