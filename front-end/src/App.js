import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'carbon-components-react'
import $ from 'jquery';
import axios from 'axios'
import Home from './components/Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import UserApp from './components/UserApp'
import Navbar from './components/Navbar'
import PartnerApp from './components/PartnerApp'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      loaded: false,
      currentUser: {}
    }
  }

  changeLoginStatus = (data, email) => {
    //get user data for email...
    axios.get('http://localhost:5000' + '/api/users/get/' + email)
      .then((response) => {
        console.log(response.data)
        this.setState({loggedIn: data, currentUser: response.data}, () => {
          localStorage.setItem('currentUserData', JSON.stringify(response.data))
        })
      }).catch(err => console.log(err))
  }

  componentDidMount() { 
    localStorage.getItem('token') != null && this.setState({loggedIn: true, currentUser: JSON.parse(localStorage.getItem('currentUserData'))})
    this.setState({loaded: true})
  } 

  componentDidUpdate() { //call changeLoginStatus when component needs to update
    //localStorage.getItem('token') != null && this.changeLoginStatus(true, this.state.currentUser.email)
  }
  
  render() {
    if(!this.state.loaded) {
      return (<div>LOADING</div>)
    } else {
      return (
        <Router>
          <div id="body">
            <Navbar loggedIn={this.state.loggedIn} user={this.state.currentUser} changeLoginStatus={this.changeLoginStatus}/>
            <div id="main">
              {/* NAV ROUTES */ }
              <Route
                path='/' exact
                render={(props) => <Home {...props} user={this.state.currentUser} loggedIn={this.state.loggedIn} />}
              />
              <Route
                path='/login'
                render={(props) => <LogIn {...props} user={this.state.currentUser} loggedIn={this.state.loggedIn} changeLoginStatus={this.changeLoginStatus}/>}
              />
              <Route
                path='/register'
                render={(props) => <Register {...props} user={this.state.currentUser} loggedIn={this.state.loggedIn} changeLoginStatus={this.changeLoginStatus}/>}
              />
              <Route
                path='/app'
                render={(props) => <UserApp {...props} user={this.state.currentUser} loggedIn={this.state.loggedIn} changeLoginStatus={this.changeLoginStatus}/>}
              />
              <Route path="/partner" component={PartnerApp}/>
            </div>
          </div>
        </Router>
      );
    }
  }
}

export default App