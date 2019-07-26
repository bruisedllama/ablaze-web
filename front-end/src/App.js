import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from './components/LogIn'
import Register from './components/Register'
/*import RegisterUser from './components/RegisterUser'
import RegisterRestaurant from './components/RegisterRestaurant'
import AppUser from './components/AppUser'
import AppRestaurant from './components/AppRestaurant'*/

class App extends Component {
  render() {
    return (
      <Router>
        <div id="body">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Ablaze</Link>
          </nav>
          <div id="main">
            {/* APP ROUTES */ }
            <Route path="/" exact component={LogIn} />
            <Route path="/register" component={Register}/>
            {/*<Route path="/app" component={UserApp}/>*/}
          </div>
        </div>
      </Router>
    );
  }
}

export default App