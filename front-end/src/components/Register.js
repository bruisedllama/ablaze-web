import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { TextInput, Button, Checkbox } from 'carbon-components-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

class Register extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
            termsChecked: false
        }
        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChange(event) {
        const {name, value} = event.target
        name !== 'termsChecked' ? this.setState({[name]: value}) : this.setState({[name]: !this.state.termsChecked})
    }

    register(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const errors = this.state.errors
        if (this.props.loggedIn === true) {
            return <Redirect to='/app' />
        }

        return(
            <div id="register_main">
                <div id="register_div">
                    <h2>Register for Ablaze</h2>
                    <label>Name</label>
                    <span className="red-text">{errors.name}</span>
                    <TextInput 
                        name = 'name'
                        className= {classnames("text_input", {
                            invalid: errors.name
                        })}
                        value = {this.state.name}
                        onChange = {this.onChange}
                        id = 'register_name'  
                        light="true" 
                        placeholder="enter your full name..."
                    />
                    <label>Email</label>
                    <span className="red-text">{errors.email}</span>
                    <TextInput 
                        name = 'email'
                        className={classnames("text_input", {
                            invalid: errors.email
                        })}
                        value = {this.state.email}
                        onChange = {this.onChange}
                        id = 'register_email'  
                        light="true" 
                        placeholder="enter your email..."
                    />
                    <label>Password</label>
                    <span className="red-text">{errors.password}</span>
                    <TextInput
                        type="password"
                        className={classnames("text_input", {
                            invalid: errors.password
                        })}
                        name = 'password'
                        value = {this.state.password}
                        onChange = {this.onChange}
                        id = 'register_password'  
                        light="true" 
                        placeholder="enter your password..."
                    />
                    <label>Re-enter Password</label>
                    <span className="red-text">{errors.password2}</span>
                    <TextInput
                        type="password"
                        className={classnames("text_input", {
                            invalid: errors.password2
                        })}
                        name = 'password2'
                        value = {this.state.password2}
                        onChange = {this.onChange}
                        id = 'register_password2'  
                        light="true" 
                        placeholder="enter your password again..."
                    />
                    <button 
                        onClick={this.register}
                        id="register_register"
                        className="main-button"
                    >
                        Get Started <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                    </button>
                </div>
            </div>
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register))
