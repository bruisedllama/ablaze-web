import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput } from 'carbon-components-react'
import axios from 'axios'

export default class UserTerms extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            trueEmail: '',
            typedEmail: ''
        }
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    agree() {
        //verify email
        //redirect to /app
    }
    
    render() {
        if (this.props.loggedIn === false) {
            return <Redirect to='/login' />
        }

        return(
            <div id="terms-body">
                <h2>Please Read and Agree to the Terms and Conditions</h2>   
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>     
                <label>Please type your email and click 'I agree' to proceed</label>
                <TextInput 
                    name="typedEmail"
                    onChange={this.onChange}
                    value={this.state.typedEmail}
                />
                <br />
                <button className="main-button" onClick={this.agree}>
                    I Agree
                </button>
            </div>
        )
    }
}
