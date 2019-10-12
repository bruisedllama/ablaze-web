
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Logo from './../../images/logo-long.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PartnerNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    logout = () => {
        this.props.changeLoginStatus(false, '')
        localStorage.removeItem("partner-token")
        localStorage.removeItem("currentPartnerData")
    }
    
    render() {
        const path = this.props.location.pathname //get path
        return(
            <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor: 'black'}} id="partner-nav">
                    <Link className="navbar-brand" to="/partner" id="nav-logo" style={{color: "white", fontWeight: '900'}}><img src={Logo}/> <strong>for Partners</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item" style={{display: path == '/partner/dashboard' ? 'none' : 'inline'}}>
                        <Link to={!this.props.loggedIn ? "/partner/login" : "/partner/dashboard"}> <button id="partner-login" className="main-button">{this.props.loggedIn ? "Dashboard" : "Login"}</button></Link>
                        </li>
                        <li className="nav-item" style={{display: path == '/partner/dashboard' ? 'inline' : 'none', marginTop: "2px"}}>
                            <button id="main-logout" className="secondary-button" onClick={this.logout}>Logout</button>
                        </li>
                        </ul>
                    </div>
            </nav>
        )
    }
}

export default withRouter(PartnerNav)