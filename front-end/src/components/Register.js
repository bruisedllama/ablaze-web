import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput, Button, Checkbox } from 'carbon-components-react'
import UserTerms from './user-app-components/UserTerms'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class Register extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            termsChecked: false,
            errors: '',
            termsShown: false,
            terms: false
        }
        this.register = this.register.bind(this)
    }

    onChange = (event) => {
        const {name, value} = event.target
        name !== 'termsChecked' ? this.setState({[name]: value}) : this.setState({[name]: !this.state.termsChecked})
    }

    getStarted = () => {
        let input = this.state
        let missing = []
        if(input.name == '')
            missing.push("Name is required")
        if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(input.email))
            missing.push("Valid email address is required")
        if(input.password.length < 6 || input.password.length > 30)
            missing.push('Password must be at least 6 characters')
        if(input.password != input.password2)
            missing.push('Passwords must match')
        if(missing.length > 0)
            this.setState({errors: missing.join(', ')})
        else
            this.setState({termsShown: true})
    }

    register(e) {
        e.preventDefault();
        if(this.state.terms) {
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            };
            axios.post("http://localhost:5000"   + '/api/users/register', newUser)
                .then(response => {
                    console.log(response)
                    const user = {
                        email: newUser.email,
                        password: newUser.password
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
                                this.setState({errors: error.response.data.email + ', ' + error.response.data.password})
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        })
                    }).catch((error) => {
                        if (error.response) {
                            let errorData = [error.response.data.name ? error.response.data.name : null, error.response.data.email ? error.response.data.email : null, error.response.data.password ? error.response.data.password : null, error.response.data.password2 ? error.response.data.password2 : null]
                            errorData = errorData.filter((el) => {
                                return el != null;
                            }).join(', ')
                            this.setState({errors: errorData})
                            console.log(error.response.data)
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
    }

    render() {
        if (this.props.loggedIn === true) {
            return <Redirect to='/app' />
        }

        return(
            <div id="register_main">
                <div id="terms_div" 
                style={{
                    position: 'fixed',
                    boxShadow: this.state.termsShown ? '0px 0px 300px #333' : '0px 0px 0px #aaa',
                    width: '90%',
                    height: '90vh',
                    left: '5%',
                    top: this.state.termsShown ? '5vh' : '-150vh',
                    backgroundColor: 'white',
                    padding: '8vh 8%',
                    zIndex: '99999',
                    transitionDuration: '0.3s'
                }}>
                    <h2>Terms & Conditions</h2>
                    <UserTerms/>
                    <Checkbox
                        id="reg-terms-check"
                        checked={this.state.terms}
                        onChange={(value, id, event) => this.setState({terms: value})}
                    />
                    <p style={{margin: '-35px 0px 0px 30px'}}>I have read and agree to the terms and conditions.</p>
                    <button 
                        onClick={this.register}
                        id="register_register"
                        className="main-button"
                    >
                        Register  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                    </button>

                </div>
                <div id="register_div">
                    <h2>Register for Ablaze</h2>
                    <label>Name</label>
                    <TextInput 
                        name = 'name'
                        className='text_input'
                        value = {this.state.name}
                        onChange = {this.onChange}
                        id = 'register_name'  
                        light="true" 
                        placeholder="enter your full name..."
                    />
                    <label>Email</label>
                    <TextInput 
                        name = 'email'
                        className='text_input'
                        value = {this.state.email}
                        onChange = {this.onChange}
                        id = 'register_email'  
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
                        id = 'register_password'  
                        light="true" 
                        placeholder="enter your password..."
                    />
                    <label>Re-enter Password</label>
                    <TextInput
                        type="password"
                        className='text_input'
                        name = 'password2'
                        value = {this.state.password2}
                        onChange = {this.onChange}
                        id = 'register_password2'  
                        light="true" 
                        placeholder="enter your password again..."
                    />
                    <br/>
                    <button 
                        onClick={this.getStarted}
                        id="register_getstarted"
                        className="main-button"
                    >
                        Get Started <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                    </button>
                    <div className="alert alert-danger" role="alert" id="error-message" style={{marginTop: 30, display: this.state.errors ? 'block' : 'none'}}>
                        error: {this.state.errors}
                    </div>
                </div>
            </div>
        )
    }
}
