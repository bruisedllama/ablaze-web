import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
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
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/userauth/login', user).then(function(response) {
            if (response.success) {
                localStorage.setItem("token", response.token);
            }else {
                console.log(response)
            }
        })
    }
    
    render() {
        return(
            <div id="login_div">
                <h3>Log In</h3>
                <label>Email</label>
                <TextInput 
                    name = 'email'
                    className='text_input'
                    value = {this.state.email}
                    onChange = {this.onChange}
                    id = 'login_email'  
                    light="true" 
                    placeholder="enter your email..."
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
                    placeholder="enter your password..."
                />
                <Button 
                    onClick={this.logIn}
                    id="login_login"
                    className="main-button"
                >
                    Log In
                </Button>
                <br />
                <Link className="main-link" to="/register">Don't have an account? Register Today</Link>
            </div>
        )
    }
}
