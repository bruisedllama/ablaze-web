import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button, Checkbox } from 'carbon-components-react'
import axios from 'axios'
import PartnerTerms from './PartnerTerms'
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default class PartnerRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            storeType: '',
            storeName: '',
            storeAddress: '',
            storeEmail: '',
            phone: '',
            managerName: '',
            managerEmail: '',
            storeDetails: '',
            password: '',
            password2: '',
            terms: false,
            step: 0,
            errors1: '',
            errors2: ''
        }
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    onSelect = (opt, name) => {
        this.setState({ [name]: opt.value });
    }

    getStarted = () => {
        let input = this.state
        let missing = []
        if(input.storeType == '')
            missing.push("Store type is required")
        if(input.storeName == '')
            missing.push("Store name is required")
        if(!/\d+(\s+\w+){1,}\s+(?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|ave(?:\.|nue)?|rd|road|lane|drive|way|court|plaza|square|run|parkway|point|pike|driveway|trace|park|terrace|blvd|ln|pk|sqr|dr)/.test(input.storeAddress.toLowerCase()))
            missing.push("Valid store address is required")
        if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(input.storeEmail))
            missing.push("Valid store email address is required")
        if(missing.length > 0)
            this.setState({errors1: missing.join(', ')})
        else
            this.setState({step: 1, errors1: ''})
        //continue to next page of Partner's registration process
    }

    continue = () => {
        let input = this.state
        let missing = []
        if(input.managerName == '')
            missing.push("Name is required")
        if(!/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(input.managerEmail))
            missing.push("Valid manager email address is required")
        if(input.password.length < 6 || input.password.length > 30)
            missing.push('Password must be at least 6 characters')
        if(input.password != input.password2)
            missing.push('Passwords must match')
        if(missing.length > 0)
            this.setState({errors2: missing.join(', ')})
        else
            this.setState({step: 2, errors2: ''})
    }    

    cancel = () => {
        this.setState({step: 0})
    }

    register = (e) => {
        e.preventDefault();
        if(this.state.terms) {
            const newPartner = {
                storeName: this.state.storeName,
                storeAddress: this.state.storeAddress,
                storeEmail: this.state.storeEmail,
                phone: this.state.phone,
                storeType: this.state.storeType,
                storeDetails: this.state.storeDetails,
                managerName: this.state.managerName,
                managerEmail: this.state.managerEmail,
                password: this.state.password
            };
            axios.post("http://localhost:5000"   + '/api/partners/register', newPartner)
                .then(response => {
                    console.log(response)
                    console.log("registered!")
                    const partner = {
                        email: newPartner.managerEmail,
                        password: newPartner.password
                    }
                    axios.post('http://localhost:5000' + '/api/partners/login', partner)
                        .then(response => {
                            console.log(response)
                            console.log("logged in!")
                            localStorage.setItem("partner-token", response.data.token)
                            this.setState({step: 3})
                            this.props.changeLoginStatus(true, partner.email)
                        })
                        .catch((error) => {
                            if (error.response) {
                                //this.setState({errors: error.response.data.email + ', ' + error.response.data.password})
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

        const detailsArray = ['restaurant', 'specialty_store', 'service', 'entertainment', 'other']

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
            <div id="partner-register-div" 
                style={{
                    position: this.state.step > 0 ? 'fixed' : 'static',
                    boxShadow: this.state.step > 0 ? '0px 0px 300px #333' : '5px 5px 30px #aaa',
                    width: this.state.step > 0 ? '90%' : '100%',
                    top: this.state.step > 0 ? '5vh' : '3vh',
                    height: 'auto',
                    left: this.state.step > 0 ? '5%' : '50%',
                    zIndex: this.state.step > 0 && '99999',
                    padding: this.state.step > 0 ? '10vh 8%' : '5vh 8%',
                    overflowY: this.state.step == 0 ? 'scroll' : 'visible',
                    overflowX: 'hidden',
                    transitionDuration: '0.3s',
                    borderRadius: '5px'
                }}>
                <button id="reg-cancel" onClick={this.cancel} style={{display: this.state.step == 0 && 'none', position: 'absolute', top: '5vh', right: '4%'}}>
                ✕
                </button>
                <div id="reg-box" style={{position: 'relative', height: detailsArray.includes(this.state.storeType) && this.state.step == 0 ? '80vh' : '70vh'}}>
                    <div id="reg-slide-1" className="reg-slide" style={{left: this.state.step*(-120) + '%'}}>
                        <h2>Register your Business for Ablaze</h2>
                        <label>Type of Business</label>
                        <Select
                            name = 'storeType'
                            onChange={(opt) => this.onSelect(opt, 'storeType')}
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
                        <div style={{display: detailsArray.includes(this.state.storeType) ? 'block' : 'none' }}>
                        <label style={{display: this.state.storeType == 'specialty_store' ? 'block' : 'none'}}>What Do You Sell?</label>
                        <label style={{display: this.state.storeType == 'restaurant' ? 'block' : 'none'}}>What Cuisine Do You Serve?</label>
                        <label style={{display: this.state.storeType == 'service' ? 'block' : 'none'}}>What Service Do You Provide?</label>
                        <label style={{display: this.state.storeType == 'entertainment' ? 'block' : 'none'}}>What Form of Entertainment?</label>
                        <label style={{display: this.state.storeType == 'other' ? 'block' : 'none'}}>Please Explain More About Your Business</label>
                        <TextInput 
                            name = 'storeDetails'
                            className='text_input'
                            value = {this.state.storeDetails}
                            onChange = {this.onChange}
                            light="true" 
                            placeholder="specify the above information related to your business..."
                        />
                        </div>
                        <label>Business Name</label>
                        <TextInput 
                            name = 'storeName'
                            className='text_input'
                            value = {this.state.storeName}
                            onChange = {this.onChange} 
                            light="true" 
                            placeholder="enter your business name..."
                        />
                        <label>Business Address</label>
                        <TextInput 
                            name = 'storeAddress'
                            className='text_input'
                            value = {this.state.storeAddress}
                            onChange = {this.onChange} 
                            light="true" 
                            placeholder="enter your business address..."
                        />
                        <label>Business Email</label>
                        <TextInput
                            className='text_input'
                            name = 'storeEmail'
                            value = {this.state.storeEmail}
                            onChange = {this.onChange}
                            light="true" 
                            type="email"
                            placeholder="enter your business email..."
                        />
                        <label>Business Phone</label>
                        <TextInput
                            className='text_input'
                            name = 'phone'
                            value = {this.state.phone}
                            onChange = {this.onChange}
                            light="true" 
                            type="phone"
                            placeholder="enter your business phone number..."
                        />
                        <br/>
                        <div className="alert alert-danger" id="error-message" role="alert" style={{display: this.state.errors1 ? 'block' : 'none'}}>
                            Errors: {this.state.errors1}
                        </div>
                        <button 
                            onClick={this.getStarted} style={{marginBottom: 30}}
                            id="register_getstarted"
                            className="main-button"
                        >
                            Get Started  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                        </button>
                    </div>
                    <div id="reg-slide-2" className="reg-slide" style={{left: (this.state.step*(-120)+120) + '%'}}>
                        <h2>Tell Us About Yourself</h2>
                        <p style={{paddingTop: 15}}>We need this information to help create your business account.</p>
                        <label>Your Name</label>
                        <TextInput 
                            name = 'managerName'
                            className='text_input'
                            value = {this.state.managerName}
                            onChange = {this.onChange}
                            light="true" 
                            placeholder="enter your name..."
                        />
                        <label>Your Email</label>
                        <TextInput 
                            name = 'managerEmail'
                            className='text_input'
                            value = {this.state.managerEmail}
                            onChange = {this.onChange} 
                            light="true" 
                            placeholder="enter the email you would like to create your account with..."
                        />
                        <label>Password</label>
                        <TextInput
                            type="password"
                            className='text_input'
                            name = 'password'
                            value = {this.state.password}
                            onChange = {this.onChange} 
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
                            light="true" 
                            placeholder="enter your password again..."
                        />
                        <br/>
                        <div className="alert alert-danger" id="error-message" role="alert" style={{display: this.state.errors2 ? 'block' : 'none'}}>
                            Errors: {this.state.errors2}
                        </div>
                        <button 
                            onClick={this.continue}
                            id="register_continue"
                            className="main-button"
                        >
                            Continue  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                        </button>
                    </div>
                    <div id="reg-slide-2" className="reg-slide" style={{left: (this.state.step*(-120)+240) + '%'}}>
                        <h2>Terms & Conditions of Partnership</h2>
                        <PartnerTerms/>
                        <Checkbox
                            id="store-reg-terms-check"
                            checked={this.state.terms}
                            onChange={(value, id, event) => this.setState({terms: value})}
                        />
                        <p style={{margin: '-35px 0px 0px 30px'}}>I have read and agree to the terms and conditions of partnership.</p>
                        <button 
                            onClick={this.register}
                            id="register_register"
                            className="main-button"
                        >
                            Register  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                        </button>
                    </div>
                    <div id="reg-slide-3" className="reg-slide" style={{left: (this.state.step*(-120)+360) + '%', textAlign: 'center'}}>
                        <h2>Registration Successful!</h2>
                        <FontAwesomeIcon className="fa-icon" id="check" icon={faCheckCircle}/>
                        <p>Go to your dashboard to begin adding business info, creating deals, and moving your business forward!</p>
                        <Link to='/partner/dashboard'><button className="main-button">Go to Dashboard <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/></button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
