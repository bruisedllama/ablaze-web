import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class Register extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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

    register() {
        //logic for registering user
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
