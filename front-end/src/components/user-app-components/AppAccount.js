import React from 'react'
import { Link } from "react-router-dom";
import ProfilePic from './ProfilePic'
import { TextInput, Button } from 'carbon-components-react'

export default class AppAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageUrl: '',
            dateJoined: '',
            payment: ''
        }
    }

    componentDidMount() {
        //pull data from API
        //alternatively user data can be sent in as props from UserApp
        this.setState(() => {
             return {
                 name: 'Bob Smith'
             }
        })
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