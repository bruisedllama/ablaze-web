import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import AppHome from './user-app-components/AppHome'
import AppDeals from './user-app-components/AppDeals'
import AppAccount from './user-app-components/AppAccount'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {logoutUser} from "../actions/authActions"
class UserApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        if (!this.props.auth) {
            return <Redirect to='/login' />
        }
        const user = this.props.auth;
        console.log(user)
        //manual router because Router isn't working; will fix later
        const path = this.props.location.pathname //get path
        let renderComponent = <AppHome />
        if(path === '/app/account') renderComponent = <AppAccount />
        if(path === '/app/deals') renderComponent = <AppDeals />
        //more paths can be added here
        console.log(path)
        return(
                <div id="app-body">
                    {/* APP ROUTES */ }
                    {renderComponent}
                </div>
        )
    }
}
UserApp.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (
    mapStateToProps,
    { logoutUser }
) (UserApp)
