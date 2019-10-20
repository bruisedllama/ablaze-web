import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import axios from 'axios'
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class PartnerBusiness extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            storeType: this.props.currentPartner.storeType,
            storeAddress: this.props.currentPartner.storeAddress,
            storeEmail: this.props.currentPartner.storeEmail,
            phone: this.props.currentPartner.phone,
            storeDetails: this.props.currentPartner.storeDetails,
            storeDescription: this.props.currentPartner.storeDescription,
            errors: '',
            updated: false
        }
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    onSelect = (opt, name) => {
        this.setState({ [name]: opt.value })
    }

    componentDidMount() {
    }

    toggleEdit = () => {
        this.setState({edit: !this.state.edit, updated: false, errors: ''})
    }

    updateBusinessInfo = (e) => {
        e.preventDefault()
        let input = this.state
        let missing = []
        if(input.storeType == '')
            missing.push("Store type is required")
        if(!/\d+(\s+\w+){1,}\s+(?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|ave(?:\.|nue)?|rd|road|lane|drive|way|court|plaza|square|run|parkway|point|pike|driveway|trace|park|terrace|blvd|ln|pk|sqr|dr)/.test(input.storeAddress.toLowerCase()))
            missing.push("Valid store address is required")
        if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(input.storeEmail))
            missing.push("Valid store email address is required")
        if(missing.length > 0)
            this.setState({errors: missing.join(', ')})
        else {
            const email = this.props.currentPartner.managerEmail
            const updatedInfo = {
                managerEmail: email,
                storeType: this.state.storeType,
                storeAddress: this.state.storeAddress,
                storeEmail: this.state.storeEmail,
                phone: this.state.phone,
                storeDetails: this.state.storeDetails,
                storeDescription: this.state.storeDescription
            }
            axios.post("http://localhost:5000"   + '/api/partners/update/' + this.props.currentPartner._id, updatedInfo)
                .then(response => {
                    console.log(response)
                    console.log("updated succesfully!")
                    this.setState({updated: true, errors: ''})
                    this.props.changeLoginStatus(true, this.props.currentPartner.managerEmail)
                }).catch((error) => {
                    if (error.response) {
                        //let errorData = [error.response.data.name ? error.response.data.name : null, error.response.data.email ? error.response.data.email : null, error.response.data.password ? error.response.data.password : null, error.response.data.password2 ? error.response.data.password2 : null]
                        /*errorData = errorData.filter((el) => {
                            return el != null;
                        }).join(', ')
                        this.setState({errors: errorData})*/
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
        const options = [
            { value: 'restaurant', label: 'Restaurant' },
            { value: 'general_store', label: 'General Store' },
            { value: 'specialty_store', label: 'Specialty Store' },
            { value: 'education', label: 'Education' },
            { value: 'entertainment', label: 'Entertainment' },
            { value: 'service', label: 'Service' },
            { value: 'other', label: 'Other...' },
        ]

        let i = 0;
        for(let k=0; k<options.length; k++) {
            if(options[k].value == this.state.storeType)
                i=k;
        }

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
            <div id="partner-business" style={{display: this.props.display ? 'block' : 'none'}}>
                <div id="partner-business-info" style={{display: !this.state.edit ? 'block' : 'none'}}>
                    <h2>Name: <i>{this.props.currentPartner.storeName}</i></h2>
                    <button id="edit-business-info" onClick={this.toggleEdit}><FontAwesomeIcon className="fa-icon" icon={faEdit} /></button>
                    <hr/>
                    <p>Type of Business: <i>{this.props.currentPartner.storeType}</i></p>
                    <p style={{display: this.props.currentPartner.storeDetails ? 'block' : 'none'}}>Details: <i>{this.props.currentPartner.storeDetails}</i></p>
                    <p>Business Address: <i>{this.props.currentPartner.storeAddress}</i></p>
                    <p>Business Email: <i>{this.props.currentPartner.storeEmail}</i></p>
                    <p>Business Phone: <i>{this.props.currentPartner.phone}</i></p>
                    <p>Description: <i style={{fontStyle: !this.props.currentPartner.storeDescription && 'italic'}}>{this.props.currentPartner.storeDescription ? this.props.currentPartner.storeDescription : "click the pen tool to add a description of your business!"}</i></p>
                </div>
                <div id="partner-edit-business-info" style={{display: this.state.edit ? 'block' : 'none'}}>
                    <h2>Name: <i>{this.props.currentPartner.storeName}</i></h2>
                    <button id="edit-business-info" onClick={this.toggleEdit}>✕</button>
                    <hr/>
                    <p>Type of Business:
                    <Select
                        name = 'storeType'
                        onChange={(opt) => this.onSelect(opt, 'storeType')}
                        defaultValue={options[i]}
                        id = 'update_store_type'  
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
                    </Select></p>
                    <div style={{display: ['restaurant', 'specialty_store', 'service', 'entertainment', 'other'].includes(this.state.storeType) ? 'block' : 'none' }}>
                        <p><span style={{display: this.state.storeType == 'specialty_store' ? 'block' : 'none'}}>What Do You Sell?</span>
                        <span style={{display: this.state.storeType == 'restaurant' ? 'block' : 'none'}}>What Cuisine Do You Serve?</span>
                        <span style={{display: this.state.storeType == 'service' ? 'block' : 'none'}}>What Service Do You Provide?</span>
                        <span style={{display: this.state.storeType == 'entertainment' ? 'block' : 'none'}}>What Form of Entertainment?</span>
                        <span style={{display: this.state.storeType == 'other' ? 'block' : 'none'}}>Please Explain More About Your Business</span>
                        <TextInput 
                            name = 'storeDetails'
                            className='text_input'
                            value = {this.state.storeDetails}
                            onChange = {this.onChange}
                            light="true" 
                            placeholder="specify the above information related to your business..."
                        /></p>
                        </div>
                    <p>Business Address: <TextInput 
                            name = 'storeAddress'
                            className='text_input'
                            value = {this.state.storeAddress}
                            onChange = {this.onChange} 
                            light="true" 
                            placeholder="enter your business address..."
                        /></p>
                    <p>Business Email: <TextInput
                            className='text_input'
                            name = 'storeEmail'
                            value = {this.state.storeEmail}
                            onChange = {this.onChange}
                            light="true" 
                            type="email"
                            placeholder="enter your business email..."
                        /></p>
                    <p>Business Phone: <TextInput
                            className='text_input'
                            name = 'phone'
                            value = {this.state.phone}
                            onChange = {this.onChange}
                            light="true" 
                            type="phone"
                            placeholder="enter your business phone number..."
                        /></p>
                    <p>Description: <TextInput
                            className='text_input'
                            name = 'storeDescription'
                            value = {this.state.storeDescription}
                            onChange = {this.onChange}
                            light="true" 
                            placeholder="enter a description about your business..."
                        /></p>
                    <button className="main-button" id="complete-edit" onClick={this.updateBusinessInfo}>Update Info</button>
                    <div className="alert alert-danger" id="error-message" role="alert" style={{display: this.state.errors ? 'block' : 'none'}}>
                        errors: {this.state.errors}
                    </div>
                    <div className="alert alert-success" id="error-message" role="alert" style={{display: this.state.updated ? 'block' : 'none'}}>
                        Updated Successfully!
                    </div>
                </div>
            </div>
        )
    }
}