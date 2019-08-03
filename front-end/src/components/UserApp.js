import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput, PasswordInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class UserApp extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //get client data
    }
    
    render() {
        if (this.props.loggedIn === false) {
            return <Redirect to='/login' />
        }

        return(
            <div id="login_div">
                <h1>LOGGED IN</h1>
            </div>
        )
    }
}
