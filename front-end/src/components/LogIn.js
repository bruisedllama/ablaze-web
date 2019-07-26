import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    
    render() {
        return(
            <div id="login_div">
                <h1>Log In</h1>
            </div>
        )
    }
}
