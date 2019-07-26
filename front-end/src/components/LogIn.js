import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, PasswordInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn() {
        //logic for login
    }
    
    render() {
        return(
            <div id="login_div">
                <h1>Log In</h1>
                <label>Email</label>
                <TextInput 
                    name = 'email'
                    className='text_input'
                    value = {this.state.email}
                    onChange = {this.onChange}
                    id = 'login_email'  
                    light="true" 
                />
                <label>Password</label>
                <TextInput
                    type="password"
                    className='text_input'
                    name = 'password'
                    value = {this.state.password}
                    onChange = {this.onChange}
                    id = 'login_password'  
                    light="true" 
                />
                <Button 
                    onClick={this.logIn}
                    id="login_login"
                >
                    Log In
                </Button>
            </div>
        )
    }
}
