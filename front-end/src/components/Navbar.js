import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="main-nav">
                <div class="container">
                <Link class="navbar-brand" to="/">Ablaze</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/About" className="nav-link">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Services" className="nav-link">Services</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Contact" className="nav-link">Contact</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={!this.props.loggedIn ? "/login" : "/app"}> <button id="main-login" className="main-button">{this.props.loggedIn ? "Welcome " + this.props.name : "Login"}</button></Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}

