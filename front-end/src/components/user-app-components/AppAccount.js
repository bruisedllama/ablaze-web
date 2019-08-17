import React from 'react'
import { Link } from "react-router-dom";
import { TextInput, Button } from 'carbon-components-react'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {logoutUser} from "../../actions/authActions"
class AppAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
    }
    
    render() {
        const user = this.props.auth.user;
        console.log(user)
        return(
            <div id="app-account-div">
               <h2>My Account</h2>
               <div className="row">
                <div className="col-md-6">
                    <div id="account-profile" className="account-card">
                        <h3>Profile</h3>
                        <h4>{user.id}</h4>
                        <hr />
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

AppAccount.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (
    mapStateToProps,
    { logoutUser }
) (AppAccount)
