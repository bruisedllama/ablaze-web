import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Register extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
    }

    onChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    register(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        axios.post("http://localhost:5000"   + '/api/userauth/register', newUser).then(function(response) {
            console.log(response.errors); // error message or user
            if(response.success) {
                return <Redirect to= '/login'></Redirect>
            }
        })
    }

    render() {
        return(
            <div id="register_main">
                <div id="register_div">
                    <h3>Register as an Ablaze User</h3>
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
                    <Button 
                        onClick={this.register}
                        id="register_register"
                        className="main-button"
                    >
                        Register
                    </Button>
                </div>
            </div>
        )
    }
}
