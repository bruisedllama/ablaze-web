import React from 'react'
import { Link } from "react-router-dom";
import ProfilePic from './ProfilePic'
import { TextInput, Button } from 'carbon-components-react'

export default class AppAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.currentUser.name,
            email: this.props.currentUser.email,
            imageUrl: '',
            dateJoined: '',
            payment: ''
        }
    }

    componentDidMount() {
        
    }
    
    render() {
        return(
            <div id="app-account-div">
               <h2>My Account</h2>
               <div className="row">
                <div className="col-md-6">
                    <div id="account-profile" className="account-card">
                        <h3>Profile</h3>
                        <hr />
                        <ProfilePic imageUrl={this.state.imageUrl}/>
                        <h4>name: {this.state.name}</h4>
                        <h4>email: {this.state.email}</h4>
                    </div>
                </div>
                <div className="col-md-6" id="account-info">
                    <div id="account-payment" className="account-card">
                        <h3>Payment Info</h3>
                        <hr />
                    </div>
                    <div id="account-sensitive" className="account-card">
                        <h3>Settings</h3>
                        <hr />
                    </div>
                </div>
               </div>
            </div>
        )
    }
}