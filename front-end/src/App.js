import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'carbon-components-react'
import Home from './Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import UserApp from './components/UserApp'
/*import RegisterUser from './components/RegisterUser'
import RegisterRestaurant from './components/RegisterRestaurant'
import AppUser from './components/AppUser'
import AppRestaurant from './components/AppRestaurant'*/

class App extends Component {
  render() {
    return (
      <Router>
        <div id="body">
          <nav className="navbar navbar-expand-lg navbar-light bg-light" id="main-nav">
            <Link to="/" className="navbar-brand">Ablaze</Link>
            <Link to="/login"> <Button id="main-login">Login</Button></Link>
          </nav>
          <div id="main">
            {/* APP ROUTES */ }
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register}/> 
            <Route path="/app" component={UserApp}/> {/*will have a "user app" & "restaurant app"; must be separate interfaces*/}
          </div>
        </div>
      </Router>
    );
  }
}

export default App