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
                </section>
            </div>
        )
    }
}
