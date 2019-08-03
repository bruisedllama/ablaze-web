import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class PartnerRegister extends React.Component {
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
       console.log(this.state)
    }

    register() {
        //continue to next page of Partner's registration process
    }

    render() {
        const options = [
            { value: 'restaurant', label: 'Restaurant' },
            { value: 'general_store', label: 'General Store' },
            { value: 'specialty_store', label: 'Specialty Store' },
            { value: 'education', label: 'Education' },
            { value: 'entertainment', label: 'Entertainment' }
        ]

        const customStyles = {
            option: (provided) => ({
              ...provided,
              fontSize: "14px"
            }),
            input: (provided) => ({
                ...provided,
                fontSize: "14px",
            
            }),
            placeholder: (provided) => ({
                ...provided,
                fontSize: "14px",
            }),
            valueContainer: (provided) => ({
                ...provided,
                fontSize: "14px",
                marginLeft: "7px"
            }),
            singleValue: (provided) => ({
                ...provided,
                fontSize: "14px",
            })
          }

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
                        name = 'storeAddress'
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
                        type="email"
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
                        type="phone"
                        placeholder="enter your store phone number..."
                    />
                    <label>Type of Business</label>
                    <Select
                        name = 'storeType'
                        onClick = {this.onChange}
                        id = 'register_store_type'  
                        options={options}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary: '#0062ff',
                              },
                        })}
                        styles={customStyles}
                    >
                    </Select>
                    <button 
                        onClick={this.register}
                        id="register_register"
                        className="main-button"
                    >
                        Get Started  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                    </button>
            </div>
        )
    }
}
