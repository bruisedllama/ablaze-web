import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storeName: '',
            storeAddress: '',
            email: '',
            phone: '',
            storeType: ''
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
        //continue to next page of Partner's registration process
    }

    render() {
        return(
            <div id="partner-register-div">
                    <h2>Register your Business for Ablaze</h2>
                    <label>Store Name</label>
                    <TextInput 
                        name = 'storeName'
                        className='text_input'
                        value = {this.state.storeName}
                        onChange = {this.onChange}
                        id = 'register_store_name'  
                        light="true" 
                        placeholder="enter your store name..."
                    />
                    <label>Store Address</label>
                    <TextInput 
                        name = 'email'
                        className='text_input'
                        value = {this.state.storeAddress}
                        onChange = {this.onChange}
                        id = 'register_store_address'  
                        light="true" 
                        placeholder="enter your store address..."
                    />
                    <label>Email</label>
                    <TextInput
                        className='text_input'
                        name = 'email'
                        value = {this.state.email}
                        onChange = {this.onChange}
                        id = 'register_store_email'  
                        light="true" 
                        placeholder="enter your store email..."
                    />
                    <label>Phone</label>
                    <TextInput
                        className='text_input'
                        name = 'phone'
                        value = {this.state.phone}
                        onChange = {this.onChange}
                        id = 'register_store_phone'  
                        light="true" 
                        placeholder="enter your store phone number..."
                    />
                    <button 
                        onClick={this.register}
                        id="register_register"
                        className="main-button"
                    >
                        Get Started
                    </button>
            </div>
        )
    }
}
