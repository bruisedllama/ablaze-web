import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn = (e) => {
        localStorage.removeItem('partner-token')
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000' + '/api/users/login', user)
            .then(response => {
                console.log(response)
                console.log("logged in!")
                localStorage.setItem("token", response.data.token)
                this.props.changeLoginStatus(true, user.email)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    let errorData = [error.response.data.email ? error.response.data.email : null, error.response.data.password ? error.response.data.password : null, error.response.data.passwordincorrect ? error.response.data.passwordincorrect : null, error.response.data.emailnotfound ? error.response.data.emailnotfound : null]
                    errorData = errorData.filter((el) => {
                        return el != null;
                    }).join(', ')
                    this.setState({errors: errorData})
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
    
    render() {
        if (this.props.loggedIn) {
            return <Redirect to='/app' />
        }

        return(
            <div id="login_bg">
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
                <div className="alert alert-danger" id="error-message" role="alert" style={{display: this.state.errors ? 'block' : 'none'}}>
                        errors: {this.state.errors}
                </div>
                <Link style={{display: 'block'}} className="main-link" to="/register">Don't have an account? Register Today</Link>
            </div>
            </div>
        )
    }
}
