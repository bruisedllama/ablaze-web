import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.logIn = this.logIn.bind(this)
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:5000"  +'/api/userauth/login', user).then((response) => {
            response.errors && console.log(response.errors)
            if (response.data.success) {
                console.log("logged in!")
                localStorage.setItem("token", response.data.token)
                this.props.changeLoginStatus(true)
            }else {
                console.log(response)
            }
        })
    }
    
    render() {
        if (this.props.loggedIn === true) {
            return <Redirect to='/app' />
        }

        return(
            <div id="login_div">
                <h2>Log In</h2>
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
                    style={{marginBottom: "20px"}}
                >
                    Log In
                </Button>
                <br />
                <Link className="main-link" to="/register">Don't have an account? Register Today</Link>
            </div>
        )
    }
}
