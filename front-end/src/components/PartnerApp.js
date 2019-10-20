import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import PartnerHome from './partner-app-components/PartnerHome'
import PartnerLogin from './partner-app-components/PartnerLogin'
import PartnerNav from './partner-app-components/PartnerNav'
import PartnerDashboard from './partner-app-components/PartnerDashboard'

class PartnerApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPartner: '',
            loggedIn: false
        }
    }

    changeLoginStatus = (data, email) => {
        //get user data for email...
        axios.get('http://localhost:5000' + '/api/partners/get/' + email)
          .then((response) => {
            this.setState({loggedIn: data, currentPartner: response.data}, () => {
              localStorage.setItem('currentPartnerData', JSON.stringify(response.data))
            })
          }).catch(err => console.log(err))
    }

    componentDidMount() {//figure out a better way to do this later
        localStorage.getItem('partner-token') != null && this.setState({loggedIn: true, currentPartner: JSON.parse(localStorage.getItem('currentPartnerData'))})
        this.setState({loaded: true})
    } 

    componentDidUpdate() {//figure out a better way to do this later
        
    }
    
    render() {
        //manual router because Router isn't working; will fix later
        const path = this.props.location.pathname //get path
        let renderComponent = <PartnerHome currentPartner={this.state.currentPartner} loggedIn = {this.state.loggedIn}  changeLoginStatus={this.changeLoginStatus}/>
        if(path === '/partner/login') renderComponent = <PartnerLogin currentPartner={this.state.currentPartner} loggedIn = {this.state.loggedIn}  changeLoginStatus={this.changeLoginStatus}/>
        if(path === '/partner/dashboard') renderComponent = <PartnerDashboard currentPartner={this.state.currentPartner} loggedIn = {this.state.loggedIn} changeLoginStatus={this.changeLoginStatus}/>
        //more paths can be added here
        return(
                <div id="partner-app-body">
                    {<PartnerNav currentPartner={this.state.currentPartner} loggedIn = {this.state.loggedIn} changeLoginStatus={this.changeLoginStatus}/> }
                    {/* APP ROUTES */ }
                    {renderComponent}
                </div>
        )
    }
}

export default withRouter(PartnerApp)
