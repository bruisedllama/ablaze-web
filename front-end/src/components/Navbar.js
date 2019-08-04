import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'
import Logo from './../images/logo-long.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebar: false
        }
        this.toggleSidebar = this.toggleSidebar.bind(this)
    }

    logout() {
        //logout logic
    }

    toggleSidebar() {
        this.setState({
            sidebar: !this.state.sidebar
        })
        this.forceUpdate()
    }
    
    render() {
        const path = this.props.location.pathname //get path
        const leftMargin = this.state.sidebar ? '0' : '-600px'
        //on app page
        if(path.includes("app")) {
            return(
                <div>
                    <div id="app-menu-button" onClick={this.toggleSidebar} style={{padding: this.state.sidebar ? "7px 13px" : "7px 11px"}}><FontAwesomeIcon className="fa-icon" icon={this.state.sidebar ? faTimes : faBars} style={{color: this.state.sidebar ? "fefefe" : "#333"}}/></div>
                    <div id="app-sidebar" style={{left: leftMargin}}>
                        <Link to='/app' className="sidenav-item" onClick={this.toggleSidebar}>Home</Link>
                        <Link to='/app/deals' className="sidenav-item" onClick={this.toggleSidebar}>My Deals</Link>
                        <Link to='/app/account' className="sidenav-item" onClick={this.toggleSidebar}>My Account</Link>
                        <a className="sidenav-item">Logout</a>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="app-nav">
                        <Link className="navbar-brand" to="/" id="nav-logo"><img src={Logo}/></Link>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item" style={{marginTop: "2px"}}>
                                <button id="main-logout" className="secondary-button" onClick={this.logout}>Logout</button>
                            </li>
                            </ul>
                        </div>
                    </nav>  
                </div>
            )
        }

        //not on app page
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="main-nav">
                <Link className="navbar-brand" to="/" id="nav-logo"><img src={Logo}/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
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
                    <li className="nav-item" style={{marginTop: "3px", display: this.props.loggedIn && "none"}}>
                    <Link to="/Register"> <button id="main-signup" className="secondary-button">Sign Up</button></Link>
                    </li>
                    <li className="nav-item" style={{marginTop: "2px"}}>
                    <Link to={!this.props.loggedIn ? "/login" : "/app"}> <button id="main-login" className="main-button">{this.props.loggedIn ? "Welcome, " + this.props.name : "Login"}</button></Link>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
