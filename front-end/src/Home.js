import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="homepage">
                <section id="main-home">
                    <h1>Welcome to Ablaze</h1>
                    <h3>Rewarding you for supporting local businesses.</h3>
                    <br />
                    <Link to="/register"><button className="secondary-button">Sign Up Today</button></Link>
                    <br /><br />
                    <Link to="/partner" className="main-link">Are you a local business? Become an Ablaze partner here.</Link>
                </section>
            </div>
        )
    }
}
