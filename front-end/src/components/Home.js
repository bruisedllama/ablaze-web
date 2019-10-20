import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="homepage">
                <section id="main-home">
                    <h1>Rewarding <i>you</i> for supporting local businesses</h1>
                    <h3>Connecting communities. Ablaze.</h3>
                    <br />
                    <Link to="/register"><button className="secondary-button">{this.props.loggedIn ? "Search for Deals" : "Sign Up Today"} <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/></button></Link>
                    <br /><br />
                    <Link to="/partner" className="main-link">Are you a local business? Become an Ablaze partner </Link>
                </section>
                <section id="home-about">
                    <h2>How does it work?</h2>
                    <div className="row">
                        <div className="col-sm-4">
                            <h4>Search for Local Businesses</h4>
                        </div>
                        <div className="col-sm-4">
                            <h4>Claim Your Deals</h4>
                        </div>
                        <div className="col-sm-4">
                            <h4>Redeem Your Deals at Businesses</h4>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
